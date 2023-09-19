from django.urls import path
from . import views

urlpatterns=[
    path('testAPI/',views.testAPI),

    path('getCompanies/',views.getCompanies),
    path('addCompany/',views.addCompany),
    path('addCompanies/',views.addCompanies),
    path('updateCompany/',views.updateCompany),
    path('bulkUpdateCompanies/',views.bulkUpdateCompanies),
    path('deleteCompany/',views.deleteCompany),
    path('searchCompany/',views.searchCompany),

    path('getEmployees/',views.getEmployees),
    path('addEmployee/',views.addEmployee),
    path('addEmployees/',views.addEmployees),
    path('updateEmployee/',views.updateEmployee),
    path('bulkUpdateEmployees/',views.bulkUpdateEmployees),
    path('deleteEmployee/',views.deleteEmployee),
    path('searchEmployee/',views.searchEmployee),
    path('getCompanyEmployees/',views.getCompanyEmployees),

    path('getRoles/',views.getRoles),
    path('addRole/',views.addRole),
    path('addRoles/',views.addRoles),
    path('updateRole/',views.updateRole),
    path('bulkUpdateRoles/',views.bulkUpdateRoles),
    path('deleteRole/',views.deleteRole),
    path('getCompanyRoles/',views.getCompanyRoles),
    path('searchRoles/',views.searchRoles),
]