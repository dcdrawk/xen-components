<template>
  <div class="xen-page-toolbar">
    <xen-toolbar class="toolbar">
      <xen-icon-button class="xen-menu-button" :class="{}" icon="menu"
      @click.native="toggle()">menu</xen-icon-button>
      <span class="title xen-page-title">{{ title || 'Page Title' }}</span>
      <xen-icon-button v-if="add" class="xen-menu-button dnd-add" :class="{}" icon="add"
      @click.native="toggle()"></xen-icon-button>
    </xen-toolbar>
  </div>
</template>

<style lang="scss" scoped>
@import './styles/variables';

.toolbar {
  display: flex;
  align-items: center;
}

.xen-page-toolbar {
  position: fixed;
  width: 100%;
  padding: 8px;
  top: 0;
  z-index: 8;
}

i {
  margin-right: 16px;
}

.xen-menu-button {
  margin: 0 8px 0 0;
}

.xen-toolbar {
  overflow: hidden;
  text-overflow: ellipsis;
}

.title {
  vertical-align: middle;
  line-height: 1.2;
  white-space: nowrap;
}
.dnd-add {
  position: absolute;
  right: 0;
}
</style>

<script>
  import XenToolbar from './Toolbar'
  import XenIconButton from './IconButton'

  export default {
    // Name
    name: 'xen-page-toolbar',

    // Props
    props: [
      'title',
      'add'
    ],

    // Components
    components: {
      XenToolbar,
      XenIconButton
    },

    methods: {
      toggle () {
        // console.log('toggle')
        // console.log(this.$bus)
        this.$bus.$emit('toggle-sidenav')
      }
    }

  }
</script>
