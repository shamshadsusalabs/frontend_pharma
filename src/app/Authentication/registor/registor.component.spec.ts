import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistorComponent } from './registor.component';

describe('RegistorComponent', () => {
  let component: RegistorComponent;
  let fixture: ComponentFixture<RegistorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
