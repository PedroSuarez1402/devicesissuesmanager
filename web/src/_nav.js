/* eslint-disable prettier/prettier */
import React from 'react'
import CIcon from '@coreui/icons-react'
import { cilApplications, cilBell, cilSpeedometer, cilUser, cilHome} from '@coreui/icons'
import { CNavItem, CNavTitle } from '@coreui/react'

const generateNav = (role) => {
  const navItems = [
    {
      component: CNavItem,
      name: 'Dashboard',
      to: '/dashboard',
      icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
      badge: {
        color: 'info',
      },
    },
    {
      component: CNavTitle,
      name: 'Sistema',
    },
    {
      component: CNavItem,
      name: 'Devices',
      to: '/devices',
      icon: <CIcon icon={cilApplications} customClassName="nav-icon" />,
    },
    {
      component: CNavItem,
      name: 'Issues',
      to: '/issues',
      icon: <CIcon icon={cilBell} customClassName="nav-icon" />,
    },
    // Solo mostrar el módulo 'Users' si el rol es 'admin'
    role === 'admin' && {
      component: CNavItem,
      name: 'Users',
      to: '/users',
      icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
    },
    {
      component: CNavItem,
      name: 'Rooms',
      to: '/rooms',
      icon: <CIcon icon={cilHome} customClassName="nav-icon" />,
    },
  ]

  // Filtrar elementos no válidos (como el ítem 'Users' si no es admin)
  return navItems.filter(Boolean)
}

export default generateNav
