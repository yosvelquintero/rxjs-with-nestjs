import { Injectable } from '@nestjs/common';
import { Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';

import { GithubClient } from './github.client';
import { GithubUser } from './github.interface';

@Injectable()
export class GithubService {
  constructor(private readonly githubClient: GithubClient) {}

  getUser(username: string): Observable<GithubUser> {
    return this.githubClient
      .getUser(username.trim())
      .pipe(map((res) => res.data));
  }

  getUsers(users: string): Observable<GithubUser[]> {
    const observables: Observable<GithubUser>[] = users
      .split(',')
      .filter((user) => !!user)
      .map((user) => {
        return this.githubClient
          .getUser(user.trim())
          .pipe(map((res) => res.data));
      });

    return forkJoin(observables);
  }
}
