import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-cadastro-contatos',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './cadastro-contatos.component.html',
  styleUrl: './cadastro-contatos.component.scss'
})
export class CadastroContatosComponent implements OnInit {

  contatos: any[] = [];
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
      });
  }

  form = new FormGroup({
    nome: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    telefone: new FormControl('', [Validators.required]),
  });

  get f() {
    return this.form.controls;
  }

  onSubmit() {
    this.httpClient.post('http://localhost:8082/api/contatos', this.form.value)
      .subscribe({
        next: (data: any) => {
          this.mensagem = `Contato cadastrado com sucesso!`;
          this.form.reset();
        },
        error: (e) => {
          console.log(e.error);
        }
      })
  }

}
