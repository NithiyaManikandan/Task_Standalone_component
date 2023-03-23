import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from 'src/app/model/user_model';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { UserDataService } from 'src/app/service/user-data.service';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ButtonModule, RouterModule],
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  @Input() data: User[] = [];
  @Input() editable: boolean = false;
  column: any[] = [];
  form = new FormGroup({});
  createOption: boolean = false;

  constructor(private userService: UserDataService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.userService.getColumn().subscribe((res) => {
      this.column = res;
      for (const x in this.column) {
        this.form.addControl(
          this.column[x].field,
          new FormControl('', Validators.required)
        );
        this.editData(this.data);
      }
    });
  }

  editData(res: User[]) {
    for (const x in res) {
      this.form.patchValue({
        [x]: res[x],
      });
    }
  }

  updateForm(data: FormGroup<{}>) {
    console.log(this.form.value);
    if (this.editable) {
      this.userService.updateUserData(data.value).subscribe();
    } else {
      this.userService.postUserData(data.value).subscribe();
    }
  }

  checkCrediential($event: any, label: string) {
    if (label === 'Id') {
      this.userService.checkId($event.target.value).subscribe((res) => {
        if (res) {
          this.createOption = true;
        }
        else{
          this.createOption = false
        }
      });
    }
  }
}
