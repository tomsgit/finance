import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TickerContainerComponent } from './ticker-container.component';

describe('TickerContainerComponent', () => {
  let component: TickerContainerComponent;
  let fixture: ComponentFixture<TickerContainerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TickerContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TickerContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
