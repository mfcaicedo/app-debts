import { Observable } from "rxjs";
import { User, UserListPaginated } from "../user.model";
import { GenericResponse } from "../../../../shared/utils/models/request-response.model";

export abstract class UserGateway {
    abstract getUserByEmail(email: string): Observable<GenericResponse>;
    abstract createUser(user: User): Observable<User>;
    abstract updateUser(user: User): Observable<User>;
    abstract deleteUser(id: number): Observable<User>;
}