import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'create-channel',
  templateUrl: './create-channel.component.html',
  styleUrls: ['./create-channel.component.scss']
})
export class CreateChannelComponent implements OnInit {

  constructor() {
    console.log('create channel')
   }

  ngOnInit(): void {
  }

}
