import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/core/models/user/user';
import { UsersService } from 'src/app/core/services/users/users.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  user$!: Observable<User | null>;

  @Input()
  public username!: string;

  @Input()
  public clearCache: boolean = false;

  constructor(private usersService: UsersService) {}

  ngOnInit() {
    this.user$ = this.usersService.getUser(this.username, this.clearCache);
  }
}
