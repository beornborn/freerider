var AnimationMixin = {
  animateAppear(el) { this.animate(el, 'appear-enter', 'appear-target')},

  animateUpdate(el) { this.animateAndDisanimate(el, 'state-update', 'state-change-fast', 'state-change-slow') },
  animateSuccess(el) { this.animateAndDisanimate(el, 'state-success', 'state-change-fast', 'state-change-slow') },
  animateFailure(el) { this.animateAndDisanimate(el, 'state-failure', 'state-change-fast', 'state-change-slow') },
  animateNeutral(el) { this.animateAndDisanimate(el, 'state-neutral', 'state-change-fast', 'state-change-slow') },

  animate(el, klassAnimationEnter, klassAnimationTarget) {
    el.classList.add(klassAnimationEnter)
    setTimeout(() => {
      el.classList.remove(klassAnimationEnter)
      el.classList.add(klassAnimationTarget)
    }, 10)
  },

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
