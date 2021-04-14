import React, { useEffect, useState } from 'react'

// Component imports
import ServiceList from '../components/admin/Service/ServiceList'
import ServiceCreate from '../components/admin/Service/ServiceCreate'

// Service import
import serviceService from '../services/service'

const ServiceAdmin = () => {
  const [services, setServices] = useState([])

  const [createService, setCreateService] = useState(false)
  const [refresh, setRefresh] = useState(false)

  const addNewService = async (newService) => {
    const response = await serviceService.create(newService)
    console.log(response)
    setRefresh(true)
    setCreateService(false)
  }

  const handleBackButton = () => {
    setCreateService(false)
  }

  const getServices = async () => {
    const response = await serviceService.getAll()
    setServices(response)
    setRefresh(false)
  }

  useEffect(() => {
    getServices()
  }, [refresh])

  if (createService) {
    return (
      <ServiceCreate
        handleBackButton={handleBackButton}
        addNewService={addNewService}
      />
    )
  }

  return (
    <div>
      <ServiceList services={services} setCreateService={setCreateService} />
    </div>
  )
}

export default ServiceAdmin
