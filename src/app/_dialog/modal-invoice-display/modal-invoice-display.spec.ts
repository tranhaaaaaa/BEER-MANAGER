import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalInvoiceDisplay } from './modal-invoice-display';

describe('ModalInvoiceDisplay', () => {
  let component: ModalInvoiceDisplay;
  let fixture: ComponentFixture<ModalInvoiceDisplay>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalInvoiceDisplay]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalInvoiceDisplay);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
