import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseFileComponent } from './purchase-file.component';

describe('PurchaseFileComponent', () => {
  let component: PurchaseFileComponent;
  let fixture: ComponentFixture<PurchaseFileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PurchaseFileComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PurchaseFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
