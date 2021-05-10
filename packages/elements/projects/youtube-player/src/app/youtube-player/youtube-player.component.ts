import { Component, Input, OnInit } from '@angular/core';
import { ResizedEvent } from 'angular-resize-event';

import { DraymanYoutubePlayer } from '../models/youtube-player-options';

@Component({
  selector: 'drayman-youtube-player-internal',
  templateUrl: './youtube-player.component.html',
  styleUrls: ['./youtube-player.component.scss']
})
export class YoutubePlayerComponent implements OnInit {

  @Input() options: DraymanYoutubePlayer;

  width: number;
  height: number;

  constructor() { }

  ngOnInit(): void {
    if (!window['youtubeApiLoaded']) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      document.body.appendChild(tag);
      window['youtubeApiLoaded'] = true;
    }
  }

  onResized(event: ResizedEvent) {
    this.width = event.newWidth - 20;
    this.height = event.newHeight - 20;
  }

}
