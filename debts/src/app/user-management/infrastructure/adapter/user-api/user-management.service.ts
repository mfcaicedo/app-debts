import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { UserGateway } from '../../../domain/models/gateway/user-gateway';
import { UserListPaginated, User } from '../../../domain/models/user.model';
import ENVIRONMENTS from '../../../../../environments/config';
import { GenericResponse } from '../../../../shared/utils/models/request-response.model';
@Injectable({
  providedIn: 'root'
})
export class UserManagementService extends UserGateway {

  constructor(
    private readonly http: HttpClient
  ) {
    super();
  }

  override getUserByEmail(email: string): Observable<GenericResponse> {
    return this.http.get<GenericResponse>(`${ENVIRONMENTS.GET_USER_BY_EMAIL}/${email}`);
  }
  override createUser(user: User): Observable<User> {
    throw new Error('Method not implemented.');
  }
  override updateUser(user: User): Observable<User> {
    throw new Error('Method not implemented.');
  }
  override deleteUser(id: number): Observable<User> {
    throw new Error('Method not implemented.');
  }

}
