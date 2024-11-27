import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandViewDrugsComponent } from './brand-view-drugs.component';

describe('BrandViewDrugsComponent', () => {
  let component: BrandViewDrugsComponent;
  let fixture: ComponentFixture<BrandViewDrugsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrandViewDrugsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BrandViewDrugsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
