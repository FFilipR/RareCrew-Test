import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {EmployeesTableComponent} from "./components/employees-table/employees-table.component";


const routes: Routes = [
  {path: '', component: EmployeesTableComponent },
  {path: 'employees-table', component: EmployeesTableComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
