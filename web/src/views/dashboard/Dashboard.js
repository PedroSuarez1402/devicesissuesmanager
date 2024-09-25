/* eslint-disable prettier/prettier */
import React,{useEffect, useState} from 'react'

import { CCol, CRow} from '@coreui/react'

import clienteAxios from '../../config/axios'

import WidgetsDropdown from '../widgets/WidgetsDropdown'
import Issues from '../issues/Issues'
import Users from '../users/Users'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
  const [role, setRole] = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserRole = async () => {
      const token = localStorage.getItem('token');
        if(!token){
          navigate('/login');
          return
        }
      try {
        
        const response = await clienteAxios.get('/auth/me',{
          headers: { Authorization: `Bearer ${token}`}
        });
        setRole(response.data.role)
      } catch (error) {
        console.error('Error en la consulta de users: ', error)
        localStorage.removeItem('token')
        navigate('/login')
      }finally{
        setLoading(false)
      }
    }
    fetchUserRole()
  }, [navigate])

  if (loading) {
    return <div>Cargando...</div>
  }

  return (
    <>
      <WidgetsDropdown className="mb-4" /> {/*Cuadros en el dashboard*/}
      <br></br>
      <CRow>
        <CCol xs>
          {role === 'admin' && (
            <Users/>
          )}
          {role==='student' && (
            <Issues/>
          )}
        </CCol>
      </CRow>
    </>
  )
}

export default Dashboard
