import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from './employee.model';

@Injectable({
  providedIn: 'root', 

})
export class EmployeeService {
  readonly baseURL = 'http://localhost:8080/employees';

  
  selectedEmployee: Employee = this.resetSelectedEmployee();
  displayedColumns: string[] = ['index', 'name', 'position', 'office', 'salary', 'option'];
  employees: Employee[] = [];

  constructor(private http: HttpClient) { }

  resetSelectedEmployee(){
    return new Employee('', '', '', '', 0);
  }

  postEmplyoee(employee: Employee){
    return this.http.post(this.baseURL, employee);
  }

  getEmployees(){
    return this.http.get(this.baseURL);
  }

  updateEmployee(employee: Employee){
    return this.http.put(this.baseURL+'/'+employee._id, employee);
  }

  deleteEmployee(employee: Employee){
    return this.http.delete(this.baseURL+'/'+employee._id);
  }

  refreshEmployees(employees?: Employee[]){
    if(employees){
      this.employees = employees;
      console.log(this.employees);
    } else {
      this.getEmployees().subscribe( (res) => {
        this.employees = res as Employee[];
      } );
    }
  }

}
