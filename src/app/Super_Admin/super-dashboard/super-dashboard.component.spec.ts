import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperDashboardComponent } from './super-dashboard.component';

describe('SuperDashboardComponent', () => {
  let component: SuperDashboardComponent;
  let fixture: ComponentFixture<SuperDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuperDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuperDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
