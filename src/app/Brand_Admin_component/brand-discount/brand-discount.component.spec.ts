import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandDiscountComponent } from './brand-discount.component';

describe('BrandDiscountComponent', () => {
  let component: BrandDiscountComponent;
  let fixture: ComponentFixture<BrandDiscountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrandDiscountComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BrandDiscountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
