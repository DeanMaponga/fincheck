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
    
    def create(self, validated_data):
        company_data = validated_data.pop('company')
        company_serializer = CompanySerializer(data=company_data)
        if company_serializer.is_valid():
            company = company_serializer.save()
        else:
            raise serializers.ValidationError(company_serializer.errors)

        employee = Employee.objects.create(company=company, **validated_data)
        return employee
    
    def update(self, instance, validated_data):
        instance.name = validated_data.get('name', instance.name)
        instance.employee_id = validated_data.get('employee_id', instance.employee_id)
        instance.department = validated_data.get('department', instance.department)
        instance.save()

        return instance

    class Meta:
        model = Employee
        fields = '__all__'

class RoleSerializer(serializers.ModelSerializer):
    employee = EmployeeSerializer()

    def create(self, validated_data):
        employee_data = validated_data.pop('employee')
        employee_serializer = EmployeeSerializer(data=employee_data)
        if employee_serializer.is_valid():
            employee = employee_serializer.save()
        else:
            raise serializers.ValidationError(employee_serializer.errors)

        role = Role.objects.create(employee=employee, **validated_data)
        return role

    def update(self, instance, validated_data):
        employee_data = validated_data.pop('employee')
        employee_serializer = EmployeeSerializer(instance.employee, data=employee_data, partial=True)
        if employee_serializer.is_valid():
            employee_serializer.save()

        instance.role = validated_data.get('role', instance.role)
        instance.start_date = validated_data.get('start_date', instance.start_date)
        instance.end_date = validated_data.get('end_date', instance.end_date)
        instance.duties = validated_data.get('duties', instance.duties)
        instance.save()
        return instance

    class Meta:
        model = Role
        fields = '__all__'