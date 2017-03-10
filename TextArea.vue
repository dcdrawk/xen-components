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
import debounce from 'debounce'

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
    'disabled',
    'debounce'
  ],

  // Data
  data () {
    return {
      textRows: 0,
      focused: false,
      inputValue: this.value || ''
    }
  },

  created () {
    console.log(this.debounce)
    this.handleInputChange = debounce(this.handleInputChange, this.debounce || 0)
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
    handleInputChange () {
      this.$emit('input', this.inputValue)
    },

    autosize () {
      console.log('autosize...')
      if (this.$refs.autosize) {
        setTimeout(() => {
          autosize(this.$refs.autosize.childNodes)
        }, 0)
      }
    }
  },

  // Watch
  watch: {
    'inputValue': {
      handler: function (val, oldVal) {
        if (val || val === '' || !isNaN(val)) {
          if (val !== this.value || oldVal) {
            this.handleInputChange()
          }
        }
      }
    },
    'value': {
      handler: function (val, oldVal) {
        console.log('value updated...')
        this.inputValue = val
        if (typeof this.autoGrow === 'undefined' || this.autoGrow !== false) {
          setTimeout(() => {
            this.autosize()
          }, 0)
        }
      },
      immediate: true
    }
  }
}
</script>
