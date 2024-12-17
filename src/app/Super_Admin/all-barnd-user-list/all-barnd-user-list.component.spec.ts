import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllBarndUserListComponent } from './all-barnd-user-list.component';

describe('AllBarndUserListComponent', () => {
  let component: AllBarndUserListComponent;
  let fixture: ComponentFixture<AllBarndUserListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllBarndUserListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllBarndUserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
