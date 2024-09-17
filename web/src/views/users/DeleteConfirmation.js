/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
import React from 'react'
import { CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from '@coreui/react'

const DeleteConfirmation = ({ user, onDelete, onClose }) => {
  return (
    <CModal visible={true} onClose={onClose}>
      <CModalHeader onClose={onClose}>
        <CModalTitle>Delete User</CModalTitle>
      </CModalHeader>
      <CModalBody>
        Are you sure you want to delete the user <strong>{user.name}</strong>?
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={onClose}>
          Cancel
        </CButton>
        <CButton color="danger" onClick={() => onDelete(user._id)}>
          Delete
        </CButton>
      </CModalFooter>
    </CModal>
  )
}

export default DeleteConfirmation
