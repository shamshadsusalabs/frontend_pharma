import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignUsersComponent } from './campaign-users.component';

describe('CampaignUsersComponent', () => {
  let component: CampaignUsersComponent;
  let fixture: ComponentFixture<CampaignUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CampaignUsersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CampaignUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
