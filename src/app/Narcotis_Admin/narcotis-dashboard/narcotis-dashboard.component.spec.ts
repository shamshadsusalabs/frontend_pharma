import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NarcotisDashboardComponent } from './narcotis-dashboard.component';

describe('NarcotisDashboardComponent', () => {
  let component: NarcotisDashboardComponent;
  let fixture: ComponentFixture<NarcotisDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NarcotisDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NarcotisDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
