<template>
  <div class="xen-card-content">
    <slot></slot>
  </div>
</template>

<style lang="scss">
  .xen-card-content {
    padding: 16px 16px 16px 16px;

    &.xen-no-margin {
      margin: 0;
    }

    p:last-of-type {
      margin-bottom: 0;
    }
  }

</style>

<script>
  export default {
    // Name
    name: 'xen-card-content'

  }
</script>
