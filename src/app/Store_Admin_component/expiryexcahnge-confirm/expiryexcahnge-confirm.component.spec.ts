import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpiryexcahngeConfirmComponent } from './expiryexcahnge-confirm.component';

describe('ExpiryexcahngeConfirmComponent', () => {
  let component: ExpiryexcahngeConfirmComponent;
  let fixture: ComponentFixture<ExpiryexcahngeConfirmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpiryexcahngeConfirmComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExpiryexcahngeConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
