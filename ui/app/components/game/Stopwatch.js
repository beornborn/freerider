import React from 'react'

var Stopwatch = React.createClass({
  propTypes: {
    time: React.PropTypes.number,
    cbTimeout: React.PropTypes.func
  },

  getInitialState() {
    return {intervalId: 0, timeoutId: 0, remainingTime: 0}
  },

  componentWillUnmount() { this.stop() },

  render() {
    var time = this.state.intervalId === 0 ? this.props.time : this.state.remainingTime
    return <span>{time}</span>
  },

  run(time) {
    this.stop()
    this.setState({remainingTime: time - 1})
    let intervalId = setInterval(() => {
      if (this.state.remainingTime === 0) {
        clearInterval(this.state.intervalId)
      } else {
        this.setState({remainingTime: this.state.remainingTime - 1 })
      }
    }, 1000)
    this.setState({intervalId: intervalId})

    if (this.props.cbTimeout) { this.setState({timeoutId: setTimeout(this.props.cbTimeout, time * 1000)}) }
  },

  stop() {
    clearInterval(this.state.intervalId)
    clearTimeout(this.state.timeoutId)
  }
})

export default Stopwatch
