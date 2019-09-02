import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { Heroes, Hero, Relationships, MediaRelation } from './hero';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor(private http: HttpClient) { }

  /** GET heroes from the server */
  getHeroes(limit, page, search): Observable<Heroes> {
    let uBase = 'https://kitsu.io/api/edge/characters?';
    if (limit) {
      uBase += 'page[limit]=' + limit;
    }
    if (page) {
      uBase += '&page[offset]=' + (page * limit);
    }
    if (search) {
      uBase += '&filter[name]=' + search;
    }

    return this.http.get<any>(uBase)
      .pipe(
        map(result =>  {
          // console.log(result);
          return {
            data: result.data,
            count: result.meta.count
          };
        }),
        catchError(err => {
          // console.error("erro", err);
          return [];
        })
      );
  }

  getHero(id): Observable<Hero> {
    let uBase = 'https://kitsu.io/api/edge/characters/'+id;

    return this.http.get<Hero>(uBase)
      .pipe(
        map(result =>  {
          // console.log(result);
          return {
            data: result.data
          };
        }),
        catchError(err => {
          // console.error("erro", err);
          return [];
        })
      );
    
  }

  getRelationships(id): Observable<Relationships> {
    let uBase = `https://kitsu.io/api/edge/characters/${id}/media-characters`;

    return this.http.get<Relationships>(uBase)
      .pipe(
        map(result =>  {
          return {data: result.data,};
        }),
        catchError(err => {return [];})
      );
  }
  getMediaRelation(id): Observable<MediaRelation> {
    let uBase = `https://kitsu.io/api/edge/media-characters/${id}/media`;

    return this.http.get<MediaRelation>(uBase)
      .pipe(
        map(result =>  {
          return {data: result.data,};
        }),
        catchError(err => {return [];})
      );
  }
}

