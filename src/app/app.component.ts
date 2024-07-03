import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { subscribe } from 'diagnostics_channel';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
    CommonModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  contatos: any[] = [];

  constructor(
    private httpClient: HttpClient
  ) { }

  ngOnInit(): void {

    this.httpClient.get("http://localhost:8082/api/contatos")
      .subscribe({
        next: (data) => {
          this.contatos = data as any[];
        },
        error: (e) => {
          console.log(e.error);
        }
      })
  }




  title = 'webContatos';
}
