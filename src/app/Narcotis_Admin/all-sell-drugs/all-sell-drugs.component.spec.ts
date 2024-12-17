import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllSellDrugsComponent } from './all-sell-drugs.component';

describe('AllSellDrugsComponent', () => {
  let component: AllSellDrugsComponent;
  let fixture: ComponentFixture<AllSellDrugsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllSellDrugsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllSellDrugsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
