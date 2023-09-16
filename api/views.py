from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from company.models import Company, Employee, Role
from .serializers import CompanySerializer,EmployeeSerializer,RoleSerializer,RoleListSerializer

@api_view(["GET"])
def getCompanies(request):
    companies = Company.objects.all()
    serializer = CompanySerializer(companies,many=True)
    return Response(serializer.data)

@api_view(["POST"])
def addCompany(request):
    serializer =CompanySerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response({"status":200,"message":"company added","data":serializer.data},status=status.HTTP_200_OK)

@api_view(["POST"])
def addCompanies(request):
    serializer = CompanySerializer(data=request.data,many=True)
    if serializer.is_valid():
        serializer.save()
    return Response({"status":200,"message":"companies added","data":serializer.data},status=status.HTTP_200_OK)

@api_view(['PATCH']) 
def updateCompany(request):
  saved=[]
  data = request.data
  if type(data) is not dict or 'id' not in data.keys():
     return Response({"status":400,"message":"Provide id to update in json format","data":saved},status=status.HTTP_400_BAD_REQUEST)
  try:
    company = Company.objects.get(pk=data['id'])
    serializer = CompanySerializer(company,data=data,partial=True)
    if serializer.is_valid():
      serializer.save()
      saved.append(serializer.data)
    return Response({"status":200,"message":"company updated","data":saved},status=status.HTTP_200_OK if len(saved)>0 else status.HTTP_400_BAD_REQUEST)
  except:
     return Response({"status":400,"message":"Bad request","data":saved},status=status.HTTP_400_BAD_REQUEST)
  
@api_view(['PATCH'])
def bulkUpdateCompanies(request):
  data = request.data
  company_ids = [item['id'] for item in data]
  company_map = {item['id']:item for item in data}
  companies = Company.objects.filter(id__in=company_ids)
  
  saved=[]
  for company in companies:
    serializer = CompanySerializer(company,data=company_map[company.pk],partial=True)
    if serializer.is_valid():
      serializer.save()
      saved.append(serializer.data)
  return Response({"status":200,"message":"companies updated","data":saved},status=status.HTTP_200_OK if len(saved)>0 else status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
def deleteCompany(request):
  data = request.data
  if type(data) is not dict or 'id' not in data.keys():
     return Response({
        "status":400,
        "message":"Provide an id to delete in json format"},status=status.HTTP_400_BAD_REQUEST)
  try:
    company = Company.objects.get(pk=data['id'])
    company.delete()
    return Response({"status":204,"message":"company deleted","id":data['id']},status=status.HTTP_204_NO_CONTENT)
  except Employee.DoesNotExist:
    return Response({"status":404,"message":"company not found"},status=status.HTTP_404_NOT_FOUND)

@api_view(["GET"])
def getEmployees(request):
    employees = Employee.objects.all()
    serializer = EmployeeSerializer(employees,many=True)
    return Response(serializer.data)

@api_view(["POST"])
def addEmployee(request):
    serializer =EmployeeSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response({"status":200,"message":"employee added","data":serializer.data},status=status.HTTP_200_OK)

@api_view(["POST"])
def addEmployees(request):
    serializer = EmployeeSerializer(data=request.data,many=True)
    if serializer.is_valid():
        serializer.save()
    return Response({"status":200,"message":"employees added","data":serializer.data},status=status.HTTP_200_OK)

@api_view(['PATCH']) 
def updateEmployee(request):
  saved=[]
  data = request.data
  if type(data) is not dict or 'id' not in data.keys():
     return Response({"status":400,"message":"Provide id to update in json format","data":saved},status=status.HTTP_400_BAD_REQUEST)
  try:
    employee = Employee.objects.get(pk=data['id'])
    serializer = EmployeeSerializer(employee,data=data,partial=True)
    if serializer.is_valid():
      serializer.save()
      saved.append(serializer.data)
    return Response({"status":200,"message":"employee updated","data":saved},status=status.HTTP_200_OK if len(saved)>0 else status.HTTP_400_BAD_REQUEST)
  except:
     return Response({"status":400,"message":"Bad request","data":saved},status=status.HTTP_400_BAD_REQUEST)
  
@api_view(['PATCH'])
def bulkUpdateEmployees(request):
  data = request.data
  employee_ids = [item['id'] for item in data]
  employee_map = {item['id']:item for item in data}
  employees = Employee.objects.filter(id__in=employee_ids)
  
  saved=[]
  for employee in employees:
    serializer = EmployeeSerializer(employee,data=employee_map[employee.pk],partial=True)
    if serializer.is_valid():
      serializer.save()
      saved.append(serializer.data)
  return Response({"status":200,"message":"employees updated","data":saved},status=status.HTTP_200_OK if len(saved)>0 else status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
def deleteEmployee(request):
  data = request.data
  if type(data) is not dict or 'id' not in data.keys():
     return Response({
        "status":400,
        "message":"Provide an id to delete in json format"},status=status.HTTP_400_BAD_REQUEST)
  try:
    employee = Employee.objects.get(pk=data['id'])
    employee.delete()
    return Response({"status":204,"message":"employee deleted","id":data['id']},status=status.HTTP_204_NO_CONTENT)
  except Employee.DoesNotExist:
    return Response({"status":404,"message":"employee not found"},status=status.HTTP_404_NOT_FOUND)
  
@api_view(["GET"])
def getRoles(request):
    roles = Role.objects.all()
    serializer = RoleSerializer(roles,many=True)
    return Response(serializer.data)

@api_view(["POST"])
def addRole(request):
    serializer =RoleSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response({"status":200,"message":"role added","data":serializer.data},status=status.HTTP_200_OK)

@api_view(["POST"])
def addRoles(request):
    serializer = RoleSerializer(data=request.data,many=True)
    if serializer.is_valid():
        serializer.save()
    return Response({"status":200,"message":"roles added","data":serializer.data},status=status.HTTP_200_OK)

@api_view(['PATCH']) 
def updateRole(request):
  data = request.data
  if type(data) is not dict or 'id' not in data.keys():
     return Response({"status":400,"message":"Bad request","data":[]},status=status.HTTP_400_BAD_REQUEST)
  
  saved=[]
  try:
    role = Role.objects.get(pk=data['id'])
    serializer = RoleSerializer(role,data=data,partial=True)
    if serializer.is_valid():
      serializer.save()
      saved.append(serializer.data)
    return Response({"status":200,"message":"roles added","data":saved},status=status.HTTP_200_OK if len(saved)>0 else status.HTTP_400_BAD_REQUEST)
  except:
     return Response({"status":400,"message":"Bad request","data":saved},status=status.HTTP_400_BAD_REQUEST)
  
@api_view(['PATCH'])
def bulkUpdateRoles(request):
  data = request.data
  role_ids = [item['id'] for item in data]
  role_map = {item['id']:item for item in data}
  roles = Role.objects.filter(id__in=role_ids)
  
  saved=[]
  for role in roles:
    serializer = RoleSerializer(role,data=role_map[role.pk],partial=True)
    if serializer.is_valid():
      serializer.save()
      saved.append(serializer.data)
  return Response({"status":200,"message":"roles updated","data":saved},status=status.HTTP_200_OK if len(saved)>0 else status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
def deleteRole(request):
  data = request.data
  if type(data) is not dict or 'id' not in data.keys():
     return Response({
        "status":400,
        "message":"Provide an id to delete in json format"},status=status.HTTP_400_BAD_REQUEST)
  try:
    role = Role.objects.get(pk=data['id'])
  except Role.DoesNotExist:
    return Response({"status":404,"message":"role not found"},status=status.HTTP_404_NOT_FOUND)
  
  role.delete()
  return Response({"status":200,"message":"role deleted","id":role.pk},status=status.HTTP_204_NO_CONTENT)