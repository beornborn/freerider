import { CreateMixin } from '~/app/mixins/cable/CableCommon'

function cableLogic(component) {
  return {
    connected() { },
    disconnected() { },

    received(data) {
      console.log(data)
      if (data === undefined) { return }
      switch (data.msg) {
        case 'refresh':
          return component.props.refreshChat({messages: data.messages})
      }
    },

    sendMessage(message) {
      this.perform('send_message', {message})
    }
  }
}

export default CreateMixin("ChatChannel", cableLogic)
