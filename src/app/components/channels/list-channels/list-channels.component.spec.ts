import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ListChannelsComponent } from './list-channels.component';

describe('ListChannelsComponent', () => {
  let component: ListChannelsComponent;
  let fixture: ComponentFixture<ListChannelsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ListChannelsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListChannelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
