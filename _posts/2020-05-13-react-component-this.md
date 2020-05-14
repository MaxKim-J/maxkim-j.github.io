---
layout: post
title: React 컴포넌트와 this
description: 그때그때 변하는 this, 리액트에서는?
image: /uploads/react-this/reactthis_thumb.png
emoji: 👉🏻
tags:
  - react
  - javascript
published: true
---
리액트 클래스 컴포넌트를 작성할때는 `this`를 신경써야 합니다. 여러 리액트 튜토리얼을 따라해 보면 상태값(state)나 속성값(props), 컴포넌트에 선언한 메소드를 참조하기 위해 `this`를 사용하고 있음을 직관적으로 이해할 수 있습니다. 이 포스팅에서는 컴포넌트를 이루는 프로퍼티들에 this가 정확히 어디에 바인딩되고 있는지 정리해봅니다. 
<!–-break-–> 
{: .lead}
![깃신](../uploads/react-this/reactthis_thumb.png)