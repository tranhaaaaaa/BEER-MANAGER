import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportCost } from './report-cost';

describe('ReportCost', () => {
  let component: ReportCost;
  let fixture: ComponentFixture<ReportCost>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportCost]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportCost);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
