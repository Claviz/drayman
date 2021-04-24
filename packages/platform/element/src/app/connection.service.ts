import { Injectable } from '@angular/core';
import axios from 'axios';
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class ConnectionService {

  // public events$: Subject<{ type: string; message: any; }> = new Subject<{ type: string; message: any; }>();
  socket: Socket;
  handlers: { [componentInstanceId: string]: ((event: any) => void)[] } = {};
  public config = {
    elementUrl: 'api/elementScript/',
    connection: {
      onEvent: (componentInstanceId: string, handler: (event: any) => void) => {
        if (this.handlers[componentInstanceId]) {
          this.handlers[componentInstanceId].push(handler);
        } else {
          this.handlers[componentInstanceId] = [handler];
        }
      },
      initializeComponent: (options: any) => {
        return new Promise((resolve, reject) => {
          this.emit('initializeComponentInstance', options, ({ componentInstanceId }: any) => {
            console.log({ componentInstanceId })
            resolve(componentInstanceId);
          });
        });
      },
      updateComponentInstanceProps: (options: any) => {
        this.emit('updateComponentInstanceProps', options);
      },
      handleBrowserCallback: (options: any) => {
        this.emit('handleBrowserCallback', options);
      },
      destroyComponentInstance: (options: { componentInstanceId: string }) => {
        this.emit('destroyComponentInstance', options);
        delete this.handlers[options.componentInstanceId];
      },
      navigate: (path: string) => {
        window.history.pushState({}, '', path);
      },
      postFormData: async (formData: FormData) => {
        return (await axios({
          method: 'POST',
          url: '/api/componentEvent',
          data: formData,
        })).data;
      }
    },
  }
  constructor() {
    this.socket = io();
    window.onpopstate = () => this.emit('locationChange', { location: { href: window.location.href } });
    window.history.pushState = new Proxy(window.history.pushState, {
      apply: (target, thisArg, argArray) => {
        const result = target.apply(thisArg, argArray as any);
        this.emit('locationChange', { location: { href: window.location.href } });
        return result;
      },
    });
    this.socket.on('event', (event) => {
      const { payload, type, componentInstanceId } = event;
      // this.events$.next({ type, message: result });
      for (const handler of (this.handlers[componentInstanceId] || [])) {
        handler({ payload, type, componentInstanceId });
      }
    });
    this.socket.on('browserReload', () => {
      window.location.reload();
    });

    // this.socket = io();
    // window.onpopstate = () => this.emit('locationChange');
    // window.history.pushState = new Proxy(window.history.pushState, {
    //   apply: (target, thisArg, argArray) => {
    //     const result = target.apply(thisArg, argArray);
    //     this.emit('locationChange');
    //     return result;
    //   },
    // });
    // this.socket.on('componentInstanceMessage', (message: any) => {
    //   this.events$.next({ type: 'componentInstanceMessage', message });
    // });
    // this.socket.on('browserEventMessage', (message: any) => {
    //   this.events$.next({ type: 'browserEventMessage', message });
    // });
  }

  private emit(eventName: string, options: any = {}, callback: any = null): void {
    this.socket.emit(eventName, options, callback);
  }

  // emit(eventName: string, options: any = {}, callback: any = null) {
  //   this.socket.emit(eventName, options, callback);
  // }


}
