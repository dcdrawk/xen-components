<template>
  <div class="xen-input-container xen-textarea" v-bind:class="{ 'has-value': inputValue, 'focus': focused, 'xen-disabled': disabled }">
    <label>{{label}}</label>
    <textarea ref="textarea" v-model="inputValue" v-focus="focused" @focus="focused = true" @blur="focused = false" :placeholder="placeholder" :rows="rows" :disabled="disabled"></textarea>
    <!--<div ref="border" class="xen-input-border"></div>-->
  </div>
</template>

<style lang="scss">
  @import './styles/input';
</style>
<script>
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
        this.auto_grow()
      }
    },

    // Methods
    methods: {
      auto_grow () {
        this.$nextTick(() => {
          var element = this.$refs.textarea
          if (element.scrollHeight === 0) {
            element.style.display = 'block'
          }
          element.style.height = 'auto'
          element.style.height = (element.scrollHeight) + 0.67 + 'px'
        })
      }
    },

    // Watch
    watch: {
      'inputValue': {
        handler: function (val, oldVal) {
          if (val || val === '' || !isNaN(val)) {
            if (val !== this.value || oldVal) {
              this.auto_grow()
              this.$emit('input', this.inputValue)
            }
          }
        }
      },
      'value': {
        handler: function (val, oldVal) {
          this.inputValue = val
          // console.log('text area value changed')
          if (typeof this.autoGrow === 'undefined' || this.autoGrow !== false) {
            this.auto_grow()
          }
        }
      }
    }
  }
</script>
