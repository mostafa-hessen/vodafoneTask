import { Routes } from '@angular/router';
import { CommentComponent } from './components/comment/comment.component';
// import { PostItemComponent } from './components/post-item/post-item.component';
import { PostsComponent } from './components/posts/posts.component';

export const routes: Routes = [
    // {}
    { path: 'posts', component: PostsComponent
     },
    { path: 'postComment/:postId', component: CommentComponent },
    
    { path: '', redirectTo: '/posts', pathMatch: 'full' },  // Default route
];
