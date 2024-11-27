import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UplodDrugsComponent } from './uplod-drugs.component';

describe('UplodDrugsComponent', () => {
  let component: UplodDrugsComponent;
  let fixture: ComponentFixture<UplodDrugsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UplodDrugsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UplodDrugsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
