import React from 'react';
import './App.css';
import moment from 'moment';
import _ from 'lodash';
import { Nav, NavItem } from 'react-bootstrap'

import timeData from './data/time.json';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      now: moment(),
    };
  }

  tick() {
    this.setState({ now: this.state.now.add({ s: 1 }) });
  }

  componentDidMount() {
    this.interval = setInterval(this.tick.bind(this), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const basicList = _.map(timeData, (e, k) => (
      <li><span>{k}限</span>{e.start} - {e.end}</li>
    ));
    return (
      <div className="App">
        <div className="App-header">
          <h1>Dendai Time's Gate</h1>
          <h2>時間を統べる</h2>
        </div>
        <h2 className="head-time">{ this.state.now.format('MM/DD HH:mm:ss') }</h2>
        <ul className="basic-list">
          {basicList}
        </ul>
      </div>
    );
  }
}

export default App;
