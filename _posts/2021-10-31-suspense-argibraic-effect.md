---
layout: post
title: Suspense for Data Fetching의 작동 원리와 컨셉 (feat.대수적 효과)
description: React의 새로운 비동기 처리 방식과 원리를 알아봅니다.
image: /uploads/default.png
emoji: 🪄
tags:
  - react
published: true
---

올해 4월에 있었던 [토스 개발 컨퍼런스(SLASH 21)](https://toss.im/slash-21) 세션 중 하나로
토스 데이터 플랫폼에 Recoil과 Suspense를 적용해 복잡한 비동기 로직을 우아하게 구현했다는
[박서진 님의 세션](https://www.youtube.com/watch?v=FvRtoViujGg)을 보았습니다.
시간관계상 상세하게 설명되지 못했던 부분들(대수적 효과, runPureTask 구현체, concurrent mode 등)이 있었는데
이게 제 호기심을 자극했습니다.<!–-break-–>

한국에서는 Suspense를 원리부터 깊게 다루는 블로그 포스팅이 많지 않은 것 같아 좀 제대로 알아봐야겠다 생각했고,
이 포스팅은 그 탐구의 결과입니다.

# React Suspense와 선언형 UI

React 16.6부터 추가된 Suspense는 주로 JS 번들의 Lazy Loading을 위한 기능이었습니다. `React.lazy`를 사용해 컴포넌트를
동적으로 임포트하고, Suspense 안에 넣어주면 자동으로 번들이 분리되고(Code Splitting) 해당 컴포넌트가 렌더링될 필요가 있을 때
React는 비동기적으로 번들을 가져옵니다. [React Docs의 예시](https://ko.reactjs.org/docs/concurrent-mode-suspense.html)를 가져와봤습니다.

{% highlight javascript %}

const ProfilePage = React.lazy(() => import('./ProfilePage')); // 지연 로딩

// 프로필을 불러오는 동안 스피너를 표시합니다
<Suspense fallback={<Spinner />}>
    <ProfilePage />
</Suspense>

{% endhighlight %}

이때 비동기 로드되는 컴포넌트를 감싸는 Suspense 컴포넌트의 `fallback` prop으로 로딩 UI를 넣어주면,
컴포넌트를 가져오는 동안 보여줄 로딩 UI를 **선언적으로 지정**할 수 있습니다. JSX를 복잡하게 만들지 않고
직관적으로 로딩 UI를 지정할 수 있다는 점이 아주 간편하죠.

# Suspense for Data Fetching

웹에서의 Lazy Loading이란 필요한 자원을 미리 가져오지 않고 필요할 때 가져오는 전략을 말합니다. 웹에서 필요한 모든 자원들은 Lazy Loading의
대상이 될 수 있습니다.

스플리팅된 JS 번들이나 이미지는 Lazy Loading이 가능한 대표적인 자원입니다. 그리고 웹 개발에서 SPA가
지배적인 컨셉이 되는 바람에 잘 의식하지는 못하지만, axios나 fetch등의 클라이언트를 사용해 서버에 요청을 보내
가져오는 데이터(AJAX) 역시 Lazy Loading의 한 종류입니다. 데이터를 미리 다 불러오지 않고 필요할 때 불러와 화면을 채우게
할 수 있으니까요.

주로 JS 번들을 스플리팅하고 웹 자원 중 **코드**를 Lazy Loading하는데 쓰였던 Suspense는 React 18에서 **무엇이든 
기다릴 수 있는 기능**으로 확장됩니다. Suspense는 이제 이미지, 스크립트, 그 밖의 비동기 작업을 기다리는데에 모두
사용 될 수 있는 기능입니다. 

Suspense for Data Fetching이란 Lazy Loading하는 데이터에 Suspense의 컨셉을 도입한 것입니다.

{% highlight javascript %}

const resource = fetchProfileData();

function ProfilePage() {
  return (
    <Suspense fallback={<h1>Loading posts...</h1>}>
      <ProfileTimeline />
    </Suspense>
  );
}

function ProfileTimeline() {
  // 비록 아직 불러오기가 완료되지 않았겠지만, 게시글 읽기를 시도합니다
  // read는 데이터 페칭 로직이 아닙니다. => 추후 설명
  const posts = resource.posts.read();
    return (
      <ul>
        {posts.map(post => (
          <li key={post.id}>{post.text}</li>
        ))}
      </ul>
    );
}
{% endhighlight %}

데이터를 불러오는 컴포넌트는 간단하게 데이터를 읽어올 수 있고,
위에서 보았던 Suspense와 React.lazy의 예제와 비슷하게 페칭 중의 로딩 UI를 선언적으로 지정할 수 있음을 확인하실
수 있습니다. 

## 기존의 명령적 비동기 처리

비동기 요청의 상태에 따라 다른 UI를 보여주도록 JSX에서 명시하는 기존 방식은 명령적이고, 복잡해지기 쉽습니다.

> **명령형 프로그래밍** : 어떤거 가지고 "무엇을 할 지를" 프로그래밍 ⇒ 비동기 상태값을 가지고 어떤 UI를 보여줄지에 대한 분기 로직을 JSX에 코딩

저는 현재 아래 예제와 같이 모든 데이터 패칭에 관련한 로직을 하나의 컴포넌트에 때려박는 식으로 개발하지는 않습니다만,
비동기 로직과 그 상태값 때문에 컴포넌트 내부 로직이 얼마나 지저분해질 수 있는지 보여드릴 수 있도록
예제를 작성해 봤습니다.

{% highlight javascript %}

function App() {
  const [userData, setUserData] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  
  useEffect(() => {
    const fetchUserData = async() => {
      try {
        setIsLoading(true)
        const { data } = await apiClient.get('api/user');
        setUserData(process(data))
      } catch(e) {
        setUserData(null)
        setErrorMessage(e.message)
      } finally {
        setIsLoading(false)
      }
    }
    fetchUserData()
  }, [])
  
  
  return (
    <>
      {isLoading ? 
        <Spinner/>:
        ({
          userData !== null ? 
            <div>{userData.name}<div>: 
            <Error/>
        })
      }
    </>
  )
}
{% endhighlight %}

JSX 부분에서 상태값에 따라 다른 UI를 보여줄 수 있도록 만드는 부분이 꽤 가독성이 좋지 않다는 것을 알 수 있으실 것입니다.
만에하나 비동기 요청이 여러가지 상태값을 가질 수 있다면 더 복잡해집니다.

{% highlight javascript %}
// 기본적으로 이렇게 해줘야함 => 보기 힘듬
{로딩변수 ? <로딩 UI/> : ({페칭성공변수 ? <>{데이터}</> : <에러 UI/>})}

// 비동기 로직이 더 많은 완결 상태를 가질 수 있다면 더 장황해짐 => 더 보기 힘듬
{로딩변수 ? <로딩 UI/> : ({
  페칭성공변수1 ? <DataComp1 data={data}/> : ({
      페칭성공변수2 ? <DataComp2 data={data}/> :
      <에러 UI/>
    })
  })
}
{% endhighlight %}

## Suspense + Error Boundary를 이용한 선언형 비동기 처리 

앞에 예제에서 비동기 상태의 값을 나타내는 것은 로딩 상태를 나타내는 `isLoading`과 에러 발생 여부를 나타내는 `errorMessage` 였습니다.
일반적으로 비동기 요청은 **로딩, 실패(에러), 성공**의 3가지 상태를 갖습니다. 
이 3가지의 상태에 해당하는 UI를 Suspense와 ErrorBoundary를 사용하면 모두 선언적으로 표현할 수 있습니다.

> **선언형 프로그래밍** : 어떤거 가지고 "무엇이 될지를" 프로그래밍 ⇒ 비동기 상태값에 따른 UI를 Prop으로 주입하기

{% highlight javascript %}
function Comp() {
  const { data } = apiClient.read('api/user');
  return (
    <div>{data.name}<div/>
  )
}

function App() {
  return (
    <ErrorBoundary fallback={<Error/>}> // 실패 UI
      <Suspense fallback={<Spinner/>}> // 로딩 UI
        <Comp/> // 성공 UI
      </Suspense>
    </ErrorBoundary>
  )
}
{% endhighlight %}

앞의 예제와 비교해보면 코드가 정말 많이 줄었고, UI 로직이 매우 직관적으로 변했습니다. 

ErrorBoundary란 감싸고 있는 하위 컴포넌트의 에러 여부를 검출할 수 있는 컴포넌트입니다. 클래스형 컴포넌트의
`getDerivedStateFromError`, `componentDidCatch` 생명주기를 사용해 에러를 검출합니다. 함수형 컴포넌트에서는
이러한 생명주기와 똑같은 기능이 아직 없어 ErrorBoundary 구현에는 클래스형 컴포넌트를 사용합니다. [React Docs의
ErrorBoundary 구현](https://ko.reactjs.org/docs/error-boundaries.html)을 가져와 봤습니다.

{% highlight javascript %}
class ErrorBoundary extends React.Component {
  constructor(props) {
  super(props);
    this.state = { hasError: false };
  }
  
  static getDerivedStateFromError(error) {
    // 다음 렌더링에서 폴백 UI가 보이도록 상태를 업데이트 합니다.
    return { hasError: true };
  }
  
  componentDidCatch(error, errorInfo) {
    // 에러 리포팅 서비스에 에러를 기록할 수도 있습니다.
    logErrorToMyService(error, errorInfo);
  }
  
  render() {
    if (this.state.hasError) {
      // 폴백 UI를 커스텀하여 렌더링할 수 있습니다.
      return <h1>Something went wrong.</h1>;
    }
    return this.props.children;
  }
}

<ErrorBoundary>
  <MyWidget />
</ErrorBoundary>
{% endhighlight %}

# Suspense for Data Fetching 컨셉 살펴보기

선언적으로 UI 로직을 작성할 수 있다는 것이 Suspense for Data Fetching의 유일한 장점은 아닙니다. 
React Docs의 예제와 React 코어 팀의 Sebastian Markbåge가 작성한 컨셉 코드를 보여드리면서,
Suspense for Data Fetching에는 또 어떤 장점이 있는지 보여드리겠습니다.

## React Docs

[React Docs 예제](https://ko.reactjs.org/docs/concurrent-mode-suspense.html#what-is-suspense-exactly)

위에서 다뤘던 예제의 resource.posts..read() 메소드의 내부 구현은 다음과 같습니다.

{% highlight javascript %}

export function fetchProfileData() {
  let userPromise = fetchUser(); // 프로미스를 리턴
  let postsPromise = fetchPosts();
  return {
    user: wrapPromise(userPromise),
    posts: wrapPromise(postsPromise)
  };
}

function wrapPromise(promise) {
  let status = "pending"; // 최초의 상태
  let result;
  
  // 프로미스 객체 자체
  let suspender = promise.then(
    (r) => {
      status = "success"; // 성공으로 완결시 success로
      result = r;
    },
    (e) => {
      status = "error"; // 실패로 완결시 error로
      result = e;
    }
  );
  
  // 위의 Suspense For Data Fetching 예제에서의 read() 메소드입니다.
  // 위 함수의 로직을 클로저삼아, 함수 밖에서 프로미스의 진행 상황을 읽는 인터페이스가 된다
  return {
    read() {
      if (status === "pending") {
          throw suspender; // 펜딩 프로미스를 throw 하면 Suspense의 Fallback UI를 보여준다
        } else if (status === "error") {
          throw result; // Error을 throw하는 경우 ErrorBoundary의 Fallback UI를 보여준다
        } else if (status === "success") {
          return result; // 결과값을 리턴하는 경우 성공 UI를 보여준다
      }
    }
  };
}
{% endhighlight %}

API 호출이 존재하는 컴포넌트는 렌더링이 매번 시도될때 마다 `read()`를 통해 결과값을 읽으려는 시도를 합니다.
그리고 읽어온 결과값이 **throw된 Error**나 **pending 상태의 Promise**, 혹은 **정상적인 결과값**이냐에 따라 어떤 UI를 보여줄지가 달라집니다.
throw가 된 경우 컴포넌트에서는 상위 Suspense, ErrorBoundary의 fallback UI를 찾아 보여줍니다.

비동기 요청을 하는 컴포넌트는 `read()` 메소드가 리턴하거나 
throw하는 값들을 통해 Supense, ErrorBoundary 컴포넌트와 상호작용하고 있음을 알 수 있는 예제였습니다.

## Sebastian Markbåge - SynchronousAsync.js

[Github Gist : SynchronousAsync.js](https://gist.github.com/sebmarkbage/2c7acb6210266045050632ea611aebee)

`read()`와 Suspense, ErrorBoundary 컴포넌트가 어떻게 상호작용하는지를 이해할 수 있었는데요. 그렇다면 React는
어떻게 특정 컴포넌트 비동기 로직의 상태값을 계속 watching해서 매번 렌더링 시도를 하는 걸까요?

Suspense를 창안한 Sebastian Markbåge의 코드 조각을 통해 조금 더 이해해볼 수 있습니다. `runPureTask` 함수 부분을 잘 봐주세요!

{% highlight javascript %}
// 실제로 React의 Suspense가 이것과 똑같이 동작하지는 않겠지만
// 구현 컨셉을 잘 드러내고 있는 코드 조각입니다.

let cache = new Map();
let pending = new Map();

function fetchTextSync(url) {
  if (cache.has(url)) {
    return cache.get(url); // 캐시 맵객체
  }
  if (pending.has(url)) {
    throw pending.get(url); // Pending Promise throw
  }
  // 비동기 로직
  let promise = fetch(url)
    .then((response) => response.text()) // 처리되는 경우
    .then((text) => {
      pending.delete(url);
      cache.set(url, text);
    });
  pending.set(url, promise); // 팬딩 객체에 팬딩인거 표시
  throw promise;
}

async function runPureTask(task) {
  for (;;) { // while true
  //!!! 태스크를 리턴할 수 있을 때까지 바쁜대기를 함(무한루프) !!!
  try {
      return task(); // 태스크 값을 리턴할 수 있게 되면 무한루프에서 벗어난다
    } catch (x) { // throw를 거른다
      if (x instanceof Promise) {
        await x; // pending promise가 throw된 경우 await으로 resolve 시도 => suspense
      } else {
        throw x; // Error가 throw된 경우 그대로 error throw => ErrorBoundary, 종료
      }
    }
  }
}
{% endhighlight %}

{% highlight javascript %}
function getUserName(id) {
  var user = JSON.parse(fetchTextSync("/users/" + id)); // 비동기 로직
  return user.name;
}

function getGreeting(name) {
  if (name === "Seb") {
    return "Hey";
  }
  return fetchTextSync("/greeting"); // 비동기 로직
}

function getMessage() {
  let name = getUserName(123);
  return getGreeting(name) + ", " + name + "!";
}

runPureTask(getMessage).then((message) => console.log(message));
{% endhighlight %}

특정 비동기 로직의 상태를 success, Fail 완결이 날때까지 계속 기다리는 함수가 `runPureTask`입니다.
React는 컴포넌트의 데이터 요청 상태를 계속 확인하고 렌더링을 시도합니다.

React Docs에서는 이러한 로직의 흐름을 **"데이터가 계속 흘러들어옴에 따라 React는 렌더링을 다시 시도하며, 그때마다
React가 더 깊은 곳까지 데이터를 처리할 수 있게 된다"** 라고 설명합니다.

데이터 페칭이 완료되지 않은 컴포넌트의 경우에는 렌더링이 정지됩니다. React는 이 컴포넌트를 넘겨버리고 다른 컴포넌트의 렌더링을
시도합니다. 렌더링을 시도할 컴포넌트가 남아있지 않으면, 컴포넌트 트리 상에서 존재하는 것 중 가장 가까운 Suspense, 혹은 ErrorBoundary의
Fallback UI를 찾습니다.

이렇게 응답이 계속 흘러들어오도록 하면 **컨텐츠를 더 일찍 표시할 수 있다는** 장점이 있습니다. 응답을 기대하면서
명령적인 예외처리나 후처리를 해줄 필요가 없기 때문입니다. 응답이 왔을 때 명령적으로 컴포넌트의 State나 Redux Store 등에 비동기 요청의
결과값을 넣어 렌더링할 필요도 없습니다. 

그동안 해왔던 중간 로직들이 생략되기 때문에 비동기 데이터의 표시는 더 빨라질 수 있고,
로직도 줄어드는 것입니다. React의 렌더링 시스템과 비동기 처리가 찰떡같이 결합하고 있는 듯 하네요!

# 대수적 효과와 Suspense

<img src="/uploads/suspense-algebraic-effect/tweet.png" width="400" height="400" />

Sebastian Markbåge는 코드 블럭을 트위터로 공유할 때 algebraic effect, 대수적 효과를 언급했습니다.
또한 React 코어 팀의 프로그래머 Dan Abramov는 Suspense가 대수적 효과를 토대로
만들어졌다고 블로그 포스팅에서 언급합니다. Suspense의 창안 원리라고 할 수 있는 대수적 효과는 과연 무엇일까요?

자료 조사를 통해 완벽하진 않고 몹시 추상적이지만 나름의 정의를 도출할 수 있었습니다. 100% 맞는 얘기가 아니기 때문에 유의해서
읽어주시고, 이 파트 자체를 무시하시고 다음 목차인 `대수적 효과와 Suspense 연결짓기`로 가셔도 됩니다.
저 나름의 멘탈 모델을 구축하는데는 도움이 되는 설명이었기에 공유드립니다. 지적도 부탁드리겠습니다ㅜ

## 대수적 효과(Algebraic Effect)란?

> Algebraic effects are an approach to **computational effects based on a premise that impure behaviour arises from a set of operations** such as get & set for mutable store, read & print for interactive input & output, or raise for exceptions - *Matija Pretnar, [An Introduction to
Algebraic Effects and Handlers](https://pdf.sciencedirectassets.com/272990/1-s2.0-S1571066115X00107/1-s2.0-S1571066115000705/main.pdf?X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFQaCXVzLWVhc3QtMSJIMEYCIQCBRCafKGOIr5SaxoBTKqEvcWzsdLIcoRVfgfB7XIp7WgIhALSpvNmPBUvnq%2Ffr5SMIwkXOsdZ2SnwP9xNvOLmFo7egKoMECOz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQBBoMMDU5MDAzNTQ2ODY1Igz%2FJ6Brvj6rRTAdYhYq1wMP8FE3TbdtUTO0fqJdlLwEg8jx%2FahWDzxrfSg6dTWGIu2TzvVgMuczgYfqn672mANwEHqO9qOAW%2BqOuTx0d8ZuKkt1PPWF4MAC7JJFKa4k1t6e1CLkBMTC0JPU%2BsTqYyCF1pVqtTc4c4RXtChJIlts8QgqvcxQg3bnUExfAf5uznb8215HvwSH5SWrdyzLW70g8%2FAlSAIwyeq0OgJwH%2F7wT9FQV%2F0c18O5VMiw1CAUdEG0d05eBucItTiL6G5iLrsPM2%2BNWxYxP8vChBEXM9eAW9gpSHtor4AoEbKJzbOXzr2uLhrHWk2oTy9IksqdR2u%2FBeAO9w0ZJoekt336G0hc3dPyGkcBHL7%2Bw8HzmerNc2W3%2F2SMZZPQ08sDdaramQ2P%2FoxbBgV5nOJ3UZDe591Hlz5P7WBVm5rZcYiD8YZVi4P3jPgIigRDw4KPO6pFvczYYiZ9AYAKYihLyEINPmR9ktz%2FitOfaAbbXA3oE%2B7lqZIzfPsR4DPNLsUI2q8BvTVStyZC1E%2BDafoPx%2F7QNa%2B6KMoQKaX2hjdAdC7vsX0l%2FvWAaIYbTeFtHrScz%2F1T7%2B7Z5X6zBTklSusVteJ%2BZqtjfe4ZFHNOKstJG5ovlLGyyo%2FowfJ%2FF9Awivf5iwY6pAGiQkV2y%2FOlbZhXY468r5Nn44%2BdT2F8DYXsh%2FKu7R1V3K7hDQxKyAqJhjAUNL4e4UFctElfVeGcpuCTOSaOwzHOeCH3iprOpe5PiKc%2BFMd8Rj%2BxWyc7EMmqIdieFsFPsoVlUODt2SljrWbEnWTcnzl6VVSuPHD3jaLzvODchB6jKC4x1lFBJ2cFxL75YgEnhI1Iu7Qgb2g7X6pORIXI98EeBz8wNA%3D%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20211031T120347Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Credential=ASIAQ3PHCVTYVFY47PCB%2F20211031%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=60730485ca3d7ae5be5cd1333347e423fabec7032b16e6e0e69b668654323f09&hash=f1eb0a2e54d2280ad824519b75df93b2d9818a6b1fb25fb98c16daba7dfcf6ce&host=68042c943591013ac2b2430a89b270f6af2c76d8dfd086a07176afe7c76c2c61&pii=S1571066115000705&tid=spdf-ffeaf553-478f-413d-9c28-02cb59f70cc4&sid=82ab8e3b120125455c79d3d9323e5344cae6gxrqa&type=client) (2015)*

대수적 효과는 컴퓨터 효과의 접근 방식 중 하나로, 특정 연산 집합이 불순한 부수 효과를 불러 일으키는 것으로 전제합니다. 
이런 접근 방법에서 부수 효과는 어떤 연산이 무언가를 불러 일으키는 방식으로 표현됩니다. 

컴퓨터 효과(Computational Effect)란 컴퓨터 동작에 대한 기술(記述)입니다. 함수가 값을 리턴하는 것도, 변수에 값을 집어넣는 것도 모두
컴퓨터 효과입니다. 어떤 컴퓨터적 효과가 대수적이라면 그것을 하나의 특정한 연산자로 묶는게 가능합니다. [대수학의 군(group)](https://ko.wikipedia.org/wiki/%EA%B5%B0_(%EC%88%98%ED%95%99))처럼, 어떤 집합에
대한 조건에 맞는 연산을 정의하고 식으로 표현하듯 부수효과를 나타낼 수 있습니다.  

[대수적 효과는 Effects(특정 연산)과, Effect Handlers(연산이 일으키는 부수효과)로 이루어져 있습니다.](https://www.youtube.com/watch?v=7GcrT0SBSnI)
Effect Handler는 Effect가 발생하는 것에 대응해 호출되는 로직으로 특정 동작을 실행하거나 특정 값을 리턴합니다. 

대수적 효과의 지원까지는 아니지만 Effect와 Effect Handler의 존재는 현재의 프로그래밍 언어 문법에서도 찾아볼 수 있는 요소입니다.
try-catch문이 대표적인 예인데요.

{% highlight javascript %}
try {
  const value = someLogic();
  return {result: 'success', value }
} catch(e) {
  console.log(e.message)
  return {result: 'fail', value: null }
}
{% endhighlight %}

어떤 함수의 로직에서 Exception이 발생했을 때 catch문의 로직이 실행되는 상황을 보면 Exception이 Effect, Catch문의 로직이
Effect Handler라고 할 수 있습니다. 

하지만 대수적 효과는 연산을 직접 설정하는 것, 즉 
Effect와 이에 맞는 Effect Handler 정의까지 모두 개발자가 할 수 있는 여지를 제공합니다. 대수적 효과는 handler를 Exception 처리에만
사용하지 않고 다른 사용자 정의 효과들에 대해서도 모두 handler를 사용할 수 있게끔 하는, 프로그래밍 언어 기능 확장의 비전을 가지고 있습니다.

> **This naturally gives rise to handlers not only of exceptions, but of any other effect**, yielding a novel concept that, amongst others, can capture stream redirection, backtracking, co-operative multi-threading, and delimited continuations - *Matija Pretnar, [An Introduction to
Algebraic Effects and Handlers](https://pdf.sciencedirectassets.com/272990/1-s2.0-S1571066115X00107/1-s2.0-S1571066115000705/main.pdf?X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFQaCXVzLWVhc3QtMSJIMEYCIQCBRCafKGOIr5SaxoBTKqEvcWzsdLIcoRVfgfB7XIp7WgIhALSpvNmPBUvnq%2Ffr5SMIwkXOsdZ2SnwP9xNvOLmFo7egKoMECOz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQBBoMMDU5MDAzNTQ2ODY1Igz%2FJ6Brvj6rRTAdYhYq1wMP8FE3TbdtUTO0fqJdlLwEg8jx%2FahWDzxrfSg6dTWGIu2TzvVgMuczgYfqn672mANwEHqO9qOAW%2BqOuTx0d8ZuKkt1PPWF4MAC7JJFKa4k1t6e1CLkBMTC0JPU%2BsTqYyCF1pVqtTc4c4RXtChJIlts8QgqvcxQg3bnUExfAf5uznb8215HvwSH5SWrdyzLW70g8%2FAlSAIwyeq0OgJwH%2F7wT9FQV%2F0c18O5VMiw1CAUdEG0d05eBucItTiL6G5iLrsPM2%2BNWxYxP8vChBEXM9eAW9gpSHtor4AoEbKJzbOXzr2uLhrHWk2oTy9IksqdR2u%2FBeAO9w0ZJoekt336G0hc3dPyGkcBHL7%2Bw8HzmerNc2W3%2F2SMZZPQ08sDdaramQ2P%2FoxbBgV5nOJ3UZDe591Hlz5P7WBVm5rZcYiD8YZVi4P3jPgIigRDw4KPO6pFvczYYiZ9AYAKYihLyEINPmR9ktz%2FitOfaAbbXA3oE%2B7lqZIzfPsR4DPNLsUI2q8BvTVStyZC1E%2BDafoPx%2F7QNa%2B6KMoQKaX2hjdAdC7vsX0l%2FvWAaIYbTeFtHrScz%2F1T7%2B7Z5X6zBTklSusVteJ%2BZqtjfe4ZFHNOKstJG5ovlLGyyo%2FowfJ%2FF9Awivf5iwY6pAGiQkV2y%2FOlbZhXY468r5Nn44%2BdT2F8DYXsh%2FKu7R1V3K7hDQxKyAqJhjAUNL4e4UFctElfVeGcpuCTOSaOwzHOeCH3iprOpe5PiKc%2BFMd8Rj%2BxWyc7EMmqIdieFsFPsoVlUODt2SljrWbEnWTcnzl6VVSuPHD3jaLzvODchB6jKC4x1lFBJ2cFxL75YgEnhI1Iu7Qgb2g7X6pORIXI98EeBz8wNA%3D%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20211031T120347Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Credential=ASIAQ3PHCVTYVFY47PCB%2F20211031%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=60730485ca3d7ae5be5cd1333347e423fabec7032b16e6e0e69b668654323f09&hash=f1eb0a2e54d2280ad824519b75df93b2d9818a6b1fb25fb98c16daba7dfcf6ce&host=68042c943591013ac2b2430a89b270f6af2c76d8dfd086a07176afe7c76c2c61&pii=S1571066115000705&tid=spdf-ffeaf553-478f-413d-9c28-02cb59f70cc4&sid=82ab8e3b120125455c79d3d9323e5344cae6gxrqa&type=client)) (2015)*

그래서 대수적 효과의 기능적 의도를 [Resumable Exception](https://www.youtube.com/watch?v=JQwc1OBOt5k&t=76s)이라고 표현하기도 합니다.
원래 Exception이 발생하고 catch문이 실행되면 try-catch문의 로직은 그걸로 끝나는데, 대수적 효과를 지원하면 특정 Effect가 실행되도 Effect가
발생된 실행문 이후의 로직이 끝나지 않고 계속 진행되게끔 할 수 있거든요. Dan Abramov의 글을 살펴보면서 더 자세히 설명하겠습니다.

대수적 효과는 현재 활발히 연구가 되고 있는 프로그래밍 언어의 문법적 기능이고, 아직 대부분의 언어가 대수적 효과 문법을
지원하지 않습니다. 연구용 언어로 활용되고 있는 [EFF](https://www.eff-lang.org/)에서는 대수적 효과를 지원하고 있습니다.
관심이 있으시다면 한 번 살펴보셔도 좋을 것 같습니다. 

### 대수적 효과에서 "대수적"이라는 것은 뭘까?

대수적 효과가 뭔지에 대해 찾아보면서 해외 논문, 아티클, 포스트, 개발 컨퍼런스 영상 등에서 여러가지 정보를 얻을 수 있습니다. 
하지만 제가 진짜 궁금했던 것은 **당최 왜 이름이 대수적 효과일까?**, **대수적 효과에서 "대수적"이라는건 뭘까?** 하는 것이었는데요.

결론부터 말하면 그러한 의문점을 알아볼 수 있는 논문과 문서들을 찾았지만, 대수학을 몰라서(...) 정확히 어떻게
대수적 효과를 수학적으로 설명할 수 있는지에 대해서는 이해할 수 없었습니다. 혹시 수학을 공부하셨거나 대수학을 잘
아시는 분들을 위해 대수적 효과를 수학적으로 설명한 내용에 대한 링크를 아래 남겨놓겠습니다. 

- [Andrej Bauer - Introduction to algebraic effects and handlers](https://github.com/OPLSS/introduction-to-algebraic-effects-and-handlers)
- [Žiga Lukšič, Matija Pretnar - Local Algebraic Effect Theories](https://arxiv.org/abs/2005.13654)

일단 제 멘탈 모델 아래에서는 **컴퓨터 효과(부수 효과)를 대수적으로 표현할 수 있어서** 대수적 효과라고 부른다고
두루뭉실하게 전제하고 넘어가겠습니다.

## 대수적 효과와 Suspense 연결짓기

대수적 효과가 무엇인지 살펴보았으니, Suspense와 대수적 효과를 연결짓기 위해 필요한 레퍼런스들을 살펴보고 대수적 효과와
Suspense가 어떤 관계를 가지는지 규명하겠습니다.

### Dan Abramov - Algebraic Effects for the Rest of Us

[Algebraic Effects for the Rest of Us](https://overreacted.io/algebraic-effects-for-the-rest-of-us/)

Dan Abramov는 대수적 효과에 대한 포스팅에서 대수적 효과를 지원하는 가상의 자바스크립트인 ES2025의 문법을 
이용해 예제를 작성합니다. 아래 예제에 나온 `perform`, `resume` 키워드와 `try-handle 블럭`이 바로 그 문법입니다.

{% highlight javascript %}
function getName(user) {
  let name = user.name;
  if (name === null) {
    // 2. 여기서 효과를 수행
    name = perform 'ask_name';
    // 5. 그리고 여기로 돌아옴, name값은 핸들 블락에서 넣은 Arya Stark
  }
  // 6. 마지막으로 값을 리턴함
  return name;
}

function makeFriends(user1, user2) {
  user1.friendNames.add(getName(user2));
  user2.friendNames.add(getName(user1));
}

const arya = { name: null };
const gendry = { name: 'Gendry' };
try {
  // 1. 함수 실행(try-handle 문에서 먼저 실행)
  makeFriends(arya, gendry);
} handle (effect) {
  // 3. 효과를 수행하면 Handle 구문으로
  if (effect === 'ask_name') {
    // 4. try, catch와는 다르게 값을 전달하면서 기존 try문 내부의 코드를 이어서 실행
    resume with 'Arya Stark';
  }
}
{% endhighlight %}

Dan은 **다시 돌아오는 try-catch문**이라는 말로 대수적 효과를 설명합니다. 위 예제의 대수적 효과 문법인 `try-handle` 블럭은 `try-catch`와 다르게
Exception을 던지고 블럭을 나가는 대신에 handle문에 명시된 특정 효과를 수행하고 로직을 계속 이어나가게 됩니다. `resume` 키워드는
효과가 수행된 곳으로 다시 돌아갈 수 있고, 핸들러를 통해 무언가 전달을 할 수도 있습니다.

Dan은 대수적 효과가 **"무엇(what - try문)과 어떻게(how - handle문)를 분리할 수 있게 해주는 강력한 도구가 될 수 있다"**고 말합니다. 코드 라인의
순서와는 상관 없이, 두 블럭 공간(try와 handle)의 순서를 왔다갔다하면서 효과를 발생시키고 필요한 로직을 실행시켜 목적을 달성하기 때문입니다. 

try 블럭 내부의 로직은 effect를 `perform`으로 던지기만 할 뿐 효과에 처리에 대해서는 알 필요가 없고 필요한 값만 얻으면 됩니다. 
또한 효과 핸들러를 중첩해서 사용할 수 있다는 점 때문에 대수적 효과를 이용하면 **what과 how를 우아하게 분리할 수 있는**, 표현력이
뛰어난 추상화를 만들어낼 수 있고 코드의 응집도도 향상시킬 수 있습니다.

위의 예제에서는 또한 try문 내부의 `makeFriends` 함수의 컨텍스트와 `try-handle` 블락의 컨텍스트가 `perform`과 `resume` 키워드를 매개로
서로 정보를 주고 받는 모습을 확인할 수 있습니다. 
원래 일반적인 함수 호출 구조의 scope를 생각해보면, 먼저 호출된 함수의 컨텍스트를
함수 내부에서 뒤이어 호출되는 함수가 이용하는 것이 가능한 꼴이지만 
Dan이 제시한 문법은 **뒤이어 호출된 함수의 컨텍스트가 먼저 호출된 함수에게 값을 전달할 수도 있습니다.**
마치 건물의 위층에서 아래층에 전화를 걸어 필요한 정보를 알려주는 것처럼 말이죠.

### 박서진 - 프론트엔드 웹 서비스에서 우아하게 비동기 처리하기

[SLASH 21-프론트엔드 웹 서비스에서 우아하게 비동기 처리하기](https://www.youtube.com/watch?v=FvRtoViujGg&t=20s)

앞에서도 언급했던 박서진 님의 세션에서는 Dan이 보여주는 대수적 효과의 구현을 웹 클라이언트 개발의 관점에 맞게 설명합니다.

<img src="/uploads/suspense-algebraic-effect/toss.png" width="700" height="400" />

이 세션에서는 **코드 조각을 감싸는 맥락으로 책임을 분리하는 방식을 대수적 효과라고 한다**고 언급하고 있습니다. 컴포넌트의
특정 역할을 분리해 특정 컴포넌트를 감싸는 부모 컴포넌트에게 위임할 수 있다는 것입니다. Suspense나 ErrorBoundary가 실제로 그렇게
에러, 로딩 UI 표시라는 역할을 특정 컴포넌트를 감싼 형태로 분리하고 있죠.

Dan의 설명과 박서진님의 설명의 공통점을 찾아본다면, 바로 **감싼 곳에 역할을 위임한다는** 개념을 통해 대수적 효과를 설명하고 있다는 것입니다.

Dan이 제시한 가상의 문법에서는 뒤이어 호출된 함수의 컨텍스트가 그 함수를 감싸고 있는, 먼저 호출된 함수 컨텍스트에게 값을 전달하는게 가능합니다.
또한 박서진님이 설명한 "역할을 분리해 부모 컴포넌트가 처리" 한다는 것 역시
먼저 호출된 부모 컴포넌트에게 뒤이어 호출된 자식 컴포넌트 값을 전달하는 형태를 바탕으로 역할을 분리하고 있습니다. 

전달하는 값은 Suspense의 경우 `Suspense for Data Fetching 컨셉 살펴보기`에서 설명했듯 Pending Promise, Error, 요청 성공 값 중 하나일 것입니다.

### 대수적 효과는 Suspense와는 무슨 관계인가?

혹시 이제 Suspense와 대수적 효과가 어떤 관계를 가지고 있는지 감이 조금 잡히시나요?
`Suspense for Data Fetching 컨셉 살펴보기`에서 살펴보았던 Sebastian Markbåge의 컨셉 코드 일부를 다시 한번 살펴보겠습니다.

{% highlight javascript %}
let cache = new Map();
let pending = new Map();

//! perform하는 로직, effect를 발생시킴, what
function fetchTextSync(url) {
  if (cache.has(url)) {
    return cache.get(url); // 캐시 맵객체
  }
  if (pending.has(url)) {
    throw pending.get(url); // Pending Promise throw
  }
  // 비동기 로직
  let promise = fetch(url)
    .then((response) => response.text()) // 처리되는 경우
    .then((text) => {
      pending.delete(url);
      cache.set(url, text);
    });
  pending.set(url, promise); // 팬딩 객체에 팬딩인거 표시
  throw promise;
}

//! resume하는 로직, effect를 받아 지정된 동작들을 함, how
async function runPureTask(task) {
  for (;;) { // while true
      try {
        return task(); 
      } catch (x) {
      if (x instanceof Promise) {
        await x;
      } else {
        throw x;
      }
    }
  }
}
{% endhighlight %}

Dan의 설명을 적용해본다면, `runPureTask` 함수의 인자로 들어갈 수 있는 `fetchTextSync`는 적절한 값을 throw하거나 return하는 방식으로
effect를 발생시키고 있습니다. `runPureTask` 함수는 바쁜 대기를 하면서 **감싸고 있는 내포된 함수에서 발생한 effect**에 대응하는
적절한 로직을 실행시키면서 Effect Handler의 역할을 하고 있는 것을 볼 수 있습니다. 내포된 함수의 역할을 분리해서 맡고 있기도 합니다.

문법의 한계 때문에 대수적 효과가 명확하게 구현되었다고 할수는 없지만, 위의 예시는
어느 정도는 대수적 효과의 컨셉 아래에서 동작하고 있는 로직이라고 말할 수 있습니다.

갈무리하자면, Suspense와 대수적 효과의 관계에 대해 다음과 같은 결론을 낼 수 있습니다. 3단 논법이네요!

1. 대수적 효과는 감싸고 있는 함수의 로직이 감싸진(내포하는) 함수의 역할을 분리할 때 실현된다.
2. React의 Suspense는 자식 컴포넌트를 감싸는 부모 컴포넌트에게 로딩 UI 표시라는 역할을 분리하고 있다. 
3. React의 Suspense의 창안 원리는 대수적 효과이다.

# 맺는말

구글링을 해보면 Suspense에 적용되는 대수적 효과가 어떤 형태를 띄는지는 알 수 있습니다. 하지만 그러한 결론에 다다르기까지의
논리에 있어 빠진 부분이 많았다고 생각했습니다. "대수적 효과를 왜 대수적 효과라고 하지?" 같은 아주 원론적인 질문부터 시작해서요.

그래서 이렇게 자료들을 긁어모아 "Suspense에 적용되는 대수적 효과는 이러이러해서 이런 것이다!" 는 규명을 하고, 설명할 수 있는 논리를 만들기 위해 쓴 글이었습니다.
블로그를 하면서 글 하나를 쓰기 위해 이렇게 많은 자료들을 살펴본 것은 처음인 것 같네요.

많은 미싱 링크가 해결되서 저로서는 굉장히 속이 후련한 글인 것 같습니다. 부족한 부분이 많지만, 대수적 효과를 좀 더 깊게 이해하고 싶은
한국어가 편한 개발자들에게 도움이 되었으면 하는 바람입니다. 이만 마치겠습니다. 길고 긴 글 읽어주셔서 감사합니다!