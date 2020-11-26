import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'calculadora';

  constructor(private router: Router,) {}

  Calculator(): void {
    this.router.navigate(['/', 'home','cal', 'cal'])
  }
}
