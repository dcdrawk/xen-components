class ScrollHelper {
  static disableScroll = false
  static scrollTop = 0

  static toggle () {
    this.disableScroll = !this.disableScroll
    if (this.disableScroll) {
      this.scrollTop = document.body.scrollTop
      document.body.style.position = 'relative'
      document.querySelector('html').classList.add('disable-scroll')
      document.body.style.top = this.scrollTop * -1 + 'px'
    } else {
      document.querySelector('html').classList.remove('disable-scroll')
      document.body.style.top = '0px'
      document.body.scrollTop = this.scrollTop
    }
  }

  static enable () {
    this.disableScroll = false
    document.querySelector('html').classList.remove('disable-scroll')
    document.body.style.top = '0px'
    document.body.scrollTop = this.scrollTop
  }

  static disable () {
    console.log('start disable scroll')
    if (document.body.scrollHeight > window.innerHeight) {
      console.log('scroll height is larger than window')
      this.disableScroll = true
      this.scrollTop = document.body.scrollTop
      document.body.style.position = 'relative'
      document.querySelector('html').classList.add('disable-scroll')
      document.body.style.top = this.scrollTop * -1 + 'px'
    }
  }
}

export default ScrollHelper
