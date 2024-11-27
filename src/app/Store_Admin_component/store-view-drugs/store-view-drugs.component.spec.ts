import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreViewDrugsComponent } from './store-view-drugs.component';

describe('StoreViewDrugsComponent', () => {
  let component: StoreViewDrugsComponent;
  let fixture: ComponentFixture<StoreViewDrugsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StoreViewDrugsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StoreViewDrugsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
