import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { ActivatedRoute } from '@angular/router';
import { Comment } from '../../models/comments';
import { Subscription } from 'rxjs'; // استيراد Subscription
import { CommentItemComponent } from '../comment-item/comment-item.component';

@Component({
  selector: 'app-comment',
  standalone: true,
  imports: [CommentItemComponent],
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
})
export class CommentComponent implements OnInit, OnDestroy {
  commentId: number = 0;
  comments: Comment[] = [];
  private subscription: Subscription = new Subscription(); // إنشاء Subscription لتخزين الاشتراكات

  constructor(private apiService: ApiService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.commentId = Number(params.get('postId')) || 0;
      this.loadComments(this.commentId);
    });
  }

  private loadComments(postId: number): void {
    if (postId > 0) {
      const commentSubscription = this.apiService.getPostComments(postId)
        .subscribe({
          next: (data: Comment[]) => {
            this.comments = data;
          },
          error: (err) => {
            console.error('Failed to load comments', err);
          }
        });

      this.subscription.add(commentSubscription); // إضافة الاشتراك إلى Subscription
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe(); // إلغاء جميع الاشتراكات
  }
}
