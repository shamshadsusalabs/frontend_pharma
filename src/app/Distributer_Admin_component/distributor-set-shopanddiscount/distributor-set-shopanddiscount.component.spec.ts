import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistributorSetShopanddiscountComponent } from './distributor-set-shopanddiscount.component';

describe('DistributorSetShopanddiscountComponent', () => {
  let component: DistributorSetShopanddiscountComponent;
  let fixture: ComponentFixture<DistributorSetShopanddiscountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DistributorSetShopanddiscountComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DistributorSetShopanddiscountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
