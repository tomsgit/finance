import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PortfolioContainerRootComponent } from './portfolio-container-root.component';

describe('PortfolioContainerRootComponent', () => {
  let component: PortfolioContainerRootComponent;
  let fixture: ComponentFixture<PortfolioContainerRootComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PortfolioContainerRootComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PortfolioContainerRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
