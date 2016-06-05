import { connect } from 'react-redux'
import Dashboard from '~/app/pages/dashboard//Dashboard'

const mapStateToProps = (state) => {
  return {
    playerInGame: state.shared.currentUser.connected_player.id !== undefined
  }
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
