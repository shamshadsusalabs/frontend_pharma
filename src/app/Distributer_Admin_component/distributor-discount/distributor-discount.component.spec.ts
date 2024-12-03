import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistributorDiscountComponent } from './distributor-discount.component';

describe('DistributorDiscountComponent', () => {
  let component: DistributorDiscountComponent;
  let fixture: ComponentFixture<DistributorDiscountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DistributorDiscountComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DistributorDiscountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
