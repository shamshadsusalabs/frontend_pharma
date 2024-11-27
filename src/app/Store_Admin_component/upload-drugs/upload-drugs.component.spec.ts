import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadDrugsComponent } from './upload-drugs.component';

describe('UploadDrugsComponent', () => {
  let component: UploadDrugsComponent;
  let fixture: ComponentFixture<UploadDrugsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UploadDrugsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadDrugsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
