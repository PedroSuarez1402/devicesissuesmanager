/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from "react";
import clienteAxios from "../../config/axios";
import { CCard, CCardBody, CCardHeader, CFormSelect, CCol, CForm, CFormInput, CFormLabel, CRow, CFormText, CFormTextarea, CCardFooter, CButton } from "@coreui/react";
import { useNavigate } from "react-router-dom";

const FormIssues = () => {
    const [type, setType] = useState('')
    const [description, setDescription] = useState('')
    const [devicesStatus, setDevicesStatus] = useState('');
    const [status, setStatus] = useState('')
    const [devices, setDevices] = useState([]);
    const [selectedDevice, setSelectedDevice] = useState(null)
    const navigate = useNavigate()

    const fetchDevices = async() => {
        try {
            const response = await clienteAxios.get('/devices');
            setDevices(response.data)
        } catch (error) {
            console.error('Error fetching devices:', error);
        }
    }

    useEffect(() => {
        fetchDevices()
    },[])

    const handleDeviceChange = (e) => {
        const deviceId = e.target.value;
        const device = devices.find(d => d._id === deviceId);
        /* console.log(device) */
        setSelectedDevice(device)
    }
    const handleSubmit = async () => {
        try {
            const user = JSON.parse(localStorage.getItem('user', 'token'));
            
            const issueData = {
                type,
                description,
                deviceStatus: devicesStatus,
                status,
                deviceId: selectedDevice._id,
                creatorId: user._id,
            };
            console.log(issueData)
    
            await clienteAxios.post('/issues', issueData);
    
            // Redirigir a la dashboard después de enviar el formulario
            navigate('/dashboard');
    
        } catch (error) {
            console.error('Error creating issue:', error);
        }
    }
    

    return(
        <CRow>
            <CCol xs={12}>
                <CCard>
                    <CCardHeader>
                        <strong>Create Issues</strong>
                    </CCardHeader>
                    <CCardBody>
                        <CForm>
                            <div className="mb-3">
                                <CFormLabel>Type issue:</CFormLabel>
                                <CFormInput value={type} onChange={(e) => setType(e.target.value)}/>
                            </div>
                            <div className="mb-3">
                                <CFormLabel>Select Device:</CFormLabel>
                                <CFormSelect onChange={handleDeviceChange}>
                                    <option value="">Select a device</option>
                                    {devices.map(device => (
                                        <option key={device._id} value={device._id}>
                                            {device.brand} - {device.code}
                                        </option>
                                    ))}
                                </CFormSelect>
                            </div>
                            {selectedDevice && (
                                <div className="mb-3">
                                    <CFormLabel>Device Information:</CFormLabel>
                                    <CFormInput
                                        readOnly
                                        value={`Room: ${selectedDevice.room.nombre}, Tower: ${selectedDevice.room.torre}`}
                                    />
                                </div>
                            )}
                            
                            <div className="mb-3">
                                <CFormLabel>Devices Status: </CFormLabel>
                                <CFormSelect value={devicesStatus} onChange={(e) => setDevicesStatus(e.target.value)}>
                                    <option value="">Select Status</option>
                                    <option value="Not Working">Not Working</option>
                                    <option value="Unknow">Unknow</option>
                                    <option value="Working">Working</option>
                                </CFormSelect>
                            </div>
                            <div className="mb-3">
                                <CFormLabel>Status: </CFormLabel>
                                <CFormSelect value={status} onChange={(e) => setStatus(e.target.value)}>
                                    <option value="">Select Status</option>
                                    <option value="Open">Open</option>
                                    <option value="Close">Close</option>
                                </CFormSelect>
                            </div>
                            <div className="mb-3">
                                <CFormLabel>Description: </CFormLabel>
                                <CFormTextarea value={description} onChange={(e) => setDescription(e.target.value)}/>
                            </div>
                        </CForm>
                    </CCardBody>
                    <CCardFooter>
                        <CButton color="primary" style={{ float: 'right' }} onClick={handleSubmit}>Send</CButton>
                    </CCardFooter>
                </CCard>
            </CCol>
        </CRow>        
    )
}

export default FormIssues