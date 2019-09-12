import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserInfosPage } from './user-infos.page';

describe('UserInfosPage', () => {
  let component: UserInfosPage;
  let fixture: ComponentFixture<UserInfosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserInfosPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserInfosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
