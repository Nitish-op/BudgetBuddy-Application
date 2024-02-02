import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpencetrackingComponent } from './expencetracking.component';

describe('ExpencetrackingComponent', () => {
  let component: ExpencetrackingComponent;
  let fixture: ComponentFixture<ExpencetrackingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExpencetrackingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExpencetrackingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
