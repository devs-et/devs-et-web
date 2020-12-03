import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ViewChannelComponent } from './view-channel.component';

describe('ViewChannelComponent', () => {
  let component: ViewChannelComponent;
  let fixture: ComponentFixture<ViewChannelComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewChannelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewChannelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
