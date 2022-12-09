import {Component, OnInit} from '@angular/core';
import {EmployeeService} from "../../services/employee.service";
import {Employee} from "../../models/Employee";
import {cloneDeep} from 'lodash';

@Component({
  selector: 'app-employee-table',
  templateUrl: './employees-table.component.html',
  styleUrls: ['./employees-table.component.css']
})
export class EmployeesTableComponent implements OnInit
{

  employees: any[];
  originalEmployees: Employee[] = [];

  constructor(private employeeService: EmployeeService) {
  }

  ngOnInit(): void
  {
    this.loadEmployees();
  }

  private loadEmployees()
  {
    this.employeeService.getAllEmployees().subscribe((employees) =>
    {
      employees.forEach(employee =>
      {
        employee.TotalTimeInMonth = this.calculateTimeInMonth(employee);
      })

        this.employees = this.filterEmployeesAndCalculateTotalTimeInMonth(employees)
                             .sort((a,b) => b.TotalTimeInMonth - a.TotalTimeInMonth)
                             .filter(element => element.EmployeeName !== "null");
    })
  }

   onEdit(item: any)
   {
    // only one element can be edited at the time
    this.employees.forEach(employee =>
    {
      employee.isEdit = false;
    })

     this.originalEmployees = cloneDeep(this.employees)

     item.isEdit = true;
   }

  onSave(employee: Employee)
  {
    let index = this.employees.findIndex(obj => obj.EmployeeName == employee.EmployeeName);

    this.employees[index].EmployeeName = employee.EmployeeName;
    this.employees[index].TotalTimeInMonth = employee.TotalTimeInMonth;

    this.employees.sort((a,b) => b.TotalTimeInMonth - a.TotalTimeInMonth)

    employee.isEdit = false;
  }

  onCancel(employee: any)
  {
    this.employees = this.originalEmployees;
    employee.isEdit = false;
  }

  calculateTimeInMonth(employee: Employee)
  {
    const date1 = new Date (employee.EndTimeUtc);
    const date2 = new Date (employee.StarTimeUtc);

    let difference_in_time = date1.getTime() - date2.getTime();
    return Math.round(difference_in_time / 1000 / 60 / 60);
  }

  filterEmployeesAndCalculateTotalTimeInMonth(employees: Employee[])
  {
    interface Output { [key: string]: number; }
    const uniqueEmployees: Output = { };

   for (let employee of employees)
   {
     if (uniqueEmployees[employee.EmployeeName])
     {
       uniqueEmployees[employee.EmployeeName] += employee.TotalTimeInMonth;
     }
     else
     {
       uniqueEmployees[employee.EmployeeName] = employee.TotalTimeInMonth;
     }
   }

   return Object.keys(uniqueEmployees).map((key) =>
   {
     return {
       EmployeeName: key,
       TotalTimeInMonth: uniqueEmployees[key]
     }  as Employee
   })
  }
}
