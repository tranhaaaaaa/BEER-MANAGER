import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportForDay } from './report-for-day';

describe('ReportForDay', () => {
  let component: ReportForDay;
  let fixture: ComponentFixture<ReportForDay>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportForDay]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportForDay);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
