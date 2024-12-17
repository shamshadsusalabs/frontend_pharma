import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandConfirmOrderComponent } from './brand-confirm-order.component';

describe('BrandConfirmOrderComponent', () => {
  let component: BrandConfirmOrderComponent;
  let fixture: ComponentFixture<BrandConfirmOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrandConfirmOrderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BrandConfirmOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
