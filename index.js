import Vue from 'vue'

import XenButton from './Button'
import XenIconButton from '@/components/xen-components/IconButton'
import XenCard from '@/components/xen-components/Card'
import XenCardHeader from '@/components/xen-components/CardHeader'
import XenCardContent from '@/components/xen-components/CardContent'
import XenCardActions from '@/components/xen-components/CardActions'
import XenInput from '@/components/xen-components/Input'
import XenPageToolbar from '@/components/xen-components/PageToolbar'
import XenSidebar from '@/components/xen-components/Sidebar'
import XenList from '@/components/xen-components/List'
import XenListItem from '@/components/xen-components/ListItem'
import XenListItemCustom from '@/components/xen-components/ListItemCustom'
import XenDivider from '@/components/xen-components/Divider'
import XenLoadingSpinner from '@/components/xen-components/LoadingSpinner'
import XenCheckbox from '@/components/xen-components/Checkbox'
import XenSelect from '@/components/xen-components/Select'
import XenDialog from '@/components/xen-components/Dialog'
import XenTabs from '@/components/xen-components/Tabs'
import XenTextArea from '@/components/xen-components/TextArea'
import XenChips from '@/components/xen-components/Chips'
import XenDropdown from '@/components/xen-components/Dropdown'

const install = () => {
  console.log(XenButton, Vue)
  // Vue.component(XenButton, 'xen-button')
  Vue.component('xen-button', XenButton)
  Vue.component('xen-icon-button', XenIconButton)
  Vue.component('xen-card', XenCard)
  Vue.component('xen-card-header', XenCardHeader)
  Vue.component('xen-card-content', XenCardContent)
  Vue.component('xen-card-actions', XenCardActions)
  Vue.component('xen-input', XenInput)
  Vue.component('xen-page-toolbar', XenPageToolbar)
  Vue.component('xen-sidebar', XenSidebar)
  Vue.component('xen-list', XenList)
  Vue.component('xen-list-item', XenListItem)
  Vue.component('xen-list-item-custom', XenListItemCustom)
  Vue.component('xen-divider', XenDivider)
  Vue.component('xen-loading-spinner', XenLoadingSpinner)
  Vue.component('xen-checkbox', XenCheckbox)
  Vue.component('xen-select', XenSelect)
  Vue.component('xen-dialog', XenDialog)
  Vue.component('xen-tabs', XenTabs)
  Vue.component('xen-text-area', XenTextArea)
  Vue.component('xen-dropdown', XenDropdown)
  Vue.component('xen-chips', XenChips)
}

export default install
