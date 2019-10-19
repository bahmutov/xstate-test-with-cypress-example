import React from 'react'
import { interpret } from 'xstate'
import { toggleMachine } from './model'

export default class Toggle extends React.Component {
  state = {
    current: toggleMachine.initialState
  }

  service = interpret(toggleMachine).onTransition(current => {
    console.log('transition, current is', current)
    this.setState({ current })
  })

  componentDidMount () {
    this.service.start()
  }

  componentWillUnmount () {
    this.service.stop()
  }

  render () {
    const { current } = this.state
    const { send } = this.service

    return (
      <button onClick={() => send('TOGGLE')}>
        {current.matches('inactive') ? 'Off' : 'On'}
      </button>
    )
  }
}
