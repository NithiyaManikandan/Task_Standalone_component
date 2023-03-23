import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserDataService } from 'src/app/service/user-data.service';
import { TableModule } from 'primeng/table';
import { User } from 'src/app/model/user_model';
import { RouterModule } from '@angular/router';
import { UserDetailComponent } from '../user-detail/user-detail.component';

@Component({
  selector: 'app-user',
  standalone: true,
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  imports: [CommonModule, TableModule, RouterModule, UserDetailComponent],
})
export class UserComponent implements OnInit {
  userData: User[] = [];
  cols: string[] = [];
  option: boolean = false;

  constructor(private userService: UserDataService) {}

  ngOnInit(): void {
    this.userService.getAllUser().subscribe((res) => {
      this.userData = res;
      res.map((ele, index) => {
        if (index == 0) {
          this.cols = Object.keys(ele);
        }
      });
    });
  }

  enableUserDetail(id: number) {
    this.option = true;
  }
}
