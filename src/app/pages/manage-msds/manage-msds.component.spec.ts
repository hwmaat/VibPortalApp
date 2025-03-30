import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageMsdsComponent } from './manage-msds.component';

describe('ManageMsdsComponent', () => {
  let component: ManageMsdsComponent;
  let fixture: ComponentFixture<ManageMsdsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageMsdsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageMsdsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
