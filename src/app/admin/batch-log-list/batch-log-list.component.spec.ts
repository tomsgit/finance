import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BatchLogListComponent } from './batch-log-list.component';

describe('BatchLogListComponent', () => {
  let component: BatchLogListComponent;
  let fixture: ComponentFixture<BatchLogListComponent>;

  beforeEach(waitForAsync(() => {
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
