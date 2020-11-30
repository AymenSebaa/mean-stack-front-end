import { AfterViewInit, Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { EmployeeService } from './employee.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { MatButton } from '@angular/material/button';
import { Employee } from './employee.model';
import { ModalComponent } from '../modal/modal.component';


@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit, AfterViewInit {

  constructor(public employeeService: EmployeeService, private _snackBar: MatSnackBar, private _dialog: MatDialog) { }

  ngOnInit(): void { 
    
  }
   
  ngAfterViewInit(){
    this.employeeService.selectedEmployee = this.employeeService.resetSelectedEmployee();
    this.employeeService.refreshEmployees();
  }
  resetForm(form: NgForm, btnSubmit: MatButton){
    btnSubmit._elementRef.nativeElement.textContent = 'Create';
    this.employeeService.selectedEmployee = this.employeeService.resetSelectedEmployee();
    form.resetForm();
  }

  onSubmit(form: NgForm, btnSubmit: MatButton){
    if(form.value._id === '' || form.value._id === null){
      this.employeeService.postEmplyoee(form.value).subscribe( (res) => {
        this.employeeService.employees.push(res as Employee );
        this.employeeService.refreshEmployees([...this.employeeService.employees]);
        this.openSnackBar("Employee created", "OK");
        this.resetForm(form, btnSubmit);
      });
    } else {
      this.employeeService.updateEmployee(form.value).subscribe( (res) => {
        console.log(res);
        let updatedEmployee = (res as Employee);
        const index = this.employeeService.employees.findIndex(employee => employee._id === updatedEmployee._id);
        this.employeeService.employees.splice(index, 1, updatedEmployee);
        this.employeeService.refreshEmployees([...this.employeeService.employees]);
        this.openSnackBar("Employee updated", "OK");
        this.resetForm(form, btnSubmit);
      });
    }
  }

  onEdit(employee: Employee, btnSubmit: MatButton){
    btnSubmit._elementRef.nativeElement.textContent = 'Update';
    this.employeeService.selectedEmployee = employee;
  }

  onDelete(employee: Employee, form: NgForm, btnSubmit: MatButton){
    btnSubmit._elementRef.nativeElement.textContent = 'Delete';
    this.employeeService.selectedEmployee = employee;
    const dialogRef = this.openDialog('Deleting emyployee', 'Are you sure?');
    dialogRef.afterClosed().subscribe(confirm => {
      if(confirm){
        this.employeeService.deleteEmployee(employee).subscribe((res) => {
          let deletedEmployee = (res as Employee);
          this.employeeService.refreshEmployees(this.employeeService.employees.filter(employee => employee._id !== deletedEmployee._id));
        });
      }
      this.resetForm(form, btnSubmit);
    });
  }

  openDialog(title: string, content: string) {
    return this._dialog.open(ModalComponent, {data: {title, content}});
  }
  openSnackBar(msg: string, diss: string, dur?: number, hPos?: any, vPos?: any) {
    this._snackBar.open(msg, diss, {
      duration: dur || 2000,
      horizontalPosition: hPos || 'center',
      verticalPosition: hPos || 'bottom',
    });
  }

}
