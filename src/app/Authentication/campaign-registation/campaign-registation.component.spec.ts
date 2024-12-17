import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignRegistationComponent } from './campaign-registation.component';

describe('CampaignRegistationComponent', () => {
  let component: CampaignRegistationComponent;
  let fixture: ComponentFixture<CampaignRegistationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CampaignRegistationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CampaignRegistationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
