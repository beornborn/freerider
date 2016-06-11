import { CreateMixin } from '~/app/mixins/cable/CableCommon'

function cableLogic(component) {
  return {
    connected() { },
    disconnected() { },
    received(data) {
      if (data === undefined) { return }
      switch (data.msg) {
        case 'refresh_me':
          return component.props.updateCurrentUser(data.current_user)
      }
    }
  }
}

export default CreateMixin("PersonalChannel", cableLogic)
