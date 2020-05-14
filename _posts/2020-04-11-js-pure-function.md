---
num: 3
layout: post
title: 부수효과 없는 "순수함수" 맛보기
emoji: 📥
tags:
  - javascript
  - react
published: true
---
리액트를 배우면서 상태값(`state`)은 **불변**해야 한다고 배웠고, 리덕스를 배우면서 **순수함수**라는 말을 처음 접했던 것 같네요. 이 개념이 무엇인지 숙지하고 앱을 만드는 것과 그렇지 않은 것은 차이가 있습니다. 
<!–-break-–> 
<img src="../uploads/functions.png"/>
부수효과와 함수의 순수성을 고려한다면 어떤 상황에서든 동일한 작업을 수행하고, 다른 함수의 작업을 방해하지 않는 함수를 작성할 수 있기 때문이죠. 협업 상황에서 다른 사람이 만든 함수 때문에 내가 만든 함수에 지장이 생기거나 하면 곤란한 상황이 벌어지겠죠? 더 좋은 자바스크립트 코드를 작성하기 위해, **순수함수**를 이해하는 것은 필수입니다. 
{: .lead}

## 부수효과와 순수함수
그렇다면 일단 **부수 효과(side effects)**가 뭘까요? 부수효과란 **함수가 만들어진 목적과는 다른 효과 또는 부작용**입니다. 더 쉽게 말하면 함수에 **예상할 수 없는 일이 생길 가능성**이 존재한다면 이 함수는 부수 효과를 가질 수 있는 함수가 됩니다. 

부수효과가 없는 함수는 **순수함수(pure function)**, 부수효과가 있는 함수는 불순함수(impure function)가 됩니다. 

{% highlight javascript %}

// http 요청을 보내는 함수 : 순수함수 될 수 없음
const getData = () => {
  axios.get('http://data.url')
  .then(...)
  .catch(...)
}

// 입력 내포한 함수 : 순수함수 될 수 없음
const typeInput = () => {
  const input = prompt("Message");
  return input;
}

// 파라미터를 직접 변경하는 함수 : 순수함수 될 수 없음
const changeParams = (arr, elem) => {
  arr.push(elem);
  return arr;
}

{% endhighlight %}

함수의 안팎에서 **뭔가 예기치 않은 일이 생길 가능성이 있는 함수**는 순수함수가 될 수 없습니다. 비동기 요청을 보내는 함수는 요청이 실패할 가능성이 있습니다. 입력을 포함하는 함수도 입력에 따라 출력이 달라질 가능성이 있기 때문에 순수함수가 될 수 없죠. 

매개변수로 들어온 값을 직접 변경하는 함수 역시 순수함수가 될 수 없습니다. 배열과 같은 참조 자료형 객체를 어떤 함수 안에서 직접 변경한다면, 나중에 이 객체를 인자로 받는 다른 함수의 작업에 영향을 미칠 수 있기 때문입니다. 뒤에서 좀 더 자세히 설명하겠습니다. 

불순 함수라는 말이 부정적인 뉘앙스를 내포하는 것도 같지만, 막 나쁜건 아닙니다. 비동기 http 요청처럼 부수효과가 필요한 경우도 있습니다. 

## 매개변수를 직접 변경하지 않는 순수함수
함수의 매개변수로 들어온 값을 직접 변경하는 것을 피하기만 해도, 순수함수를 만들 수 있습니다. 매개변수에 대한 직접 조작을 피하는 이유는 **이 매개변수가 또 어디에 쓰일지** 모르기 때문입니다.

어떤 함수가 매개변수 값을 직접 변경한다면, 바뀐 값은 쭉 유지되고  다른 함수의 동작에 영향을 미칠 수 있습니다. 아래 코드를 보시죠.

{% highlight javascript %}
const num_arr = [1,2,3,4,5];

// 매개변수의 값을 직접 변경하는 불순함수
const addSixImpure = (arr) => {
  // 매개변수에 직접 6 추가
  arr.push(6);
  return arr;
}

// 매개변수를 복사한 값을 변경하는 순수함수
const addSixPure = (arr) => {
  // 펼침 연산자로 새로운 배열에 6 추가
  newArr = [...arr, 6]
  return newArr;
}

// 매개변수 arr에 6이 있는지 확인하는 함수
const hasSix = (arr) => {
  if (arr.includes(6)) {
    return true;
  } else {
    return false;
  }
}

const new_arr = addSixImpure(num_arr)
console.log(hasSix(num_arr));     // true
{% endhighlight %}

`addSixPure()`과 `addSixInpure()`는 언뜻 보면 별 차이가 없어 보이지만, `addSixInpure()`는 매개변수의 값을 직접 변경하는 불순함수이고, `addSixPure()`는 매개변수 값을 복사해서 변경하는 순수함수입니다. 

`addSixInpure()`는 `num_arr`을 직접 바꿨기 때문에 함수가 실행되면 `num_arr`의 값이 `[1,2,3,4,5,6]`으로 영구히 바뀝니다. 그래서 `hasSix()`함수의 결과로는 true를 반환하게 되죠. 

하지만 개발자의 의도가 변수 `new_arr`에 `addSix` 함수를 호출한 새로운 배열을 할당하고 난 후, 값이 `[1,2,3,4,5]`인 `num_arr`에 대해서 6이 있는지 판단하고 싶었던 거였다면 코드는 의도대로 실행되지 않았습니다. 의도대로라면 `false`가 나와야 하는데, **`num_arr`이 이미 변경되었기 때문입니다.** 따라서 이런 경우에는 `addSix`함수가 `num_arr`을 직접 변경해서는 안됩니다. 대신에 이런 코드가 필요하죠
{% highlight javascript%}
const new_arr = addSixPure(num_arr)
console.log(hasSix(num_arr));     // false
{% endhighlight %}

`addSixPure()`는 `num_arr`을 직접 조작하지 않기 때문에 `num_arr`에 처음 할당되었던 값은 바뀌지 않습니다. 따라서 `hasSix(num_arr)`의 결과는 `false`입니다.

이 예시는 **순수함수가 많아질수록 코드를 더 쉽게 예측할 수 있음**을 알 수 있게 해줍니다. `addSixInpure()`가 6을 `num_arr`에 추가해버린 **부수효과** 때문에 `hasSix()`의 결과가 부정확해졌습니다. 선언된 변수들을 직접 조작하지 않을수록 함수들은 부수효과 없이 개발자의 의도대로 움직일 가능성이 큽니다.

## 마무리
순수함수는 유용하고 실제로도 많이 쓰입니다. `React state`는 직접 조작을 피하는 방식으로 부수효과를 방지합니다. `Redux`의 `reducer`는 순수함수여야만 하는데, `store`값을 변경하는 함수가 부수효과를 동반하지 않아야 `store` 내부의 값들이 안전하게 보호될 수 있기 때문입니다.

게다가 순수함수는 같은 입력에 대해 항상 같은 출력을 보장하니, 테스트 하기도 쉬워지죠. 함수형 프로그래밍에도 핵심적인 개념으로 쓰인다고 하는데... 포스팅을 해보며 느낀건데 정말 아직 너무 맛보기만 해본 것 같네요. 활용을 해보면서 순수함수가 실질적으로 어떤 이점을 가져오는지 포스팅 해볼 수 있으면 좋겠습니다. 

## reference
- [리액트 공식 문서 - hooks](https://ko.reactjs.org/docs/hooks-overview.html)
- [자바스크립트 코딩의 기술](https://github.com/gilbutITbook/007030)

