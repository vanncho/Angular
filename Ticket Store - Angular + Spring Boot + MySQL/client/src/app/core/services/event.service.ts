import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { HttpClientService } from './http-client.service';
import { AuthenticationUtility } from '../utils/authentication.util';

@Injectable()
export class EventService {

    constructor(private authUtil: AuthenticationUtility,
                private httpClientService: HttpClientService) {
    }

    getAllEvents(): Observable<Object> {

        return this.httpClientService.get('/api/allEvents', this.authUtil.headersBasic());
    }

    addEvent(event): Observable<Object> {

        return this.httpClientService.post('/api/addEvent', JSON.stringify(event), this.authUtil.headersBasic());
    }
}
