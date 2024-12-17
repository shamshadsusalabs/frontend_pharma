import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingDistributorComponent } from './setting-distributor.component';

describe('SettingDistributorComponent', () => {
  let component: SettingDistributorComponent;
  let fixture: ComponentFixture<SettingDistributorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SettingDistributorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SettingDistributorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
