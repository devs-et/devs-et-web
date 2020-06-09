import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostMenuComponent } from './post-menu.component';

describe('PostMenuComponent', () => {
  let component: PostMenuComponent;
  let fixture: ComponentFixture<PostMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
