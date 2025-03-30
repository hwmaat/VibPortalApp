import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadMsdsComponent } from './upload-msds.component';

describe('UploadMsdsComponent', () => {
  let component: UploadMsdsComponent;
  let fixture: ComponentFixture<UploadMsdsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UploadMsdsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadMsdsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
