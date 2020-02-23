import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = '응급실 진료목록';

  constructor(private router: Router) {

  }

  goMain() {
    this.router.navigate([`/`]).then();
  }
}
