import { Component, inject } from '@angular/core';
import { HotelForm } from '../hotel-form/hotel-form';
import { CommonModule } from '@angular/common';
import { FlowbiteService } from '../../flowbite.service';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-hotel-list',
  templateUrl: './hotel-list.html',
  styleUrl: './hotel-list.scss',
  imports:[HotelForm, CommonModule]
})
export class HotelList {

  private flowbiteService = inject(FlowbiteService)
  ngOnInit(): void {
    this.flowbiteService.loadFlowbite((flowbite) => {
      initFlowbite();
    });
  }
}
