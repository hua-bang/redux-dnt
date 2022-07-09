![img](https://etfb95vl8d.feishu.cn/space/api/box/stream/download/asynccode/?code=ZTk2MzQyYmE1YmMzNzc3MTViNWQ4Mjk1MTgyNjBiYmZfdG8wMmcyTlZkVDFONHh5cTNFckV6MUVVQVpiM1FmckhfVG9rZW46Ym94Y25SZkN3QVp4a1FOR0ZHVnF0SXR1S2tlXzE2NTczNTQzNzA6MTY1NzM1Nzk3MF9WNA)

# 一、Redux是什么

> A Predictable State Container for JS Apps

`Redux`官方介绍中讲述自己是一个`可预测`进行`状态管理`的`JS`库。它保证程序行为一致性且易于测试。

## 为什么我们需要Redux

- 全局状态管理的需要

- 不同组件之间数据的共享

- 保证程序行为一致性且易于测试。

## 三大原则

-  单一数据源
  -  整个应用的 `state` 被储存在一棵 `object tree` 中，并且这个 `object tree` 只存在于唯一一个 `store` 中。

- `State`是只读的
  -  唯一改变 `state` 的方法就是触发 `action`，`action` 是一个用于描述已发生事件的普通对象。

- 使用纯函数来执行修改
  -  为了描述 `action` 如何改变 `state tree` ，你需要编写 `reducers`。

# 二、Redux的基本使用

这里我们简单介绍`Redux`的基本使用，你可以参考[redux.js.org](https://redux.js.org/introduction/getting-started#basic-example)。

由于`Redux`并非仅支持`React`,甚至本身跟`React`并无关联关系，所以上方的教程仅说明了`JS`下`Redux`的使用，下面我们结合`React`来做示范。

## 2.1 安装依赖

在我们项目下，新安装`Redux`相关依赖。

```Shell
npm install redux
```

## 2.2 构建store

根据官方文档进行`store`的构建。（注意：官方更建议我们使用**`@reduxjs/toolkit`****，**不过这里还是采取`redux`）。

```TypeScript
import { AnyAction, createStore } from 'redux';

function counterReducer(state = 0, action: AnyAction) {
  switch (action.type) {
    case 'incremented':
      return state + 1;
    case 'decremented':
      return state - 1;
    default:
      return state;
  }
}

const store = createStore(counterReducer);

export default store;
```

## 2.3 组件中使用

这里只用了类组件进行探讨。

```TypeScript
import React, { Component } from 'react';
import store from '../store';

class ReduxExample extends Component {
  subscribe: any = null;

  componentDidMount() {
    this.subscribe = store.subscribe(() => {
      this.forceUpdate();
    });
  }

  componentWillUnmount() {
    this.subscribe();
  }

  incremented = () => {
    store.dispatch({ type: 'incremented' });
  }

  decremented = () => {
    store.dispatch({ type: 'decremented' });
  }

  render() {
    return (
      <div>
        count: {store.getState()}
        <div>
          <button onClick={this.incremented}>+</button>
          <button onClick={this.decremented}>-</button>
        </div>
      </div>
    );
  }
}

export default ReduxExample;
```

![img](https://etfb95vl8d.feishu.cn/space/api/box/stream/download/asynccode/?code=ZTRlNmM4ZWZmOTM5NDRhZWUzN2EwOGI2YjI2Mzc1Y2NfQXZDQVZDT3FXdlEyUFQ1SWRoR0ZtdEN0cldHOHZJSHBfVG9rZW46Ym94Y25Rc0NYdXpvdlpYcWx6dDNIeHdlS2JoXzE2NTczNTQzNzA6MTY1NzM1Nzk3MF9WNA)

# 三、Redux的工作流程

![img](https://etfb95vl8d.feishu.cn/space/api/box/stream/download/asynccode/?code=YmFhNWI1NjRkYzUxMGExZGFhYjljZTk1YjkyZDZkNWNfUTJHNVp1YTM4aXZlbXdyakkxTE43SjBuMjB0WWx0OFRfVG9rZW46Ym94Y25aNTM1TjduMDJFblpIdVB5a3ljWFhlXzE2NTczNTQzNzA6MTY1NzM1Nzk3MF9WNA)

我们在了解`Redux`的工作流程的时候，我们先明白几个前置概念。

## 概念

### State

> *State* (also called the *state tree*) is a broad term, but in the Redux API it usually refers to the single state value that is managed by the store and returned by `getState()`. It represents the entire state of a Redux application, which is often a deeply nested object.

状态在`Redux`中通常被`Store`所管理，并通过`getState`暴露得到。实际上，我们在页面/全局管理中，我们所使用的就是变量/状态。

### Action

> An *action* is a plain object that represents an intention to change the state. Actions are the only way to get data into the store. Any data, whether from UI events, network callbacks, or other sources such as WebSockets needs to eventually be dispatched as actions.

`Action`主要提供修改`store`中的`state`的能力。`Action`必须有对应的`type`。

### Reducer

> A *reducer* (also called a *reducing function*) is a function that accepts an accumulation and a value and returns a new accumulation. They are used to reduce a collection of values down to a single value.

`reducer`是一个函数,它接受一个初始值,并返回一个新的值。实质上是对`State`的修改。

### Dispatching Function

> A *dispatching function* (or simply *dispatch function*) is a function that accepts an action or an [async action](https://redux.js.org/understanding/thinking-in-redux/glossary#async-action); it then may or may not dispatch one or more actions to the store.

`dispatch`可以接收一个`action`, 告诉`store`要进行具体的`action`,之后`store`会通知`reduces`进行更新，并把更新值返回给`store`。

### Action Creator

> An *action creator* is, quite simply, a function that creates an action. 

这里很直白，是一个用于创建`action`的方法、

## 流程

这里的`store`你可以理解为存储中心，变量的最新状态都可以在这里去到。

- `Component`通过`store`暴露的`getState`接口获取最新的`state`值。

- `Component`可以通过`dispatch`,并传入对应的`action`,通知`store`需要做更新。

- `store`接收通知之后，让`reducers`进行操作，并返回最新的值给`store`。

- `Component`通过`store`暴露的`getState`接口获取最新的`state`值。

![img](https://etfb95vl8d.feishu.cn/space/api/box/stream/download/asynccode/?code=ZTc5N2UwOTdhN2M0OTE5YjcwZWRhMGNlYTdhMTlhY2Rfa3gzMDdzc1RwbzNVWmtPT1A3R2NCbThHakl1Z2RNak1fVG9rZW46Ym94Y252ODBmOGtLRWRKTTB3TnZ0ekZpeVZlXzE2NTczNTQzNzA6MTY1NzM1Nzk3MF9WNA)

# 四、实现简易的Redux

下面，我们就实现一个简易的`redux`,目前仅支持同步的版本，后续会更新迭代。

## 确定返回值

我们使用`redux`一般进行的是如下的操作，有`getState`,`dispatch`,`subscribe`等操作。

```TypeScript
const store = createStore(xxxReducer);

const state = store.getState();

store.dispatch({ type: 'xxxx' });

store.subscribe(() => {});
```

于是，我们的`redux`函数可以返回为

```TypeScript
function createStore(reduceer) {
    return {
        getState,
        dispatch,
        subscribe
    };
}
```

我们编写对应的类型。

```TypeScript
export interface Dispatch<A extends AnyAction> {
  (params: A): void;
}

export interface Action<T = any> {
  type: T
}

export interface AnyAction<T = any> extends Action<T> {
  [extraProps: string]: any
}

export type Reducer<S = any, A extends Action = AnyAction> = (
  state: S | undefined,
  action: A
) => S

export interface Store<T extends any, A extends AnyAction> {
  getState: () => T | undefined;
  subscribe: (fn: () => void) => () => void;
  dispatch: Dispatch<A>;
}
```

## 详细功能实现

上方，我们讲到了我们需要去返回`getState`,`dispatch`,`subscribe`等函数。

我们先看整体，在来拆解，整体代码结构如下图所示。

```TypeScript
import { Reducer, Store, Dispatch, Action, AnyAction } from './typings';

export function createStore<S, A extends AnyAction>(reducer: Reducer<S, A>): Store<S, A> {
  let currentState: S | undefined;
  let currentListeners: Array<() => void> = [];

  const getState = () => {};

  const subscribe: Store<S, A>['subscribe'] = (fn) => {
    
  }

  const dispatch: Dispatch<A> = (action) => {
    
  }

  return {
    getState,
    subscribe,
    dispatch,
  }
}
```

上图中，我们用来`currentState`来进行状态保存，同时使用`currentListeners`存放订阅函数。

### getState--获取最新状态值

这里实现比较简单，直接把`currentState`返回即可。

```TypeScript
const getState = () => currentState;
```

### **dispatch--通知修改**

这里的我们的`dispatch`会接收对应的`action`,之后产生最新状态值的工作会交给`reducer`。

```TypeScript
const dispatch: Dispatch<A> = (action) => {
    currentState = reducer(currentState, action);
    currentListeners.forEach(listener => listener());
}
```

### **subscribe--订阅修改的回调**

这里需要注意以下几点

- 这里订阅的回调是在`state`发生修改后返回的。

- 需要返回一个解绑回调的函数。

- 可以存在多个回调。

```TypeScript
const subscribe: Store<S, A>['subscribe'] = (fn) => {
    currentListeners.push(fn);
    return () => {
      const index = currentListeners.findIndex(fn);
      currentListeners.splice(index, 1);
    }
}
```

## 整体实现

### 代码

`src\lib\redux-nut\index.ts`

```tsx
import { Reducer, Store, Dispatch, Action, AnyAction } from './typings';

export function createStore<S, A extends AnyAction>(reducer: Reducer<S, A>): Store<S, A> {
  let currentState: S | undefined;
  let currentListeners: Array<() => void> = [];

  const getState = () => currentState;

  const subscribe: Store<S, A>['subscribe'] = (fn) => {
    currentListeners.push(fn);
    return () => {
      const index = currentListeners.findIndex(fn);
      currentListeners.splice(index, 1);
    }
  }

  const dispatch: Dispatch<A> = (action) => {
    currentState = reducer(currentState, action);
    currentListeners.forEach(listener => listener());
  }

  dispatch({ type: 'SystemInit' } as A);

  return {
    getState,
    subscribe,
    dispatch,
  }
}
```

`src\lib\redux-nut\typings.ts`

```tsx
export interface Dispatch<A extends AnyAction> {
  (params: A): void;
}

export interface Action<T = any> {
  type: T
}

export interface AnyAction<T = any> extends Action<T> {
  [extraProps: string]: any
}

export type Reducer<S = any, A extends Action = AnyAction> = (
  state: S | undefined,
  action: A
) => S

export interface Store<T extends any, A extends AnyAction> {
  getState: () => T | undefined;
  subscribe: (fn: () => void) => () => void;
  dispatch: Dispatch<A>;
}
```

`src\store\index.ts`

```tsx
import { Action } from './../lib/redux-nut/typings';
import { createStore } from '../lib/redux-nut';

function counterReducer(state = 0, action: Action<'incremented' | 'decremented'>) {
  switch (action.type) {
    case 'incremented':
      return state + 1;
    case 'decremented':
      return state - 1;
    default:
      return state;
  }
}

const store = createStore(counterReducer);

export default store;
```

`src/pages/ReduxExample.tsx`

```tsx
import React, { Component } from 'react';
import store from '../store';

class ReduxExample extends Component {
  subscribe: any = null;

  componentDidMount() {
    this.subscribe = store.subscribe(() => {
      this.forceUpdate();
    });
  }

  componentWillUnmount() {
    this.subscribe();
  }

  incremented = () => {
    store.dispatch({ type: 'incremented' });
  }

  decremented = () => {
    store.dispatch({ type: 'decremented' });
  }

  render() {
    return (
      <div>
        count: {store.getState()}
        <div>
          <button onClick={this.incremented}>+</button>
          <button onClick={this.decremented}>-</button>
        </div>
      </div>
    );
  }
}

export default ReduxExample;
```



### 效果

![img](https://etfb95vl8d.feishu.cn/space/api/box/stream/download/asynccode/?code=OTQ2ZDAzNTgwMjhjNjkzMWZmYWVlNzlmYjUxZTU4NjdfYllIRDVVOVk5Q21sUnlONG5XTUlJekdVWW1qYW5MakxfVG9rZW46Ym94Y25qdEtxb0d5Q05ZTktuaU5EYktCdGRoXzE2NTczNTQzNzA6MTY1NzM1Nzk3MF9WNA)

# 参考资料

- [Redux - A predictable state container for JavaScript apps. | Redux](https://redux.js.org/)

- [github.com](https://github.com/reduxjs/redux)
- https://github.com/hua-bang/redux-dnt

