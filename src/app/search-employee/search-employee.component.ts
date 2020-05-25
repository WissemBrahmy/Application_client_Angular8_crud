import { Observable } from "rxjs";
import { EmployeeService } from "./../employee.service";
import { Employee } from "./../employee";
import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-employee',
  templateUrl: './search-employee.component.html',
  styleUrls: ['./search-employee.component.scss']
})
export class SearchEmployeeComponent implements OnInit {
  employees: Observable<Employee[]>;
  department: string;

  constructor(private employeeService: EmployeeService,
    private router: Router) { }

  ngOnInit() {
    this.department = "";
  }
  private searchDepartment() {
    this.employeeService.getEmployeesByDepartment(this.department)
    .subscribe((data:any) => {
      console.log(data);
      this.employees = data;
    }, error => console.log(error)); }
 
  onSubmit() {
    this.searchDepartment();
  }
  reloadData() {
    this.employees = this.employeeService.getEmployeesByDepartment(this.department);
  }

  deleteEmployee(id: number) {
    if(window.confirm('Are sure you want to delete this employee ?')){
     this.employeeService.deleteEmployee(id)
       .subscribe(
         data => {
           console.log(data);
           this.reloadData();
         },
         error => console.log(error));
    }
   }
   employeeDetails(id: number){
     this.router.navigate(['details', id]);
   }
 
   
   updateEmployee(id: number){
     this.router.navigate(['update', id]);
   }
}
