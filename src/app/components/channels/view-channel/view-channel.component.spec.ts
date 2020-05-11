import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewChannelComponent } from './view-channel.component';

describe('ViewChannelComponent', () => {
  let component: ViewChannelComponent;
  let fixture: ComponentFixture<ViewChannelComponent>;

  beforeEach(async(() => {
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
