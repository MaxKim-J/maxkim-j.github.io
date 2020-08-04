---
layout: post
title: undefined로 부터 소중한 변수를 지키는 방법
description: JS 변수에 예기치 않은 undefined 할당을 방지하는 문법들
image: /uploads/default.png
emoji: 🚧
tags:
  - javascript
published: true
---

자바스크립트는 특이하게도 값이 할당되지 않은 변수에 undefined를 할당합니다. 그래서 자바스크립트 객체에 포함되지 않는 키를 통해 객체 프로퍼티에 접근하면 undefined를 뿜습니다. 뭔가가 할당되어 있긴 하기 때문에 이 변수에 접근했다는 것 자체로 에러를 내지 않고 **돌아는 갑**니다. <!–-break-–> 막상 그 프로퍼티나 변수를 가지고 무언가를 할 때 undefined로는 할 수 없어 에러가 납니다. 콘솔에 뜬 `뭐뭐는 undefined의 프로퍼티가 아니다`라는 식의 에러를 보면 진작에 좀 알려주지 얄밉다는 생각이 듭니다,,

## JS 빌런 undefined

{% highlight javascript %}
const zooObj = {
	cat: {age:4, color:'orange'},
	dog: {age:7, color:'black'},
}

console.log(animalsObj.elephant)  //undefined - 에러가 나지 않는다 

// 막상 그거 가지고 뭐 하려고 하면 에러를 뿜는다
// TypeError: Cannot read property 'age' of undefined
console.log(animalsObj.elephant.age) 

function getElephantAge() {
	return zooObj.elephant.age
}
{% endhighlight %}

큰 앱에서는 이런 현상이 반복되다 보면 어떤 부수효과로 인해 객체의 프로퍼티가 없어 undefined가 할당되었는지 추적해야 되는 경우가 생기고 꽤 머리가 아픕니다. 값이 할당되지 않았다면 undefined가 아니라 다른 임의의 값이라던가, 다른 거짓값이라도 지정해 줄 수 있다면 예기치 않는 undefined 할당으로 코드의 흐름이 뚝 끊기는 일을 방지할 수 있을 것입니다. 이번 포스팅에서는 변수에 실수로 undefined가 할당되는 것을 방지할 수 있는 자바스크립트 문법을 간단하게 정리해 보려고요.

> 물론 타입스크립트가 제공하는 정적 타이핑을 사용해도 해결할 수 있는 문제입니다. 그렇지만 이 포스팅에서는 제안 단계의 혹은 정식 릴리즈된 **자바스크립트 문법으로만** 예기치 못한 undefined 할당을 방지하는 방법에 대해 서술합니다!

## [1. default parameter](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Functions/Default_parameters)

{% highlight javascript %}
const defaultZooObj = {
    cat:{age:4, color:"red"},
    dog:{age:5, color:"black"},
    elephant:{age:34, color:"green"},
}

function getElephantAge(zooObj = defaultZooObj) {
    return zooObj.elephant.age
}

const elphantAge = getElephantAge(undefined) //34
{% endhighlight %}

함수의 파라미터가 undefined일 경우를 방지하는 방법으로 함수의 기본 매개변수를 사용할 수 있습니다. ES6에 추가된 문법이구요. 함수에서 파라미터가 따로 할당되지 않았을 때뿐만 아니라 undefined가 파라미터에 할당되었을 때도 기본 값으로 설정한 값이 할당됩니다. 

실제 앱을 만들 때는 예시로 든 코드블럭처럼 커다란 default 값을 따로 할당해주는 일은 드물 것 같습니다. 타이핑 측면에서 너무 손해인 것 같아요. 중첩된 객체같은 복잡한 파라미터 보다는 원시 타입의 파라미터에 undefined 할당을 방지하는 용도로 사용하는게 더 적합할 것 같습니다.

{% highlight javascript %}
function addAge(elephantAge=34, myAge=25){
	return elephantAge + myAge
}

addAge(undefined, 20) // 54
addAge(45, undefined) // 70
{% endhighlight %}

## [2. double negation](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/%EB%85%BC%EB%A6%AC_%EC%97%B0%EC%82%B0%EC%9E%90(Logical_Operators))

{% highlight javascript %}
const elephantAge = !!zooObj.elephant.age // undefined가 아닌 false
{% endhighlight %}

`!!`는 자바스크립트에서 전부터 존재했던 논리 연산자의 한 종류입니다. 어떤 형태의 값이든 불리언 값으로 강제 변환되고 값의 참/거짓 여부에 따라서 true와 false가 됩니다. 어떤 부수효과로 인해 elephant의 값이 undefined일 경우, 이 연산자를 통해 elephant에 접근하면 false값을 얻습니다. undefined를 제거할 수 있는 것이죠! 에어비엔비 자바스크립트 스타일 가이드에서 자칫 불필요할 수 있는 삼항연산자의 대용으로 추천하고 있는 문법입니다. [bang(!) bang(!) you`re boolean](https://medium.com/better-programming/javascript-bang-bang-i-shot-you-down-use-of-double-bangs-in-javascript-7c9d94446054) 이런 식으로 기억하면 좋다네요.

## [3. optional chaining](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/Optional_chaining)

{% highlight javascript %}
const elephantAge = zooObj.elephant?.age //undefined
{% endhighlight %}

`?` 와 함께 체이닝을 하는 이 문법은 릴리즈된 ES문법은 아닙니다.  [tc39 proposal stage 4](https://github.com/tc39/proposal-optional-chaining/)에 있어서 아마 곧 정식으로 릴리즈될 가능성이 매우 높은 문법이죠. 이 문법은 undefined 할당 자체를 막는다기 보다는 undefined를 프로퍼티의 키로 참조함으로써(즉 `.`를 사용해서) 발생하는 에러를 막아줍니다. undefined에 `.`로 접근해도 에러를 발생시키지 않고 대신에 undefined를 뱉습니다. 

개인적으로 이 포스팅에서 소개하는 문법 중 가장 유용하다고 생각합니다. 실제 앱 빌드에서 발생하는 undefined 타입 에러는 객체 안에 어떤 프로퍼티가 예기치 못하게 undefined일 경우일 때 발생합니다. 이런 상황에서 optional chaining을 사용하면 프로퍼티를 평가하는 조건문을 작성하지 않아도 에러를 뿜지 않으면서 프로퍼티의 존재 여부를 알 수 있기 때문입니다. 

## [4. nullish coalescing operator](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing_operator)

{% highlight javascript %}
// undefined가 아니라 0이 할당됩니다.
const elephantAge = zooObj.elephant ?? 0

// 얼추 위와 같습니다
if(zooObj.elephant) {
	return true
} else {
	return false
}

// optinal chaining과 궁합이 좋습니다.
const elephantAge = zooObj.elephant?.age ?? 0
{% endhighlight %}

`??`, 널 병합 연산자는 연산자 왼쪽의 값이 거짓값이라면 연산자 오른쪽의 값을 자동으로 할당합니다. 이 문법도 [tc39 proposal의 stage 4](https://github.com/tc39/proposal-nullish-coalescing)에 있습니다. 완전 간결한 조건문 같은 느낌이라 코드의 가독성을 높이는데도 좋고, 객체의 어떤 프로퍼티의 참거짓 여부를 평가해야 한다면 optional chaining과 간단히 같이 쓸 수 있습니다.

## 마무리

소중한 변수를 undefined 할당의 위협으로부터 보호하는 몇가지 자바스크립트 문법에 대해 살펴봤습니다. optional chaining이나 nullish coalescing operator같은 경우는 회사의 프로젝트에 적용되었던 문법인데요. 처음 알게 되었습니다. 최신 트렌드에 더 민감한 개발자가 되어야겠다는 생각을 하게 된 계기가 되었습니다. 견고한 코드를 위해 tc39나 매년 발표되는 ES의 최신 문법들의 도입을 고려할 수 있는 능력을 갖추면 좋을 것 같습니다. 그리고 프로젝트가 최신 문법들을 원할하게 지원할 수 있도록 babel같은 트랜스파일러에 대해서도 공부를 더 해봐야 할 것 같아요.

다음 링크는 optional chaining이나 nullish coalescing operator의 프로젝트 도입을 위한 바벨 폴리필 정보입니다. 두 문법의 프로젝트 도입을 고려하시는 분들은 참고하세요!

- [@babel/plugin-proposal-optional-chaining](https://babeljs.io/docs/en/babel-plugin-proposal-optional-chaining)
- [@babel/plugin-proposal-nullish-coalescing-operator](https://babeljs.io/docs/en/babel-plugin-proposal-nullish-coalescing-operator)