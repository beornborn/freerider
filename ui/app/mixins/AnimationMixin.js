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

  animateUpdate(row) { this.animateAndDisanimate(row, 'animated-state-update', 'animated-state-change-fast', 'animated-state-change-slow') },
  animateSuccess(el) { this.animateAndDisanimate(el, 'animated-state-success', 'animated-state-change-fast', 'animated-state-change-slow') },
  animateFailure(el) { this.animateAndDisanimate(el, 'animated-state-failure', 'animated-state-change-fast', 'animated-state-change-slow') },
  animateNeutral(el) { this.animateAndDisanimate(el, 'animated-state-neutral', 'animated-state-change-fast', 'animated-state-change-slow') },

  animateAndDisanimate(el, klassAnimation, klassAnimationTypeIn, klassAnimationTypeOut) {
    var cbOut = () => {
      el.removeEventListener('transitionend', cbOut)
      setTimeout(() => { el.classList.remove(klassAnimationTypeOut) }, 10)
    }
    var cbIn = () => {
      el.removeEventListener('transitionend', cbIn)
      el.addEventListener('transitionend', cbOut)
      setTimeout(() => {
        el.classList.remove(klassAnimationTypeIn)
        el.classList.add(klassAnimationTypeOut)
        el.classList.remove(klassAnimation)
      }, 10)
    }
    el.addEventListener('transitionend', cbIn)
    setTimeout(() => { el.classList.add(klassAnimationTypeIn, klassAnimation) }, 10)
  }
}

export default AnimationMixin
