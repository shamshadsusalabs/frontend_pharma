import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestAddvertismentComponent } from './request-addvertisment.component';

describe('RequestAddvertismentComponent', () => {
  let component: RequestAddvertismentComponent;
  let fixture: ComponentFixture<RequestAddvertismentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RequestAddvertismentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequestAddvertismentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
