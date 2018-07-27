import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PortfolioTrendsComponent } from './portfolio-trends.component';

describe('PortfolioTrendsComponent', () => {
  let component: PortfolioTrendsComponent;
  let fixture: ComponentFixture<PortfolioTrendsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PortfolioTrendsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PortfolioTrendsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
