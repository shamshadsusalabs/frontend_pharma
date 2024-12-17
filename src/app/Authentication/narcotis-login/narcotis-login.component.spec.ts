import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NarcotisLoginComponent } from './narcotis-login.component';

describe('NarcotisLoginComponent', () => {
  let component: NarcotisLoginComponent;
  let fixture: ComponentFixture<NarcotisLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NarcotisLoginComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NarcotisLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
