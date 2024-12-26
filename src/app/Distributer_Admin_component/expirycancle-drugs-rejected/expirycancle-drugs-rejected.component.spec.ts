import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpirycancleDrugsRejectedComponent } from './expirycancle-drugs-rejected.component';

describe('ExpirycancleDrugsRejectedComponent', () => {
  let component: ExpirycancleDrugsRejectedComponent;
  let fixture: ComponentFixture<ExpirycancleDrugsRejectedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpirycancleDrugsRejectedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExpirycancleDrugsRejectedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
