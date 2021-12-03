---
layout: post
title: React Query와 전역 상태 관리의 관계
description: React Query가 해결하는 문제, 전역 상태 관리가 해결하는 문제
image: /uploads/default.png
emoji: 🗑
tags:
  - react
  - reactquery
published: false
---

# React Query는 전역 상태를 "최소화" 한다.

## React Query의 State 분리론

## React Query가 해결하는 문제

## "Client State"는 여전히 관리가 필요할 수 있다.

# React Query와 Recoil 같이 써보기

## React Query로 Server State에 접근하기

## Recoil Atom으로 Client State에 접근하기

스토리지 데이터는 완전 Client State가 아닌가

# 여담

## 어디까지가 Server State고 Client State인가?

## Recoil 비동기 쿼리 VS React Query

# 맺는 말

Recoil과 React Query를 같이 쓰는게 관심사 분리에 더 좋은 것 같기도 함.
하지만 여전히 전역 State가 필요할 수 있다.  
막연하게 React Query Docs에 있는 말만 듣고 정말 Redux 등을 제거할 수 있을까 생각해본 것의 결론으로 한 번 글을 써봤음. 전역 상태 관리를 React Query가 원할하게 해줄 수 없음을 어느정도 짐작하고는 있었는데, 이렇게 글로 작성하니까 확실하게 이야기할 수 있게 되어서 좋은 듯 함.