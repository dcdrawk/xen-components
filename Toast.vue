<template>
  <transition name="toast">
    <div class="xen-toast-container" v-if="dataShow">
      <div class="xen-toast">
        <span>{{ text }}</span>
        <xen-button v-if="action" @click.native="action">{{ actionText }}</xen-button>
      </div>
    </div>
  </transition>
</template>

<style lang="scss">
  @import './styles/toasts';
</style>

<script>
import XenButton from './Button.vue'
// import ToastQueue from './classes/ToastQueue'

export default {
  // Components
  components: {
    XenButton
  },

  // Props
  props: [
    'action',
    'delay', // Delay between queued toasts (default 500ms)
    'duration', // Duration of the toast (default 3000ms)
    'show', // Value that triggers a queue event
    'text', // Text to display
    'type' // The type of the toast (e.g. 'success', 'warning', 'error')
  ],

  // Data
  data () {
    return {
      dataShow: false,
      dataText: undefined,
      dataType: undefined,
      processingQueue: false,
      queue: []
    }
  },

  methods: {
    // Queue the toast
    queueToast () {
      // console.log('show the toast...')
      let toast = {
        text: this.text,
        type: this.type
      }
      this.queue.push(Object.assign({}, toast))
      if (this.processingQueue === false) {
        this.processQueue() // Process the queue if it's not doing so already
      }
      this.$nextTick(() => {
        // console.log('hide the toast...')
        this.$emit('queue')
      })
    },

    // Process the queue of toasts
    processQueue () {
      this.processingQueue = true
      this.dataShow = true
      this.dataText = this.queue[0].text
      this.dataType = this.queue[0].type

      setTimeout(() => {
        this.dataShow = false
        this.queue.shift()

        // Continue to process the queue if there are toasts left
        if (this.queue.length > 0) {
          setTimeout(() => {
            this.processQueue()
          }, this.delay || 500)
        } else {
          this.processingQueue = false
        }
      }, this.duration || 3000)
    }
  },

  // Watch
  watch: {
    show (value) {
      // console.log('show changed')
      if (value) {
        this.queueToast()
      }
    }
  }
}
</script>
