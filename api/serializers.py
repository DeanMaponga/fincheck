from rest_framework import serializers
from company.models import Company,Employee,Role

class ErrorSerializer(serializers.Serializer):
    details = serializers.CharField()

class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = Company
        fields= '__all__'

class EmployeeSerializer(serializers.ModelSerializer):
    company = CompanySerializer() 
    class Meta:
        model = Employee
        fields= '__all__'

class RoleSerializer(serializers.ModelSerializer):
    employee = EmployeeSerializer()
    def create(self, validated_data):
        employee_data = validated_data.pop('employee')
        employee = Employee.objects.create(**employee_data)
        role = Role.objects.create(employee=employee, **validated_data)
        return role
    
    class Meta:
        model = Role
        fields= '__all__'