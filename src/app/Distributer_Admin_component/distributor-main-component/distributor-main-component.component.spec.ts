import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistributorMainComponentComponent } from './distributor-main-component.component';

describe('DistributorMainComponentComponent', () => {
  let component: DistributorMainComponentComponent;
  let fixture: ComponentFixture<DistributorMainComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DistributorMainComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DistributorMainComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
