import unittest
from app import create_app
from config import TestConfig
from exts import db

class APITestCase(unittest.TestCase):
    def setUp(self):
        self.app = create_app(TestConfig)

        self.client = self.app.test_client(self)

        with self.app.app_context():
            db.create_all()

    def test_hello_world(self):
        hello_response = self.client.get("/recipe/hello")

        json = hello_response.json

        self.assertEqual(json, {"message": "Hello World"})

    def test_signup(self):
        input_json = {
            "username": "tester1",
            "email": "unittest@rpi.edu",
            "password": "test_password"
        }

        signup_response = self.client.post("/auth/signup",
                                           json = input_json)

        status_code = signup_response.status_code

        self.assertEqual(status_code, 201)

    def test_login(self):
        signup_json = {
            "username": "tester1",
            "email": "unittest@rpi.edu",
            "password": "test_password"
        }

        login_json = {
            "username": "tester1",
            "password": "test_password"
        }

        self.client.post("/auth/signup",
                         json=signup_json)

        login_response = self.client.post("/auth/login", json = login_json)

        status_code = login_response.status_code

        self.assertEqual(status_code, 200)

    def test_get_all_recipes(self):
        response = self.client.get("/recipe/recipes")

        self.assertEqual(response.status_code, 200)

    def test_get_one_recipe(self):
        id = 1
        response = self.client.get(f"/recipe/recipe/{id}")

        self.assertEqual(response.status_code, 404)

    def test_create_recipe(self):
        signup_json = {
            "username": "tester1",
            "email": "unittest@rpi.edu",
            "password": "test_password"
        }

        login_json = {
            "username": "tester1",
            "password": "test_password"
        }

        self.client.post("/auth/signup",
                         json=signup_json)

        login_response = self.client.post("/auth/login", json=login_json)

        accessToken = login_response.json["access_token"]

        create_json = {
            "title": "Pineapple pizza",
            "description": "sweet and salty falvor pineapple pizza"
        }

        response = self.client.post("/recipe/recipes",
                                    json=create_json,
                                    headers={"Authorization": f"Bearer {accessToken}"})

        self.assertEqual(response.status_code, 201)


    def test_update_recipe(self):
        signup_json = {
            "username": "tester1",
            "email": "unittest@rpi.edu",
            "password": "test_password"
        }

        login_json = {
            "username": "tester1",
            "password": "test_password"
        }

        self.client.post("/auth/signup",
                         json=signup_json)

        login_response = self.client.post("/auth/login", json=login_json)

        accessToken = login_response.json["access_token"]

        create_json = {
            "title": "Pineapple pizza",
            "description": "sweet and salty falvor pineapple pizza"
        }

        self.client.post("/recipe/recipes",
                         json=create_json,
                         headers={"Authorization": f"Bearer {accessToken}"})

        update_json = {
            "title": "Blue cheese",
            "description": "Stink and disgusting blue cheese"
        }
        id = 1

        response = self.client.put(f"/recipe/recipe/{id}",
                                    json=update_json,
                                    headers = {"Authorization": f"Bearer {accessToken}"})

        self.assertEqual(response.status_code, 200)


    def test_delete_recipe(self):
        signup_json = {
            "username": "tester1",
            "email": "unittest@rpi.edu",
            "password": "test_password"
        }

        login_json = {
            "username": "tester1",
            "password": "test_password"
        }

        self.client.post("/auth/signup",
                         json=signup_json)

        login_response = self.client.post("/auth/login", json=login_json)

        accessToken = login_response.json["access_token"]

        create_json = {
            "title": "Pineapple pizza",
            "description": "sweet and salty flavor pineapple pizza"
        }

        self.client.post("/recipe/recipes",
                         json=create_json,
                         headers={"Authorization": f"Bearer {accessToken}"})

        id = 1

        response = self.client.delete(f"/recipe/recipe/{id}",
                                      headers={"Authorization": f"Bearer {accessToken}"})

        self.assertEqual(response.status_code, 200)


    def tearDown(self):
        with self.app.app_context():
            db.session.remove()
            db.drop_all()


if __name__ == "__main__":
    unittest.main()