---
layout: post
title: 나만의 프론트엔드 컴포넌트 설계 루틴 회고
description: 제가 컴포넌트를 개발할 때 고려하는 지점들을 러프하게 소개합니다.
emoji: 🏛
tags:
  - retrospect
published: false
---

오랜만에 돌아왔습니다. 이번 포스팅은 제가 실무에서 컴포넌트를 만드는 루틴과, 고려하는 지점들을 정리하려 합니다. 컴포넌트 설계에 관한 레퍼런스들을 많이 링크하면서 객관적인 글을 쓰고 싶은 마음이 있었습니다. 하지만 이번 글은 저의 컴포넌트 설계 방법을 스스로 개선하기 위해 제가 어떻게 컴포넌트를 작성하고 있는지 되돌아볼 수 있도록 기록을 남기는데 의의가 있습니다.<!–-break-–> 그래서 이 글은 레퍼런스를 적게 유지하고 지금까지의 경험과 방법을 토대로 쓰여진 글이 될 것 같습니다. 어떤 인사이트를 드리기가 어려울 것 같아요.

그러니까 포스팅의 루틴과 방법들이 당연히 정답은 아니고, 개선의 여지는 너무 많을 것입니다. 그냥 **어떤 주니어 개발자는 이런식으로 컴포넌트를 짜는구나** 생각하시면 될 것 같습니다. 시작하죠!

## 1. 설계 단계

### 설계하기 전에

- 기능을 파악해서 넘버링한다. 개발은 이 넘버링된 기능들을 해결하면 없애는 식으로 진행한다. 
- 디자인을 샅샅이 파악해서 재사용이 최대한 가능한 작은 단위로 나눈다.
- 조직도를 짜본다
- 컴포넌트의 재사용성을 파악한다. 가장 순수하게 만들어야 할 컴포넌트가 무엇인지 생각한다.

### 디렉토리

디렉토리 사진

- 페이지 디렉토리를 만들고, index로 해당 페이지를 만들어준다. pages 디렉토리는 라우터에 등록되거나, 서버사이드 라이브러리라면 규칙에 따라 디렉토리를 구성한다
- 무조건 두 개 이상의 컴포넌트 단위에서 사용되는 컴포넌트는 common에 들어간다
- 컴포넌트 디렉토리는 common과 page에 대응되는 디렉토리를 만든다. 페이지에서 가장 첫번째로, 최상위에서 쓰이는 main 컴포넌트를 디렉토리의 index로 두고, 하위 컴포넌트의 디렉토리를 만든다. 

### 고려하는 사항들

- 컴포넌트와 함수형 프로그래밍
- 가장 basic하게 순수한 컴포넌트는 무엇이 되어야 하는가? 이 컴포넌트는 상위 컴포넌트를 알지 못해도 스스로 재사용이 가능해야 한다.
- 순수 컴포넌트들을 사용하지만 어떤 페이지의 어떤 기능에서 그걸 그대로 갖다가 재사용이 힘들 경우 해당 페이지에 맞는 컴포넌트 디렉토리에 컴포넌트를 싸서 위치시킨다.

### 라이브러리, React vs Vue

내가 생각하는 두 라이브러리의 차이, 표

## 2. 코딩 단계

### 선호하는 방법과 구조

- 아래에서 위로 개발하기
- 페이지 단위로 개발하고, 페이지 컴포넌트에는 컴포넌트 하나만
- 그 밑의 컴포넌트에 모든 하위 컴포넌트들 작성
- 중앙 집중식 상태관리 앱 액션 디스패치는 최대한 최상위와 가까운 부분에서만
- 순수 컴포넌트들을 의식하면서, 그때그때 재사용성 확장하기. 재사용 로직이 자연스러운지 확인하기.

### 현실과의 타협

- 순수하면 좋은 모든 컴포넌트들이 순수해질 수는 없다. 일단 시간이 많이 든다. 따라서 가끔은 하위 컴포넌트가 상위 컴포넌트를 살짝 아는 상태로 개발해야 될 상황이 많다.

## 3. 점검 단계

## 포스팅 마무리