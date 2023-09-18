import { Company } from "./company.model";

export interface Employee {
    name: string;
    employee_id: string;
    company: Company;
    department: string;
  }
  
 