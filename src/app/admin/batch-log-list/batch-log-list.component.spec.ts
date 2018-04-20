import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BatchLogListComponent } from './batch-log-list.component';

describe('BatchLogListComponent', () => {
  let component: BatchLogListComponent;
  let fixture: ComponentFixture<BatchLogListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BatchLogListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BatchLogListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
