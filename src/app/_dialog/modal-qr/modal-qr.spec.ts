import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalQr } from './modal-qr';

describe('ModalQr', () => {
  let component: ModalQr;
  let fixture: ComponentFixture<ModalQr>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalQr]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalQr);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
