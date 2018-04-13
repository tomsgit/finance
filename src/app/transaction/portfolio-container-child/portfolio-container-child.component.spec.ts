import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PortfolioContainerChildComponent } from './portfolio-container-child.component';

describe('PortfolioContainerChildComponent', () => {
  let component: PortfolioContainerChildComponent;
  let fixture: ComponentFixture<PortfolioContainerChildComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PortfolioContainerChildComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PortfolioContainerChildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
