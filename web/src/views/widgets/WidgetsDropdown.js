/* eslint-disable prettier/prettier */
import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'

import { CRow, CCol, CDropdown, CDropdownMenu, CDropdownItem, CDropdownToggle, CWidgetStatsA,} from '@coreui/react'
import { getStyle } from '@coreui/utils'
import { CChartBar, CChartLine } from '@coreui/react-chartjs'
import CIcon from '@coreui/icons-react'
import { cilArrowBottom, cilArrowTop, cilOptions } from '@coreui/icons'
import {useNavigate} from 'react-router-dom'
import clienteAxios from '../../config/axios'

const WidgetsDropdown = () => {
  const navigate = useNavigate();

  const [contadorUsers, guardarUsers] = useState({ count: 0, chartData: []})
  const [contadorRooms, guardarRooms] = useState({ count: 0, chartData: []})
  const [contadorDevices, guardarDevices] = useState({ count: 0, chartData: []})
  const [issuesData, guardarIssues] = useState({ count: 0, chartData: [] })
  const user = JSON.parse(localStorage.getItem("user"))


  //funcion para agrupar datos por fecha
  const agruparPorFecha = (datos) => {
    const agrupados = datos.reduce((acc, item) => {
      const fecha = item.createdAt;
      acc[fecha] = (acc[fecha] || 0) + 1;
      return acc
    }, {});

    const labels = Object.keys(agrupados);
    const valores = Object.values(agrupados);

    return {labels, valores};
  };

  useEffect(() => {
    const consultarAPI = async () => {
      try {
        if (user.role === 'admin') {
          // Obtener usuarios solo si es admin
          const usersResponse = await clienteAxios.get('/users');
          const users = usersResponse.data;
  
          const { labels: userLabels, valores: userValores } = agruparPorFecha(users.map(user => ({
            createdAt: new Date(user.createdAt).toLocaleDateString(),
          })));
  
          guardarUsers({
            count: users.length,
            chartData: {
              labels: userLabels,
              valores: userValores,
            },
          });
        }
  
        // Obtener rooms, devices e issues sin restricciones de rol
        const roomsResponse = await clienteAxios.get('/rooms');
        const rooms = roomsResponse.data;
  
        const { labels: roomLabels, valores: roomValores } = agruparPorFecha(rooms.map(room => ({
          createdAt: new Date(room.createdAt).toLocaleDateString(),
        })));
        guardarRooms({
          count: rooms.length,
          chartData: {
            labels: roomLabels,
            valores: roomValores,
          },
        });
  
        const devicesResponse = await clienteAxios.get('/devices');
        const devices = devicesResponse.data;
  
        const { labels: deviceLabels, valores: deviceValores } = agruparPorFecha(devices.map(device => ({
          createdAt: new Date(device.createdAt).toLocaleDateString(),
        })));
        guardarDevices({
          count: devices.length,
          chartData: {
            labels: deviceLabels,
            valores: deviceValores,
          },
        });
  
        const issuesResponse = await clienteAxios.get('/issues');
        const issues = issuesResponse.data;
  
        const { labels: issuesLabels, valores: issueValores } = agruparPorFecha(issues.map(issue => ({
          createdAt: new Date(issue.createdAt).toLocaleDateString(),
        })));
        guardarIssues({
          count: issues.length,
          chartData: {
            labels: issuesLabels,
            valores: issueValores,
          },
        });
      } catch (error) {
        console.error('Error al consultar api ', error);
      }
    };
  
    consultarAPI();
  }, []);
  const handleRedirect = (path) => {
    navigate(path)
  }

  return (
    <CRow xs={{ gutter: 4 }}>
      {user.role === 'admin' && (
        <CCol sm={6} xl={4} xxl={3}>
        <CWidgetStatsA
          color="primary"
          value={`${contadorUsers.count} Users`}
          title="Users"
          onClick={() => handleRedirect('/users')}
          style={{cursor: 'pointer'}}
          action={
            <CDropdown alignment="end">
              
            </CDropdown>
          }
          chart={
            <CChartBar
              className="mt-3 mx-3"
              style={{ height: '70px' }}
              data={{
                labels: contadorUsers.chartData.labels || [],
                datasets: [
                  {
                    label: 'Users ',
                    backgroundColor: 'rgba(255,255,255,.2)',
                    borderColor: 'rgba(255,255,255,.55)',
                    data: contadorUsers.chartData.valores || [],
                    barPercentage: 0.6,
                  },
                ],
              }}
              options={{
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    display: false,
                  },
                },
                scales: {
                  x: {
                    grid: {
                      display: false,
                      drawTicks: false,
                    },
                    ticks: {
                      display: false,
                    },
                  },
                  y: {
                    border: {
                      display: false,
                    },
                    grid: {
                      display: false,
                      drawBorder: false,
                      drawTicks: false,
                    },
                    ticks: {
                      display: false,
                    },
                  },
                },
              }}
            />
          }
        />
      </CCol>
      )}
      
      <CCol sm={6} xl={4} xxl={3}>
        <CWidgetStatsA
          color="info"
          value={`${contadorRooms.count} Rooms`}
          title="Rooms"
          onClick={() => handleRedirect('/rooms')}
          style={{cursor: 'pointer'}}
          chart={
            <CChartBar 
              className="mt-3 mx-3"
              style={{height: '70px'}}
              data={{
                labels: contadorRooms.chartData.labels || [],
                datasets: [
                  {
                    label:'Rooms',
                    backgroundColor: 'rgba(255,255,255,.2)',
                    borderColor: 'rgba(255,255,255,.55)',
                    data: contadorRooms.chartData.valores || [],
                    barPercentage: 0.6,
                  },
                ],
              }}
              options={{
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    display: false,
                  },
                },
                scales: {
                  x: {
                    grid: {
                      display: false,
                      drawTicks: false,
                    },
                    ticks: {
                      display: false,
                    },
                  },
                  y: {
                    border: {
                      display: false,
                    },
                    grid: {
                      display: false,
                      drawBorder: false,
                      drawTicks: false,
                    },
                    ticks: {
                      display: false,
                    },
                  },
                },
              }}
            />
          }
        />
      </CCol>
      <CCol sm={6} xl={4} xxl={3}>
        <CWidgetStatsA
          color="warning"
          value={`${contadorDevices.count} Devices`}
          title="Devices"
          onClick={() => handleRedirect('/devices')}
          style={{ cursor: 'pointer' }}
          chart={
            <CChartBar
              className="mt-3 mx-3"
              style={{ height: '70px' }}
              data={{
                labels: contadorDevices.chartData.labels || [],
                datasets: [
                  {
                    label: 'Devices ',
                    backgroundColor: 'rgba(255,255,255,.2)',
                    borderColor: 'rgba(255,255,255,.55)',
                    data: contadorDevices.chartData.valores || [],
                    barPercentage: 0.6,
                  },
                ],
              }}
              options={{
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    display: false,
                  },
                },
                scales: {
                  x: {
                    grid: {
                      display: false,
                      drawTicks: false,
                    },
                    ticks: {
                      display: false,
                    },
                  },
                  y: {
                    border: {
                      display: false,
                    },
                    grid: {
                      display: false,
                      drawBorder: false,
                      drawTicks: false,
                    },
                    ticks: {
                      display: false,
                    },
                  },
                },
              }}
            />
          }
        />
      </CCol>
      <CCol sm={6} xl={4} xxl={3}>
        <CWidgetStatsA
          color="danger"
          value={`${issuesData.count} Issues`}
          title="Issues in time"
          onClick={() => handleRedirect('/issues')}
          style={{ cursor: 'pointer' }}
          chart={
            <CChartLine
              className="mt-3 mx-3"
              style={{ height: '70px' }}
              data={{
                labels: issuesData.chartData.labels || [],
                datasets: [
                  {
                    label: 'Issues in time ',
                    backgroundColor: 'rgba(255,255,255,.2)',
                    borderColor: 'rgba(255,255,255,.55)',
                    data: issuesData.chartData.valores || [],
                    barPercentage: 0.6,
                  },
                ],
              }}
              options={{
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    display: false,
                  },
                },
                scales: {
                  x: {
                    grid: {
                      display: false,
                      drawTicks: false,
                    },
                    ticks: {
                      display: false,
                    },
                  },
                  y: {
                    border: {
                      display: false,
                    },
                    grid: {
                      display: false,
                      drawBorder: false,
                      drawTicks: false,
                    },
                    ticks: {
                      display: false,
                    },
                  },
                },
              }}
            />
          }
        />
      </CCol>
    </CRow>
  )
}


export default WidgetsDropdown
