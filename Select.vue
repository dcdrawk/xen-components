<template>
  <div class="xen-select-container" v-bind:class="{ 'has-value': selectValue, 'xen-dense': dense, 'focus': focused, 'disabled': disabled}" v-on-clickaway="away">
    <div ref="select" class="xen-select" @click="openSelect(); focused = true">
      <label v-if="label">{{label}}</label>
        <span v-if="selectValue">{{selectValue}}</span>
      <!-- <span v-if="selectValue && !optionKey">{{selectValue}}</span> -->
      <!-- <span v-if="selectValue && optionKey">{{selectValue[optionKey]}}</span> -->
      <span class="xen-placeholder" v-if="placeholder && !selectValue">{{ placeholder }}</span>
      <i class="material-icons">arrow_drop_down</i>
      <div class="xen-input-border"></div>
      <transition name="input-focus">
        <div v-if="focused" class="xen-focus-border" :class="{ 'xen-theme-red': error }" ></div>
      </transition>
    </div>
    <transition name="fade">
      <div class="xen-select-option-container" v-show="open" ref="container" v-focus="focused" @focus="focused = true" @blur="focused = false">
        <div class="xen-select-option" v-for="(option, key, index) in options" @click.stop="selectOption(option, key, index)">
          <span v-if="!optionKey">{{option}}</span>
          <span v-else>{{option[optionKey]}}</span>
        </div>
      </div>
    </transition>

    <div ref="backdrop" class="xen-select-backdrop" v-show="open" @click="closeSelect()"></div>

  </div>
</template>

<style lang="scss">
  @import './styles/select';
</style>

<script>
  import { focus } from 'vue-focus'
  import { directive as onClickaway } from 'vue-clickaway'
  import ScrollHelper from './classes/ScrollHelper'

  export default {
    // Directives
    directives: { focus: focus, onClickaway: onClickaway },

    // Props
    props: [
      'label',
      'value',
      'options',
      'placeholder',
      'dense',
      'optionKey',
      'optionValue',
      'disabled',
      'error'
    ],

    // Methods
    methods: {

      away () {
        if (this.focused === true) {
          this.focused = false
        }
      },

      openSelect () {
        this.open = true
        ScrollHelper.disable()
        document.body.appendChild(this.$refs.backdrop)
        document.body.appendChild(this.$refs.container)
        setTimeout(() => {
          this.$refs.container.style.width = this.$refs.select.clientWidth + 32 + 'px'
          let optionHeight = this.dense ? 40 : 48
          let container = this.$refs.container
          let selectRect = this.$refs.select.getBoundingClientRect()

          let offset = this.selectedIndex * optionHeight
          let scrollOffset = this.selectedIndex > 4 ? (this.selectedIndex - 4) * optionHeight : 0
          // let totalYOffset = selectRect.top - offset - 19 + scrollOffset
          let padding = this.dense ? 14 : 19
          let totalYOffset = selectRect.top - offset - padding + scrollOffset

          // Check if it's within the bounds of the window
          if (totalYOffset < 8) {
            totalYOffset = 8
          }

          if (totalYOffset + container.clientHeight > window.innerHeight - 8) {
            totalYOffset = window.innerHeight - 8 - container.clientHeight
          }

          container.scrollTop = scrollOffset
          container.style.transform = `translate3d(${selectRect.left - 16}px, ${totalYOffset + 1}px, 0)`
        }
        , 0)
      },

      closeSelect () {
        this.$nextTick(() => {
          if (this.open && !this.closing) {
            this.open = false
            this.closing = true
            ScrollHelper.enable()
            setTimeout(() => {
              document.body.removeChild(this.$refs.container)
              document.body.removeChild(this.$refs.backdrop)
              this.open = false
              this.closing = false
            }, 300)
          }
        })
        // document.querySelector('html').classList.remove('disable-scroll')
      },

      selectOption (option, key, index) {
        this.$nextTick(() => {
          if (this.open && !this.closing) {
            if (this.optionValue) {
              console.log('selected')
              this.$emit('select', option[this.optionValue])
            }
            this.selectValue = this.optionKey ? option[this.optionKey] : option
            this.selectedIndex = index || index === 0 ? index : key
            this.closeSelect()
            ScrollHelper.enable()
          }
        })
      },

      getSelectedIndex () {
        setTimeout(() => {
        // this.$nextTick(() => {
          if (this.selectValue && this.options && typeof (this.selectValue) !== 'undefined' && typeof (this.options) !== 'undefined') {
            // this.options.forEach((item, index) => {
            let index = 0
            for (let i in this.options) {
              let item = this.options[i]
              let option = this.optionKey ? item[this.optionKey] : item
              if (option === this.selectValue) {
                this.selectedIndex = index
              }
              index++
            }
            // })
          }
        // })
        }, 0)
      }
    },

    // Data
    data () {
      return {
        open: false,
        selectedIndex: 0,
        selectValue: this.value || '',
        width: 200,
        focused: false,
        closing: false
      }
    },

    // Mounted
    mounted () {
      this.getSelectedIndex()
      setTimeout(() => {
        this.$refs.container.style.width = this.$refs.select.clientWidth + 48 + 'px'
      })
    },

    // Watch
    watch: {
      'selectValue': {
        handler: function (val, oldVal) {
          if (val) {
            this.$emit('input', this.selectValue)
          }
        }
      },
      'value': {
        handler: function (val, oldVal) {
          this.selectValue = val
          if (val === undefined) {
            this.selectedIndex = 0
          }
          // this.$emit('input', this.selectValue)
        }
      },
      'options': {
        handler: function (val, oldVal) {
          if (this.selectValue && this.selectValue !== '') {
            this.getSelectedIndex()
          } else {
            this.selectedIndex = 0
          }
          // this.$emit('input', this.selectValue)
        }
      }
    }
  }
</script>
