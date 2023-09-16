##Talent Verify

#These are the steps taken to install django on ubuntu - by Dean
pip install django
django-admin startproject talentVerify .
python3 manage.py migrate
#This makes changes to the database schema when changes to the model are made

python3 manage.py createsuperuser
#This creates an administrative user for the django server
#username: dean
#password: TestPassword

django-admin startapp employer
#This creates an app called employer which we will store emplyer details
#register app
#add app name to INSTALLED_ALLS list in settings.py

python3 manage.py runserver

#Creating database
#create models.py
#database tables are created in this file as classes
#The Employer class represents the Employer table

#Apply model changes to database
python3 manage.py migrate

#Encryption
#Employee ID number: This contains sensitive identifying information about employees and should be encrypted for privacy and security.
#Phone numbers: Phone numbers could be used to contact employees directly and should be encrypted.
#Registration number: The company registration number contains identifying information and should be encrypted.
pip install django-cryptography
add 'django_cryptography', to INSTALLED_APPS in settings.py

#Register model
#go to admin.py and register models which were just created

#validation
#model & serializer class perfom dat validation on server side

#Create API
pip install djangorestframework
#create app called api
#create searialisers.py
#create views.py
#create urls.py

#Creating interfaces
#Create react interface

#Handle CORS
pip install django-cors-headers
#add  'corsheaders', to INSTALLED_APPS in settings.py