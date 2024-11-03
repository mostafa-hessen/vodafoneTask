import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { User } from '../models/user';
import { Posts } from '../models/posts';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  // Subject لمتابعة المستخدم المحدد
  private selectedUserSubject = new BehaviorSubject<any>('');
  selectedUser = this.selectedUserSubject.asObservable(); // Observable لمتابعة التغييرات في المستخدم المحدد

  // تحديث المستخدم المحدد
  selectUser(user: User): void {
    this.selectedUserSubject.next(user); // إرسال المستخدم الجديد
  }

  // رابط API للحصول على المستخدمين
  private userApiUrl = 'https://jsonplaceholder.typicode.com/users';

  constructor(private http: HttpClient) {}

  // جلب قائمة المستخدمين من السيرفر
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.userApiUrl);
  }

  // جلب المنشورات الخاصة بمستخدم معين
  getUserPosts(userId: number): Observable<Posts[]> {
    return this.http.get<Posts[]>(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
  }



  // جلب التعليقات 

  getPostComments(postId: number): Observable<Comment[]> {
   
    return this.http.get<Comment[]>(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`)
  }
}
