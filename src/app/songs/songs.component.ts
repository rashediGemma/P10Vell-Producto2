import { Component, OnInit } from '@angular/core';
import { Song } from '../song';
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-songs',
  templateUrl: './songs.component.html',
  styleUrls: ['./songs.component.scss']
})
export class SongsComponent implements OnInit {

  //songs = SONGS;

  songs: any = [];
  searchSong?: string;

  selectedSong!: Song;

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.httpClient.get("assets/mock-songs.json").subscribe(data =>{
      this.songs = data;
    })
  }

  onSelect(song: Song): void {
    this.selectedSong = song;
  }

}
