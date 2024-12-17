import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperSellDrugsComponent } from './super-sell-drugs.component';

describe('SuperSellDrugsComponent', () => {
  let component: SuperSellDrugsComponent;
  let fixture: ComponentFixture<SuperSellDrugsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuperSellDrugsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuperSellDrugsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
