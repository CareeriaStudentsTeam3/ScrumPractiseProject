import React, { useEffect, useState } from 'react'

// React-router-dom imports
import { Redirect } from 'react-router-dom'

// Component imports
import ServiceList from '../components/admin/Service/ServiceList'
import ServiceCreate from '../components/admin/Service/ServiceCreate'
import LogoutButton from '../components/admin/LogoutButton/LogoutButton'

// Service import
import serviceService from '../services/service'
import logoutService from '../services/logout'

const ServiceAdmin = () => {
  const [services, setServices] = useState([])

  const [createService, setCreateService] = useState(false)
  const [refresh, setRefresh] = useState(false)
  const [redirect, setRedirect] = useState(false)

  const addNewService = async (newService) => {
    const response = await serviceService.create(newService)
    console.log(response)
    setRefresh(true)
    setCreateService(false)
  }

  const handleBackButton = () => {
    setCreateService(false)
  }

  const handleDelete = async (id) => {
    if (window.confirm('Haluatko varmasti poistaa tämän palvelun?')) {
      await serviceService.del(id)
      setRefresh(true)
    }
  }

  const getServices = async () => {
    const response = await serviceService.getAll()
    setServices(response)
    setRefresh(false)
  }

  // useEffect(() => {
  //   getServices()
  // }, [refresh])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('user')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      if (user.login_success === true) {
        // setUser(user.username)
        getServices()
        setRedirect(false)
      }
    }
    if (
      JSON.parse(loggedUserJSON) === null ||
      !JSON.parse(loggedUserJSON).login_success
    ) {
      logoutService.logout()
      setRedirect(true)
    }
  }, [refresh])

  if (redirect) {
    return <Redirect to="/admin/login" />
  }

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
      <LogoutButton />
      <ServiceList
        services={services}
        setCreateService={setCreateService}
        handleDelete={handleDelete}
      />
    </div>
  )
}

export default ServiceAdmin
