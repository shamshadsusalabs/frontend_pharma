import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpirycancleDrugsComponent } from './expirycancle-drugs.component';

describe('ExpirycancleDrugsComponent', () => {
  let component: ExpirycancleDrugsComponent;
  let fixture: ComponentFixture<ExpirycancleDrugsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpirycancleDrugsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExpirycancleDrugsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
