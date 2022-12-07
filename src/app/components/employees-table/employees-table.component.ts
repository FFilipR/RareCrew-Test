import {Component, OnInit} from '@angular/core';
import {EmployeeService} from "../../services/employee.service";
import {Employee} from "../../models/Employee";

@Component({
  selector: 'app-employee-table',
  templateUrl: './employees-table.component.html',
  styleUrls: ['./employees-table.component.css']
})
export class EmployeesTableComponent implements OnInit {

  employees: Employee[] = [];

  constructor(
    private employeeService: EmployeeService)
  {}

  ngOnInit() {
    this.loadEmployees();
  }

  loadEmployees()
  {
    this.employeeService
      .getAllEmployees()
      .subscribe(employees => this.employees = employees.slice(5, 9));
  }

  onEdit(item: any) {
    // only one element can be edited at the time
    this.employees.forEach(employee =>
    {
      employee.isEdit = false;
    })

    item.isEdit = true;
  }

  saveEmployee(employee: Employee)
  {
    let index = this.employees.findIndex(obj => obj.Id == employee.Id);
    this.employees[index].EmployeeName = employee.EmployeeName;
    this.employees[index].TotalTimeInMonth = employee.TotalTimeInMonth;
    debugger
    employee.isEdit = false;
  }

  calculateTotalTimeInMonth(employee: Employee): number
  {
    const date1 = new Date (employee.EndTimeUtc)
    const date2 = new Date (employee.StarTimeUtc)

    let difference_in_time = date1.getTime() - date2.getTime()
    return Math.round(difference_in_time / 1000 / 60 / 60);
  }
}

