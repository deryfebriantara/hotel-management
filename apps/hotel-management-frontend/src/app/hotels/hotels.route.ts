import { Route } from '@angular/router';
import { HotelList } from './hotel-list/hotel-list';

export const hotelRoutes: Route[] = [
    {
        path: '',
        component: HotelList
    },

];
