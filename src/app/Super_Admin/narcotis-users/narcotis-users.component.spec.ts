import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NarcotisUsersComponent } from './narcotis-users.component';

describe('NarcotisUsersComponent', () => {
  let component: NarcotisUsersComponent;
  let fixture: ComponentFixture<NarcotisUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NarcotisUsersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NarcotisUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
