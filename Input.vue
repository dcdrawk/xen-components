<template>
  <div class="xen-input-container" v-bind:class="{ 'has-value': inputValue || inputValue === 0, 'focus': focused, 'has-error-msg': errors.has(name || ''), 'xen-disabled': disabled }">
    <label :class="{ 'xen-color-red': errors.has(name || '')}" v-if="label">{{label}}</label>
    <div v-if="rules">
      <input ref="input" v-model="inputValue" v-focus="focused" @focus="focused = true" @blur="focused = false" :placeholder="placeholder" :name="name" v-if="type === 'text' || !type" type="text" v-validate :data-vv-rules="rules ? rules : 'required'" :disabled="disabled"/>
      <input ref="input" v-model="inputValue" v-focus="focused" @focus="focused = true" @blur="focused = false" :placeholder="placeholder" :name="name" v-if="type === 'number'" type="number" v-validate :data-vv-rules="rules ? rules : 'required'" :disabled="disabled" number/>
      <input ref="input" v-model="inputValue" v-focus="focused" @focus="focused = true" @blur="focused = false" :placeholder="placeholder" :name="name" v-if="type === 'password'" type="password" v-validate :data-vv-rules="rules ? rules : 'required'" :disabled="disabled"/>
    </div>
    <div v-else>
      <input ref="input" v-model="inputValue" v-focus="focused" @focus="focused = true" @blur="focused = false" :placeholder="placeholder" :name="name" v-if="type === 'text' || !type" type="text" :disabled="disabled"/>
      <input ref="input" v-model="inputValue" v-focus="focused" @focus="focused = true" @blur="focused = false" :placeholder="placeholder" :name="name" v-if="type === 'number'" type="number" :disabled="disabled" number/>
      <input ref="input" v-model="inputValue" v-focus="focused" @focus="focused = true" @blur="focused = false" :placeholder="placeholder" :name="name" v-if="type === 'password'" type="password" :disabled="disabled"/>
    </div>
    <span v-if="errors" class="xen-input-error xen-color-red">{{ errors.first(name || '') }}</span>
    <div v-if="errors" class="xen-input-border" :class="{ 'xen-theme-red': errors.has(name || '') }" ></div>
  </div>
</template>

<style lang="scss"
>  @import './styles/input';
</style>

<script>
  import { focus } from 'vue-focus'
  import { find, propEq } from 'ramda'
  import debounce from 'debounce'

  export default {

    // Directives
    directives: { focus: focus },

    // Name
    name: 'xen-input',

    // Props
    props: [
      'label',
      'value',
      'type',
      'name',
      'model',
      'placeholder',
      'rules',
      'disabled',
      'debounce'
    ],

    // Data
    data () {
      return {
        focused: false,
        inputValue: undefined
      }
    },

    // Mounted
    mounted () {
      console.log('mounted...')
      // console.log(this.rules)
      if (this.value || this.value === 0) {
        this.inputValue = this.type === 'number' ? window.parseInt(this.value) : this.value
      }
      this.$bus.$on('xen-validate', () => {
        setTimeout(() => {
          this.$validator.validateAll()
        }, 0)
      })

      // Watch for errors
      this.$watch(() => this.errors.errors, (newValue, oldValue) => {
        const newErrors = newValue.filter(error =>
          find(propEq('field', error.field))(oldValue) === undefined
        )
        const oldErrors = oldValue.filter(error =>
          find(propEq('field', error.field))(newValue) === undefined
        )
        this.$bus.$emit('errors-changed', newErrors, oldErrors)
      })
    },

    created () {
      this.handleInputChange = debounce(this.handleInputChange, this.debounce || 0)
    },

    methods: {
      handleInputChange () {
        // console.log('handle that change!')
        this.$emit('input', this.inputValue)
      }
    },

    // Watch
    watch: {
      'inputValue': {
        handler: function (val, oldVal) {
          // console.log(val, oldVal, this.value)
          // console.log(val === '')
          if (val || val === '' || typeof (val) === 'undefined' || !isNaN(val)) {
            if (val !== this.value || oldVal) {
              // console.log('input has changed...')
              this.handleInputChange()
            }
          }
        }
      },
      'value': {
        handler: function (val, oldVal) {
          // console.log(val, oldVal)
          if (typeof (val) === 'string' || typeof (val) === 'undefined' || !isNaN(val)) {
            this.inputValue = val
          }
        }
      }
    }
  }
</script>
