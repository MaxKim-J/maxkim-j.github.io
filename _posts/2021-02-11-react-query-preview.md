---
layout: post
title: React-Query 살펴보기 
description: React의 Server State 관리 라이브러리 React Query를 살펴봅니다.
image: /uploads/react-query-preview/main.png
emoji: 🎒
tags:
  - react
  - javascript
published: true
---

React-Query는 React앱에서 비동기 로직을 쉽게 다루게 해주는 라이브러리입니다.
그동안 제가 React로 개발할 때 가장 많이 써왔던, Redux와 Saga를 이용해 비동기 관련 로직들을 관리하는 
것과 꽤나 다른 관점에서 비동기 로직들을 바라보고, 유용한 기능을 많이 제공하고 있어 매우 흥미로웠습니다. <!–-break-–>
다만 아직 한국어 자료는 많이 없는 것 같아서, 이 포스팅이 React-Query를 한번 살펴보고 싶으신 분들께 
도움이 되었으면 합니다.


<img src="https://github.com/tannerlinsley/react-query/raw/master/media/repo-dark.png">

> 포스팅의 내용은 모두 [React Query Docs](https://react-query.tanstack.com/)의 내용과 제 사견으로 이루어져 있습니다.  
> 굉장히 러프하게 정리한 내용을 블로그 글로 바로 옮겨서, 기존 블로그 포스팅과 말투도 좀 다르고 이해하기에 부족하거나 빠진 내용이 있을 수 있습니다. 지적 부탁드립니다!

## 요약 + 느낌

- **비동기 요청의 데이터 무결함에 대한 책임을 개발자가 아니라 React 앱 자체가 책임지게 하는 라이브러리**
- **비동기 요청의 무결함** : 비동기 요청 데이터가 view에서 필요할때, 그 전에 비동기 요청이 동작하여 
  데이터를 참조할 수 있거나, 예외처리가 보장되는 상황을 만듬
- **과정이 아닌 결과의 무결함** : 대부분의 경우 요청, 요청 완결 직후 데이터 참조 혹은 예외처리가 이루어졌던
  비동기 요청의 관행?에서 벗어나 라이브러리가 알아서 캐싱, 리패칭을 해내면서 
  **요청 시점이 데이터 참조 시점 직전이 아니더라도 view에서 데이터가 필요할때 최신 데이터를 참조할 수 있음을 보장함**
- **Context API** : context를 사용해 비동기, server state를 관리하는 전역 계층을 제공해 비동기 요청을 관리.
- **작은 보일러플레이트** : saga에서처럼 비동기 관련한 성공, 실패 액션 하나하나를 모두 선언하여
  장황하게 정리할 필요가 없음. `useQuery`를 통해 만들어진 query는 고유한 key로 구분되어
  여러개의 쿼리를 컴포넌트 곳곳에다가 흩뿌려놓아도 key만 같으면 동일한 쿼리와 데이터에 접근할 수 있음.

## React-Query가 주장하는 Global State 개념

- Global State라는 말을 쓰지 말자 : 전역 state는 Client와 Server로 분류할 수 있고, 이 두 state는 다른 방식으로 다뤄져야 효율적인 앱을 만들 수 있다.
- Server-State : 서버에서 가져오는 데이터들도 하나의 상태
- Server-State과 Client-State의 구분
    - Client State : 세션간 지속적이지 않는 데이터, 동기적, 클라이언트가 소유, 항상 최신 데이터로 업데이트(렌더링에 반영)
        - ex) 리액트 컴포넌트의 state, 동기적으로 저장되는 redux store의 데이터
    - Server State : 세션간 지속되는 데이터, 비동기적, 세션을 진행하는 클라이언트만 소유하는게 아니고 공유되는 데이터도 존재하며 여러 클라이언트에 의해 수정될 수 있음, 클라이언트에서는 서버 데이터의 스냅샷만을 사용하기 때문에 클라이언트에서 보이는 서버 데이터는 항상 최신임을 보장할 수 없음.
        - ex) 리액트 앱에서는 비동기 요청으로 받아올 수 있는, 백엔드 DB에 저장되어있는 데이터

## 만들어진 동기

- React 자체가 데이터를 패칭해오거나 업데이트 하는 옵션을 제공하지 않기 때문에 원래 React 개발자들은 각자의 방식으로 http 통신 로직을 짜야 했다.
- Redux 같은 전역 상태관리 라이브러리들이 클라이언트 상태값에 대해서는 잘 작동하지만, 서버 상태에 대해서는 그렇게 잘 작동하지 않는다. Server State는 Client State와 완전 다르기 때문이다
    - 서버 데이터는 항상 최신 상태임을 보장하지 않는다. 명시적으로 fetching을 수행해야만 최신 데이터로 전환된다.
    - 네트워크 통신은 최소한으로 줄이는게 좋은데, 복수의 컴포넌트에서 최신 데이터를 받아오기 위해 fetching을 여러번 수행하는 낭비가 발생할 수 있다. 
    
## 초기세팅

- 설치

{% highlight bash %}
yarn add react-query
{% endhighlight %}

- App.js에 Context Provider로 이하 컴포넌트를 감싸고 queryClient를 내려보내줌 ⇒ 이 context는 앱에서 비동기 요청을 알아서 처리하는 background 계층이 됨

{% highlight javascript %}
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'
 
const queryClient = new QueryClient()

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      {*/ ...Components */}
    </QueryClientProvider>
  )
}
{% endhighlight %}

## 컨셉

### 1. 중요한 기본 사항

- Query들은 4개의 상태를 가지며, useQuery가 반환하는 객체의 프로퍼티로 어떤 상태인지 확인이 가능하다.
    1. fresh : 새롭게 추가된 쿼리 인스턴스 → active 상태의 시작
    2. fetching : 요청을 수행하는 중인 쿼리
    3. stale : 인스턴스가 존재하지만 이미 패칭이 완료된 쿼리. 특정 쿼리가 stale된 상태에서 같은 쿼리를 useQuery로 또 호출해 마운트를 시도한다면 캐싱된 데이터가 반환.
    4. inactive : active 인스턴스가 하나도 없는 쿼리. 5분 간격으로 아예 gc된다.
- *어떻게 inactive가 되는가? : [pagenation](https://codesandbox.io/s/github/tannerlinsley/react-query/tree/master/examples/pagination?file=/pages/index.js) 관련한 예제를 보니, 페이지네이션을 할 때마다 컴포넌트가 재랜더링 되면서 새로운 쿼리가 만들어지고, 저번 랜더링에서 호출했던 쿼리들은 inactive된다. 렌더링간에 다시 호출되지 않은 쿼리들은 inactive가 되는 듯 보인다.
    1. 런타임간 새로운 쿼리 인스턴스가 만들어졌을 때(해당 쿼리가 이미 stale일 경우 캐싱)
    2. window가 다시 포커스가 되었을때
    3. 네트워크가 다시 연결되었을 때
    4. refetch interval이 있을때 : 요청 실패한 쿼리는 디폴트로 3번 더 백그라운드단에서 요청하며, retry, retryDelay 옵션으로 간격과 횟수를 커스텀 가능하다.

### 2. Queries

{% highlight javascript %}
const { status, data, error, isFetching, isPreviousData } = useQuery(
  ['projects', page],
  () => fetchProjects(page),
  { keepPreviousData: true, staleTime: 5000 }
)

// 예외처리 -> reject쓰지말고 무조건 throw Error
const { error } = useQuery(['todos', todoId], async () => {
  if (somethingGoesWrong) {
    throw new Error('Oh no!')
  }

  return data
 })
{% endhighlight %}

- 쿼리는 server state를 요청하는 프로미스를 리턴하는 함수와 함께 unique key로 맵핑된다.
- 쿼리는 콜백 함수의 요청이 프로미스를 리턴한다면 일단 잘 작동한다. 하지만 서버의 데이터를 바꿀 수 있는 요청이라면 mutation 쓰는게 더 추천된다.(이유는 아래 mutation 부분에서 다시 설명)
- useQuery훅의 인자로 2개가 들어감 - 쿼리의 unique한 key, 프로미스를 리턴하는 함수(이 함수는 반드시 resolve Promise를 리턴하거나 에러를 throw해야 한다.)
- unique key : 한번 fresh가 되었다면 런타임간 계속 살아있고 추적이 가능하다. 리패칭, 캐싱, 공유 등을 할때 참조되는 값. 주로 배열을 사용하고, 배열의 요소로 쿼리의 이름을 나타내는 문자열과 프로미스를 리턴하는 함수의 인자로 쓰이는 값을 넣는다.
- useQuery 반환값 : 객체, 요청의 상태를 나타내는 몇가지 프로퍼티, 요청의 결과나 에러값을 갖는 프로퍼티도 포함함
    - **isLoading**, isError, isSuccess, isIdle, **status**
    - error, data, isFetching ⇒ 런타임간 무조건 요청이 한번 이상 날라갔다면 존재하는 값
- 쿼리 요청 함수의 상태를 표현하는 status값은 4가지다. status 프로퍼티에서는 문자열로, 상태 이름 앞에 is를 붙인 프로퍼티에서는 불리언으로 해당 상태인지 아닌지를 평가 가능하다.
    - idle : 쿼리 data가 하나도 없고 비었을 때. `{enabled : false}` 상태로 쿼리가 호출되었을 때 이 상태로 시작된다.
    - loading : 말그대로 로딩중일 때
    - error : 말그대로 에러 발생했을 때
    - success : 말그대로 요청 성공했을 때
- 주요 쿼리 옵션
    - enabled : 이걸 True로 설정하면 자동으로 쿼리의 요청 함수가 호출되는 일이 없다
    - keepPreviousData : success와 loading 사이 널뛰기 방지
    - placeholderData : mock 데이터 설정도 가능. 얘는 근데 캐싱이 안됨
    - initialData : 초기값 설정

### 3. Query Keys

{% highlight javascript %}
useQuery(['todo', 5, { preview: true }], ...)
// queryKey === ['todo', 5, { preview: true }]
{% endhighlight %}

- 문자열 : 구별되는 문자열로 키를 줄 수 있음. 얘는 바로 인자가 하나인 배열로 convert됨
- 배열 : 문자열과 함께 숫자를 주면 같은 문자열로 같은 key를 쓰면서도 id로도 구별이 가능함
- 콜백함수에 주는 인자 : 배열의 마지막 요소이며, 역시 쿼리를 구별하는데 쓰임 ⇒ 엔드포인트가 같더라도 요청에 넣는 body나 쿼리파람이 다르면 다른 쿼리 인스턴스로 취급된다.
- 배열 요소의 순서도 중요. 내용은 모두 같아도 순서가 다르면 다르게 해싱된다고 함
- 요청 함수가 특정 변수에 의존할때, 쿼리 키 배열에 객체로 같이 넣어주면 요청 함수 내에서 인자로 객체를 받아서 함수 안에서 뭔가 할 수 있다.

{% highlight javascript %}
function Todos({ todoId }) {
   const result = useQuery(['todos', todoId], () => fetchTodoById(todoId))
 }

function Todos({ status, page }) {
   const result = useQuery(['todos', { status, page }], fetchTodoList)
}
 
// 쿼리 요청 함수에서 queryKey에 접근할 수 있다
function fetchTodoList({ queryKey }) {
 const [_key, { status, page }] = queryKey
 return new Promise()
}
{% endhighlight %}

### 4. Parallel

- 몇 가지 상황을 제외하면 쿼리 여러개가 선언되어 있는 일반적인 상황이라면 쿼리 함수들은 그냥 병렬로 요청되서 처리된다. ⇒ 쿼리 처리의 동시성을 극대화시킨다.

{% highlight javascript %}
function App () {
   // 이렇게 주루륵 있을 때 걍 다 병렬로 처리된다 => 어캐햇누....
   const usersQuery = useQuery('users', fetchUsers)
   const teamsQuery = useQuery('teams', fetchTeams)
   const projectsQuery = useQuery('projects', fetchProjects)
   ...
 }
{% endhighlight %}

- 쿼리 여러개를 동시에 수행해야 하는데, 렌더링이 거듭되는 사이사이에 계속 쿼리가 수행되어야 한다면 쿼리를 수행하는게 hook룰에 위배될 수도 있다. 그럴때 쓰면 좋은게 useQueries

{% highlight javascript %}
function App({ users }) {
   const userQueries = useQueries(
     users.map(user => {
       return {
         queryKey: ['user', user.id],
         queryFn: () => fetchUserById(user.id),
       }
     })
   )
 }
{% endhighlight %}

### 5. Query Retries

{% highlight javascript %}
import { useQuery } from 'react-query'
 
 // 재호출 횟수를 옵션으로 커스텀해줄 수 있다.
 const result = useQuery(['todos', 1], fetchTodoListPage, {
   retry: 10, // 에러를 display할 때까지 10번을 더 호출한다.
 })
{% endhighlight %}

- useQuery의 요청이 fail이 나는 경우, 최대 연속 요청 한계(the max number of consecutive retries)까지 요청을 계속 다시 한다. (디폴트는 3)
- retry 옵션으로 쿼리의 재요청 횟수를 정한다.
- retryDelay 옵션을 설정하면 요청이 한번 실패했을 때, 설정한 일정 시간이 지난 후 또 요청을 한다.

### 6. Mutations

{% highlight javascript %}
function App() {
   const mutation = useMutation(newTodo => axios.post('/todos', newTodo))
 
   return (
     <div>
       {mutation.isLoading ? (
         'Adding todo...'
       ) : (
         <>
           {mutation.isError ? (
             <div>An error occurred: {mutation.error.message}</div>
           ) : null}
 
           {mutation.isSuccess ? <div>Todo added!</div> : null}
 
           <button
             onClick={() => {
               mutation.mutate({ id: new Date(), title: 'Do Laundry' })
             }}
           >
             Create Todo
           </button>
         </>
       )}
     </div>
   )
 }
{% endhighlight %}

- useQuery와는 다르게 create, update, delete 하며 server state에 사이드 이펙트를 일으키는 경우에 사용한다.
- useMutation으로 mutation 객체를 정의하고, mutate 메서드를 사용하면 요청 함수를 호출해 요청이 보내진다. 이게 query랑 muataion이 나눠져있는 이유인 것 같다. ⇒ 이벤트 핸들러 함수, 혹은 조건부로 useQuery를 호출하면 최상위에서 호출해야한다는 훅의 규칙에 위배되기 때문에 성가시다.
- useMutation이 반환하는 객체 프로퍼티로 제공되는 상태값은 useQuery와 동일하다.
- mutation.reset : 현재의 error와 data를 모두 지울 수 있음
- 두번째 인자로 콜백 객체를 넘겨줘서 라이프사이클 인터셉트 로직을 짤 수도 있다.

{% highlight javascript %}
useMutation(addTodo, {
   onMutate: variables => {
     // 뮤테이션 시작
     // onMutate가 리턴하는 객체는 이하 생명주기에서 context 파라미터로 참조가 가능하다.
     return { id: 1 }
   },
   onError: (error, variables, context) => {
     // 에러가 났음
     console.log(`rolling back optimistic update with id ${context.id}`)
   },
   onSuccess: (data, variables, context) => {
     // 성공
   },
   onSettled: (data, error, variables, context) => {
     // 성공이든 에러든 어쨌든 끝났을 때
   },
 })
{% endhighlight %}

- useQuery를 사용할때처럼 실패시 retry가 디폴트는 아니지만, retry 옵션을 줄 수는 있다.

### 7. invalidation

- 썩은(stale)쿼리의 폐기(invalidation)
- 쿼리의 데이터가 요청을 통해 서버에서 바뀌었다면, 백그라운드에 남아있는 데이터는 과거의 것이 되어 앱에서 쓸모없어지는 상황이 발생할 수 있다.
- invalidateQueries 메소드를 사용하면 개발자가 명시적으로 query가 stale되는 지점을 찝어줄 수 있다. 해당 메소드가 호출되면 쿼리가 바로 stale되고, 리패치가 진행된다.
- 쿼리에 특정 키가 공통적으로 들어가있다면 싸잡아서 Invalidation이 가능하다.

{% highlight javascript %}
// 캐시가 있는 모든 쿼리들을 invalidate한다.
queryClient.invalidateQueries()

// 'todos'로 시작하는 모든 쿼리들을 invalidate한다.
queryClient.invalidateQueries('todos')

queryClient.invalidateQueries({
   predicate: query =>
     query.queryKey[0] === 'todos' && query.queryKey[1]?.version >= 10,
 })
{% endhighlight %}

- 당연한 이야기지만, 뮤테이션이 성공한다면 높은 확률로 해당 데이터를 다시 패칭해와야 한다 ⇒ mutation이 일어날때 관련 query도 invalidate이 되어야 함
- 아래처럼 mutation 생명주기 콜백 안에서 invalidate 해주면 자연스럽다

{% highlight javascript %}
import { useMutation, useQueryClient } from 'react-query'
 
 const queryClient = useQueryClient()
 
 // 뮤테이션이 성공한다면, 쿼리의 데이터를 invalidate해 관련된 쿼리가 리패치되도록 만든다.
 const mutation = useMutation(addTodo, {
   onSuccess: () => {
     queryClient.invalidateQueries('todos')
     queryClient.invalidateQueries('reminders')
   },
 })
{% endhighlight %}

- 또한 mutation으로 요청 후 서버에서 받는 response값이 갱신된 새로운 데이터일 경우도 있다. 이럴때는 mutation을 성공했을 때 쿼리 데이터를 명시적으로 바꿔주는 queryClient 인스턴스의 setQueryData 메소드를 사용하면 좋다.

{% highlight javascript %}

const queryClient = useQueryClient()
 
 const mutation = useMutation(editTodo, {
   onSuccess: data => queryClient.setQueryData(['todo', { id: 5 }], data),
 })
 
 mutation.mutate({
   id: 5,
   name: 'Do the laundry',
 })
 
// 뮤테이션의 response 값으로 업데이트된 data를 사용할 수 있다.
 const { status, data, error } = useQuery(['todo', { id: 5 }], fetchTodoByID)
{% endhighlight %}

### 8. Caching Process

1. useQuery의 첫번째, 새로운 인스턴스 마운트 ⇒ 만약에 런타임간 최초로 fresh한 해당 쿼리가 호출되었다면, 패칭을 하면서 역시 유니크한 키로 구별되는 캐시 변수도 바꿈. 패칭이 끝나면 해당 쿼리를 stale로 바꿈
2. 앱 어딘가에서 useQuery 두번째 인스턴스 마운트 ⇒ 이미 쿼리가 stale일 경우 패치를 하지 않고 접때 요청때 만들어 놨었던 캐시를 반환함
3. 일정 시간이 지나서 refetch가 일어났을 때 ⇒ 리패치, 캐시 업데이트
4. 쿼리가 언마운트되거나 더이상 사용하지 않을때 ⇒ 이건 시간으로 판단하는데, 마지막 인스턴스가 언마운트되어 inactive 상태가 되었을때 5분이 지나면 자동으로 삭제한다. 

## 장단점

### 장점

- 비동기 관련한 타이핑이 정말 많이 줄어든다
- Redux같은 전역 상태 저장소의 store에 동기적으로 업데이트되는 데이터와 액션만 남길 수 있어 크기를 줄이고, Saga는 아예 대체해버린다.
- 캐싱과 리패칭을 개발자가 구현하지 않아도 알아서 지원한다.
- 풍부한 옵션을 제공해 굉장히 많은 부분에서 custom이 가능하다.

### 단점

- 기본적으로는 Redux+Saga처럼 중앙 집중적인 방식으로 비동기 데이터를 관리하는 것을 강제하지 않으므로, **컨벤션을 정하지 않고 막 사용하면 비동기 요청이 개별 컴포넌트에 더 강하게 의존해버린다.** 앱 전체 전역에서 다양한 비동기 요청이 발생해야 하는 경우, 개별 컴포넌트에 숨겨져 있을 수 있는 비동기 요청을 잘 못찾는 경우도 생길 수 있을 것 같다. 비동기 요청은 최상위에서만 한다던지, Redux 컨테이너가 아니라 Query 컨테이너를 만든다던지, 커스텀 훅으로 여러 비동기 요청을 엔드포인트별로 묶어서 관리한다던지 등등 같이, 팀에서 어떻게 사용해야 할지에 대한 이야기를 꼭 해야함.
- 쿼리 인스턴스 생성을 바탕으로 패칭 시점을 알아서 조율하는 라이브러리이기 때문에, **원하는 시점에 원하는 데이터를 받아올 수 없는 예외적인 상황이 발생할 수 있을 가능성이 있다.** 물론 invalidation 같은걸로 최대한 그런 상황을 방지하긴 하지만... 이건 실제로 사용해보고 정말 문제가 없을지 체험해봐야 할듯.
- 디폴트로 제공하는 캐싱과 리패치는 유용한 기능이지만, **비동기 요청이 그닥 많지 않은 작고 간단한 앱에서는 오히려 성능이 최적화되는 효용보다 드는 비용이 더 많은 발적화가 될 수 있다.** 근데 사실.. 내 스스로 비동기 요청을 고도로 최적화하기 위한 코드들을 많이 작성해본 적이 없어서 그런건지도...

## Redux Saga 대신 React Query를 사용했을 때 예상 차이

**타이핑이 줄어든다** : 유구하게 많은 액션, 액션 크리에이터, Reducer 함수 다 쓸필요 없으니..

**그럼에도 디버깅이 용이하다** : Saga에서 그 엄청 많은 액션들을 다 작성하더라도 가성비가 극악까지는 아니었던 이유 중 하나는 디버깅이 쉬워진다는 장점 때문이었다. Redux Devtool 쓰면 비동기 요청의 실행, 성공, 실패까지 액션으로 다 찍히고 store의 diff도 눈으로 확인하기 너무 쉽다. 하지만 React Query도 자체 데브툴을 제공하고(크롬 익스텐션 식으로 나온건 아니고 컴포넌트에 직접 넣어주긴 해야한다) 쿼리의 호출 상태를 바로 브라우저에서 확인이 가능하니, 디버깅을 유용하게 하고자 그 많은 액션을 작성할 필요가 없어졌다.

<img src="/uploads/react-query-preview/dev-tool.png" width="400" >


**Redux 자체를 좀 더 취지에 맞게 사용하게 해준다** : 약간은 Saga가 꼼수라고 생각한다. Redux는 Flux 아키텍처에 맞춰 부수효과 없는 순수한 store을 유지하는게 맞다. 하지만 Saga는 이를 우회해 미들웨어를 사용해 불순한 비동기 요청 함수를 순수한 액션 단위로 잘라서 store을 업데이트 시키는데, 확실히 Flux 아키텍처를 표방하는 Redux가 추구해야 하는 자연스러운 동작은 아니다.

React-Query는 비동기적으로 업데이트되는 Redux Store의 데이터들을 context로 끄집어내서 따로 관리하게 만들어준다. 그래서 Redux를 비동기 상태가 없는 순수한 상태로 사용할 수 있게 해주며 store의 크기를 극적으로 줄인다.

Docs에서는 이렇게 Redux에서 비동기 상태값과 관련된 로직들을 다 드러냈을 때, 동기적으로 업데이트되는 아주 적은 common client state값만 남을 것이라고 이야기한다. 만약에 그 state값들이 굳이 Redux를 유지해야 하지 않을 정도로 적다면, 앱에서 Redux를 떼버리는 것을 고려할 수 있다고도 주장하는데 맞는 이야기 같다.

> React-Query Docs는 매우 친절한 편입니다. 용례를 더 많이 보고 싶으시다면 Docs의 [Example](https://react-query.tanstack.com/examples/simple) 부분을 참조하시면 좋을 것 같습니다.