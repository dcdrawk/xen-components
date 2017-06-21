<template>
  <div ref="wrapper">
    <!--<slot name="target"></slot>-->
    <div class="xen-dropdown-backdrop" v-show="open" @click="closeDropdown()"></div>
    <div ref="container" class="xen-dropdown-container"
    :class="{'xen-open': open}">
      <slot name="menu"></slot>
    </div>
  </div>
</template>

<style lang="scss">
@import './styles/dropdown';
.xen-dropdown-container {
  transition: opacity 300ms ease-out;
  visibility: hidden;
  opacity: 0;
  &.xen-open {
    visibility: visible;
    // display: block;
    opacity: 1;
  }
}
</style>

<script>
  import { focusModel } from 'vue-focus'
  // import gsap from 'gsap'

  export default {
    // Directives
    directives: { focusModel: focusModel },

    // Name
    name: 'xen-dropdown',

    // Props
    props: [
      'options',
      'open',
      'position',
      'offsetY',
      'offsetX',
      'height'
    ],

    // Methods
    methods: {
      openDropdown () {
        console.log('open')
        this.setPosition()
        // var container = this.$refs.container
        // setTimeout(() => {
        //   container.style.display = 'block'
        //   container.style.opacity = '1'
        // }, 0)
        // let numItems = container.querySelectorAll('.xen-list-item').length
        // gsap.TweenLite.to(container, 0.025 * numItems + 0.15, { height: this.totalHeight + 'px', opacity: 1, ease: gsap.Power1.easeOut })
      },

      closeDropdown () {
        // console.log('close')
        // var container = this.$refs.container
        // setTimeout(() => {
        //   container.style.display = 'none'
        //   container.style.opacity = '0'
        // }, 0)
        // let numItems = container.querySelectorAll('.xen-list-item').length
        // gsap.TweenLite.to(container, 0.025 * numItems + 0.15, { height: '0px', opacity: 0, ease: gsap.Power1.easeOut })
        this.$emit('toggle')
      },

      setPosition () {
        // const parentWidth = this.$parent.$el.clientWidth
        const container = this.$refs.container
        this.target = this.$slots.target[0].elm
        console.log(this)
        setTimeout(() => {
          // console.log(container.clientWidth + (this.offsetX ? this.offsetX : 0))
          container.style.transform = `translate3d(${-container.clientWidth + this.$el.clientWidth + (this.offsetX ? this.offsetX : 0)}px, 0, 0)`
          // container.style.transform = `translate3d(${-container.clientWidth + (this.offsetX ? this.offsetX : 0)}px, 0, 0)`
          // container.style.display = 'none'
          // container.style.left = `${-container.clientWidth + (this.offsetX ? this.offsetX : 0)}px`
          // container.style.display = 'block'
        //   var container = this.$refs.container
        //   container.style.display = 'none'
        //   this.target = this.$slots.target[0].elm
        //   // console.log(this.target, this.position)
        //   if (this.position === 'right') {
        //     container.style.transform = ``
        //     // container.style.left = this.target.offsetLeft + this.target.clientWidth - container.clientWidth + 'px'
        //   } else {
        //     // container.style.left = this.target.offsetLeft + 'px'
        //   }
        }, 0)
      }
    },

    // Data
    data () {
      return {
        totalHeight: this.height || 0,
        target: undefined
      }
    },

    // Mounted
    mounted () {
      this.$nextTick(() => {
        setTimeout(() => {
          // console.log('mounted!>!>!>!>!>!>!>!')
          // this.totalHeight = this.$refs.container.clientHeight
          this.setPosition()
        }, 100)
      })
    },

    // Watch
    watch: {
      'open': {
        handler: function (val, oldVal) {
          if (val) {
            this.openDropdown()
          } else {
            this.closeDropdown()
          }
        }
      }
    }
  }
</script>
