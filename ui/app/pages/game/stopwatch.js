import React from 'react'

var Stopwatch = React.createClass({
  propTypes: {
    time: React.PropTypes.number,
    cbInterval: React.PropTypes.func,
    cbTimeout: React.PropTypes.func
  },

  getInitialState() {
    return {intervalId: 0, timeoutId: 0, remainingTime: 0}
  },

  componentWillUnmount() { this.stop() },

  render() {
    var time = this.state.intervalId === 0 ? this.props.time : this.state.remainingTime
    return (<span>{this.view(time)}</span>)
  },

  run(time) {
    this.setState({remainingTime: time - 1})
    let intervalId = setInterval(() => {
      if (this.props.cbInterval) { this.props.cbInterval(this.state.remainingTime) }
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
  },

  reset(time) {
    this.stop()
    this.run(time)
  },

  view(time) {
    var minutes = (time - time % 60) / 60
    var seconds = time % 60
    if (seconds < 10) seconds ="0" + seconds
    return minutes +":" + seconds
  }
})

export default Stopwatch
