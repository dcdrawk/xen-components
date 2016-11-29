<template>
  <div class="xen-dialog-container" :class="{ 'show': show, 'show-overflow': overflow }">
    <transition name="fade">
      <div ref="backdrop" class="xen-dialog-backdrop" @click="hideDialog();" v-show="show"></div>
    </transition>

    <!-- Dialog -->
    <transition name="dialog">
      <div class="xen-dialog" v-if="show" :class="{ 'small': small, 'medium': medium, 'large': large, 'has-actions': $slots.actions, 'fullscreen': fullscreen }">

        <!-- Dialog Title -->
        <h3 class="xen-dialog-title title" :class="{ 'xen-theme-primary': primary }">{{ title }}</h3>

        <!-- Dialog Content -->
        <div class="xen-dialog-content" :class="{ 'show-overflow': overflow }">
          <div>
            <slot name="default"></slot>
          </div>
        </div>

        <!-- Dialog Actions -->
        <div class="xen-dialog-actions-container" v-if="$slots.actions">
          <div class="xen-dialog-actions">
            <slot name="actions"></slot>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<style lang="scss">
  @import './styles/dialog';
  .xen-dialog-content.show-overflow,
  .xen-dialog-container.show-overflow{
    overflow-x: visible;
    overflow-y: visible;
  }
</style>

<script>
  import MaterialButton from './Button.vue'
  import MaterialCard from './Card.vue'
  import Toolbar from './Toolbar.vue'
  import ScrollHelper from './classes/ScrollHelper'
  // import gsap from 'gsap'

  export default {
    // Name
    name: 'xen-dialog',

    // Components
    components: {
      MaterialButton,
      MaterialCard,
      Toolbar
    },

    // Props
    props: [
      'title',
      'size',
      'show',
      'small',
      'medium',
      'large',
      'overflow',
      'fullscreen',
      'primary'
    ],

    mounted () {
      window.onpopstate = (event) => {
        if (this.show) {
          this.hideDialog()
        }
      }
    },

    // Methods
    methods: {
      hideDialog () {
        this.$emit('hide')
      }
    },

    // Watch
    watch: {
      'show': {
        handler: function (val, oldVal) {
          if (val) {
            ScrollHelper.disable()
          } else {
            ScrollHelper.enable()
          }
        }
      }
    }

  }
</script>
