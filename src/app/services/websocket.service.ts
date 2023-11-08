import { Injectable } from '@angular/core';



import { Observable, Observer } from 'rxjs';
import { AnonymousSubject } from 'rxjs/internal/Subject';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';


export interface Message {
    source: string;
    content: string;
}
@Injectable({
  providedIn: 'root'
})
@Injectable()
export class WebsocketService {
    
}