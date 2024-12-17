import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandSetShopanddiscountComponent } from './brand-set-shopanddiscount.component';

describe('BrandSetShopanddiscountComponent', () => {
  let component: BrandSetShopanddiscountComponent;
  let fixture: ComponentFixture<BrandSetShopanddiscountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrandSetShopanddiscountComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BrandSetShopanddiscountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
