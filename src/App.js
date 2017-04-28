import React from 'react';
import './App.css';
import moment from 'moment';
import _ from 'lodash';

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

  renderStatus(term) {
    const { now } = this.state;
    const start = moment(term.start, 'HH:mm');
    const end = moment(term.end, 'HH:mm');
    if (now < start) {
      return <span style={{ color: 'black' }}>({start.fromNow()})</span>;
    }
    if (start <= now && now < end) {
      return <span style={{ color: 'red' }}>ON AIR</span>;
    }
    return (
      <span style={{ color: 'gray' }}>FINISH</span>
    );
  }

  render() {
    const basicList = _.map(timeData, (e, k) => (
      <div className="time-row">
        <div>{k}限</div>
        <div>{e.start} - {e.end}</div>
        <div className="from-now">{this.renderStatus(e)}</div>
      </div>
    ));
    return (
      <div className="App">
        <div className="App-header">
          <h1>Dendai Time's Gate</h1>
          <h2>時間を統べる</h2>
        </div>
        <h2 className="head-time">
          { this.state.now.format('HH:mm') }
          <span className="sub-second">{ this.state.now.format('.ss') }</span>
        </h2>
        <div className="basic-list">
          <p>開館 07:30</p>
          {basicList}
          <p>閉館 22:30</p>
        </div>
      </div>
    );
  }
}

export default App;
