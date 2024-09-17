/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from "react";
import clienteAxios from "../../config/axios";
import { CModal, CButton, CModalHeader, CModalTitle, CModalBody, CForm, CFormLabel, CFormInput , CFormSelect, CModalFooter } from "@coreui/react";

const FormDevices = ({device, devices, onSave, onClose}) => {
    const [brand, setBrand] = useState('')
    const [description, setDescription] = useState('')
    const [roomId, setRoomId] = useState('')
    const [rooms, setRooms] = useState([]);
    const [error, setError] = useState('')

    useEffect(()=> {
        const fetchRooms = async () => {
            try {
                const response = await clienteAxios.get('/rooms');
                setRooms(response.data)
            } catch (error) {
                console.error('Error fetching rooms: ', error);
            }
        }
        fetchRooms()
        if(device){
            setBrand(device.brand)
            setDescription(device.description)
            setRoomId(device.room ? device.room._id : '')
        }else{
            setBrand('');
            setDescription('');
            setRoomId('');
        }
    },[device])

    const handleSubmit = async () => {
        if (!roomId) {
            setError('Please select a room.');
            return;
        }

        try {
            const deviceData = {brand, description, roomId}

            if(device){
                await clienteAxios.put(`/devices/${device._id}`, deviceData)
            }else{
                await clienteAxios.post('/devices', deviceData)
            }
            onSave()
        } catch (error) {
            console.error('Error saving device: ', error)
            
        }
    }


    return(
        <CModal visible={true} onClose={onClose}>
            <CModalHeader onClose={onClose}>
                <CModalTitle>{device ? 'Edit Device' : 'Create Device'}</CModalTitle>
            </CModalHeader>
            <CModalBody>
                <CForm>
                    <div className="mb-3">
                        <CFormLabel>Brand</CFormLabel>
                        <CFormInput value={brand} onChange={(e) => setBrand(e.target.value)} required/>
                    </div>
                    <div className="mb-3">
                        <CFormLabel>Description</CFormLabel>
                        <CFormInput
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <CFormLabel>Room</CFormLabel>
                        <CFormSelect value={roomId} onChange={(e) => setRoomId(e.target.value)} required>
                            <option value="">Select Room</option>
                            {rooms.map(room => (
                                <option key={room._id} value={room._id}>
                                    {room.nombre} {room.torre} - Floor {room.piso}

                                </option>
                            ))}
                        </CFormSelect>
                        {error && <p style={{ color: 'red' }}>{error}</p>}
                    </div>
                    
                </CForm>
            </CModalBody>
            <CModalFooter>
                <CButton color="secundary" onClick={onClose}>
                    Cancel
                </CButton>
                <CButton color="primary" onClick={handleSubmit}>
                    Save
                </CButton>
            </CModalFooter>
        </CModal>
    )
}

export default FormDevices