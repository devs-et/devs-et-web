import { Component, OnInit } from '@angular/core';
import { ChannelCrudService } from '../../../channels/channel-crud.service';
import { toDashedString } from '../../../lib/dashed-string';

@Component({
  selector: 'create-channel',
  templateUrl: './create-channel.component.html',
  styleUrls: ['./create-channel.component.scss']
})
export class CreateChannelComponent implements OnInit {
  name: string;
  description: string;

  constructor(
    public channelCrud: ChannelCrudService,
  ) {
    console.log('create channel')
   }

  ngOnInit(): void {
  }

  create() {
    if (this.name.trim() !== '' && this.description.trim() !== '') {
      this.channelCrud.create(this.name, this.description)
    }
  }

}
