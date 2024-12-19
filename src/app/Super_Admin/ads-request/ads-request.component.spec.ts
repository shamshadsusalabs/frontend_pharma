import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdsRequestComponent } from './ads-request.component';

describe('AdsRequestComponent', () => {
  let component: AdsRequestComponent;
  let fixture: ComponentFixture<AdsRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdsRequestComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdsRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
