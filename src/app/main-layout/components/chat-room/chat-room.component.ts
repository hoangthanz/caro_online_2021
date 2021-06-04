import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user';
import { CaroOnlineApiService } from 'src/app/services/caro-online-api.service';
import { CaroRealTimeService } from 'src/app/services/caro-real-time.service';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.scss']
})
export class ChatRoomComponent implements OnInit, OnDestroy {


  public users: User[] = [];


  public observerMessageSubcription: Subscription | undefined;

  constructor(
    private _caroOnlineApiService: CaroOnlineApiService,
    private _snackBar: MatSnackBar,
    private _caroRealtime: CaroRealTimeService
  ) {
    this.getUsers();

    //kết nối cổng thời gian thực
    this._caroRealtime.startConnection();
    // Lắng nghe sự thay đổi của user 
    this._caroRealtime.addTransferUserOnlineListener();

  }

  ngOnDestroy(): void {
    this.observerMessageSubcription?.unsubscribe();
  }

  ngOnInit() {
    this.onMessageListener();
  }

  public onMessageListener() {
    this.observerMessageSubcription = this._caroRealtime.messageSource.asObservable().subscribe((data: any) => {
      this.users = data;
      this.users = this.users.filter(x => x.status === true);
    });
  }

  public getUsers() {
    this._caroOnlineApiService.getUsers().subscribe((users: any) => {

      this.users = users;
      this.users = this.users.filter(x => x.status === true);
    },
      (error) => {
        this.openSnackBar(error);
      });
  }


  public openSnackBar(message: string = '') {
    this._snackBar.open(message, 'Đồng ý', {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 1000,
    });
  }
}
