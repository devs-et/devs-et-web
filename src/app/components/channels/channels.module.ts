import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ListChannelsComponent } from './list-channels/list-channels.component';
import { ChannelsPageComponent } from './channels-page/channels-page.component';

import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatRippleModule } from '@angular/material/core';

import { ViewChannelComponent } from './view-channel/view-channel.component';
import { CreateChannelComponent } from './create-channel/create-channel.component';

@NgModule({
  declarations: [
    ListChannelsComponent,
    ChannelsPageComponent,
    ViewChannelComponent,
    CreateChannelComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatListModule,
    MatButtonModule,
    MatCardModule,
    MatRippleModule,
  ],
  exports: [
    ListChannelsComponent,
  ],
})
export class ChannelsModule { }
