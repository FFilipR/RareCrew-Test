export class Employee
{
  Id: number;
  EmployeeName: string;
  StarTimeUtc: string;
  EndTimeUtc: string;
  EntryNotes: string;
  DeletedOn?: string;
  isEdit: boolean = false;
  TotalTimeInMonth: number;
}
