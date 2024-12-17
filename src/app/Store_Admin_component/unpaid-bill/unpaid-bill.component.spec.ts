import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnpaidBillComponent } from './unpaid-bill.component';

describe('UnpaidBillComponent', () => {
  let component: UnpaidBillComponent;
  let fixture: ComponentFixture<UnpaidBillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UnpaidBillComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnpaidBillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
