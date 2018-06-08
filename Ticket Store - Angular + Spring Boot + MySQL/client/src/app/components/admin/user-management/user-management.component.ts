import { Component, OnInit, OnDestroy } from '@angular/core';
import { ISubscription } from 'rxjs/Subscription';

import { UserService } from '../../../core/services/user.service';

import { UserEditModel } from '../../../core/models/binding/user-edit.model';


@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit, OnDestroy{

  private subscriptionGetAllUsers: ISubscription;
  private subscriptionGetAllUsersByRole: ISubscription;
  private subscriptionDisableEnableUser: ISubscription;
  private subscriptionSearchUsers: ISubscription;
  private user: UserEditModel;
  private users: Array<UserEditModel>;
  private searchedUsername: string;

  constructor(private userService: UserService) {
    this.users = [];
  }

  ngOnInit() {

    this.getAllUsers();
  }

  private getAllUsers(): void {

    this.subscriptionGetAllUsers = this.userService.getAllUsers().subscribe((users) => {

      this.users = Object.values(users);

      }, (error) => {

      });
  }

  private getAllUsersByRole(role): void {

    this.subscriptionGetAllUsersByRole = this.userService.getAllUsersByRole(role).subscribe((users) => {

      this.users = Object.values(users);

      }, (error) => {

      });
  }

  private disableEnableUser(event): void {

    const userId = Number(event.target.id);
    const classes = event.target.classList;

    this.subscriptionDisableEnableUser = this.userService.disableEnableUser(userId).subscribe(() => {

      this.changeButton(event, classes);
      
    }, (error) => {

    });
  }

  private getUsersByUsername(): void {

    this.subscriptionSearchUsers = this.userService.searchUsersWithUsernameLike(this.searchedUsername).subscribe((usersFromDb) => {

      this.users = Object.values(usersFromDb);
    }, (error) => {

    });
  }

  private changeButton(event, classes) {

    if (classes.contains('btn-danger')) {

      classes.remove('btn-danger');
      classes.add('btn-success');
      event.srcElement.innerText = 'Enable';
    } else {

      classes.remove('btn-success');
      classes.add('btn-danger');
      event.srcElement.innerText = 'Disable';
    }
  }

  ngOnDestroy(): void {

    if (this.subscriptionGetAllUsers) {
      this.subscriptionGetAllUsers.unsubscribe();
    }

    if (this.subscriptionGetAllUsersByRole) {
      this.subscriptionGetAllUsersByRole.unsubscribe();
    }

    if (this.subscriptionDisableEnableUser) {
      this.subscriptionDisableEnableUser.unsubscribe();
    }

    if (this.subscriptionSearchUsers) {
      this.subscriptionSearchUsers.unsubscribe();
    }
  }
}
