var AnimationMixin = {
  animateAppear(row) {
    row.style.opacity = 0
    row.addEventListener('transitionend', ()=>{
      setTimeout(() => {
        row.style.opacity = 1
        row.classList.remove("animated-state-appear")
      }, 10)
    })
    setTimeout(() => { row.className += " animated-state-appear" }, 10)
  },

  animateChange(row) {
    row.addEventListener('transitionend', ()=>{
      setTimeout(() => { row.classList.remove("animated-state-update") }, 10)
    })
    setTimeout(() => { row.className += " animated-state-update" }, 10) // TODO why doesn't work without setTimeout?
  }
};
