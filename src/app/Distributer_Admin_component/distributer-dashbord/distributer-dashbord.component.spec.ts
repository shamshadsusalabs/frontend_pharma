import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistributerDashbordComponent } from './distributer-dashbord.component';

describe('DistributerDashbordComponent', () => {
  let component: DistributerDashbordComponent;
  let fixture: ComponentFixture<DistributerDashbordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DistributerDashbordComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DistributerDashbordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
