import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderDistributoreComponent } from './order-distributore.component';

describe('OrderDistributoreComponent', () => {
  let component: OrderDistributoreComponent;
  let fixture: ComponentFixture<OrderDistributoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderDistributoreComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderDistributoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
