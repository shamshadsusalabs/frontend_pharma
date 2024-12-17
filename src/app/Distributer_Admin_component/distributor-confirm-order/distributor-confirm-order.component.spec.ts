import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistributorConfirmOrderComponent } from './distributor-confirm-order.component';

describe('DistributorConfirmOrderComponent', () => {
  let component: DistributorConfirmOrderComponent;
  let fixture: ComponentFixture<DistributorConfirmOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DistributorConfirmOrderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DistributorConfirmOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
