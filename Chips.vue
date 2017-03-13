<template>
  <div class="xen-chip-container" v-bind:class="{ 'focused': focused, 'has-value': chipValues ? value || chipValues.length > 0 : value || false }">
    <label class="xen-label" v-if="label">{{label}}</label>
    <span class="xen-chip" v-for="(chip, index) in chips"><span>{{ chip }}</span><i v-if="!readOnly" class="material-icons xen-chip-remove" @click="removeChip(index);">close</i></span>
    <input v-if="!readOnly" v-model="value" v-focus="focused" @focus="focused = true" @blur="focused = false" :placeholder="placeholder" @keyup.enter="addChip(value)" @keydown.delete="removeLastChip(value);"/>
    <transition name="input-focus">
      <div v-if="focused" class="xen-focus-border" :class="{ 'xen-theme-red': error }" ></div>
    </transition>
  </div>
</template>

<style lang="scss" scoped>
  @import './styles/chips';
</style>

<script>
  import { focus } from 'vue-focus'

  export default {
    // Name
    name: 'xen-chips',

    // Directives
    directives: { focus: focus },
    props: [
      'label',
      'chips',
      'placeholder',
      'readOnly',
      'error'
    ],

    // Data
    data () {
      return {
        focused: false,
        value: '',
        chipValues: this.chips || []
      }
    },

    // Mounted
    mounted () {
      this.checkChips()
      // if (!this.chipValues) {
      //   this.chipValues = []
      // }
    },

    // Methods
    methods: {
      // Add a chip
      addChip (value) {
        this.checkChips()
        if (!this.chipValues.includes(value) && value.length > 0) {
          this.chipValues.push(value)
        }
        this.value = ''
      },

      checkChips () {
        if (!this.chipValues) {
          this.chipValues = []
        }
      },

      // Remove a chip
      removeChip (index) {
        this.chipValues.splice(index, 1)
      },

      // If the value is empty, remove the last chip
      removeLastChip (value) {
        console.log(value)
        if (value.length === 0) {
          this.chipValues.pop()
        }
      }
    },

    // Watch
    watch: {
      'chipValues': {
        handler: function (val, oldVal) {
          if (val !== this.chips || oldVal) {
            this.$emit('input', this.chipValues)
          }
        }
      },
      'chips': {
        handler: function (val, oldVal) {
          // this.inputValue = this.type === 'number' ? window.parseInt(this.value) : this.value
          this.chipValues = val
        }
      }
    }
  }
</script>
