/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from "react";
import clienteAxios from "../../config/axios";
import { CButton, CCard, CCardBody, CCardFooter, CCardHeader, CCol, CRow } from "@coreui/react";
import RoomsForm from "./FormRooms";
import DeleteRoomsConfirmation from "./DeleteRoomsConfirmation";
import SearchAndPagination from "../../components/SearchAndPagination";

const Rooms = () => {
    const [rooms, setRooms] = useState([])
    const [filteredRoom, setFilteredRoom] = useState([]);
    const [selectedRoom, setSelectedRoom] = useState(null)
    const [isEditing, setIsEditing] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false);
    const [role, setRole] = useState(null);

    const fetchUserRole = async () => {
        try {
            const token = localStorage.getItem('token');
            if(token){
                const response = await clienteAxios.get('/auth/me', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                });
                setRole(response.data.role);
            }
        } catch (error) {
            console.error('Error fetching user role:', error);
        }
    }
    const fetchRooms = async () => {
        try {
            const response = await clienteAxios.get('/rooms')
            setRooms(response.data)
            setFilteredRoom(response.data)
        } catch (error) {
            console.error('Error fetching rooms: ', error)
        }
    }
    useEffect(() => {
        fetchUserRole()
        fetchRooms()
    }, [])
    const handleSaveRoom = () => {
        setSelectedRoom(null)
        setIsEditing(false)
        setIsDeleting(false)
        fetchRooms()
    }
    const handleDeleteRoom = async (roomId) => {
        try {
            await clienteAxios.delete(`/rooms/${roomId}`)
            handleSaveRoom()
        } catch (error) {
            console.error('Error deleting room: ', error)
        }
    }
    return(
        <CRow>
            <CCol xs={12}>
                <CCard>
                    <CCardHeader><strong>Rooms</strong>
                    {role === 'admin' && (
                        <>
                        <CButton color="primary" style={{float: 'right'}} onClick={() => setIsEditing(true)}>
                            Create Room
                        </CButton>
                        </>
                    )}
                    
                    </CCardHeader>
                    <CCardBody>
                    <SearchAndPagination
                            data={rooms}
                            itemsPerPage={6}
                            onFilter={(filteredData) => setFilteredRoom(filteredData)}
                        />
                        <CRow>
                            {filteredRoom.map((room) => (
                                <CCol xs={12} sm={6} md={4} key={room._id || room.id} >
                                    
                                    <CCard style={{marginBottom:'10px'}}>
                                        <CCardHeader>
                                            <h5><strong>Salon:</strong> {room.nombre}{room.torre}</h5>
                                        </CCardHeader>
                                        <CCardBody>
                                            <h6><strong>Torre: </strong>{room.torre}</h6>
                                            <p><strong>Piso:</strong> {room.piso}</p>
                                            <p><strong>Categoria: </strong>{room.categoria}</p>
                                        </CCardBody>
                                        <CCardFooter>
                                            {role === 'admin' && (
                                                <>
                                                <CButton color="primary" style={{marginRight: '10px'}} onClick={() => {setSelectedRoom(room); setIsEditing(true)}}>Edit</CButton>
                                                <CButton color="danger" className="text-white" onClick={() =>{setSelectedRoom(room); setIsDeleting(true)}}>Delete</CButton>
                                                </>
                                            )}
                                            <label style={{float: 'right'}}>UTS</label>
                                        </CCardFooter>
                                    </CCard>
                                </CCol>
                            ))}
                        </CRow>
                    </CCardBody>
                </CCard>
            </CCol>
            {isEditing && (
                <RoomsForm 
                    room={selectedRoom}
                    rooms={rooms}// Pasamos rooms como prop
                    onSave={handleSaveRoom}
                    onClose={() => setIsEditing(false)}
                />
            )}

            {isDeleting && (
                <DeleteRoomsConfirmation
                    room={selectedRoom}
                    onDelete={handleDeleteRoom}
                    onClose={() => setIsDeleting(false)}
                />
            )}
        </CRow>
    )
}

export default Rooms