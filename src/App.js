import React from 'react';
import './App.css';
import moment from 'moment';

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
    return (
      <div className="App">
        <div className="App-header">
          <h1>Dendai Time's Gate</h1>
          <h2>時間を統べる</h2>
        </div>
        <div>{ this.state.now.format('MM/DD HH:mm:ss') }</div>
      </div>
    );
  }
}

export default App;
