---
layout: post
title: 효과적인 비동기 요청 관리를 위한 Redux Store 구조
description: Redux, Redux Saga 시리즈 완결판
image: /uploads/default.png
emoji: 🗂
tags:
  - react
  - redux
published: true
---

최근 회사 프로덕트의 비동기 요청들을 관리하는 Redux Store, Saga들의 구조를 리팩토링하는데 많은 힘을 쏟았었습니다. 개선의 포인트는 크게 2가지였는데요. <!–-break-–>

1. Redux Toolkit과 자체 Util 함수를 사용해 Action, Saga들이 다른 보조 라이브러리 없이 일일히, 장황하게 선언된 Redux Store의 타이핑을 줄이기
2. 효과적으로 비동기 요청 응답 데이터 값들을 저장하기 위한 Redux Store의 구조 만들기

이전 포스팅에서 Redux Toolkit을 이용해 Redux Store의 타이핑을 줄이는 몇 가지 용례를 보여드린 적이 있습니다. 이번 포스팅에서는 저번 포스팅에서 소개했던 패턴을 실제 프로덕트에 적용하는 과정에서 프로덕트에 맞게끔 약간의 수정을 거쳤습니다.

이번 포스팅에서는 고민 끝에 나름의 답을 낸 효과적인 비동기 요청 관리를 위한 Redux Store의 구조와, 변경된 구조에 맞게 약간의 변화를 준 Redux Utils(reducer, saga를 만드는 factory 함수)들을 소개해보려고 합니다.

그동안 탐구해왔었던 Redux Store를 통한 비동기 요청 관리법이라는 주제에 마무리, 완결판 격인 포스팅이 될 것 같습니다.

# Redux Store 구조 잡기

## 기존 AsyncEntity의 문제점과 개선 방향

저번 포스트에서 store에서 한 단위의 비동기 데이터를 책임지는 프로퍼티를 AsyncEntity라고 설정했습니다. 저번 포스트에서 정의했던 AsyncEntity는 이런 식으로 생겼습니다.

{% highlight typescript %}
export type GeneralStatus = 'idle' | 'loading' | 'success' | 'fail';

export type AsyncEntity<DataType> = {
  data: DataType | null;
  status: GeneralStatus;
  error: Error | null;
};

// store의 프로퍼티 초기 상태 = AsyncEntity<UserInfo>
userInfo: {
  data: null,
  status: 'idle',
  error: null,
}
{% endhighlight %}

data 프로퍼티를 data가 저장되는 하나의 source로 이용하고, 다른 프로퍼티로 가장 최근에 이루어졌던 요청의 상태와 에러 여부를 저장합니다.

또한 PUT, POST, DELETE 등의 요청에서 특정 값이 응답으로 오지 않는 경우에, data를 없애고 요청의 상태만 저장할 수 있는 타입을 따로 만들었습니다

{% highlight typescript %}
export type StatusOnlyAsyncEntity = {
  status: GeneralStatus;
  error?: Error | null;
};

// store의 프로퍼티 초기 상태 = StatusOnlyAsyncEntity
putUserInfoStatus: {
  status: 'idle',
  error: null,
}
{% endhighlight %}

그렇지만 서버에 요청해 받는데이터들은 클라이언트에서 GET 요청을 할 때만 받을 수 있는 것은 아닐 수도 있습니다. POST, PUT, DELETE 등의 요청으로 직접 클라이언트에서 데이터를 수정하는 요청을 보낼 경우에도 백엔드에서 수정된 데이터 자체를 반환해줄 때가 있습니다.

위에서 보여드린 타입들만 사용해서는 사실상 같이 묶일 수 있는 요청 상태값을 스토어의 다른 프로퍼티에서 관리해야 하는데 꽤 비효율적으로 느껴집니다. store 프로퍼티들의 응집도가 떨어지는 느낌도 있고요.

{% highlight typescript %}
// 요청별로 다른 상태와 값을 가질때
userInfo: {
  data: UserInfo,
  status: 'idle' | 'loading' | 'success' | 'fail',
  error: Error,
},
userInfoPutStatus: {
  // PUT 요청 성공시 userInfo.data를 수정해야함 => 낮은 응집도
  status: 'idle' | 'loading' | 'success' | 'fail',
  error: Error,
}
userInfoDeleteStatus: {
  // DELETE 요청 성공시 userInfo.data를 수정해야함 => 낮은 응집도
  status: 'idle' | 'loading' | 'success' | 'fail',
  error: Error,
}
{% endhighlight %}

이렇게 해보면 어떨까요? store에서는 한 단위의 데이터를 대표하는 프로퍼티를 만들고, GET, POST 등의 요청 메소드들의 상태가 모두 관리될 수 있게 만드는 겁니다.

{% highlight typescript %}
userInfo: {
  data: UserInfo,
  GET: {
    status: 'idle' | 'loading' | 'success' | 'fail',
    error: Error,
  },
  PUT: {
    status: 'idle' | 'loading' | 'success' | 'fail',
    error: Error,
  },
  DELETE: {
    status: 'idle' | 'loading' | 'success' | 'fail',
    error: Error,
  },
}
{% endhighlight %}

예컨데, 앱에 댓글 기능이 있어서 GET 요청 할 경우 댓글 리스트를 가져오고, PUT, POST, DELETE 요청을 했을 때는 요청이 반영된 최신의 댓글 리스트를 가져온다면 이런 스토어 구조가 서버 데이터를 관리하기 더 편할 것입니다. 데이터는 요청 메소드가 무엇이든 **단 한 곳에만 저장됩니다(`userInfo.data`)**

이렇게 각 요청들이 균일하게 스토어에 자리잡을 수 있도록 구조를 잡으면, 뒤에서 추가적으로 설명할 Reducer의 팩토리 유틸 함수를 만들 때 응답값을 처리하는 로직도 균일하게 만들어 유틸 함수로 분리하기 편합니다.

## 새로운 AsyncEntity 타입으로 Store 작성

먼저, 요청의 상태값을 관리하는 객체에 대한 타입을 먼저 선언합니다.

{% highlight typescript %}
export type GeneralStatus = "idle" | "loading" | "success" | "fail";

export type AsyncEntityStatus<StatusType> = {
  status: StatusType;
  error?: BaseException | null;
};
{% endhighlight %}

기본적으로는 status 프로퍼티가 `success | fail | idle | loading` 이라는 기본적인 4가지 상태를 갖게 GeneralStatus type을 선언합니다.

성공, 혹은 실패의 유형이 여러가지라면 `success1 | success2 | fail1 | fail2 | idle | loading` 이런 식의 상태값이 가능할 수도 있을 것입니다. `AsyncEntityStatus`에는 제네릭으로 가질 수 있는 상태값의 타입을 넣어줄 수도 있도록 설정했습니다.

이전에 고정적이었던 AsyncEntity 프로퍼티는 잘게 분해되었습니다. 아래와 같은 타입들이 모두 모여 하나의 AsyncEntity를 만듭니다.

{% highlight typescript %}
export type AsyncEntityData<DataType> = {
  data: DataType | null;
};

export type AsyncEntityGetStatus<GetStatus = GeneralStatus> = {
  GET: CustomStatusOnlyAsyncEntity<GetStatusType>;
};

export type AsyncEntityPostStatus<PostStatus = GeneralStatus> = {
  POST: CustomStatusOnlyAsyncEntity<PostStatusType>;
};

export type AsyncEntityPutStatus<PutStatus = GeneralStatus> = {
  PUT: CustomStatusOnlyAsyncEntity<PutStatusType>;
};

export type AsyncEntityDeleteStatus<DeleteStatus = GeneralStatus> = {
  DELETE: CustomStatusOnlyAsyncEntity<DeleteStatusType>;
};

// Store Type
// GET, POST, PUT 하는 userInfo 데이터 - 필요한 메서드마다 자유롭게 붙일 수 있습니다
type UserInfoAsyncEntity = AsyncEntityData<UserInfo> &
  AsyncEntityGetStatus &
  AsyncEntityPostStatus &
  AsyncEntityPutStatus;

type UserStore = {
  userInfo: UserInfoAsyncEntity
};
{% endhighlight %}

데이터를 저장할 프로퍼티(AsyncEntityData)를 하나 만들고, 해당 데이터를 수정하는 메소드 이름으로 프로퍼티들을 하나씩 붙이는 방식으로 선언합니다.

이제 완성된 타입들을 사용하여 slice를 선언하는 곳에 initalState를 선언합니다.

타입값에 맞는 store의 초기값을 대입해주는데요. 초기에는 아직 데이터가 없으니 data 프로퍼티는 null로, status는 모두 idle로 맞춥니다.

{% highlight typescript %}
const initialStore: UserStore = {
  userInfo: {
    data: null,
    GET: {
      status: "idle",
      error: null,
    },
    POST: {
      status: "idle",
      error: null,
    },
    PUT: {
      status: "idle",
      error: null,
    },
  },
};
{% endhighlight %}

`AsyncEntityData`의 data 프로퍼티 타입은 null도 가능한데요, 데이터가 없는 상태를 명시적으로 null로 표현하기 위해서입니다. data타입에 아래와 같이 null 대입이 가능하지 않으면 문제가 생길 수 있습니다.

{% highlight typescript %}
export type AsyncEntityData<DataType> = {
  data: DataType;
};
{% endhighlight %}

리스폰스의 타입이 배열이라 초기값을 빈 배열로 했을 경우, 실제로 데이터가 아무것도 없어 백엔드에서 빈 배열이 날아오는 경우와 구분이 안 될 수도 있습니다. 타입이 객체일 경우에는 데이터 타입의 모든 프로퍼티들의 초기값을 일일히 정해줘야 하니 귀찮습니다.

{% highlight typescript %}
// X - 배열
const initialStore:UserStore = {
  userInfo: {
    data: [], // 데이터가 없을 때 올 수도 있는 빈배열과 구분이 안됨
    GET: {
      status: 'idle',
      error: null
    },
    ...
}

// X - 객체
const initialStore:UserStore = {
  userInfo: {
    data: {
      userName: '',
      userAge: 0,
      ...
    }, // 빈 객체는 타입 정의에 맞지 않으니 모든 프로퍼티의 초기값을 입력해줘야 함
    GET: {
      status: 'idle',
      error: null
    },
    ...
}
{% endhighlight %}

이것으로 store을 다 만들었습니다!

# Reducer

## Reducer Factory 함수 - createReducer

제가 사용하는 redux toolkit slice의 reducer 함수를 만드는 유틸 함수는 크게 4가지입니다.

위에서 선언한 `GeneralStatus` 타입의 상태변화를 만들고, 요청 성공 시 적당한 처리를 할 수 있는 reducer 함수를 만드는 팩토리 함수들입니다. 비동기 동작이 아닌 StatusType을 쓴다면 reducer 함수를 직접 구현해야겠지만 일반적인 상황에서는 이 4가지 함수로 대부분의 상황이 커버됩니다.

{% highlight typescript %}
const createStartReducer =
  <State extends { [key: string]: any }>(entity: string, method: HttpMethods) =>
  <PayloadType>() => {
    return (state: State, action: PayloadAction<PayloadType>) => {
      state[entity][method].status = "loading";
    };
  };

const createSuccessReducer =
  <State extends { [key: string]: any }>(entity: string, method: HttpMethods) =>
  <PayloadType>() => {
    return (state: State, action: PayloadAction<PayloadType>) => {
      state[entity].data = action.payload;
      state[entity][method].error = null;
      state[entity][method].status = "success";
    };
  };

const createMethodFailReducer =
  <State extends { [key: string]: any }>(entity: string, method: HttpMethods) =>
  <PayloadType>() => {
    return (state: State, action: PayloadAction<PayloadType>) => {
      state[entity][method].error = action.payload;
      state[entity][method].status = "fail";
    };
  };

const createMethodStatusRestoreReducer =
  <State extends { [key: string]: any }>(entity: string, method: HttpMethods) =>
  () => {
    return (state: State) => {
      state[entity][method].status = "idle";
    };
  };
{% endhighlight %}

상태가 변할때마다 Store을 어떻게 수정하고 있는지 잘 파악할 수 있으시겠죠?

저번 포스팅과 다른 점이 있다면 요청이 success, fail이 나고 맨 마지막에 idle 상태로 바꾸는 restore reducer 팩토리 함수가 추가되었다는 것입니다.

프로덕트에 적용을 해보고 나서야 확실하게 알았던 부분인데요, 요청이 success 혹은 fail로 마무리가 된 이후에 다시 초기와 똑같은 idle, 유휴 상태로 돌려놔야할 필요성이 확실히 있었습니다.

GET 요청인 경우에는 마지막 상태와 상관없이 페이지에 진입할 때와 같은 상황에서 재호출이 발생하며 삽시간에 상태가 바뀌기 때문에 마지막 상태가 success든 fail이든 별 상관이 없어 보일 수 있습니다.

하지만 POST, PUT, DELETE의 경우 success, fail이 된 채로 그대로 남아있으면 다시 요청을 해야하는 상황에 놓일 때 요청을 하기 전인데도 success나 fail같은 상태가 이미 입력이 되어 있어 예상치 못한 사이드 이펙트를 유발할 가능성이 있습니다.

## 실제 구현

유저 정보에 대한 리듀서 함수들을 만들어줍니다. store 프로퍼티의 이름과, 메소드 적당한 타입도 제네릭으로 주입해줍니다.

{% highlight typescript %}
type GetUserStartPayload = {
  userId: number;
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getUserInfo: createStartReducer("userInfo", "GET")<GetUserStartPayload>(),
    getUserInfoSuccess: createSuccessReducer("userInfo","GET")<UserInfo>(),
    getUserInfoFail: createFailReducer("userInfo", "GET")<AxiosError>(),
    getUserInfoRestore: createRestoreReducer("userInfo", "GET")(),
  },
});

export const userActions = userSlice.actions;
{% endhighlight %}

# Saga

마지막으로 실제로 API 호출이 이루어지는 사가 함수입니다.

## Async Saga Factory 함수 - createAsyncSaga

비동기 요청을 실제로 수행하고, 결과에 따라 적당한 액션을 발행하는 Saga를 만드는 유틸 함수는 다음과 같이 생겼습니다. 제네레이터 함수를 반환하는 일종의 고차 팩토리 함수입니다.

{% highlight typescript %}
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";

type CreateAsyncSagaOptions<Start, Success> = {
  fn: (requestBody: Start) => Promise<AxiosResponse<Success>>;
  sustain?: number;
};

const createAsyncSaga = <Start, Success, Fail>(
  success: ActionCreatorWithPayload<Success>,
  fail: ActionCreatorWithPayload<Fail>,
  { fn, sustain = 1000 }: CreateAsyncSagaOptions<Start, Success>
) => {
  return function* (action: PayloadAction<Start>) {
    try {
      // 비동기 요청 함수의 인자에 맞게 Start의 action.payload 프로퍼티를 맞춰준다
      const response: AxiosResponse<Success> = yield call(fn, action.payload);
      yield put(success(response.data));
    } catch (error) {
      const response: AxiosResponse<Fail> = error;
      yield put(fail(response.data));
    } finally {
      yield delay(sustain); // success혹은 fail이후 상태 유지를 얼마나 할 것인지
      yield put(restore(undefined)); // 상태유지 시간이 지나고 나면 idle로 전환
    }
  };
};
{% endhighlight %}

인자로 success, fail, restore 액션을 받고 적절한 상황에 액션을 발행해 Saga를 호출합니다.

기본적으로는 요청에 필요한 requestBody이나 쿼리파람을 Start action의 payload로 삼아 넣어줍니다. Saga 내부에서 호출할 함수는 다음과 같이 만들어놓아야 합니다.

{% highlight typescript %}
const getUserInfo = ({ userId }: GetUserStartPayload) => {
  return axios.get("baseurl/user", {
    params: { userId },
  });
};
{% endhighlight %}

sustain 인자를 통해 비동기 요청 완결(success, fail)이후 결과값을 나타내는 상태를 몇 ms간 유지할것인지 설정할 수 있습니다. 요청 이후 alert를 일정 시간동안 띄운다거나 하는 동작에서 활용할 수 있습니다.

애플리케이션의 특성에 따라 다양한 인자를 설정할 수 있는데요. 가령 auth 파라미터를 설정해서 유저 인증이 필요한 API 요청인지를 표현할 수도 있겠습니다.

auth가 true일 경우 유저 인증을 위한 token을 저장하는 userReducer에 select 함수로 스토어에 진입해 tokenId를 가져오거나 하는 방식으로 활용할 수 있겠습니다.

{% highlight typescript %}
const createAsyncSaga = <Start, Success, Fail>(
  success: ActionCreatorWithPayload<Success>,
  fail: ActionCreatorWithPayload<Fail>,
	{ fn, auth, sustain = 1000 }: CreateAsyncSagaOptions<Start, Success>,
) => {
  return function* (action: PayloadAction<Start>) {
    // token을 store에 저장한다면 이런 방식으로 활용 가능
    const { tokenId } = yield select((state) => state.userReducer);
    const requestBody = [action.payload];

    if (auth) {
      requestBody.push(tokenId)
    }

    try {
      const response: AxiosResponse<Success> = yield call(fn, ...requestBody);
      yield put(success(response.data));
    } catch (error) {
      ...
    }
  };
};
{% endhighlight %} 

## 실제 구현

{% highlight typescript %}
const getUserInfoSaga = createAsyncSaga<GetUserStartPayload, UserInfo, Error>(
  userActions.getUserInfoSuccess,
  userActions.getUserInfoFail,
  userActions.getUserInfoRestore,
  {
    fn: getUserInfo,
    sustain: 2000,
  }
);

export function* userSaga() {
  yield takeLatest(userActions.getUserInfo.type, getUserInfoSaga);
}
{% endhighlight %}

success, fail, restore 액션과 파라미터, 타입을 같이 넘겨 제네레이터 함수를 반환합니다. 마지막으로 takeLatest를 사용해 호출을 시작하는 start 액션을 구독하고 Saga와 맵핑시켜줍니다.

# 디렉토리 구조

아래와 같은 디렉토리 구조를 가집니다. 서버에서 관리하는 데이터의 도메인별로 Store을 나눕니다. 공통적으로 사용되는 유틸 함수(SagaUtil, createReducers)는 상위 디렉토리에 놓습니다.  

컨벤션을 만들어 비동기 데이터를 가져오기 위해 필요한 reducer 함수들과 그렇지 않은 reducer 함수들을 공간적으로 분리할 수 있는 방법도 필요할 것입니다.

{% highlight bash %}
src
  |- api
    |- index.ts
  |- store
    |- user # 특정 도메인의 리듀서는 store 이하의 디렉토리로 분리
      |- reducer.ts
      |- types.ts
      |- saga.ts
    |- utils.ts
    |- types.ts # store 전체에 사용되는 타입과 유틸함수는 store 디렉토리에 저장
{% endhighlight %}

# 전체 구현

유틸 함수 부분과 실제 구현 부분으로 나누어 전체 구현 코드를 보여드리겠습니다. 확실히 Redux Toolkit 도입으로 [이전 글의 Redux 예제](https://maxkim-j.github.io/posts/how-to-use-redux-saga#%EC%93%B4%EB%8B%A4%EB%A9%B4-%EB%8D%94-%EC%83%9D%EA%B0%81%ED%95%B4%EB%B4%90%EC%95%BC-%ED%95%A0-%EA%B2%83%EB%93%A4)에 비해 간소화된 모습입니다. 

저번 예제보다 개행이 많아서 라인 수 자체는 별로 차이가 나는 것 같지는 않지만, 전체적인 타이핑은 많이 줄었습니다. 액션 문자열과 액션 반환 함수를 정의할 필요가 없는게 제일 좋네요.

{% highlight typescript %}
// 실제 구현 부분

// index.ts
const initialStore: UserStore = {
  userInfo: {
    data: null,
    GET: {
      status: "idle",
      error: null,
    },
    POST: {
      status: "idle",
      error: null,
    },
    PUT: {
      status: "idle",
      error: null,
    },
  },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getUserInfo: createStartReducer("userInfo", "GET")<GetUserStartPayload>(),
    getUserInfoSuccess: createSuccessReducer("userInfo","GET")<UserInfo>(),
    getUserInfoFail: createFailReducer("userInfo", "GET")<AxiosError>(),
    getUserInfoRestore: createRestoreReducer("userInfo", "GET")(),
  },
});

// saga.ts
export const userActions = userSlice.actions;

const getUserInfoSaga = createAsyncSaga<GetUserStartPayload, UserInfo, Error>(
  userActions.getUserInfoSuccess,
  userActions.getUserInfoFail,
  userActions.getUserInfoRestore,
  {
    fn: getUserInfo,
    sustain: 1000,
  }
);

export function* userSaga() {
  yield takeLatest(userActions.getUserInfo.type, getUserInfoSaga);
}
{% endhighlight %}
# 맺는말

막상 정리해보면 내용이 그렇게 많지는 않은 것 같지만 근 몇달동안 상당히 골몰했던 주제였습니다. 회사에서의 태스크를 정신없이 처리하고 있어 짬이 쉽게 나지가 않았지만 내가 리덕스는 리팩토링 하고 만다!!!! 고 생각하며 벼르고 있었던 부분이기도 합니다.

회사 프로덕트의 리덕스 스토어 구조가 너무 복잡했고 컨벤션이 제대로 정리되어있지 않았었습니다. 가장 큰 문제는 toolkit을 사용하지 않아 한번 기능을 추가하는데 타이핑이 어마무시하게 많아서 모든 개발자들이 redux에 기능 추가하는 것을 두려워하고 있었습니다. Redux와 Saga가 프로젝트에 붙어는 있지만 저를 포함한 개발자들이 컴포넌트에 직접 async/await로 api 요청을 했었습니다.

부족한 결과이고 더 좋은 방법도 있을 것 같지만, 연구한 바를 점진적으로 회사 프로덕트에 적용해보며 수정/발전시키며 어느정도는 성과를 낸 것 같아 약간 뿌듯합니다.

이러한 패턴과 유틸 함수로 만들어진 Saga가 Redux Store 상태를 변화시키는 것을 보면, 역시 진행 상황에 따라 쿼리의 상태가 점진적으로 바뀌는 React Query와 꽤 유사하다는 생각이 듭니다. 아직 React Query를 본격적으로 써보지는 않았는데, 사용해보고 Saga와는 어떤 차이가 있는지 체험하고 싶은 마음입니다.

Redux + Saga로 비동기 관리하는 베스트 프랙티스 찾기가 꽤 힘이 듭니다.

구글링을 해보면 Success, Fail, Loading 관련한 상태를 기록하는 여러 방법들에 대해서는 찾을 수 있었지만 확실히 프로덕트에 쫙 달라붙고 만족할 수 있는 방법을 찾기까지 연구가 필요했던 것 같습니다.

Redux+Saga로 비동기를 관리하는 프로덕트를 만들고 계시는 분들께 조금의 인사이트가 되었으면 좋겠다는 바람입니다.
