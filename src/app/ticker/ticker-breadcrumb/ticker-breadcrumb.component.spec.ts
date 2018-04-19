import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TickerBreadcrumbComponent } from './ticker-breadcrumb.component';

describe('TickerBreadcrumbComponent', () => {
  let component: TickerBreadcrumbComponent;
  let fixture: ComponentFixture<TickerBreadcrumbComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TickerBreadcrumbComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TickerBreadcrumbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
