import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { HubConnection, HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SignalRService {

  private connection!: HubConnection;

  private hubUrl =
    'https://authorized-williams-kenneth-exploring.trycloudflare.com/paymentHub';

  private isConnected = false;

  // lưu danh sách group đang join
  private joinedGroups: Set<string> = new Set();

  // queue khi chưa connect
  private pendingGroups: Set<string> = new Set();

  private paymentSubject = new BehaviorSubject<any>(null);

  payment$ = this.paymentSubject.asObservable();


  constructor() {
    this.createConnection();
    this.startConnection();
  }


  private createConnection() {

    this.connection = new HubConnectionBuilder()
      .withUrl(this.hubUrl, {
        withCredentials: false
      })
      .configureLogging(LogLevel.Information)

      // reconnect strategy realtime payment chuẩn
      .withAutomaticReconnect([0, 2000, 5000, 10000])
      .build();


    // tăng timeout tránh Cloudflare drop connection
    this.connection.serverTimeoutInMilliseconds = 300000;
    this.connection.keepAliveIntervalInMilliseconds = 15000;


    this.registerEvents();
  }


  private registerEvents() {

    // nhận event payment
    this.connection.on('payment_success', (data) => {

      console.log('💰 Payment success received:', data);

      this.paymentSubject.next(data);
    });


    this.connection.onclose((err) => {

      console.warn('⚠️ SignalR disconnected', err);

      this.isConnected = false;
    });


    this.connection.onreconnecting(() => {

      console.warn('🔄 SignalR reconnecting...');
    });


    this.connection.onreconnected(() => {

      console.log('✅ SignalR reconnected');

      this.isConnected = true;

      this.rejoinAllGroups();
    });

  }


  private async startConnection() {

    try {

      await this.connection.start();

      console.log('✅ SignalR connected');

      this.isConnected = true;

      this.processPendingGroups();

    } catch (err) {

      console.error('❌ SignalR start error', err);

      setTimeout(() => this.startConnection(), 3000);
    }

  }


  joinOrder(orderId: string) {

    if (!orderId) return;


    if (!this.isConnected) {

      console.log('⏳ queue group:', orderId);

      this.pendingGroups.add(orderId);

      return;
    }


    this.connection
      .invoke('JoinGroup', orderId)
      .then(() => {

        console.log('✅ joined group:', orderId);

        this.joinedGroups.add(orderId);

      })
      .catch(err => {

        console.error('❌ join group error:', err);
      });
  }


  private processPendingGroups() {

    this.pendingGroups.forEach(orderId => {

      this.joinOrder(orderId);
    });

    this.pendingGroups.clear();
  }


  private rejoinAllGroups() {

    console.log('🔁 rejoining groups...');

    this.joinedGroups.forEach(orderId => {

      this.connection.invoke('JoinGroup', orderId);
    });

  }


  stopConnection() {

    if (!this.connection) return;

    this.connection.stop();

    this.isConnected = false;

    console.log('⏹️ SignalR stopped');
  }

}