import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpiryexcahngePendingComponent } from './expiryexcahnge-pending.component';

describe('ExpiryexcahngePendingComponent', () => {
  let component: ExpiryexcahngePendingComponent;
  let fixture: ComponentFixture<ExpiryexcahngePendingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpiryexcahngePendingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExpiryexcahngePendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
