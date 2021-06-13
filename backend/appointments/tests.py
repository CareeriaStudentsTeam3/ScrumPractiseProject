from django.test import TestCase
from rest_framework.test import APITestCase
from . import models


# Create your tests here.
class Test(APITestCase):
    def setUp(self):
        user=models.User.objects.create_user(username='test', password='test', is_superuser=True, is_staff=True)
    def test_user_viewset_get(self):
        #get request for UserViewSet with authenticated user 
        self.client.login(username='test', password='test')
        response = self.client.get('/api/user/')
        self.assertEqual(response.status_code, 200)
    
    def test_user_viewset_get_without_auth(self):
        #get request for UserViewSet without authentication
        response = self.client.get('/api/user/')
        self.assertEqual(response.status_code, 403)

    def test_hairmodel_viewset(self):
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

        #delete request for Hairmodels with authenticated user
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

        #delete request for Hairmodels without authentication
        response = self.client.delete('/api/hairmodel/1/')
        self.assertEqual(response.status_code, 403)


    

        
