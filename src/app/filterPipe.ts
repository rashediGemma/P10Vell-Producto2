import { Pipe, PipeTransform } from '@angular/core';
import { Song } from './song';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

    /* Tutorial:
    https://coderjony.com/blogs/creating-a-pipe-to-filter-the-items-in-the-list-using-angular-7/
    */

    transform(songsList: Array<Song> | undefined, searchTerm: string | undefined): any {
        if (!songsList || !searchTerm) {
          return songsList;
        }
    
        return songsList.filter(
          (song) => song.title.toLocaleLowerCase().indexOf(searchTerm.toLocaleLowerCase()) !== -1 || song.album.toLocaleLowerCase().indexOf(searchTerm.toLocaleLowerCase()) !== -1
        );
      }
}