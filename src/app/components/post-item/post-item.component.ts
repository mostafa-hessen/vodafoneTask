import { Component, Input, input } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { User } from '../../models/user';
import { Posts } from '../../models/posts';
import { LimitTextPipe } from '../../shared/limit-text.pipe';
import { CommentComponent } from '../comment/comment.component';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-post-item',
  standalone: true,
  imports: [LimitTextPipe,CommentComponent],
  templateUrl: './post-item.component.html',
  styleUrl: './post-item.component.scss'
})
export class PostItemComponent {
  currentUser:string=''
  comments:Comment[]=[]

  @Input() post:any
  @Input() userName:string=''

 

  constructor(private route:Router){
    

  }
  
  

  getCommentsPage(postId:number){
    this.route.navigate(['/postComment', postId ]);
  }
 



}
