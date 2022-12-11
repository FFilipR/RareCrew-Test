import {Component, Input, OnChanges, ViewChild} from '@angular/core';
import {Chart} from "chart.js/auto";
import {Employee} from "../../models/Employee";

@Component({
  selector: 'app-total-time-worked-pie-chart',
  templateUrl: './total-time-worked-pie-chart.component.html',
  styleUrls: ['./total-time-worked-pie-chart.component.css']
})
export class TotalTimeWorkedPieChartComponent implements OnChanges
{
  canvas: any;
  ctx: any;
  pieChart: any;

  @ViewChild('pieCanvas') pieCanvas!: { nativeElement: any };

  @Input()  inputEmployees: Employee[];

  employeeNames: String[] = [];
  employeeTotalTimeWorked: number[] = [];

  constructor() {}

  ngOnChanges(): void
  {
    this.employeeNames = [];
    this.employeeTotalTimeWorked = [];

    this.inputEmployees.forEach(e => this.employeeNames.push(e.EmployeeName));
    this.inputEmployees.forEach(e => this.employeeTotalTimeWorked.push(e.TotalTimeInMonth));

    this.employeeTotalTimeWorked = this.toPercentage(this.employeeTotalTimeWorked)

    this.pieChartBrowser();
    this.updatePieChart(this.pieChart,this.employeeNames,this.employeeTotalTimeWorked);
  }

  pieChartBrowser(): void
  {
    this.canvas = this.pieCanvas.nativeElement;
    this.ctx = this.canvas.getContext('2d');

    let data =  {
      datasets:
        [
          {
            backgroundColor:
              [
                '#2ecc71',
                '#3498db',
                '#95a5a6',
                '#9b59b6',
                '#f1c40f',
                '#f11906',
                '#e74c3c',
                '#1b6940',
                '#1509d3',
                '#ff7ec2',
              ],
            borderWidth: 0,
            data: this.employeeTotalTimeWorked,
            hoverOffset: 20
          },
        ],
      labels: this.employeeNames,
    }

    this.pieChart = new Chart(this.ctx,
{
        type: 'pie',
        data: data,
          options:
            {
              plugins:
                {
                  tooltip:
                    {
                      callbacks:
                        {
                          label: function(context)
                          {
                            return `${context.formattedValue}%`;
                          }
                        },
                      titleAlign: 'center',
                      bodyAlign: 'center',
                      displayColors: false
                    }
                }
            }
      });
  }

   toPercentage(numbers: number[])
   {
     const sum = numbers.reduce((accumulator, current) =>
     {
       return accumulator + current;
     }, 0);

     numbers = numbers.map(number => number / sum * 100);

     for (let f=0; f < numbers.length; f++)
     {
       numbers[f] = +numbers[f].toFixed(2);
     }
     return numbers
  }

  updatePieChart(chart: Chart, names: String[], hours: number[])
  {
    chart.data.labels = names;
    chart.data.datasets.forEach((dataset) =>
    {
    dataset.data = hours;
    });
    chart.update();
  }

}
