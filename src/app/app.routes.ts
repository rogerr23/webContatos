import { Routes } from '@angular/router';
import { CadastroContatosComponent } from './components/cadastro-contatos/cadastro-contatos.component';
import { ConsultaContatosComponent } from './components/consulta-contatos/consulta-contatos.component';
import { EdicaoContatosComponent } from './components/edicao-contatos/edicao-contatos.component';

export const routes: Routes = [
    {
        path: 'cadastrar-contatos',
        component: CadastroContatosComponent
    },

    {
        path: 'consultar-contatos',
        component: ConsultaContatosComponent
    },

    {
        path: 'editar-contatos/:id',
        component: EdicaoContatosComponent
    }
];
