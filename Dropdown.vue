<template>
  <div>
    <slot name="target"></slot>
    <div ref="container" class="xen-dropdown-container">
      <div class="xen-dropdown-backdrop" v-if="open" @click="closeDropdown()"></div>
      <slot name="menu"></slot>
    </div>
  </div>
</template>

<style lang="scss">
  @import './styles/dropdown';
</style>

<script>
  import { focusModel } from 'vue-focus'
  import gsap from 'gsap'

  export default {
    // Directives
    directives: { focusModel: focusModel },

    // Name
    name: 'xen-dropwo',

    // Props
    props: [
      'options',
      'open',
      'position',
      'offsetY',
      'offsetX'
    ],

    // Methods
    methods: {
      openDropdown () {
        this.setPosition()
        var container = this.$refs.container
        let numItems = container.querySelectorAll('.xen-list-item').length
        gsap.TweenLite.to(container, 0.025 * numItems + 0.15, { height: this.totalHeight + 'px', opacity: 1, ease: gsap.Power1.easeOut })
        console.log(this.target)
      },

      closeDropdown () {
        var container = this.$refs.container
        let numItems = container.querySelectorAll('.xen-list-item').length
        gsap.TweenLite.to(container, 0.025 * numItems + 0.15, { height: '0px', opacity: 0, ease: gsap.Power1.easeOut })
        this.$emit('toggle')
      },

      setPosition () {
        setTimeout(() => {
          var container = this.$refs.container
          container.style.height = '0px'
          this.target = this.$slots.target[0].elm
          if (this.position === 'right') {
            container.style.left = this.target.offsetLeft + this.target.clientWidth - container.clientWidth + 'px'
          } else {
            container.style.left = this.target.offsetLeft + 'px'
          }
        }, 0)
      }
    },

    // Data
    data () {
      return {
        totalHeight: 0,
        target: undefined
      }
    },

    // Mounted
    mounted () {
      this.totalHeight = this.$refs.container.clientHeight
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
