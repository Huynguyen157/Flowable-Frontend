import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditUnsavedChangesPopupCtrlComponent } from './edit-unsaved-changes-popup-ctrl.component';

describe('EditUnsavedChangesPopupCtrlComponent', () => {
  let component: EditUnsavedChangesPopupCtrlComponent;
  let fixture: ComponentFixture<EditUnsavedChangesPopupCtrlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditUnsavedChangesPopupCtrlComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditUnsavedChangesPopupCtrlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
