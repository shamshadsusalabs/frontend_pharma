import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NarcotisRegistationComponent } from './narcotis-registation.component';

describe('NarcotisRegistationComponent', () => {
  let component: NarcotisRegistationComponent;
  let fixture: ComponentFixture<NarcotisRegistationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NarcotisRegistationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NarcotisRegistationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
