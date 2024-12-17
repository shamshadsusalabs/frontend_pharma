import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandDashbordComponent } from './brand-dashbord.component';

describe('BrandDashbordComponent', () => {
  let component: BrandDashbordComponent;
  let fixture: ComponentFixture<BrandDashbordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrandDashbordComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BrandDashbordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
