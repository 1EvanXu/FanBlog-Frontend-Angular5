import { Injectable } from '@angular/core';
import {User} from '../data-model/user';

@Injectable()
export class UserService {
  private user: User;
  constructor() { }

  login() {
    // this.user = data that return from backend
  }
  logout() {
    // do log out in backend
    this.user = null;
  }

}
