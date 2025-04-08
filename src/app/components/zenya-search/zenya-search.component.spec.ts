import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZenyaSearchComponent } from './zenya-search.component';

describe('ZenyaSearchComponent', () => {
  let component: ZenyaSearchComponent;
  let fixture: ComponentFixture<ZenyaSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ZenyaSearchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ZenyaSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
