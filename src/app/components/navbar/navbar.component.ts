import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { User } from '../../models/user';
import { NgClass } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
 currentUser!:User
 users:User[]=[]
 loading:boolean=true
 showDropdown=true





//  firstly  dependency injection for api service 
  constructor(private userService :ApiService,private router :Router){}


  ngOnInit(): void {
    // once app load for first time we load all users from api 
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


     // know wich page we stand on 

     this.router.events.subscribe(() => {
      this.showDropdown = !this.router.url.includes('/postComment/');
    });
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
