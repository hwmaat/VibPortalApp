import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMsdsComponent } from './edit-msds.component';

describe('EditMsdsComponent', () => {
  let component: EditMsdsComponent;
  let fixture: ComponentFixture<EditMsdsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditMsdsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditMsdsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
