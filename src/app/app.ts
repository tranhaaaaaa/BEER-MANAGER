import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoadingService } from './_services/loading.service';
import { CommonModule } from '@angular/common';
import { SignalRService } from './_services/signal-r.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {

  protected readonly title = signal('base-vtp');

  private speechReady = false;

  constructor(
    public loadingService: LoadingService,
    private signalRService: SignalRService
  ) {}

  ngOnInit(): void {

    // 👇 iPad + Android bắt buộc phải interaction trước
    document.addEventListener('click', () => {
      this.initSpeechEngine();
    }, { once: true });

  }


  initSpeechEngine() {

    // load voices trước
    speechSynthesis.getVoices();

    speechSynthesis.onvoiceschanged = () => {
      this.speechReady = true;
    };

    // subscribe sau khi engine sẵn sàng
    this.signalRService.payment$
      .subscribe((data) => {

        if (!data || !this.speechReady) return;

        this.speakMoney(data.amount);

      });

  }


  speakMoney(amount: number) {

    const text = `Bạn đã nhận được ${this.numberToText(amount)} đồng`;

    const speech = new SpeechSynthesisUtterance(text);

    speech.lang = 'vi-VN';

    // 👇 fix lỗi iPad Safari suspend engine
    window.speechSynthesis.resume();

    // clear queue cũ
    window.speechSynthesis.cancel();

    window.speechSynthesis.speak(speech);

  }


  numberToText(num: number): string {
    return num.toLocaleString('vi-VN');
  }

}