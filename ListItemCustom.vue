<template>
    <!-- <xen-ripple v-cloak> -->
    <div class="xen-list-item">        
      <slot></slot>
    </div>
    <!-- </xen-ripple> -->
</template>

<style lang="scss">
.xen-list .xen-list-item.custom-list-item {
  padding: 8px;
}

</style>

<script>
  import XenRipple from '../xen/Ripple'

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
      'multiLine'
    ],

    // Components
    components: {
      XenRipple
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
