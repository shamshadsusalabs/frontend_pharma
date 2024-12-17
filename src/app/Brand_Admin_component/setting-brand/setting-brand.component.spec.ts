import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingBrandComponent } from './setting-brand.component';

describe('SettingBrandComponent', () => {
  let component: SettingBrandComponent;
  let fixture: ComponentFixture<SettingBrandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SettingBrandComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SettingBrandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
