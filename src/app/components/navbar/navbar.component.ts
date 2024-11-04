import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { CaloriesPipe } from '../../pipes/calories.pipe';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, CommonModule, CaloriesPipe],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  user$: Observable<User>;
  userBRM$: Observable<number>;

  private userService = inject(UserService);

  ngOnInit(): void {

    this.user$ = this.userService.getUser();

    this.userBRM$ = this.userService.getUserBRM();

  }
}
