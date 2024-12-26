import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpiryexcahngeRejectedComponent } from './expiryexcahnge-rejected.component';

describe('ExpiryexcahngeRejectedComponent', () => {
  let component: ExpiryexcahngeRejectedComponent;
  let fixture: ComponentFixture<ExpiryexcahngeRejectedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpiryexcahngeRejectedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExpiryexcahngeRejectedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
