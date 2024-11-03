import { Component, Input } from '@angular/core';
import { Comment } from '../../models/comments';
import { LimitTextPipe } from '../../shared/limit-text.pipe';

@Component({
  selector: 'app-comment-item',
  standalone: true,
  imports: [LimitTextPipe],
  templateUrl: './comment-item.component.html',
  styleUrl: './comment-item.component.scss'
})
export class CommentItemComponent {

  @Input()commentItem: any


  ngOnInit(){
    console.log(this.commentItem);
    
  }

  ngOnChanges(){
    console.log(this.commentItem);

  }

}
