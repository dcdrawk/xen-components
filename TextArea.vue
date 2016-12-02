<template>
  <div class="xen-input-container xen-textarea" v-bind:class="{ 'has-value': inputValue, 'focus': focused }">
    <label>{{label}}</label>
    <textarea ref="textarea" v-model="inputValue" v-focus="focused" @focus="focused = true" @blur="focused = false" :placeholder="placeholder" :rows="rows"></textarea>
    <div ref="border" class="xen-input-border"></div>
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
      'autoGrow'
    ],

    // Data
    data () {
      return {
        focused: false,
        inputValue: this.value || ''
      }
    },

    mounted () {
      console.log('text-area mounted')
      var element = this.$refs.textarea
      console.dir(element)
      if (typeof this.autoGrow === 'undefined' || this.autoGrow !== false) {
        this.auto_grow()
      }
    },

    // Methods
    methods: {
      auto_grow () {
        this.$nextTick(() => {
          setTimeout(() => {
            console.log('auto grow')
            var element = this.$refs.textarea
            console.dir(element)
            console.log(element.value)
            console.log(element.scrollHeight)
            element.style.height = '16px'

            if (element.scrollHeight === 0) {
              element.style.display = 'block'
            }

            let height = element.scrollHeight === 0 ? 46.67 : element.scrollHeight
            element.style.height = (height + 19.9) + 'px'
            // this.$refs.border.style.position = 'relative'
            this.$refs.border.style.top = (height + 3) + 'px'
          }, 1000)
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
          console.log('text area value changed')
          if (typeof this.autoGrow === 'undefined' || this.autoGrow !== false) {
            this.auto_grow()
          }
        }
      }
    }
  }
</script>
