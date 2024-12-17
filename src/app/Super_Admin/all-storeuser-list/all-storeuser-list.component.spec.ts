import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllStoreuserListComponent } from './all-storeuser-list.component';

describe('AllStoreuserListComponent', () => {
  let component: AllStoreuserListComponent;
  let fixture: ComponentFixture<AllStoreuserListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllStoreuserListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllStoreuserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
