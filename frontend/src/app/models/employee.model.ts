import { Company } from "./company.model";

export interface Employee {
  id: number|null;
    name: string;
    employee_id: string;
    company: Company;
    department: string;
  }
  
 