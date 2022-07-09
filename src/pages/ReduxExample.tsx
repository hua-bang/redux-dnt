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