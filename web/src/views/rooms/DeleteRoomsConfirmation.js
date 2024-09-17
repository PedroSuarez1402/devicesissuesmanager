/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
import React from "react";
import { CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from '@coreui/react'

const DeleteRoomsConfirmation = ({room, onDelete, onClose}) => {
    return (
        <CModal visible={true} onClose={onClose}>
          <CModalHeader onClose={onClose}>
            <CModalTitle>Delete Room</CModalTitle>
          </CModalHeader>
          <CModalBody>
            Are you sure you want to delete the room <strong>{room.nombre}</strong>?
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={onClose}>
              Cancel
            </CButton>
            <CButton color="danger" onClick={() => onDelete(room._id)}>
              Delete
            </CButton>
          </CModalFooter>
        </CModal>
      )
}

export default DeleteRoomsConfirmation