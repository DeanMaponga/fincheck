from django.shortcuts import render
from django.views.generic.edit import CreateView, UpdateView
from .models import Employee
from .forms import EmployeeForm

class EmployeeCreate(CreateView):
    model = Employee
    form_class = EmployeeForm

class EmployeeUpdate(UpdateView):
    model = Employee
    form_class = EmployeeForm