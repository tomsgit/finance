import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TickerTypeaheadComponent } from './ticker-typeahead.component';

describe('TickerTypeaheadComponent', () => {
  let component: TickerTypeaheadComponent;
  let fixture: ComponentFixture<TickerTypeaheadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TickerTypeaheadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TickerTypeaheadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
