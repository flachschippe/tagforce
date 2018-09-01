/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ForcegraphComponent } from './forcegraph.component';

describe('ForcegraphComponent', () => {
  let component: ForcegraphComponent;
  let fixture: ComponentFixture<ForcegraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForcegraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForcegraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
