from django.db import models
from django.core.validators import RegexValidator
from django_cryptography.fields import encrypt

# Create your models here.
class Company(models.Model):
    phone_regex = RegexValidator(regex=r'\d{10}', message="Phone number must be entered in the format: '9999999999'.")
    name = models.CharField(max_length=100)
    date_of_registration = models.DateField()
    registration_number = encrypt(models.CharField(max_length=20))
    address = models.TextField()
    contact_person = models.CharField(max_length=100)
    departments = models.TextField()
    number_of_employees = models.IntegerField()
    contact_phone = encrypt(models.CharField(validators=[phone_regex], max_length=10))
    email = models.EmailField()

    def __str__(self) -> str:
        return self.name

class Employee(models.Model):
    name = models.CharField(max_length=100)
    employee_id = encrypt(models.CharField(max_length=20, null=True))
    company = models.ForeignKey(Company, on_delete=models.CASCADE)
    department = models.CharField(max_length=50)
    
    #To ensure uniqueness together on a group of fields.
    class Meta:
        unique_together = ['name', 'company']

    def __str__(self) -> str:
        return self.name

class Role(models.Model):
    employee = models.ForeignKey(Employee, on_delete=models.CASCADE)
    role = models.CharField(max_length=100)
    start_date = models.DateField()
    end_date = models.DateField(null=True)
    duties = models.TextField()
    
    def __str__(self) -> str:
        return self.role

