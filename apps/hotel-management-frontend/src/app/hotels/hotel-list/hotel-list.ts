import { Component, inject, OnInit, TemplateRef, viewChild } from '@angular/core';
import { Hotel, HotelInput } from '../model/hotel.model';
import { HotelService } from '../service/hotel.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgpDialogManager, NgpDialogTrigger } from 'ng-primitives/dialog';
import { HotelForm } from '../hotel-form/hotel-form';
import { FlowbiteService } from '../../flowbite.service';
import { initFlowbite } from 'flowbite';
import { Button } from 'flowbite-angular/button';
import {
  Modal,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from 'flowbite-angular/modal';
import { Alert, AlertContent } from 'flowbite-angular/alert';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';

import { Icon } from 'flowbite-angular/icon';
import { close, edit, trashBin } from 'flowbite-angular/icon/outline/general';
import { provideIcons } from '@ng-icons/core';

@Component({
  selector: 'app-hotel-list',
  templateUrl: './hotel-list.html',
  styleUrl: './hotel-list.scss',
  providers:[provideIcons({ close, edit, trashBin })],
  imports: [
    CommonModule,
    FormsModule,
    HotelForm,
    Modal,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    NgpDialogTrigger,
    Button,
    Alert,
    AlertContent,
    Icon,

  ]
})
export class HotelList implements OnInit {
  hotels: Hotel[] = [];
  filteredHotels: Hotel[] = [];
  searchText = '';
  sortKey: 'name' | 'location' | 'createdAt' | 'description' = 'name';
  sortAsc = true;

  editingHotel?: Hotel;
  hotelToDelete?: Hotel;

  // Alert properties
  showAlert = false;
  alertMessage = '';
  alertColor: 'success' | 'failure' | 'info' | 'warning' | 'primary' = 'success';

  // Flowbite modal template refs
  public readonly ngpDialogManager = inject(NgpDialogManager);
  public readonly hotelFormModal = viewChild('hotelFormModal', { read: TemplateRef<unknown> });
  public readonly deleteConfirmModal = viewChild('deleteConfirmModal', { read: TemplateRef<unknown> });

  private hotelService = inject(HotelService);
  private flowbiteService = inject(FlowbiteService);
  private platformId = inject(PLATFORM_ID);

  ngOnInit(): void {
    this.flowbiteService.loadFlowbite((flowbite) => {
      if (isPlatformBrowser(this.platformId)) {
        initFlowbite();
      }
    });
    if (isPlatformBrowser(this.platformId)) {
      this.loadHotels();
    }
  }

  loadHotels(): void {
    this.hotelService.getHotels().subscribe({
      next: (h) => {
        this.hotels = [...h];
        this.applyFilters();
        this.showAlert = false;
      },
      error: (err) => {
        console.error('Failed to load hotels:', err);
        this.showAlert = true;
        this.alertMessage = 'Failed to load hotels. Please try again.';
        this.alertColor = 'failure';
      }
    });
  }

  applyFilters(): void {
    this.filteredHotels = [...this.hotels
      .filter(h => h.name.toLowerCase().includes(this.searchText.toLowerCase()))
      .sort((a, b) => {
        const valA = a[this.sortKey];
        const valB = b[this.sortKey];
        if (valA === undefined || valB === undefined) {
          if (valA === undefined && valB === undefined) return 0;
          return valA === undefined ? 1 : -1;
        }
        if (this.sortKey === 'createdAt') {
          return (new Date(valA).getTime() - new Date(valB).getTime()) * (this.sortAsc ? 1 : -1);
        }
        return String(valA).localeCompare(String(valB)) * (this.sortAsc ? 1 : -1);
      })];
  }

  onSearch(): void { this.applyFilters(); }
  onSort(key: 'name' | 'location' | 'createdAt' | 'description'): void {
    this.sortKey = key;
    this.sortAsc = !this.sortAsc;
    this.applyFilters();
  }

  openCreate(): void {
    this.editingHotel = undefined;
    const modal = this.hotelFormModal();
    if (modal) this.ngpDialogManager.open(modal);
  }

  openEdit(hotel: Hotel): void {
    this.editingHotel = hotel;
    const modal = this.hotelFormModal();
    if (modal) this.ngpDialogManager.open(modal);
  }

  openDeleteConfirm(hotel: Hotel): void {
    this.hotelToDelete = hotel;
    const modal = this.deleteConfirmModal();
    if (modal) this.ngpDialogManager.open(modal);
  }

  onHotelSaved(close: () => void): void {
    close();
    this.hotelService.getHotels().subscribe({
      next: (h) => {
        this.hotels = [...h];
        this.applyFilters();
        this.showAlert = true;
        this.alertMessage = this.editingHotel ? 'Hotel updated successfully!' : 'Hotel created successfully!';
        this.alertColor = 'success';
        this.dismissAlertAfterDelay();
      },
      error: (err) => {
        console.error('Failed to refresh hotels:', err);
        this.showAlert = true;
        this.alertMessage = this.editingHotel ? 'Failed to update hotel.' : 'Failed to create hotel.';
        this.alertColor = 'failure';
        this.dismissAlertAfterDelay();
      }
    });
  }

  deleteHotel(close: () => void): void {
    if (!this.hotelToDelete) return;
    this.hotelService.deleteHotel(this.hotelToDelete.id).subscribe({
      next: () => {
        close();
        this.loadHotels();
        this.showAlert = true;
        this.alertMessage = 'Hotel deleted successfully!';
        this.alertColor = 'success';
        this.dismissAlertAfterDelay();
      },
      error: (err) => {
        console.error('Failed to delete hotel:', err);
        this.showAlert = true;
        this.alertMessage = 'Failed to delete hotel. Please try again.';
        this.alertColor = 'failure';
        close();
        this.dismissAlertAfterDelay();
      }
    });
  }

  dismissAlert(): void {
    this.showAlert = false;
  }

  private dismissAlertAfterDelay(): void {
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => {
        this.showAlert = false;
      }, 3000);
    }
  }
}