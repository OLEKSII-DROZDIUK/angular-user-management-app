import { InMemoryDbService } from 'angular-in-memory-web-api';
import { IUser } from '../interfaces/user.interface';
import { Observable, switchMap, throwError, timer } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

export class InMemoryDataService implements InMemoryDbService {
  public createDb() {
    const users: IUser[] = [];
    return { users };
  }

  // createUser endpoint
  public post(reqInfo: any) {
    const reqUser: IUser = reqInfo.utils.getJsonBody(reqInfo.req);
    const validationError = this.baseValidateUser(reqUser);
    if (validationError) return validationError;

    const users: IUser[] = reqInfo.utils.getDb()[reqInfo.collectionName];

    if (!this.isUsernameUnique(reqUser.username, users)) {
      return this.createErrorResponse({
        error:
          'Please choose a different username, this one is already in use.',
        status: 400,
      });
    }
    reqUser.id = this.genId(users);

    users.push(reqUser);

    return reqInfo.utils.createResponse$(() => {
      return {
        body: reqUser,
        status: 201,
        headers: reqInfo.headers,
        url: reqInfo.url,
      };
    });
  }

  // updateUser
  public put(reqInfo: any) {
    const reqUser: IUser = reqInfo.utils.getJsonBody(reqInfo.req);
    const validationError = this.baseValidateUser(reqUser);
    if (validationError) return validationError;

    const users: IUser[] = reqInfo.utils.getDb().users;

    const isUsernameNotUnic = users.find((user: IUser) => {
      return user.username == reqUser.username && user.id != reqUser.id;
    });

    if (isUsernameNotUnic) {
      return this.createErrorResponse({
        error:
          'Please choose a different username, this one is already in use.',
        status: 400,
      });
    }

    const existingUserIndex = users.findIndex((user) => user.id === reqUser.id);

    if (existingUserIndex === -1) {
      return this.createErrorResponse({
        error: 'Username not found. Reload your page, please.',
        status: 404,
      });
    }

    users[existingUserIndex] = reqUser;

    return reqInfo.utils.createResponse$(() => {
      return {
        body: 'OK',
        status: 200,
        headers: reqInfo.headers,
        url: reqInfo.url,
      };
    });
  }

  public genId(users: IUser[]): number {
    const ids: number[] = users
      .map((user) => user.id)
      .filter((id) => typeof id === 'number') as number[];
    return ids.length > 0 ? Math.max(...ids) + 1 : 1;
  }

  private baseValidateUser(
    reqUser: IUser
  ): Observable<HttpErrorResponse> | null {
    if (
      !reqUser.username ||
      !reqUser.first_name ||
      !reqUser.last_name ||
      !reqUser.email ||
      !reqUser.password ||
      !reqUser.user_type
    ) {
      return this.createErrorResponse({
        error: 'All fields in form must be provided.',
        status: 400,
      });
    }

    if (!this.isEmailValid(reqUser.email)) {
      return this.createErrorResponse({
        error: 'Invalid email format.',
        status: 400,
      });
    }

    if (!this.isPasswordValid(reqUser.password)) {
      return this.createErrorResponse({
        error:
          'Invalid password format. Must be: min length 8. At least one number and one letter.',
        status: 400,
      });
    }

    return null;
  }

  private isEmailValid(email: string): boolean {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  }

  private isPasswordValid(password: string): boolean {
    const passwordPattern = /^(?=.*[0-9])(?=.*[a-zA-Z]).{8,}$/;
    return passwordPattern.test(password);
  }

  private isUsernameUnique(username: string, users: IUser[]): boolean {
    return !users.some((user) => user.username === username);
  }

  private createErrorResponse(errorResponse: {
    error: string;
    status: number;
  }): Observable<HttpErrorResponse> {
    return timer(500).pipe(switchMap(() => throwError(errorResponse)));
  }
}
