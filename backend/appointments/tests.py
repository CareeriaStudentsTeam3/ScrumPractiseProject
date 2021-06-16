from django.test import TestCase
from rest_framework.test import APITestCase
from . import models


# Create your tests here.
class TestHairmodelViewSet(APITestCase):
    @classmethod
    def setUpTestData(cls):
        user=models.User.objects.create_user(username='test', password='test', is_superuser=True, is_staff=True)
    def test_hairmodel_viewset_with_auth(self):
        #post request for HairModelViewSet with authenticated user
        self.client.login(username='test', password='test')
        response = self.client.post('/api/hairmodel/', {'first_name': 'Testi', 'last_name': 'Henkilö', 'city': 'Kaupunki', 'phone': '1234567899', 'email': 'test@test.test', 'age':'30', 'gender': 'FEMALE', 'hair_length': 'MEDIUM', 'hair_procedures': 'ei', 'image': None}, format='json')
        self.assertEqual(response.status_code, 201)

        #get request for HairModelViewSet with authenticated user
        response = self.client.get('/api/hairmodel/1/')
        self.assertEqual(response.status_code, 200)

        #patch request for HairModelViewSet with authenticated user
        response = self.client.patch('/api/hairmodel/1/', {'first_name': 'Uusi'})
        self.assertEqual(response.status_code, 200)

        #put request for HairModelViewSet with authenticated user
        response = self.client.put('/api/hairmodel/1/', {'first_name': 'TestiKolmas', 'last_name': 'Henkilö', 'city': 'Kaupunki', 'phone': '1234567899', 'email': 'test@test.test', 'age':'30', 'gender': 'FEMALE', 'hair_length': 'MEDIUM', 'hair_procedures': 'ei'})
        self.assertEqual(response.status_code, 200)

        #delete request for HairmModelViewSet with authenticated user
        response = self.client.delete('/api/hairmodel/1/')
        self.assertEqual(response.status_code, 204)
    
    def test_hairmodel_viewset_without_auth(self):
        #post request for HairModelViewSet without authentication
        response = self.client.post('/api/hairmodel/', {'first_name': 'Testi', 'last_name': 'Henkilö', 'city': 'Kaupunki', 'phone': '1234567899', 'email': 'test@test.test', 'age':'30', 'gender': 'FEMALE', 'hair_length': 'MEDIUM', 'hair_procedures': 'ei', 'image': None}, format='json')
        self.assertEqual(response.status_code, 201)

        #get request for HairModelViewSet without authentication
        response = self.client.get('/api/hairmodel/1/')
        self.assertEqual(response.status_code, 403)

        #patch request for HairModelViewSet without authentication
        response = self.client.patch('/api/hairmodel/1/', {'first_name': 'Uusi'})
        self.assertEqual(response.status_code, 403)

        #put request for HairModelViewSet without authentication
        response = self.client.put('/api/hairmodel/1/', {'first_name': 'TestiKolmas', 'last_name': 'Henkilö', 'city': 'Kaupunki', 'phone': '1234567899', 'email': 'test@test.test', 'age':'30', 'gender': 'FEMALE', 'hair_length': 'MEDIUM', 'hair_procedures': 'ei'})
        self.assertEqual(response.status_code, 403)

        #delete request for HairModelViewSet without authentication
        response = self.client.delete('/api/hairmodel/1/')
        self.assertEqual(response.status_code, 403)

class TestUserViewSet(APITestCase):
    @classmethod
    def setUpTestData(cls):
        user=models.User.objects.create_user(username='test', password='test', is_superuser=True, is_staff=True)
    def test_user_viewset_get_with_auth(self):
        #get request for UserViewSet with authenticated user 
        self.client.login(username='test', password='test')
        response = self.client.get('/api/user/')
        self.assertEqual(response.status_code, 200)
    
    def test_user_viewset_get_without_auth(self):
        #get request for UserViewSet without authentication
        response = self.client.get('/api/user/')
        self.assertEqual(response.status_code, 403)

class TestAppointmentViewSet(APITestCase):
    @classmethod
    def setUpTestData(cls):
        user=models.User.objects.create_user(username='test', password='test', is_superuser=True, is_staff=True)
        appointment_date = models.Appointment_timespan.objects.create(beginning='2021-06-14T12:00:00.000000+03:00', end='2021-06-14T14:00:00.000000+03:00', max_group_size='8', status='FREE')
        service = models.Service.objects.create(service_name='Palvelu', duration='120', price='12.00', max_group_size='8')
    def test_appointment_viewset_with_auth(self):
        #post request for AppointmentViewSet with authentication
        self.client.login(username='test', password='test')
        response = self.client.post('/api/appointment/', {'first_name':'Testaaja', 'last_name': 'Testaaja', 'email':'testaaja@testaaja.testaaja', 'phone': '1234567899', 'group_size': '4', 'service':'1', 'appointment_date':'1', 'place': 'Muu', 'info':'testi'})
        self.assertEqual(response.status_code, 201)

        #get request for AppointmentViewSet with authentication
        response = self.client.get('/api/appointment/1/')
        self.assertEqual(response.status_code, 200)

        #patch request for AppointmentViewSet with authentication
        response = self.client.patch('/api/appointment/1/', {'phone': '9987654321'})
        self.assertEqual(response.status_code, 200)

        #put request for AppointmentViewSet with authentication
        response = self.client.put('/api/appointment/1/', {'first_name':'Nimi', 'last_name': 'Nimi', 'email':'testaaja@testaaja.testaaja', 'phone': '1234567899', 'group_size': '4', 'service':'1', 'appointment_date':'1', 'place': 'Muu', 'info':'testi'})
        self.assertEqual(response.status_code, 200)

        #delete request for AppointmentViewSet with authentication
        response = self.client.delete('/api/appointment/1/')
        self.assertEqual(response.status_code, 204)

    def test_appointment_viewset_without_auth(self):
        #post request for AppointmentViewSet without authentication
        response = self.client.post('/api/appointment/', {'first_name':'Testaaja', 'last_name': 'Testaaja', 'email':'testaaja@testaaja.testaaja', 'phone': '1234567899', 'group_size': '4', 'service':'1', 'appointment_date':'1', 'place': 'Muu', 'info':'testi'})
        self.assertEqual(response.status_code, 201)

        #get request for AppointmentViewSet without authentication
        response = self.client.get('/api/appointment/1/')
        self.assertEqual(response.status_code, 403)

        #patch request for AppointmentViewSet without authentication
        response = self.client.patch('/api/appointment/1/', {'phone': '9987654321'})
        self.assertEqual(response.status_code, 403)

        #put request for AppointmentViewSet without authentication
        response = self.client.put('/api/appointment/1/', {'first_name':'Nimi', 'last_name': 'Nimi', 'email':'testaaja@testaaja.testaaja', 'phone': '1234567899', 'group_size': '4', 'service':'1', 'appointment_date':'1', 'place': 'Muu', 'info':'testi'})
        self.assertEqual(response.status_code, 403)

        #delete request for AppointmentViewSet without authentication
        response = self.client.delete('/api/appointment/1/')
        self.assertEqual(response.status_code, 403)

        

    
    


    

        
