import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllTableReport } from './all-table-report';

describe('AllTableReport', () => {
  let component: AllTableReport;
  let fixture: ComponentFixture<AllTableReport>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllTableReport]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllTableReport);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
