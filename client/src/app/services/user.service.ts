import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class UserService {


    constructor(private httpClient: HttpClient) { }
    private readonly rootURL = 'https://e-rental.herokuapp.com/api/users'


    public getUser(userId: string): Observable<any> {
        return this.httpClient.get(this.rootURL + '/' + userId)
    }
}
