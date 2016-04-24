$(document).ready ->
  if window.location.pathname == '/games'
    history.replaceState {}, '', '/'
