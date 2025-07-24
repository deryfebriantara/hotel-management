import { Route } from '@angular/router';
import { HotelList } from './hotels/hotel-list/hotel-list';

export const appRoutes: Route[] = [
    {
        path: '',
        loadChildren: () => import('./hotels/hotels.route').then((r) => r.hotelRoutes)
    },

];
