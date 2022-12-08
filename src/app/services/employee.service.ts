import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Employee} from "../models/Employee";


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private employeesUrl = "https://rc-vault-fap-live-1.azurewebsites.net/api/gettimeentries?code=vO17RnE8vuzXzPJo5eaLLjXjmRW07law99QTD90zat9FfOQJKKUcgQ=="

  constructor(private http: HttpClient) { }

  getAllEmployees()
  {
    return this.http.get<Employee[]>(this.employeesUrl);
  }

/*  getEmployee(id: number): Observable<Employee | null | undefined> {
    return this.getAllEmployees().pipe(
      map(employees => employees.find(employee => employee.Id === id))
    );
  }*/
}
