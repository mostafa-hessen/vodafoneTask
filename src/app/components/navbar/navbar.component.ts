import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { User } from '../../models/user';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [NgClass],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
 currentUser!:User
 users:User[]=[]
 loading:boolean=true




//  firstly  dependency injection for api service 
  constructor(private userService :ApiService){}


// once app load for first time we load all users from api 
  ngOnInit(): void {
    this.userService.getUsers().subscribe(
      (data: User[]) => {

        
        this.users = data; // Assign the fetched data to the users property
        // this.loading = false; // Set loading to false after data is fetched
      },
      (error) => {
        console.error('Error fetching users:', error);
        // this.loading = false; // Set loading to false in case of error
      }
    );
  }


  // when select user from  navbar we send to service to load rela 
  onSelectUser(currentUser: User): void {
    this.currentUser = currentUser; // تحديث المستخدم المحدد
    this.userService.selectUser(currentUser)
  
    
  }


  // just give as a signture which usre we choose in selectore
  isSelected(userId: number): boolean {
    return this.currentUser?.id === userId; // تحقق مما إذا كان هذا هو المستخدم المحدد
  }
}
