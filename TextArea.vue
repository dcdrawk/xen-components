<template>
  <div ref="container" class="xen-input-container xen-textarea" v-bind:class="{ 'has-value': inputValue, 'focus': focused, 'xen-disabled': disabled }">
    <label>{{label}}</label>
    <div ref="autosize">
      <textarea ref="textarea" v-model="inputValue" v-focus="focused" @focus="focused = true" @blur="focused = false" :placeholder="placeholder" :rows="rows" :disabled="disabled"></textarea>
    </div>
    <!--<div ref="border" class="xen-input-border"></div>-->
  </div>
</template>

<style lang="scss">
  @import './styles/input';
</style>
<script>
import autosize from 'autosize'
import { focus } from 'vue-focus'

export default {
  // Directives
  directives: { focus: focus },

  // Name
  name: 'xen-textarea',

  // Props
  props: [
    'label',
    'value',
    'type',
    'model',
    'placeholder',
    'rows',
    'autoGrow',
    'disabled'
  ],

  // Data
  data () {
    return {
      textRows: 0,
      focused: false,
      inputValue: this.value || ''
    }
  },

  mounted () {
    if (typeof this.autoGrow === 'undefined' || this.autoGrow !== false) {
      this.autosize()
    }

    this.$bus.$on('autosize', () => {
      setTimeout(() => {
        var ta = this.$refs.textarea
        let evt = document.createEvent('Event')
        evt.initEvent('autosize:update', true, false)
        if (ta) {
          ta.dispatchEvent(evt)
        }
      }, 0)
    })
  },

  // Methods
  methods: {
    autosize () {
      setTimeout(() => {
        autosize(this.$refs.autosize.childNodes)
      }, 0)
    }
  },

  // Watch
  watch: {
    'inputValue': {
      handler: function (val, oldVal) {
        if (val || val === '' || !isNaN(val)) {
          if (val !== this.value || oldVal) {
            // this.autosize()
            this.$emit('input', this.inputValue)
          }
        }
      }
    },
    'value': {
      handler: function (val, oldVal) {
        this.inputValue = val
        if (typeof this.autoGrow === 'undefined' || this.autoGrow !== false) {
          setTimeout(() => {
            this.autosize()
          }, 0)
        }
      }
    }
  }
}
</script>
