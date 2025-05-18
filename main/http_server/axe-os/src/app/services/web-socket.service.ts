import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  public ws$: WebSocketSubject<string>;
  public connectionStatus$ = new BehaviorSubject<boolean>(false);

  constructor() {
    this.ws$ = webSocket({
      url: `ws://${window.location.host}/api/ws`,
      deserializer: (e: MessageEvent) => { return e.data },
      openObserver: {
        next: () => this.connectionStatus$.next(true)
      },
      closeObserver: {
        next: () => this.connectionStatus$.next(false)
      }
    });
  }


}