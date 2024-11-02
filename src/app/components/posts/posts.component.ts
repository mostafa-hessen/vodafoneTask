import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss'
})
export class PostsComponent {
  selectedUserId:number=0
  posts:any=[]
  constructor(private service:ApiService){}
  ngOnInit(): void {
    this.service.selectedUserId.subscribe(data=>{
 

      

      
    
      console.log(data);
      this.selectedUserId=data
      
      this.loadPosts(data);
    }) 
    
  }

  loadPosts(id:number): void {
    this.service.getUserPosts(id).subscribe(posts => {
      this.posts = posts;
    });
  }
}

