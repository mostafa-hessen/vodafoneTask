


import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';


import { User } from '../models/user';
import { Posts } from '../models/posts';
import { Comment } from '../models/comments';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private cache: { [key: string]: any } = {}; // كائن للتخزين المؤقت

  // Subject لمتابعة المستخدم المحدد
  private selectedUserSubject = new BehaviorSubject<any>('');
  selectedUser = this.selectedUserSubject.asObservable(); // Observable لمتابعة التغييرات في المستخدم المحدد

  constructor(private http: HttpClient) {}

  // تحديث المستخدم المحدد
  selectUser(user: User): void {
    this.selectedUserSubject.next(user); // إرسال المستخدم الجديد
  }

  // جلب قائمة المستخدمين من السيرفر مع التخزين المؤقت
  getUsers(): Observable<User[]> {
    const cacheKey = 'users';
    if (this.cache[cacheKey]) {
      return of(this.cache[cacheKey]); // إذا كانت البيانات موجودة في التخزين المؤقت، ارجعها
    }
    return this.http.get<User[]>('https://jsonplaceholder.typicode.com/users').pipe(
      tap(users => this.cache[cacheKey] = users) // تخزين البيانات مؤقتًا
    );
  }

  // جلب المنشورات الخاصة بمستخدم معين مع التخزين المؤقت
  getUserPosts(userId: number): Observable<Posts[]> {
    const cacheKey = `posts_${userId}`;
    if (this.cache[cacheKey]) {
      return of(this.cache[cacheKey]); // إذا كانت البيانات موجودة في التخزين المؤقت، ارجعها
    }
    return this.http.get<Posts[]>(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`).pipe(
      tap(posts => this.cache[cacheKey] = posts) // تخزين البيانات مؤقتًا
    );
  }

  // جلب التعليقات الخاصة بمنشور معين مع التخزين المؤقت
  getPostComments(postId: number): Observable<Comment[]> {
    const cacheKey = `comments_${postId}`;
    if (this.cache[cacheKey]) {
      return of(this.cache[cacheKey]); // إذا كانت البيانات موجودة في التخزين المؤقت، ارجعها
    }
    return this.http.get<Comment[]>(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`).pipe(
      tap(comments => this.cache[cacheKey] = comments) // تخزين البيانات مؤقتًا
    );
  }
}
