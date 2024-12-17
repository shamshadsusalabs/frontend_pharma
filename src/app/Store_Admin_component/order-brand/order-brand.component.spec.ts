import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderBrandComponent } from './order-brand.component';

describe('OrderBrandComponent', () => {
  let component: OrderBrandComponent;
  let fixture: ComponentFixture<OrderBrandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderBrandComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderBrandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
