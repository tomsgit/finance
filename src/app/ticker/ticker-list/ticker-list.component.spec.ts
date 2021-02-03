import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TickerListComponent } from './ticker-list.component';

describe('TickerListComponent', () => {
  let component: TickerListComponent;
  let fixture: ComponentFixture<TickerListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TickerListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TickerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
