import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilNotes,
  cilSettings,
  cilSpeedometer,
  cilUser,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/index/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    badge: {
      color: 'info',
    },
  },
  {
    component: CNavGroup,
    name: 'Report',
    icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Form Control',
        to: '/forms/form-control',
      },
      {
        component: CNavItem,
        name: 'Floating Labels',
        to: '/forms/floating-labels',
      },
      {
        component: CNavItem,
        name: 'Layout',
        to: '/forms/layout',
      },
      {
        component: CNavItem,
        name: 'Validation',
        to: '/forms/validation',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Setup',
    to: '/base',
    icon: <CIcon icon={cilSettings} customClassName="nav-icon" />,
    items: [
            {
        component: CNavItem,
        name: 'KPI List',
        to: '/index/kpiList',
      },
      {
        component: CNavItem,
        name: 'Agency',
        to: '/index/agencyList',
      },
      {
        component: CNavItem,
        name: 'Product',
        to: '/index/productList',
      },
      {
        component: CNavItem,
        name: 'Distributor',
        to: '/index/distributorList',
      },

    ],
  },
  {
    component: CNavGroup,
    name: 'User',
    to: '/user',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'User List',
        to: '/index/userList',
      },
      {
        component: CNavItem,
        name: 'Role',
        to: '/index/roleList',
      },
    ],
  },


]

export default _nav
