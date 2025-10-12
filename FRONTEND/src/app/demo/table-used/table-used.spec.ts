import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableUsed } from './table-used';

describe('TableUsed', () => {
  let component: TableUsed;
  let fixture: ComponentFixture<TableUsed>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableUsed]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableUsed);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
