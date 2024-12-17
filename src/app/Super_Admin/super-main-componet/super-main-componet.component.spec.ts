import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperMainComponetComponent } from './super-main-componet.component';

describe('SuperMainComponetComponent', () => {
  let component: SuperMainComponetComponent;
  let fixture: ComponentFixture<SuperMainComponetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuperMainComponetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuperMainComponetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
