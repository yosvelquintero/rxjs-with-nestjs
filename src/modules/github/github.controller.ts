import { Controller, Get, Param, Query } from '@nestjs/common';
import { Observable } from 'rxjs';

import { GithubService } from './github.service';
import { GithubUser } from './github.interface';

@Controller('github')
export class GithubController {
  constructor(private readonly githubService: GithubService) {}

  @Get('users')
  getUsers(@Query('users') users: string): Observable<GithubUser[]> {
    return this.githubService.getUsers(users);
  }

  @Get('users/:user')
  getUser(@Param('user') username: string): Observable<GithubUser> {
    return this.githubService.getUser(username);
  }
}
