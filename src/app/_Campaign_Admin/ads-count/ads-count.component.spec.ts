import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdsCountComponent } from './ads-count.component';

describe('AdsCountComponent', () => {
  let component: AdsCountComponent;
  let fixture: ComponentFixture<AdsCountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdsCountComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdsCountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
