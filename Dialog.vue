<template>
  <div class="xen-dialog-container" :class="{ 'show': showDialog, 'show-overflow': overflow }">
    <transition name="fade">
      <div ref="backdrop" class="xen-dialog-backdrop" @click="hideDialog();" v-show="showDialog"></div>
    </transition>

    <!-- Dialog -->
    <transition name="dialog">
      <div class="xen-dialog" v-if="showDialog" :class="{ 'small': small, 'medium': medium, 'large': large, 'has-actions': $slots.actions, 'fullscreen': fullscreen }">


        <h3 class="xen-dialog-title title" :class="{ 'xen-theme-primary': primary }">
          <!-- Dialog Title -->
          <xen-button class="xen-dialog-back" @click.native="$bus.$emit('back')">
            <i class="material-icons">keyboard_arrow_left</i>
          </xen-button>
          <span>{{ title }}</span>
        </h3>

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
  .xen-dialog-back .xen-button {
    padding: 8px;
    margin-right: 8px;
  }
  .xen-dialog-back,
  h3 {
    margin: 0;
    /*display: inline-block;*/
    vertical-align: middle;
  }
</style>

<script>
  import XenButton from './Button.vue'
  import MaterialCard from './Card.vue'
  import Toolbar from './Toolbar.vue'
  import ScrollHelper from './classes/ScrollHelper'
  // import gsap from 'gsap'

  export default {
    // Name
    name: 'xen-dialog',

    // Components
    components: {
      XenButton,
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

    data () {
      return {
        showDialog: this.show || false
      }
    },

    mounted () {
      this.updatedPopstate()
    },

    // Methods
    methods: {
      hideDialog () {
        this.$bus.$emit('back')
      },

      updatedPopstate () {
        window.onpopstate = (event) => {
          // console.log(event)
          console.log('pop', this.title)
          if (this.showDialog) {
            this.showDialog = false
            this.$emit('hide', this.showDialog)
          } else {
            if (event.state) {
              console.log(event.state)
              if (event.state.title === this.title) {
                this.showDialog = true
              }
            }
          }
        }
      }
    },

    // Watch
    watch: {
      'show': {
        handler: function (val, oldVal) {
          this.showDialog = val
          console.log('show dialog', val)
        }
      },

      'showDialog': {
        handler: function (val, oldVal) {
          console.log('showing the dialog...', this.title)
          if (val) {
            ScrollHelper.disable()
            window.history.pushState({title: this.title}, 'dialog', document.location)
            this.updatedPopstate()
          } else {
            ScrollHelper.enable()
          }
        }
      }

    }

  }
</script>
