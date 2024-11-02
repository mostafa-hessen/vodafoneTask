import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class ApiService {


  // make this variable to listen to current id that choosen 
  private selectedUserIdSubject = new BehaviorSubject<number>(0); // Initialize with null or a default value
  selectedUserId = this.selectedUserIdSubject.asObservable(); // Expose as observable

  // Method to update the selected user ID
  selectUser(userId: number): void {
    this.selectedUserIdSubject.next(userId); // Emit new user ID
  }



  // user api to get all api's
   private userApiUrl = 'https://jsonplaceholder.typicode.com/users';

   constructor(private http: HttpClient) {}


// function to get user from server
   getUsers(): Observable<User[]> {
     return this.http.get<User[]>(this.userApiUrl);
   }



// get current user posts
getUserPosts(userId: number): Observable<any[]> {

  return this.http.get<any[]>(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
}
}
