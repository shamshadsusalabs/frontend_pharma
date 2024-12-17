import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistributorPendingOrderComponent } from './distributor-pending-order.component';

describe('DistributorPendingOrderComponent', () => {
  let component: DistributorPendingOrderComponent;
  let fixture: ComponentFixture<DistributorPendingOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DistributorPendingOrderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DistributorPendingOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
