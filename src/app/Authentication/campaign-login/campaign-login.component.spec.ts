import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignLoginComponent } from './campaign-login.component';

describe('CampaignLoginComponent', () => {
  let component: CampaignLoginComponent;
  let fixture: ComponentFixture<CampaignLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CampaignLoginComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CampaignLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
