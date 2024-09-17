/* eslint-disable prettier/prettier */
import React,{useEffect, useState} from 'react'
import classNames from 'classnames'

import {CAvatar, CButton, CButtonGroup, CCard, CCardBody, CCardFooter, CCardHeader, CCol, CProgress, CRow, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow,} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cibCcAmex, cibCcApplePay, cibCcMastercard, cibCcPaypal, cibCcStripe, cibCcVisa, cibGoogle, cibFacebook, cibLinkedin, cifBr, cifEs, cifFr, cifIn, cifPl, cifUs, cibTwitter, cilCloudDownload, cilPeople, cilUser, cilUserFemale, } from '@coreui/icons'
import clienteAxios from '../../config/axios'

import WidgetsBrand from '../widgets/WidgetsBrand'
import WidgetsDropdown from '../widgets/WidgetsDropdown'
import MainChart from './MainChart'
import Issues from '../issues/Issues'
import Users from '../users/Users'

const Dashboard = () => {
  const [users, guardarUsers] = useState([])
  const user = JSON.parse(localStorage.getItem("user"))

  useEffect(() => {
    const consultarAPI = async () => {
      try {
        if(user.role === 'admin'){
          const usersConsulta = await clienteAxios.get('/users')
        guardarUsers(usersConsulta.data)
        }
        
      } catch (error) {
        console.error('Error en la consulta de users: ', error)
      }
    }
    consultarAPI()
  }, [])

  return (
    <>
      <WidgetsDropdown className="mb-4" /> {/*Cuadros en el dashboard*/}
      <br></br>
      <CRow>
        <CCol xs>
          {user.role === 'admin' && (
            <Users/>
          )}
          {user.role==='student' && (
            <Issues/>
          )}
        </CCol>
      </CRow>
    </>
  )
}

export default Dashboard
