import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Song } from '../song';
import * as moment from 'moment';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {

  @Input() song?: Song;
  currentSong?: string;
  audio = new Audio();
  audio2 = new Audio();
  duration = this.song?.duration;
  currentTime = '00:00';
  seek = 0;
  audioEvents = [
    'ended',
    'error',
    'play',
    'playing',
    'pause',
    'timeupdate',
    'canplay',
    'loadedmetadata',
    'loadstart',
  ];

  /* tutorial: 
  https://auth0.com/blog/building-an-audio-player-app-with-angular-and-rxjs/
  */

  constructor() { }

  ngOnInit(): void {    
  }

  openFile() {
    this.currentSong = this.song?.url;
    if (this.audio) {
      this.audio2.currentTime = this.audio.currentTime;
      this.streamObserver(this.song!.url).subscribe(() => {});
      this.audio.currentTime = this.audio2.currentTime;
    } else {
      this.streamObserver(this.song!.url).subscribe(() => {});
    }
  }

  streamObserver(url: any) {
    if (this.audio.ended) {
      this.openFile();
    }
    return new Observable((observer) => {
      var url_assets = 'assets/songs/';
      this.audio.src = url_assets+url;
      this.audio.load();
      this.audio.play();
      this.duration = this.timeFormat(this.audio.duration);
      const handler = (event: Event) => {
        this.seek = this.audio.currentTime;
        this.duration = this.timeFormat(this.audio.duration);
        this.currentTime = this.timeFormat(this.audio.currentTime);
      };
      this.addEvent(this.audio, this.audioEvents, handler);
      return () => {
        this.audio.pause();
        this.audio.currentTime = 0;
        this.removeEvent(this.audio, this.audioEvents, handler);
      };
    });
  }

  playSong() {
    if (!this.audio.src || this.song?.url !== this.currentSong) {
      this.openFile();
      this.audio.currentTime = 0;
    }
    this.audio.play();
  }
  
  pauseSong() {
    this.audio.pause();
  }

  stopSong() {
    this.audio.pause();
    this.audio.currentTime = 0;
  }

  addEvent(obj: any, events: any, handler: any) {
    events.forEach((event: any) => {
      obj.addEventListener(event, handler);
    });
  }

  removeEvent(obj: any, events: any, handler: any) {
    events.forEach((event: any) => {
      obj.removeEventListener(event, handler);
    });
  }

  setSeekTo(ev: any) {
    this.audio.currentTime = ev.target.value;
  }

  setVolume(ev: any): void {
    this.audio.volume = ev.target.value;
  }

  timeFormat(time: any, format = 'mm:ss') {
    const momentTime = time * 1000;
    return moment.utc(momentTime).format(format);
  }

  getDuration() {
    return this.audio.duration;
  }

  getDisplayDuration() {
    if (this.song) {
      return this.song.duration;
    } else {
      return '00:00';
    }
  }

  getTiempoRestante(length: any) {
    var minutes = Math.floor(length / 60),
      seconds_int = length - minutes * 60,
      seconds_str = seconds_int.toString(),
      seconds =
        seconds_int < 10 ? seconds_str.substr(0, 1) : seconds_str.substr(0, 2),
      time =
        (minutes < 10 ? '0' + minutes : minutes) +
        ':' +
        (seconds_int < 10 ? '0' + seconds : seconds);
    return time;
  }

  getDisplayedTiempoRestante() {
    if (!this.audio.duration) {
      return this.timeFormat(0);
    } else {
      return this.timeFormat(this.audio.duration - this.audio.currentTime);
    }
  }

  getDisplayedDuracionTotal() {
    if (!this.audio.duration) {
      return this.timeFormat(0);
    } else {
      return this.timeFormat(this.audio.duration);
    }
  }

}
