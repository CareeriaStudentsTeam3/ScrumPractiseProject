import React, { useEffect, useState } from 'react'

// React-router-dom imports
import { Redirect } from 'react-router-dom'

// Component imports
import ServiceList from '../components/admin/Service/ServiceList'
import ServiceCreate from '../components/admin/Service/ServiceCreate'
import ServiceEdit from '../components/admin/Service/ServiceEdit'
import LogoutButton from '../components/admin/LogoutButton/LogoutButton'
import Notification from '../components/Notification/Notification'

// Service import
import serviceService from '../services/service'
import logoutService from '../services/logout'

const ServiceAdmin = () => {
  const [services, setServices] = useState([])
  const [service, setService] = useState(null)

  const [createService, setCreateService] = useState(false)
  const [editService, setEditService] = useState(false)
  const [refresh, setRefresh] = useState(false)
  const [redirect, setRedirect] = useState(false)

  // Notification
  const [notificationMsg, setNotificationMsg] = useState(null)
  const [openNotification, setOpenNotification] = useState(false)

  const handleNotification = (msg, isOpen) => {
    setNotificationMsg(msg)
    setOpenNotification(isOpen)
  }

  const addNewService = async (newService) => {
    try {
      const response = await serviceService.create(newService)
      console.log(response)
      setRefresh(true)
      handleNotification('Luodaan palvelua...', true)
      setTimeout(() => {
        setCreateService(false)
      }, 2000)
    } catch (error) {
      console.log('adderror', error)
      handleNotification('Luonti epäonnistui!', true)
    }
  }

  const updateService = async (updatedService) => {
    try {
      const response = await serviceService.update(service.id, updatedService)
      console.log('updateed', response)
      setRefresh(true)
      handleNotification('Muokataan...', true)
      setTimeout(() => {
        setEditService(false)
      }, 2000)
    } catch (error) {
      console.log('delerror', error)
      handleNotification('Muokkaus epäonnistui!', true)
      setTimeout(() => {
        setEditService(false)
      }, 200)
    }
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
      <div>
        <ServiceCreate
          handleBackButton={handleBackButton}
          addNewService={addNewService}
        />
        <Notification message={notificationMsg} open={openNotification} />
      </div>
    )
  }

  if (editService && service !== null) {
    return (
      <div>
        <ServiceEdit
          handleBackButton={handleBackButton}
          service={service}
          updateService={updateService}
        />
        <Notification message={notificationMsg} open={openNotification} />
      </div>
    )
  }

  return (
    <div>
      <LogoutButton />
      <ServiceList
        services={services}
        setCreateService={setCreateService}
        handleDelete={handleDelete}
        setEditService={setEditService}
        setService={setService}
      />
    </div>
  )
}

export default ServiceAdmin
