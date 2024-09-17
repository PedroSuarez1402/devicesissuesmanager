/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
import React from "react";
import { CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from '@coreui/react'

const DeleteDevicesConfirmation = ({device, onDelete, onClose}) => {
    return (
        <CModal visible={true} onClose={onClose}>
          <CModalHeader onClose={onClose}>
            <CModalTitle>Delete Device</CModalTitle>
          </CModalHeader>
          <CModalBody>
            Are you sure you want to delete the device <strong>{device.code}:</strong>{device.brand}?
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={onClose}>
              Cancel
            </CButton>
            <CButton color="danger" className="text-white" onClick={() => onDelete(device._id)}>
              Delete
            </CButton>
          </CModalFooter>
        </CModal>
      )
}

export default DeleteDevicesConfirmation