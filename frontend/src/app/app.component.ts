import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar.component';
import { FooterComponent } from './components/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FooterComponent],
  template: `
    <div class="layout">
      <app-navbar></app-navbar>
      <main><router-outlet></router-outlet></main>
      <app-footer></app-footer>
    </div>
  `,
  styles: [`
    .layout { display: flex; flex-direction: column; min-height: 100vh; }
    main { flex: 1; }
  `]
})
export class AppComponent {}
