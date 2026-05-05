---
name: blog-publish
description: Documents/max-hq-v2/writings에 있는 미발행 글(final.md/final.en.md 작성됨)을 maxkim-j.github.io 블로그 레포에 mdx로 추가, 커밋·푸시 후 pnpm deploy-gh로 배포하고, writings 디렉토리에 `_published` 접미사를 붙여 발행 완료 처리하는 스킬.
---

# blog-publish

`~/Documents/max-hq-v2/writings/` 의 글을 `~/dev/personal/maxkim-j.github.io/` 블로그 레포에 발행한다.

## 핵심 경로

- writings 루트: `/Users/jonghyukkim/Documents/max-hq-v2/writings`
- 블로그 레포: `/Users/jonghyukkim/dev/personal/maxkim-j.github.io`
- 글 출력 경로: `src/assets/contents/<slug>.mdx`, `src/assets/contents/<slug>-en.mdx`
- 디폴트 브랜치: `v2-gatsby`

## 글 디렉토리 컨벤션 (writings)

```
writings/
└── NN_<한글-슬러그>/        예: 01_시지프-신화-읽기
    ├── plan.md              (글 기획)
    ├── revision-N.md        (수정본)
    ├── final.md             (한글 최종본, 필수)
    ├── final.en.md          (영문 최종본, 필수)
    └── ...
```

`NN`은 두 자리 순번. 디렉토리명에 날짜는 없음.

## 발행 대상 판별

writings 루트의 디렉토리 중:

1. 디렉토리명이 `_published` 로 끝나지 **않음**
2. 디렉토리명이 `NN_...` 형식 (두 자리 숫자 + 언더스코어로 시작)
3. 안에 `final.md` **그리고** `final.en.md` 가 모두 존재

이 셋을 만족하지 않으면 발행 대상 아님 (사용자에게 알리고 종료).

여러 개면 사용자에게 어떤 글을 발행할지 물어본다.

## 메타데이터 추출

- **title (한글)**: `final.md` 의 첫 H1 (`# ...`) 의 텍스트
- **title (영어)**: `final.en.md` 의 첫 H1 의 텍스트
- **slug**: 영어 title 을 kebab-case 로 변환 (영문 소문자, 공백 → `-`, 비영숫자 제거, 관사 `the/a/an` 은 보존). 예: `Reading The Myth of Sisyphus` → `reading-the-myth-of-sisyphus`. 스킬은 자동 도출 후 미리보기 단계에서 사용자 확인을 받음 (사용자가 다른 슬러그로 바꿀 수 있음)
- **date**: 오늘 날짜 (`YYYY-MM-DD`). 사용자가 미리보기에서 다른 날짜로 바꿀 수 있음
- **description**:
  - 한글: `final.md` 의 첫 문단(첫 H1 다음의 첫 비어있지 않은 평문 단락) 에서 한 문장으로 요약. 80자 이내 권장
  - 영어: `final.en.md` 동일 방식. 80자 이내 권장
  - blockquote(`>`) 로 시작하는 문단은 본문이 아니므로 건너뛰고 다음 평문 단락 사용
- **category**: 글 내용 기반으로 자동 선택 — `essay`, `dev`, `retrospect`, `interview`, `etc` 중 하나. (회고는 `retrospect`, 개발/기술은 `dev`, 그 외 사유적 글은 `essay`)
- **tags**: 글 주제어 2-4개. 영문 소문자, 공백은 `-`. 한/영 동일 사용

## 본문 처리

`final.md` 와 `final.en.md` 의 **첫 H1 라인은 제거**하고 그 아래 본문 전체를 mdx 본문으로 사용 (블로그의 글 전체 제목은 frontmatter title 로 처리됨; 본문 H1 은 중복).

mdx 본문 자체는 가공 없이 그대로 옮긴다 (마크다운 호환).

## frontmatter 포맷

```
---
title: <문자열>
description: <문자열>
date: <YYYY-MM-DD>
category: <essay|dev|retrospect|interview|etc>
slug: <slug>
tags:
  - <tag1>
  - <tag2>
lang: <ko|en>
---
```

## 실행 흐름

1. **발행 대상 탐색**: 위 조건으로 후보 디렉토리 나열. 여러 개면 사용자에게 선택 요청
2. **파일 읽기**: 선택된 디렉토리의 `final.md`, `final.en.md` 를 읽어 title/본문 추출
3. **메타데이터 생성**: 위 규칙으로 slug/date/description/category/tags 도출
4. **미리보기 + 사용자 승인**: 다음을 사용자에게 보여주고 명시적 승인 요청
   - 생성될 두 파일 경로 (`<slug>.mdx`, `<slug>-en.mdx`)
   - 두 파일의 frontmatter 전체
   - 본문 첫 200자 정도
   - 메시지: "이 메타데이터로 발행할까요? 수정 사항 있으면 말씀하세요"
   - 사용자가 수정 요청하면 반영 후 다시 확인 (반복)
5. **승인 후 파일 작성**: 두 mdx 파일을 `src/assets/contents/` 에 작성
6. **커밋·푸시**: 블로그 레포 cwd 에서
   - `git add src/assets/contents/<slug>.mdx src/assets/contents/<slug>-en.mdx`
   - 커밋 메시지: `posting: <한글 title>` (기존 컨벤션, 예: `posting: 2025 회고`)
   - `git push origin v2-gatsby`
7. **배포**: 블로그 레포에서 `pnpm deploy-gh` 실행. 빌드+gh-pages 푸시 완료까지 대기. 실패하면 단계 8 건너뛰고 사용자에게 에러 보고
8. **발행 완료 처리**: writings 디렉토리명 끝에 `_published` 추가. `mv` 사용
   - 예: `01_시지프-신화-읽기` → `01_시지프-신화-읽기_published`
9. **마무리 안내**: 사용자에게 다음 출력
   - 배포된 URL: `https://maxkim-j.github.io/posts/<slug>`
   - "썸네일은 별도로 `src/assets/images/<slug>/` 에 추가하고 따로 커밋/배포해 주세요" 안내

## 주의

- 단계 4 (메타데이터 미리보기 + 승인) 는 **반드시** 사용자 명시적 동의를 받은 뒤에만 단계 5 이후로 진행
- 단계 6 의 푸시와 단계 7 의 배포는 사용자 승인 이후 일괄 실행 (다시 묻지 않음)
- 단계 7 실패 시 단계 8 (디렉토리 rename) 수행하지 않음
- `_published` 접미사는 디렉토리명에만 추가. 안의 파일명은 변경하지 않음
- 썸네일 작업은 스킬 범위 밖. 안내만 출력하고 자동화하지 않음
- final 파일에서 첫 H1 만 제거. 본문 안의 다른 헤딩(`## ...`, `### ...`)은 그대로 유지

## 참고: 기존 글 frontmatter 예시

```
---
title: 2025년 회고
description: 몇 개의 카테고리로 올해를 돌아봅니다
date: 2025-12-31
category: essay
slug: 2025-retrospect
tags:
  - retrospect
lang: ko
---
```
