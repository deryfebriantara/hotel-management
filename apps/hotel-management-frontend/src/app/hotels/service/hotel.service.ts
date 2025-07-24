import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable, of } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import { TransferState, makeStateKey } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Hotel, HotelInput } from '../model/hotel.model';

const HOTELS_KEY = makeStateKey<Hotel[]>('hotels');

@Injectable({ providedIn: 'root' })
export class HotelService {
  private readonly HOTELS_QUERY = gql`
    query {
      hotels {
        id
        name
        location
        description
        createdAt
        updatedAt
      }
    }
  `;

  constructor(
    private apollo: Apollo,
    private transferState: TransferState,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  getHotels(): Observable<Hotel[]> {
    if (this.transferState.hasKey(HOTELS_KEY) && !isPlatformBrowser(this.platformId)) {
      const hotels = this.transferState.get(HOTELS_KEY, []);
      return of(hotels);
    }

    return this.apollo.watchQuery<{ hotels: Hotel[] }>({
      query: this.HOTELS_QUERY,
      fetchPolicy: isPlatformBrowser(this.platformId) ? 'cache-and-network' : 'network-only'
    }).valueChanges.pipe(
      map(result => {
        const hotels = result.data.hotels || [];
        if (!isPlatformBrowser(this.platformId)) {
          this.transferState.set(HOTELS_KEY, hotels);
        }
        return hotels;
      }),
      tap(hotels => console.log('Fetched hotels:', hotels)),
      catchError(err => {
        console.error('Error fetching hotels:', err);
        throw err;
      })
    );
  }

  createHotel(input: HotelInput): Observable<Hotel> {
    return this.apollo.mutate<{ createHotel: Hotel }>({
      mutation: gql`
        mutation CreateHotel($input: CreateHotelInput!) {
          createHotel(input: $input) {
            id
            name
            location
            description
            createdAt
            updatedAt
          }
        }
      `,
      variables: { input },
      update: (cache, { data }) => {
        if (!data?.createHotel) return;
        const existingHotels = cache.readQuery<{ hotels: Hotel[] }>({ query: this.HOTELS_QUERY });
        if (existingHotels?.hotels) {
          cache.writeQuery({
            query: this.HOTELS_QUERY,
            data: { hotels: [...existingHotels.hotels, data.createHotel] }
          });
        }
      }
    }).pipe(
      map(result => {
        if (!result.data?.createHotel) throw new Error('Failed to create hotel');
        return result.data.createHotel;
      }),
      catchError(err => {
        console.error('Error creating hotel:', err);
        throw err;
      })
    );
  }

  updateHotel(id: number, input: HotelInput): Observable<Hotel> {
    return this.apollo.mutate<{ updateHotel: Hotel }>({
      mutation: gql`
        mutation UpdateHotel($id: Int!, $input: UpdateHotelInput!) {
          updateHotel(id: $id, input: $input) {
            id
            name
            location
            description
            createdAt
            updatedAt
          }
        }
      `,
      variables: { id, input },
      update: (cache, { data }) => {
        if (!data?.updateHotel) return;
        const existingHotels = cache.readQuery<{ hotels: Hotel[] }>({ query: this.HOTELS_QUERY });
        if (existingHotels?.hotels) {
          cache.writeQuery({
            query: this.HOTELS_QUERY,
            data: {
              hotels: existingHotels.hotels.map(hotel =>
                hotel.id === data.updateHotel.id ? data.updateHotel : hotel
              )
            }
          });
        }
      }
    }).pipe(
      map(result => {
        if (!result.data?.updateHotel) throw new Error('Failed to update hotel');
        return result.data.updateHotel;
      }),
      catchError(err => {
        console.error('Error updating hotel:', err);
        throw err;
      })
    );
  }

  deleteHotel(id: number): Observable<boolean> {
    return this.apollo.mutate<{ deleteHotel: { id: number } }>({
      mutation: gql`
        mutation DeleteHotel($id: Int!) {
          deleteHotel(id: $id) {
            id
          }
        }
      `,
      variables: { id },
      update: (cache, { data }) => {
        if (!data?.deleteHotel) return;
        const existingHotels = cache.readQuery<{ hotels: Hotel[] }>({ query: this.HOTELS_QUERY });
        if (existingHotels?.hotels) {
          cache.writeQuery({
            query: this.HOTELS_QUERY,
            data: { hotels: existingHotels.hotels.filter(hotel => hotel.id !== data.deleteHotel.id) }
          });
        }
      }
    }).pipe(
      map(result => !!result.data?.deleteHotel),
      catchError(err => {
        console.error('Error deleting hotel:', err);
        throw err;
      })
    );
  }
}