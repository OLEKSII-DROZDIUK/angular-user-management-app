import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { IUser } from 'src/app/interfaces/user.interface';
import { User } from 'src/app/models/user.model';

@Injectable({ providedIn: 'root' })
export class UserApiService {
  private usersUri = 'api/users';
  private headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json');
  private httpOptions = {
    headers: this.headers,
  };

  constructor(private http: HttpClient) {}

  public getAll(): Observable<User[]> {
    return this.http.get<User[]>(this.usersUri).pipe(
      tap((response: IUser[]) => response.map((item: IUser) => new User(item))),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  public getOneByUsername(id: number): Observable<User> {
    return this.http.get<User>(`${this.usersUri}/${id}`).pipe(
      tap((response: IUser) => new User(response)),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  public createUser(newUser: User): Observable<any> {
    return this.http.post<any>(this.usersUri, newUser, this.httpOptions).pipe(
      tap((response: IUser) => new User(response)),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  public updateUser(user: User): Observable<any> {
    return this.http
      .put<any>(`${this.usersUri}/${user.id}`, user, this.httpOptions)
      .pipe(catchError((error: HttpErrorResponse) => throwError(error)));
  }

  public deleteUser(id: number): Observable<any> {
    return this.http
      .delete<any>(`${this.usersUri}/${id}`, this.httpOptions)
      .pipe(catchError((error: HttpErrorResponse) => throwError(error)));
  }
}
