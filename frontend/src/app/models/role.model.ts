import { Employee } from "./employee.model";

export interface Role {
  id: number|null;
    employee: Employee;
    role: string;
    start_date: string;
    end_date: string | null;
    duties: string;
  }