import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from 'src/app/model/user_model';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { UserDataService } from 'src/app/service/user-data.service';
import { DataViewModule } from 'primeng/dataview';
import { FormComponent } from '../form/form.component';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
  imports: [CommonModule, DataViewModule, FormComponent, RouterModule],
})
export class UserDetailComponent implements OnInit {
  userId!: number;
  userData: User[] = [];
  option: boolean = false;
  column: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private userService: UserDataService
  ) {}

  ngOnInit(): void {
    this.userService.getColumn().subscribe((res) => {
      this.column = res;
    });
    this.userId = Number(this.route.snapshot.paramMap.get('id'));
    this.userService.getUserById(this.userId).subscribe((res) => {
      this.userData = res as User[];
    });
  }
  enableEditOption() {
    this.option = true;
  }

  deleteUserData() {
    this.userService.deleteUser(this.userId).subscribe();
  }
}
