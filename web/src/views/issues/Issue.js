/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import clienteAxios from '../../config/axios'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCardText,
  CCardTitle,
  CCol,
  CForm,
  CFormTextarea,
  CRow,
} from '@coreui/react'

const Issue = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [issue, setIssue] = useState(null)
  const [note, setNote] = useState('')
  const [status, setStatus] = useState('')
  const [devicesStatus, setDevicesStatus] = useState('')
  const user = JSON.parse(localStorage.getItem('user'))

  const fetchIssue = async () => {
    try {
      const response = await clienteAxios.get(`/issues/${id}`)
      setIssue(response.data)
      setStatus(response.data.status)
    } catch (error) {
      console.error('Error fetching issue:', error)
    }
  }
  useEffect(() => {
    fetchIssue()
  }, [id])

  //funcion para agregar una nota
  const handleAddNote = async () => {
    try {
      await clienteAxios.post(`/issues/${id}/addNote`, {
        content: note,
        creatorName: 'Admin',
      })
      setNote('')

      setNote('')
      fetchIssue()
    } catch (error) {
      console.error('Error adding Note: ', error)
    }
  }

  //funcion para el estado de la incidencia
  const handleCloseIssue = async () => {
    try {
      await clienteAxios.put(`/issues/${id}`, {
        status: 'Closed',
        deviceStatus: 'Fixed',
      })

      setStatus('Closed')
      navigate('/issues')
    } catch (error) {
      console.error('Error closing Issue: ', error)
    }
  }

  const handleEditNote = async (noteId) => {
    const newContent = prompt('Edit the note: ', note)
    if (!newContent) return

    try {
      await clienteAxios.put(`/issues/${id}/notes/${noteId}`, { content: newContent })
      fetchIssue()
    } catch (error) {
      console.error('Error editing note: ', error)
    }
  }
  const handleDeleteNote = async (noteId) => {
    if (!window.confirm('Are you sure you want to delete this note?')) return

    try {
      await clienteAxios.delete(`/issues/${id}/notes/${noteId}`)
      fetchIssue()
    } catch (error) {
      console.error('Error deleting note: ', error)
    }
  }

  const handleReopenIssue = async () => {
    try {
      await clienteAxios.put(`/issues/${id}`, {
        status: 'Open',
      })
      setStatus('Open')
      navigate('/issues')
    } catch (error) {
      console.error('Error reopening Issue: ', error)
    }
  }
  if (!issue) {
    return <div>Loading...</div>
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard>
          <CCardHeader>
            <strong>Issue Details</strong>
          </CCardHeader>
          <CCardBody>
            <CCardTitle>
              <strong>Device:</strong> {issue.device.code} - {issue.device.brand} <br />
              <strong>Room:</strong> {issue.device.room?.nombre || 'No room'} - Tower{' '}
              {issue.device.room?.torre || 'No tower'}
            </CCardTitle>
            <CCardText>
              <strong>Created by:</strong> {issue.creator.name} <br />
              <strong>Type:</strong> {issue.type} <br />
              <strong>Description:</strong> {issue.description || 'No description'} <br />
              <strong>Device Status:</strong> {issue.deviceStatus || 'No status'} <br />
              <strong>Status:</strong> {issue.status || 'No status'}
            </CCardText>

            {/* Mostrar notas si las hay */}
            {issue.notes?.length > 0 && (
              <div>
                <strong>Notes:</strong>
                <div className="d-flex flex-wrap">
                  {issue.notes.map((note, index) => (
                    <CCard key={index} style={{ width: '18rem', margin: '10px' }}>
                      <CCardHeader>
                        {note.creatorName} (on {new Date(note.createdAt).toLocaleDateString()})
                      </CCardHeader>
                      <CCardBody>
                        <CCardText>{note.content}</CCardText>
                        {user.role === 'admin' && (
                          <>
                            <CButton
                              color="warning"
                              size="sm"
                              className="text-white"
                              style={{ marginRight: '5px' }}
                              onClick={() => handleEditNote(note._id)}
                            >
                              Edit
                            </CButton>
                            <CButton
                              color="danger"
                              size="sm"
                              className="text-white"
                              onClick={() => handleDeleteNote(note._id)}
                            >
                              Delete
                            </CButton>
                          </>
                        )}
                      </CCardBody>
                    </CCard>
                  ))}
                </div>
              </div>
            )}

            {status === 'Open' && user.role === 'admin' && (
              <CForm>
                <CFormTextarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Add a note about the solution"
                />
                <CButton color="primary" onClick={handleAddNote} style={{ marginTop: '10px' }}>
                  Add Note
                </CButton>
              </CForm>
            )}
            {status === 'Open' && user.role === 'admin' && (
              <CButton
                color="success"
                onClick={handleCloseIssue}
                style={{ marginTop: '10px' }}
                className="text-white"
              >
                Close Issue
              </CButton>
            )}
            {/* Botón para reabrir issue, visible solo si está cerrada y el usuario es admin */}
            {status === 'Closed' && user.role === 'admin' && (
              <CButton
                color="danger"
                onClick={handleReopenIssue}
                style={{ marginTop: '10px' }}
                className="text-white"
              >
                Reopen Issue
              </CButton>
            )}
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Issue
