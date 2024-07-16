import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-consulta-contatos',
  standalone: true,
  imports: [
    CommonModule,
    NgxPaginationModule,
    RouterLink,
    RouterOutlet
  ],
  templateUrl: './consulta-contatos.component.html',
  styleUrl: './consulta-contatos.component.scss'
})
export class ConsultaContatosComponent implements OnInit {

  // atributos 
  contatos: any[] = [];
  paginador: number = 1;
  contato: any = {};
  mensagem: string = '';

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {

    this.httpClient.get('http://localhost:8082/api/contatos')
      .subscribe({
        next: (data) => {
          this.contatos = data as any[];
        },
        error: (e) => {
          console.log(e.error);
        }
      })
  }

  pageChange(event: any): void {
    this.paginador = event;
  }

  onSelect(value: any): void {
    this.contato = value;
  }

  onDelete(): void {
    this.httpClient.delete(`http://localhost:8082/api/contatos/${this.contato.id}`)
      .subscribe({
        next: (data: any) => {
          this.mensagem = `Contato excluído com sucesso.`;

          this.ngOnInit();
        },
        error: (e) => {
          console.log(e.error);
        }
      })
  }


}
