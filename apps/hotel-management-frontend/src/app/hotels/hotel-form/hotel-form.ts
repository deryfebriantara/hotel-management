import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Hotel, HotelInput } from '../model/hotel.model';
import { HotelService } from '../service/hotel.service';
import { Button } from 'flowbite-angular/button';

@Component({
  selector: 'app-hotel-form',
  templateUrl: './hotel-form.html',
  styleUrl: './hotel-form.scss',
  imports:[CommonModule, FormsModule, ReactiveFormsModule, Button]
})
export class HotelForm {

  @Input() hotel?: Hotel | null;
  @Output() saved = new EventEmitter<void>();

  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private svc: HotelService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: [this.hotel?.name || '', Validators.required],
      location: [this.hotel?.location || '', Validators.required],
      description: [this.hotel?.description || '']
    });
  }

  onSubmit(): void {
    if (this.form.invalid) return;
    const input: HotelInput = this.form.value;

    // create or update
    const obs = this.hotel
      ? this.svc.updateHotel(this.hotel.id, input)
      : this.svc.createHotel(input);

    obs.subscribe(() => this.saved.emit());
  }
}
