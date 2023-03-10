import { Component, OnInit } from '@angular/core';
import { BaseComponent } from './common/components/base/base.component';
import { AuthService } from './common/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent extends BaseComponent implements OnInit {
  title = 'the-kitten-rescue-project';

  constructor(private authService: AuthService) { super() };

  ngOnInit(): void {
    this.initAuthTokenTimer()
  }

  initAuthTokenTimer(){
    //kick off timer to refresh oAuth token
    this.authService.startTokenTimer();
    //get initial oAuth token
    this.authService.getToken();
  }
}
