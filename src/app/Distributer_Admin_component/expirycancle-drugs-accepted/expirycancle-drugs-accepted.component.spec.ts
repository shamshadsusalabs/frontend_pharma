import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpirycancleDrugsAcceptedComponent } from './expirycancle-drugs-accepted.component';

describe('ExpirycancleDrugsAcceptedComponent', () => {
  let component: ExpirycancleDrugsAcceptedComponent;
  let fixture: ComponentFixture<ExpirycancleDrugsAcceptedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpirycancleDrugsAcceptedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExpirycancleDrugsAcceptedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
