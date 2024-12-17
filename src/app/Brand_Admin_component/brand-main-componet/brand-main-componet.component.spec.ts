import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandMainComponetComponent } from './brand-main-componet.component';

describe('BrandMainComponetComponent', () => {
  let component: BrandMainComponetComponent;
  let fixture: ComponentFixture<BrandMainComponetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrandMainComponetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BrandMainComponetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
