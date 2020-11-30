import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Employee } from './employee.model';

@Injectable({
  providedIn: 'root', 

})
export class EmployeeService {

  employees: Employee[] = [];
  selectedEmployee: Employee = this.resetSelectedEmployee();
  displayedColumns: string[] = ['index', 'name', 'position', 'office', 'salary', 'option'];

  constructor(private http: HttpClient) { }

  resetSelectedEmployee(){
    return new Employee('', '', '', '', 0);
  }

  postEmplyoee(employee: Employee){
    return this.http.post(environment.employeeUrl, employee);
  }

  getEmployees(){
    return this.http.get(environment.employeeUrl);
  }

  updateEmployee(employee: Employee){
    return this.http.put(environment.employeeUrl+'/'+employee._id, employee);
  }

  deleteEmployee(employee: Employee){
    return this.http.delete(environment.employeeUrl+'/'+employee._id);
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
