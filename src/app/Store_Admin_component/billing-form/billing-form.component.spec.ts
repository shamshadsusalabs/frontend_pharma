import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillingFormComponent } from './billing-form.component';

describe('BillingFormComponent', () => {
  let component: BillingFormComponent;
  let fixture: ComponentFixture<BillingFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BillingFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BillingFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
