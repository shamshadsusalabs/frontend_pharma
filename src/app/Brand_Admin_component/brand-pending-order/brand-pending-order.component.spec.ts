import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandPendingOrderComponent } from './brand-pending-order.component';

describe('BrandPendingOrderComponent', () => {
  let component: BrandPendingOrderComponent;
  let fixture: ComponentFixture<BrandPendingOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrandPendingOrderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BrandPendingOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
