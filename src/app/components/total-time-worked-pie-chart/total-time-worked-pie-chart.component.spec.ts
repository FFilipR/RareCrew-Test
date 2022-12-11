import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalTimeWorkedPieChartComponent } from './total-time-worked-pie-chart.component';

describe('TotalTimeWorkedPieChartComponent', () => {
  let component: TotalTimeWorkedPieChartComponent;
  let fixture: ComponentFixture<TotalTimeWorkedPieChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TotalTimeWorkedPieChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TotalTimeWorkedPieChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
