import { Component, Input } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-comment',
  standalone: true,
  imports: [],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.scss'
})
export class CommentComponent {

  constructor(private service:ApiService){}

  @Input() myComments:Comment[]=[]


  ngOnChanges()
  {
    console.log(this.myComments);
    
  }


}
