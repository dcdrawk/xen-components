<template>
  <div class="xen-chip-container" v-bind:class="{ 'focused': focused }">
    <span class="xen-chip" v-for="(chip, index) in chips"><span>{{ chip }}</span><i v-if="!readOnly" class="material-icons xen-chip-remove" @click="removeChip(index);">close</i></span>
    <input v-if="!readOnly" v-model="value" v-focus="focused" @focus="focused = true" @blur="focused = false" :placeholder="placeholder" @keyup.enter="addChip(value)" @keydown.delete="removeLastChip(value);"/>
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
      'readOnly'
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
      // if (!this.chipValues) {
      //   this.chipValues = []
      // }
    },

    // Methods
    methods: {
      // Add a chip
      addChip (value) {
        if (!this.chipValues.includes(value) && value.length > 0) {
          this.chipValues.push(value)
        }
        this.value = ''
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
