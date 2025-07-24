import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Header } from './components/header/header';
import { FlowbiteService } from './flowbite.service';
import { initFlowbite } from 'flowbite';
@Component({
  imports: [ RouterModule, Header ],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected title = 'hotel-management-frontend';

  private flowbiteService = inject(FlowbiteService)
  ngOnInit(): void {
    this.flowbiteService.loadFlowbite((flowbite) => {
      initFlowbite();
    });
  }
}
