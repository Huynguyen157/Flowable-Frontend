import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolbarControllerComponent } from './toolbar-controller.component';

describe('ToolbarControllerComponent', () => {
  let component: ToolbarControllerComponent;
  let fixture: ComponentFixture<ToolbarControllerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToolbarControllerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToolbarControllerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
