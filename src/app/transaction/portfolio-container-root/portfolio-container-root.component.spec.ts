import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PortfolioContainerRootComponent } from './portfolio-container-root.component';

describe('PortfolioContainerRootComponent', () => {
  let component: PortfolioContainerRootComponent;
  let fixture: ComponentFixture<PortfolioContainerRootComponent>;

  beforeEach(async(() => {
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
