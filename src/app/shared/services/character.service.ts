import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { throwError, Observable } from 'rxjs';

import { Character }    from './../interfaces/character-interface';
import { environment } from './../../../environments/environment'
import { TrackHttpError } from '@shared/models/trackHttpError';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CharacterService {
  constructor(private http: HttpClient) {}

  searchCharacters(query = '', page = 200):Observable<Character[] | TrackHttpError> {
    const filtro = `${environment.baseUrlAPI}/?name=${query}&page=${page}`;
    return this.http.get<Character[]>(filtro)
    .pipe(catchError((err) => this.handleHttpError(err)));
  }

  getDetails(id: number) {
    return this.http.get<Character>(`${environment.baseUrlAPI}/${id}`)
    .pipe(catchError((err) => this.handleHttpError(err)));
  }


  private handleHttpError(
    error:HttpErrorResponse
  ):Observable<TrackHttpError>{

    let dataError = new TrackHttpError();
    dataError.errorNumber = error.status;
    dataError.message = error.statusText;
    dataError.friendlyMessage = 'An error occured retrienving data.';
    return throwError(dataError);
  }
}