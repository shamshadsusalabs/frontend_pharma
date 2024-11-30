import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpiryDrugComponent } from './expiry-drug.component';

describe('ExpiryDrugComponent', () => {
  let component: ExpiryDrugComponent;
  let fixture: ComponentFixture<ExpiryDrugComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpiryDrugComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExpiryDrugComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
