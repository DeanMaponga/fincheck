import { Employee } from "./employee.model";

export interface Role {
    employee: Employee;
    role: string;
    start_date: string;
    end_date: string | null;
    duties: string;
  }