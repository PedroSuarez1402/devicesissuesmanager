/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import clienteAxios from "../../config/axios";
import { CCard, CCardBody, CCardHeader, CCardText, CCardTitle, CCol, CRow, CButton, CCardFooter } from "@coreui/react";
import SearchAndPagination from "../../components/SearchAndPagination"; // Importar componente de búsqueda y paginación

const Issues = () => {
    const [issues, setIssues] = useState([]); // Estado para todas las issues
    const [filteredIssues, setFilteredIssues] = useState([]); // Estado para las issues filtradas
    const navigate = useNavigate();

    const fetchIssues = async () => {
        try {
            const response = await clienteAxios.get('/issues');
            setIssues(response.data); // Guardar todas las issues
            setFilteredIssues(response.data); // Inicializar el filtrado con todas las issues
        } catch (error) {
            console.error('Error fetching Issues: ', error);
        }
    };

    useEffect(() => {
        fetchIssues();
    }, []);

    return (
        <CRow className="g-3">
            <CCol xs={12}>
                <CCard>
                    <CCardHeader className="d-flex justify-content-between align-items-center">
                        <strong>Issues</strong>
                        <CButton color="primary" onClick={() => navigate('/issues/create-issues')}>
                            Create Issue
                        </CButton>
                    </CCardHeader>
                    <CCardBody>
                        {/* Componente de búsqueda y paginación */}
                        <SearchAndPagination
                            data={issues} // Pasamos la lista completa de issues
                            itemsPerPage={8} // Paginación con 5 items por página
                            onFilter={(filteredData) => setFilteredIssues(filteredData)} // Actualizar el estado de issues filtradas
                        />
                        <CRow className="g-3">
                            {filteredIssues.map((issue) => ( // Usar filteredIssues en lugar de issues
                                <CCol xs={12} sm={6} md={4} lg={3} key={issue._id}>
                                    <CCard className="h-100">
                                        <CCardHeader>
                                            <h6 className="mb-2">Created by: {issue.creator.name}</h6>
                                        </CCardHeader>
                                        <CCardBody>
                                            <CCardTitle>
                                                <strong>Device:</strong> {issue.device.code} <br />
                                                <strong>Type:</strong> {issue.type}
                                            </CCardTitle>
                                            <CCardText>
                                                <strong>Description:</strong> {issue.description || 'No description'} <br />
                                                <strong>Status:</strong> {issue.status || 'No status'}
                                            </CCardText>
                                            {/* Mostrar notas si las hay */}
                                            <strong>Number of Notes:</strong> {issue.notes?.length || 0} <br />
                                            <strong>Status:</strong> {issue.status || 'No status'}
                                            {/* Mostrar detalles de issuesManagement si los hay */}
                                            {issue.issuesManagement?.length > 0 && (
                                                <div>
                                                    <strong>Management:</strong>
                                                    <ul>
                                                        {issue.issuesManagement.map((management, index) => (
                                                            <li key={index}>
                                                                <strong>Responsible:</strong> {management.responsible.name} <br />
                                                                <strong>Description:</strong> {management.description || 'No description'} <br />
                                                                <strong>Start Date:</strong> {new Date(management.startDate).toLocaleDateString()} <br />
                                                                {management.endDate && (
                                                                    <>
                                                                        <strong>End Date:</strong> {new Date(management.endDate).toLocaleDateString()} <br />
                                                                    </>
                                                                )}
                                                                <strong>Used Objects:</strong> {management.usedObjects || 'None'}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            )}
                                        </CCardBody>
                                        <CCardFooter>
                                            <CButton color="primary" className="w-100" onClick={() => navigate(`/issues/view-issue/${issue._id}`)}>
                                                View
                                            </CButton>
                                        </CCardFooter>
                                    </CCard>
                                </CCol>
                            ))}
                        </CRow>
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    );
};

export default Issues;
