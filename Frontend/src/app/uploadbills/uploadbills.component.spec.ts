import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadbillsComponent } from './uploadbills.component';

describe('UploadbillsComponent', () => {
  let component: UploadbillsComponent;
  let fixture: ComponentFixture<UploadbillsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UploadbillsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UploadbillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
