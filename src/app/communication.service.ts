import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {
  addAccountEvent = new EventEmitter<void>();

  constructor() { }
}
