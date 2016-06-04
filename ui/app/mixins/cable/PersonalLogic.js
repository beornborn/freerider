import { CreateMixin } from '~/app/mixins/cable/CableCommon'

function cableLogic(component) {
  return {
    connected() { console.log('connected personal channel') },
    disconnected() { console.log('disconnected personal channel') },
    received(data) {
      if (data === undefined) { return }
      console.log('personal got ' + data.msg)
      console.log(data)
      switch (data.msg) {
        case 'refresh_me':
          return component.props.updateCurrentUser(data.current_user)
      }
    }
  }
}

export default CreateMixin("PersonalChannel", cableLogic)
