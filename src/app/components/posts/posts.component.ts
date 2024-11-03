import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { User } from '../../models/user';
import { Posts } from '../../models/posts';
import { PostItemComponent } from '../post-item/post-item.component';

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [PostItemComponent],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss'
})
export class PostsComponent {
  selectedUser!: User;
  posts:Posts[]=[]
  loading=true
  constructor(private service:ApiService){}
  ngOnInit(): void {
    this.service.selectedUser.subscribe(data=>{
      this.selectedUser=data
      this.loadPosts(data.id);
    }) 
    
  }

  loadPosts(id:number): void {
    this.service.getUserPosts(id).subscribe(posts => {
      this.posts = posts;
      this.loading=false
    });
  }
}

