<template>
  <div class="xen-input-container" v-bind:class="{ 'has-value': dataValue || dataValue === 0, 'focus': focused, 'has-error-msg': error, 'xen-disabled': disabled }">
    <!--<input type="text" :name="name" v-model="inputValue" @input="handleInputChange()"/>-->
    <label :class="{ 'xen-color-red': error}" v-if="label">{{label}}</label>
    <div>
      <input
      @input="handleInputChange()"
      ref="input" v-model="dataValue" v-focus="focused" @focus="focused = true" @blur="focused = false" :placeholder="placeholder" :name="name" v-if="type === 'text' || !type" type="text" :disabled="disabled" :autocapitalize="autocapitalize"/>
      <input
      @input="handleInputChange()"
      ref="input" v-model="dataValue" v-focus="focused" @focus="focused = true" @blur="focused = false" :placeholder="placeholder" :name="name" v-if="type === 'number'" type="number" :disabled="disabled"/>
      <input
      @input="handleInputChange()"
      ref="input" v-model="dataValue" v-focus="focused" @focus="focused = true" @blur="focused = false" :placeholder="placeholder" :name="name" v-if="type === 'password'" type="password" :disabled="disabled"/>
    </div>
    <div class="xen-input-border" :class="{ 'xen-theme-red': error }" ></div>
    <transition name="input-focus">
      <div v-if="focused" class="xen-focus-border" :class="{ 'xen-theme-red': error }" ></div>
    </transition>

    <span v-if="error" class="xen-input-error xen-color-red">{{error}}</span>
  </div>
</template>

<style lang="scss">
@import './styles/input';
</style>

<script>
  import { focus } from 'vue-focus'
  // import { find, propEq } from 'ramda'
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
      'error',
      'placeholder',
      'disabled',
      'debounce',
      'autocapitalize'
    ],

    // Data
    data () {
      return {
        focused: false,
        dataValue: this.value || undefined
      }
    },

    // Mounted
    mounted () {
      if (this.value || this.value === 0) {
        this.dataValue = this.type === 'number'
        ? window.parseInt(this.value)
        : this.value
      }
    },

    created () {
      this.handleInputChange = debounce(this.handleInputChange, this.debounce || 0)
    },

    methods: {
      handleInputChange () {
        this.$emit('input', this.dataValue)
      }
    },

    // Watch
    watch: {
      // 'inputValue': {
      //   handler: function (val, oldVal) {
      //     if (val || val === '' || typeof (val) === 'undefined' || !isNaN(val)) {
      //       if (val !== this.value || oldVal) {
      //         this.handleInputChange()
      //       }
      //     }
      //   }
      // },
      'value': {
        handler: function (val, oldVal) {
          this.dataValue = val
          // if (typeof (val) === 'string' || typeof (val) === 'undefined' || !isNaN(val)) {
          //   this.inputValue = val
          // }
        }
      }
    }
  }
</script>
