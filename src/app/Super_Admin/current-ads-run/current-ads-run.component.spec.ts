import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentAdsRunComponent } from './current-ads-run.component';

describe('CurrentAdsRunComponent', () => {
  let component: CurrentAdsRunComponent;
  let fixture: ComponentFixture<CurrentAdsRunComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CurrentAdsRunComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CurrentAdsRunComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
