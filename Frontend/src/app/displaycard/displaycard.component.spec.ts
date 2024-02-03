import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplaycardComponent } from './displaycard.component';

describe('DisplaycardComponent', () => {
  let component: DisplaycardComponent;
  let fixture: ComponentFixture<DisplaycardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DisplaycardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DisplaycardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
