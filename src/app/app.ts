import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoadingService } from './_services/loading.service';
import { CommonModule } from '@angular/common';
import { SignalRService } from './_services/signal-r.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit{
  protected readonly title = signal('base-vtp');
  constructor(public loadingService: LoadingService,
    private signalRService : SignalRService
  ) {}
  ngOnInit(): void {
   this.signalRService.payment$
    .subscribe((data) => {
      if (!data) return;
      console.log('🔔 Payment Success:', data);
      const text = `Bạn đã nhận được ${this.numberToText(data?.amount)} đồng`;

      const speech = new SpeechSynthesisUtterance(text);
      speech.lang = 'vi-VN';

      window.speechSynthesis.speak(speech);
    });
  }
  numberToText(num: number): string {
  return num.toLocaleString('vi-VN'); // 2.222
}
}
