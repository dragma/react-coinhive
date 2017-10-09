import React, { Component } from 'react'
import { render } from 'react-dom'

import CoinHive from '../../src'

class Demo extends Component {
  state = {
    run : true,
    threads: 1,
    autoThreads: false,
    logs: '',
  }

  render() {
    return <div>
      <h1>react-coinhive Demo</h1>
      <div>
        Start:
        <input
          type="button"
          value="on"
          disabled={this.state.run}
          onClick={() => this.setState({ run: true })}
        />
        <input
          type="button"
          value="off"
          disabled={!this.state.run}
          onClick={() => this.setState({ run: false })}
        />
      </div>
      <div>
        Threads:
        <input
          type="button"
          value="Auto"
          disabled={this.state.autoThreads}
          onClick={() => this.setState({
            threads: 0,
            autoThreads: true,
          })}
        />
        <input
          type="button"
          value={1}
          disabled={this.state.threads === 1}
          onClick={() => this.setState({
            threads: 1,
            autoThreads: false,
          })}
        />
        <input
          type="button"
          value={2}
          disabled={this.state.threads === 2}
          onClick={() => this.setState({
            threads: 2,
            autoThreads: false,
          })}
        />
        <input
          type="button"
          value={3}
          disabled={this.state.threads === 3}
          onClick={() => this.setState({
            threads: 3,
            autoThreads: false,
          })}
        />
        <input
          type="button"
          value={4}
          disabled={this.state.threads === 4}
          onClick={() => this.setState({
            threads: 4,
            autoThreads: false,
          })}
        />
      </div>
      <CoinHive
        autoThreads={false}
        onInit={miner => setInterval(() => this.setState({ logs: JSON.stringify(CoinHive.getMinerData(miner), null, 2) }), 1000)}
        run={this.state.run}
        threads={this.state.threads}
        autoThreads={this.state.autoThreads}
      />
      <pre>
        {this.state.logs}
      </pre>
    </div>
  }
}

render(<Demo/>, document.querySelector('#demo'))
