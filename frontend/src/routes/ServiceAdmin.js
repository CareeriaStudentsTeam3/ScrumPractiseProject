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
  const [user, setUser] = useState(null)

  const [services, setServices] = useState([])
  const [service, setService] = useState(null)

  const [createService, setCreateService] = useState(false)
  const [editService, setEditService] = useState(false)
  const [refresh, setRefresh] = useState(false)
  const [redirect, setRedirect] = useState(false)

  // Notification
  const [notificationMsg, setNotificationMsg] = useState(null)
  const [openNotification, setOpenNotification] = useState(false)

  const handleNotification = (msg) => {
    setNotificationMsg(msg)
    setOpenNotification(true)
    setTimeout(() => {
      setNotificationMsg(null)
      setOpenNotification(false)
    }, 2000)
  }

  const addNewService = async (newService) => {
    try {
      const response = await serviceService.create(newService)
      console.log(response)
      if (
        response.error &&
        response.status === 403 &&
        response.detail === 'You do not have permission to perform this action.'
      ) {
        throw new Error('Sinulla ei ole oikeutta tehdä tätä!')
      }
      if (response.error && response.status === 403) {
        return setRedirect(true)
      }
      handleNotification('Luodaan palvelua...')
      setTimeout(() => {
        setCreateService(false)
        setRefresh(!refresh)
      }, 2000)
    } catch (err) {
      if (err.message.includes('Sinulla ei ole oikeutta tehdä tätä!')) {
        handleNotification('Sinulla ei ole oikeutta tehdä tätä!')
        setTimeout(() => {
          setRedirect(true)
        }, 3000)
      } else {
        handleNotification('Luonti epäonnistui!')
      }
    }
  }

  const updateService = async (updatedService) => {
    try {
      const response = await serviceService.update(service.id, updatedService)
      console.log('updateed', response)
      if (
        response.error &&
        response.status === 403 &&
        response.detail === 'You do not have permission to perform this action.'
      ) {
        throw new Error('Sinulla ei ole oikeutta tehdä tätä!')
      }
      if (response.error && response.status === 403) {
        return setRedirect(true)
      }
      handleNotification('Muokataan...', true)
      setTimeout(() => {
        setRefresh(!refresh)
        setEditService(false)
      }, 2000)
    } catch (err) {
      console.log('delerror', err)
      if (err.message.includes('Sinulla ei ole oikeutta tehdä tätä!')) {
        handleNotification('Sinulla ei ole oikeutta tehdä tätä!')
        setTimeout(() => {
          setEditService(false)
        }, 2000)
      } else {
        handleNotification('Muokkaus epäonnistui!')
        setTimeout(() => {
          setEditService(false)
        }, 2000)
      }
    }
  }

  const handleBackButton = () => {
    setCreateService(false)
    setEditService(false)
  }

  // TODO FIX NOTIFICATIONS!
  const handleDelete = async (id) => {
    if (window.confirm('Haluatko varmasti poistaa tämän palvelun?')) {
      try {
        const response = await serviceService.del(id)
        if (
          response.error &&
          response.status === 403 &&
          response.detail ===
            'You do not have permission to perform this action.'
        ) {
          throw new Error('Sinulla ei ole oikeutta tehdä tätä!')
        }
        if (response.error && response.status === 403) {
          return setRedirect(true)
        }
        handleNotification('Poistetaan...')
        setRefresh(!refresh)
      } catch (err) {
        if (err.message.includes('Sinulla ei ole oikeutta tehdä tätä!')) {
          handleNotification('Sinulla ei ole oikeutta tehdä tätä!')
          setTimeout(() => {
            setRefresh(!refresh)
          }, 2000)
        } else {
          handleNotification('Poisto epäonnistui!')
          setTimeout(() => {
            setRefresh(true)
          }, 2000)
        }
      }
    }
  }

  const getServices = async () => {
    const response = await serviceService.getAll()
    if (response.error && response.status === 403) {
      return setRedirect(true)
    }
    setServices(response)
    // setRefresh(!refresh)
  }

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('user')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      if (user.login_success === true) {
        setUser(user)
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
        user={user}
      />
    </div>
  )
}

export default ServiceAdmin
