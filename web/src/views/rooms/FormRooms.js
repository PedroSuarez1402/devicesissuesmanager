/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from "react";
import clienteAxios from "../../config/axios";
import { CButton, CForm, CFormInput, CFormLabel, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle, CFormSelect } from "@coreui/react";

const RoomsForm = ({ room, rooms, onSave, onClose }) => {
    const [nombre, setNombre] = useState('')
    const [torre, setTorre] = useState('')
    const [piso, setPiso] = useState('')
    const [categoria, setCategoria] = useState('')

    useEffect(() => {
        if(room){
            setNombre(room.nombre)
            setTorre(room.torre)
            setPiso(room.piso)
            setCategoria(room.categoria)
        }else {
            // Limpiar los campos si no hay room seleccionada
            setNombre('');
            setTorre('');
            setPiso('');
            setCategoria('');
        }
    }, [room])
    const handleSubmit = async () => {
        try {

             // Validar nombre único por torre y piso
            const roomExists = rooms.some(
                (r) => 
                    r.nombre === nombre && 
                    r.torre === torre &&
                    r.piso === piso &&
                    (!room || r._id !== room._id)
            );

            if (roomExists) {
                alert("A room with this name already exists on this floor and tower.");
                return;
            }

            const roomData = {nombre, torre, piso, categoria}

            if(room){ // Editar room existente
                await clienteAxios.put(`/rooms/${room._id}`, roomData)
            }else{ // Crear nueva room
                await clienteAxios.post('/rooms', roomData)
            }
            onSave()
        } catch (error) {
            console.error('Error saving room: ', error)
        }
    }
    return(
        <CModal visible={true} onClose={onClose}>
            <CModalHeader onClose={onClose}>
                <CModalTitle>{room ? 'Edit Room' : 'Create Room'}</CModalTitle>
            </CModalHeader>
            <CModalBody>
                <CForm>
                    <div className="mb-3">
                        <CFormLabel>Name</CFormLabel>
                        <CFormInput value={nombre} onChange={(e) => setNombre(e.target.value)} required/>
                    </div>
                    <div className="mb-3">
                        <CFormLabel>Tower</CFormLabel>
                        <CFormSelect value={torre} onChange={(e) => setTorre(e.target.value)} required>
                            <option value="">Select Tower</option>
                            <option value="A">A</option>
                            <option value="B">B</option>
                            <option value="C">C</option>
                        </CFormSelect>
                    </div>
                    <div className="mb-3">
                        <CFormLabel>Floor</CFormLabel>
                        <CFormInput
                            type="number"
                            value={piso}
                            onChange={(e) => setPiso(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <CFormLabel>Category</CFormLabel>
                        <CFormInput
                            value={categoria}
                            onChange={(e) => setCategoria(e.target.value)}
                            required
                        />
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

export default RoomsForm