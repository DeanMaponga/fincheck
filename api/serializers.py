from rest_framework import serializers
from company.models import Company,Employee,Role

class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = Company
        fields= '__all__'

class EmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields= '__all__'

class RoleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Role
        fields= '__all__'

class RoleListSerializer(serializers.ListSerializer):
    def update(self, instances, validated_data):
        mappings = {item.id: item for item in instances}
        data_mapping = {item['id']: item for item in validated_data}

        ret = []
        for data in validated_data:
            instance_id = data['id']
            instance = mappings.get(instance_id, None)
            if instance is None:
                ret.append(self.child.create(validated_data))
            else: 
                ret.append(self.child.update(instance, data))
        return ret