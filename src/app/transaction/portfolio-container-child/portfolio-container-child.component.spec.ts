import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PortfolioContainerChildComponent } from './portfolio-container-child.component';

describe('PortfolioContainerChildComponent', () => {
  let component: PortfolioContainerChildComponent;
  let fixture: ComponentFixture<PortfolioContainerChildComponent>;

  beforeEach(waitForAsync(() => {
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
