import { Component, Input } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { ActivatedRoute } from '@angular/router';
import { LimitTextPipe } from '../../shared/limit-text.pipe';
import { Comment } from '../../models/comments';
import { CommentItemComponent } from '../comment-item/comment-item.component';

@Component({
  selector: 'app-comment',
  standalone: true,
  imports: [CommentItemComponent],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.scss'
})
export class CommentComponent {

  commentId:number=0
  comments:Comment[]=[]

  constructor(private service:ApiService,private route:ActivatedRoute){}
 

  ngOnInit(){

    this.route.paramMap.subscribe(params => {
     this.commentId= +(params.get('postId') || '0')
     
    });



    this.service.getPostComments(this.commentId).subscribe(data=>{
      console.log(data);
      
      this.comments=data
      
    })
    // this.service.getPostComments()
  }

}
