import { Component, OnInit } from '@angular/core';
import { SONGS } from '../mock-songs';
import { Song } from '../song';

@Component({
  selector: 'app-songs',
  templateUrl: './songs.component.html',
  styleUrls: ['./songs.component.scss']
})
export class SongsComponent implements OnInit {

  songs = SONGS;

  selectedSong!: Song;

  constructor() { }

  ngOnInit(): void {
  }

  onSelect(song: Song): void {
    this.selectedSong = song;
  }

}
