import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TxnFormComponent } from './txn-form.component';

describe('TxnFormComponent', () => {
  let component: TxnFormComponent;
  let fixture: ComponentFixture<TxnFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TxnFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TxnFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
