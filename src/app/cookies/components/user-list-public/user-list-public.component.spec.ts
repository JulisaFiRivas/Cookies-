import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserListPublicComponent } from './user-list-public.component';

describe('UserListPublicComponent', () => {
  let component: UserListPublicComponent;
  let fixture: ComponentFixture<UserListPublicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserListPublicComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserListPublicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
