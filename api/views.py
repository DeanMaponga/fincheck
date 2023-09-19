from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from company.models import Company, Employee, Role
from .serializers import CompanySerializer,EmployeeSerializer,RoleSerializer,ErrorSerializer
import logging

logger = logging.getLogger(__name__)

@api_view(["POST"])
def testAPI(request):
  data = request.data
  print(data)
  try:
    serializer =CompanySerializer(data=data)
    if serializer.is_valid(raise_exception=True):
      serializer.save()
      return Response(status=status.HTTP_200_OK,data=serializer.data)
  except Exception as err:
    err_serializer = ErrorSerializer({"details":err})
    return Response(status=status.HTTP_400_BAD_REQUEST,exception=err,data=err_serializer.data)
  return Response(status=status.HTTP_400_BAD_REQUEST,data=data)

@api_view(["GET"])
def getCompanies(request):
  logger.info(f"Path: {request.path}, Method: {request.method}, IP: {request.META['REMOTE_ADDR']},Headers: {request.headers}")
  companies = Company.objects.all()
  serializer = CompanySerializer(companies,many=True)
  return Response({"status":200,"message":"companies","data":serializer.data},status=status.HTTP_200_OK)

@api_view(["POST"])
def addCompany(request):
  data = request.data
  try:
    serializer =CompanySerializer(data=data)
    if serializer.is_valid(raise_exception=True):
      serializer.save()
      return Response(status=status.HTTP_200_OK,data=serializer.data)
  except Exception as err:
    err_serializer = ErrorSerializer({"details":err})
    return Response(status=status.HTTP_400_BAD_REQUEST,exception=err,data=err_serializer.data)
  return Response(status=status.HTTP_400_BAD_REQUEST,data=data)

@api_view(["POST"])
def addCompanies(request):
  data = request.data
  try:
    serializer = CompanySerializer(data=data,many=True)
    if serializer.is_valid():
        serializer.save()
    return Response({"status":200,"message":"companies added","data":serializer.data},status=status.HTTP_200_OK)
  except Exception as err:
    err_serializer = ErrorSerializer({"details":err})
    return Response(status=status.HTTP_400_BAD_REQUEST,exception=err,data=err_serializer.data)

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

@api_view(["POST"])
def searchCompany(request):
  companies = []
  data = request.data
  if type(data) is not dict:
    return Response({"status":400,"message":"request should be json","data":companies},status=status.HTTP_400_BAD_REQUEST)
  
  companyFilters = {}
  if 'id' in data.keys():
    companyFilters['id']=data['id']
  
  if 'name' in data.keys():
    companyFilters['name__contains']=data['name']

  companies = Company.objects.filter(**companyFilters) 
  serializer = CompanySerializer(companies,many=True)
  return Response({"status":200,"message":"companies","data":serializer.data},status=status.HTTP_200_OK)

@api_view(["GET"])
def getEmployees(request):
    employees = Employee.objects.all()
    serializer = EmployeeSerializer(employees,many=True)
    return Response({"status":200,"message":"employees","data":serializer.data},status=status.HTTP_200_OK)

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


@api_view(['POST'])
def searchEmployee(request):
  results = []
  resultsKeys=[]
  data = request.data
  if type(data) is not dict:
     return Response({"status":400,"message":"request should be json","data":results},status=status.HTTP_400_BAD_REQUEST)
  
  roleFilters = {}
  companyFilters = {}
  employeeFilters = {}
  
  if 'employer' in data.keys():
    companyFilters['name__contains']=data['employer']
  
  if 'name' in data.keys():
    employeeFilters['name__contains']=data['name']

  if 'company' in data.keys():
    employeeFilters['company__contains']=data['employer']

  if 'department' in data.keys():
    employeeFilters['department__contains']=data['department']
  
  if 'position' in data.keys():
    roleFilters['role__contains']=data['position']

  if 'year_started' in data.keys():
    roleFilters['start_date__year']=data['year_started']

  if 'year_left' in data.keys():
    roleFilters['end_date__year']=data['year_left']
  
  if len(companyFilters.keys())>0:
    companies = Company.objects.filter(**companyFilters)
    company_ids = companies.values_list('id', flat=True)
    employee_filters = {
      'company_id__in': company_ids 
    }
    employees = Employee.objects.filter(**employee_filters)
    for employee in employees:
      if employee.pk not in resultsKeys:
        resultsKeys.append(employee.pk)
        results.append(employee)

  if len(employeeFilters.keys())>0:
    employees = Employee.objects.filter(**employeeFilters)
    for employee in employees:
      if employee.pk not in resultsKeys:
        resultsKeys.append(employee.pk)
        results.append(employee)
    
  if len(roleFilters.keys())>0:
    roles = Role.objects.filter(**roleFilters).select_related('employee')
    for role in roles:
      employee = role.employee
      if employee.pk not in resultsKeys:
        resultsKeys.append(employee.pk)
        results.append(employee)
    
  
  serializer = EmployeeSerializer(results,many=True)
  return Response({"status":200,"message":"employees","data":serializer.data},status=status.HTTP_200_OK)

@api_view(["POST"])
def getCompanyEmployees(request):
  results=[]
  data = request.data
  if type(data) is not dict or "id" not in data.keys():
     return Response({"status":400,"message":"request should be json with company id","data":results},status=status.HTTP_400_BAD_REQUEST)
  
  companyFilters={}
  if 'id' in data.keys():
    companyFilters['id']=data['id']
  companies = Company.objects.filter(**companyFilters)
  company_ids = companies.values_list('id', flat=True)
  employee_filters = {
    'company_id__in': company_ids 
  }
  
  if 'name' in data.keys():
    employee_filters['name__contains']=data['name']
  
  employees = Employee.objects.filter(**employee_filters)
  serializer = EmployeeSerializer(employees,many=True)
  return Response({"status":200,"message":"employees","data":serializer.data},status=status.HTTP_200_OK)

@api_view(["POST"])
def getCompanyRoles(request):
    data = request.data
    if not isinstance(data, dict) or "company_id" not in data:
        return Response({"status": 400, "message": "Request should be JSON with company ID"}, status=400)

    company_id = data.get("company_id")
    name = data.get("name")
    try:
        company = Company.objects.get(id=company_id)
    except Company.DoesNotExist:
        return Response({"status": 404, "message": "Company not found"}, status=404)

    role_filters={
      "employee__company":company
    }
    if "name" in data:
        role_filters["employee__name__contains"]=name
    
    roles = Role.objects.filter(**role_filters)
    serializer = RoleSerializer(roles, many=True)
    return Response({"status": 200, "message": "Roles", "data": serializer.data}, status=200)

@api_view(["GET"])
def getRoles(request):
    roles = Role.objects.all()
    serializer = RoleSerializer(roles,many=True)
    return Response({"status":200,"message":"roles","data":serializer.data},status=status.HTTP_200_OK)

@api_view(["POST"])
def addRole(request):
    data = request.data
    if type(data) is not dict or "employee" not in data.keys() or "company" not in data["employee"].keys():
     return Response({"status":400,"message":"bad request","data":{}},status=status.HTTP_400_BAD_REQUEST)
    
    employee_data = data.pop('employee')
    company_data = employee_data.pop('company')
    company,created = Company.objects.get_or_create(id=company_data['id'],defaults=company_data)
    employee_data["company"]=company
    employee,created = Employee.objects.get_or_create(name=employee_data['name'], defaults=employee_data)
    data['employee'] = employee    
    role = Role.objects.create(**data)
    serializer = RoleSerializer(role)
    return Response({"status": 200, "message": "Role added", "data": serializer.data}, status=status.HTTP_200_OK)
    

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

@api_view(["POST"])
def searchRoles(request):
  data = request.data
  if not isinstance(data, dict):
    return Response({"status": 400, "message": "Request should be JSON"}, status=status.HTTP_400_BAD_REQUEST)

  role_filters={}
  if "name" in data:
    role_filters["employee__name__contains"]=data["name"]
  
  if "start_date" in data:
    role_filters["start_date__year"]=data["start_date"]

  if "end_date" in data:
    role_filters["end_date__year"]=data["end_date"]

  if "employer" in data:
    role_filters["employee__company__name__contains"]=data["employer"]
  
  if "department" in data:
    role_filters["employee__department__contains"]=data["department"]

  if "role" in data:
    role_filters["role__contains"]=data["role"]
  
  roles = Role.objects.filter(**role_filters)
  print(roles)
  serializer = RoleSerializer(roles, many=True)
  return Response({"status": 200, "message": "Roles", "data": serializer.data}, status=200)