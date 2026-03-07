import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCreateTable } from './modal-create-table';

describe('ModalCreateTable', () => {
  let component: ModalCreateTable;
  let fixture: ComponentFixture<ModalCreateTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalCreateTable]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalCreateTable);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
