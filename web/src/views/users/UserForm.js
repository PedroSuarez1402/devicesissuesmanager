/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react'
import clienteAxios from '../../config/axios'
import { CButton, CForm, CFormInput, CFormLabel, CFormSelect, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from '@coreui/react'

const UserForm = ({ user, onSave, onClose }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [role, setRole] = useState('student')
  const [password, setPassword] = useState('')

  useEffect(() => {
    if (user) {
      setName(user.name)
      setEmail(user.email)
      setRole(user.role)
      // Password remains empty when editing unless the admin provides a new one
      setPassword('') 
    }
  }, [user])

  const handleSubmit = async () => {
    try {
      const userData = { name, email, role }
      
      if (password) {
        userData.password = password // Include password if it's provided
      }

      if (!user) {
        await clienteAxios.post('/users', userData)
      } else {
        await clienteAxios.put(`/users/${user._id}`, userData)
      }

      onSave()
    } catch (error) {
      console.error('Error saving user:', error)
    }
  }

  return (
    <CModal visible={true} onClose={onClose}>
      <CModalHeader onClose={onClose}>
        <CModalTitle>{user ? 'Edit User' : 'Create User'}</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CForm>
          <div className="mb-3">
            <CFormLabel>Name</CFormLabel>
            <CFormInput value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div className="mb-3">
            <CFormLabel>Email</CFormLabel>
            <CFormInput
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <CFormLabel>Role</CFormLabel>
            <CFormSelect value={role} onChange={(e) => setRole(e.target.value)} required>
              <option>Select Role</option>
              <option value="student">Student</option>
              <option value="admin">Admin</option>

            </CFormSelect> 
          </div>
          <div className="mb-3">
            <CFormLabel>{user ? 'New Password (leave blank to keep current)' : 'Password'}</CFormLabel>
            <CFormInput
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={user ? 'Leave blank to keep current password' : ''}
              required={!user}
            />
          </div>
        </CForm>
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={onClose}>
          Cancel
        </CButton>
        <CButton color="primary" onClick={handleSubmit}>
          Save
        </CButton>
      </CModalFooter>
    </CModal>
  )
}

export default UserForm
