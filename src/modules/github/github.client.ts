import { Injectable, HttpService, HttpException } from '@nestjs/common';
import { AxiosResponse, AxiosError } from 'axios';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { GithubUser } from './github.interface';

@Injectable()
export class GithubClient {
  private readonly GITHUB_API: string = 'https://api.github.com';

  constructor(private httpService: HttpService) {}

  getUser(username: string): Observable<AxiosResponse<GithubUser>> {
    return this.httpService
      .get<GithubUser>(`${this.GITHUB_API}/users/${username}`)
      .pipe(
        catchError(
          (error: AxiosError): Observable<never> => {
            const {
              response: {
                data: { message },
                status,
              },
            } = error;

            return throwError(new HttpException({ message, username }, status));
          },
        ),
      );
  }
}
