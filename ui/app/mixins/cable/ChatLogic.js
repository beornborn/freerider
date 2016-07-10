import { CreateMixin } from '~/app/mixins/cable/CableCommon'

function cableLogic(component) {
  return {
    connected() { },
    disconnected() { },

    received(data) {
      if (data === undefined) { return }
      switch (data.msg) {
        case 'refresh':
          component.props.refreshChat({messages: data.messages})
          return document.getElementById('chat-field').scrollIntoView()
      }
    },

    sendMessage(message) {
      this.perform('send_message', {message})
    },

    inGame: component.props.inGame
  }
}

export default CreateMixin("ChatChannel", cableLogic)
