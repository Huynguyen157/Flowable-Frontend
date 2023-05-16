import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StencilControllerComponent } from './stencil-controller.component';

describe('StencilControllerComponent', () => {
  let component: StencilControllerComponent;
  let fixture: ComponentFixture<StencilControllerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StencilControllerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StencilControllerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
