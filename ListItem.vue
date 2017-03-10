<template>
  <div ref="target" >
     <xen-ripple v-cloak>
      <div class="xen-list-item" :class="{ 'avatar': avatar, 'one-line': !secondaryText, 'two-line': secondaryText && !multiLine, 'multi-line': multiLine && secondaryText, 'bold': bold}">
        <span v-if="select" class="xen-list-item-avatar">
          <xen-checkbox></xen-checkbox>
        </span>

        <span v-if="icon && avatar" class="xen-list-item-avatar">
          <i class="material-icons">{{ icon }}</i>
        </span>

        <span v-if="icon && !avatar" class="xen-list-item-icon">
          <i class="material-icons">{{ icon }}</i>
        </span>

        <span class="xen-list-item-text-container">
          <span class="item-text">{{ text }}</span>
          <span v-if="secondaryText" class="secondary-text">{{ secondaryText }}</span>
        </span>

        <slot name="dropdown"></slot>
      </div>
     </xen-ripple>
  </div>
</template>

<style lang="scss">
</style>

<script>
import XenCheckbox from './Checkbox'
import XenRipple from './Ripple'

export default {
  // Name
  name: 'xen-list-item',

  // Props
  props: [
    'avatar',
    'icon',
    'text',
    'secondaryText',
    'bold',
    'twoLine',
    'multiLine',
    'select'
  ],

  // Components
  components: {
    XenRipple,
    XenCheckbox
  },

  // Watch
  watch: {
    'text': {
      handler: function (val, oldVal) {
        console.log('text changed...')
        this.text = val
      }
    }
  }
}
</script>
