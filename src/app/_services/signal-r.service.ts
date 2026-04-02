import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { HubConnection, HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SignalRService {
  private connection!: HubConnection;
  private paymentSubject: BehaviorSubject<any> = new BehaviorSubject(null);

  private hubUrl = 'https://authorized-williams-kenneth-exploring.trycloudflare.com/paymentHub';
  private isConnected: boolean = false;
  private pendingGroups: string[] = []; 

  constructor() {
    this.connection = this.createConnection();
    this.connection.on('payment_success', (data) => {
      this.paymentSubject.next(data);
    });

    // 🔥 tự động reconnect
    this.connection.onclose((err) => {
      console.warn('⚠️ SignalR connection closed', err);
      this.isConnected = false;
    });

    // 🔥 start connection
    this.connection
      .start()
      .then(() => {
        console.log('✅ Payment SignalR Connected!');
        this.isConnected = true;

        this.pendingGroups.forEach((orderId) => this.joinOrder(orderId));
        this.pendingGroups = [];
      })
      .catch((err) => console.error('❌ SignalR Error:', err));
  }

 private createConnection(): HubConnection {
    return new HubConnectionBuilder()
      .configureLogging(LogLevel.Debug)
      .withUrl(this.hubUrl, {
        transport: signalR.HttpTransportType.WebSockets,
        
        headers: {
          "ngrok-skip-browser-warning": "true"
        },
        withCredentials: true 
      })
      .withAutomaticReconnect()
      .build();
  }
  get payment$() {
    return this.paymentSubject.asObservable();
  }
  public joinOrder(orderId: string): void {
    if (!this.connection) return;

    if (!this.isConnected) {
      console.log('⚠️ Connection chưa sẵn sàng, lưu tạm group:', orderId);
      this.pendingGroups.push(orderId);
      return;
    }

    this.connection
      .invoke('JoinGroup', orderId)
      .then(() => console.log('✅ Joined group:', orderId))
      .catch((err) => console.error('❌ Join group error:', err));
  }
  public stopConnection(): void {
    if (this.connection) {
      this.connection.stop();
      this.isConnected = false;
      console.log('⏹️ SignalR connection stopped');
    }
  }
}