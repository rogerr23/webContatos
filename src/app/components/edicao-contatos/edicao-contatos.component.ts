import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edicao-contatos',
  standalone: true,
  imports: [CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './edicao-contatos.component.html',
  styleUrl: './edicao-contatos.component.scss'
})
export class EdicaoContatosComponent {

  contatos: any[] = [];
  mensagem: string = '';
  contatoId: number = 0;

  constructor(
    private httpClient: HttpClient,
    private activadedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.contatoId = Number(this.activadedRoute.snapshot.paramMap.get('id'));
    this.httpClient
      .get(`http://localhost:8082/api/contatos/${this.contatoId}`)
      .subscribe({
        next: (data: any) => {
          this.form.controls['nome'].setValue(data.nome);
          this.form.controls['email'].setValue(data.email);
          this.form.controls['telefone'].setValue(data.telefone);
        },
        error: (e) => {
          console.log(e.error);
        }
      });
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
    this.httpClient
      .put(`http://localhost:8082/api/contatos/${this.contatoId}`, this.form.value
      )
      .subscribe({
        next: (data: any) => {
          this.mensagem = `Contato atualizado com sucesso.`;
        },
        error: (e) => {
          console.log(e.error);
        }
      });
  }




}
