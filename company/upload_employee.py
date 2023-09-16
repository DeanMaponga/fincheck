import csv
from .models import Employee

def upload_employees(file):
    reader = csv.DictReader(file)
    for row in reader:
        Employee.objects.create(**row)