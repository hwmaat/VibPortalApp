import { ComponentFixture, TestBed } from '@angular/core/testing';

import { B2bMailboxComponent } from './b2b-mailbox.component';

describe('B2bMailboxComponent', () => {
  let component: B2bMailboxComponent;
  let fixture: ComponentFixture<B2bMailboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [B2bMailboxComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(B2bMailboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
