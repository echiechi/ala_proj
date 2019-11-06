import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdzCardComponent } from './adz-card.component';

describe('AdzCardComponent', () => {
  let component: AdzCardComponent;
  let fixture: ComponentFixture<AdzCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdzCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdzCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
