import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
// import { UiModal } from '@hotel-management/ui-modal'
@Component({
  imports: [ RouterModule],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected title = 'hotel-management-frontend';
}
