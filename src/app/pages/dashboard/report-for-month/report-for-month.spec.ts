import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportForMonth } from './report-for-month';

describe('ReportForMonth', () => {
  let component: ReportForMonth;
  let fixture: ComponentFixture<ReportForMonth>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportForMonth]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportForMonth);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
