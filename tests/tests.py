from company.models import Company
def addData():
    print("here")
    Company.objects.create(name = "testCompany",
        date_of_registration = "2023-02-02",
        registration_number = "123",
        address = "12 harare Street, Harare",
        contact_person = "Mr John",
        departments = "Technology, Administration",
        number_of_employees = 5,
        contact_phone = "0772123456",
        email = "company@email.com")

    companies = Company.objects.all()
    for item in companies:
        print(item)

addData()