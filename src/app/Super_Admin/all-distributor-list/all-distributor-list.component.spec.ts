import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllDistributorListComponent } from './all-distributor-list.component';

describe('AllDistributorListComponent', () => {
  let component: AllDistributorListComponent;
  let fixture: ComponentFixture<AllDistributorListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllDistributorListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllDistributorListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
