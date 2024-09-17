/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react'
import { CFormInput, CPagination, CPaginationItem } from '@coreui/react'

const SearchAndPagination = ({ data, itemsPerPage, onFilter }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)

  // Filtrar datos basado en el término de búsqueda
  const filteredData = data.filter((item) =>
    Object.values(item).some((value) =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    )
  )

  // Paginar los datos filtrados
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentData = filteredData.slice(indexOfFirstItem, indexOfLastItem)

  // Actualizar datos filtrados y paginados cuando cambian
  useEffect(() => {
    onFilter(currentData)
  }, [searchTerm, currentPage, data])

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <CFormInput
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ width: '200px', marginRight: '10px' }}
      />
      <CPagination className="mt-3">
        {Array.from({ length: Math.ceil(filteredData.length / itemsPerPage) }, (_, i) => (
          <CPaginationItem
            key={i}
            active={i + 1 === currentPage}
            onClick={() => setCurrentPage(i + 1)}
          >
            {i + 1}
          </CPaginationItem>
        ))}
      </CPagination>
    </div>
  )
}

export default SearchAndPagination
