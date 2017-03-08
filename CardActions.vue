<template>
  <div class="xen-card-actions">
    <slot></slot>
  </div>
</template>

<style lang="scss">
/*.xen-card-actions .xen-button-container {
	vertical-align: middle;
}*/
.xen-card-actions {
  margin-right: 16px;
  margin-bottom: 16px;
  .xen-button-container {
    display: inline-flex;
    margin-right: 0;
    margin-bottom: 0;
    margin-top: 0;
  }
}
</style>

<script>
  export default {
    // Name
    name: 'xen-card-actions'

  }
</script>
