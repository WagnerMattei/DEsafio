import { Router, ActivatedRoute } from '@angular/router';
import { ContasService } from '../../contas/contas.service';
import { TransacoesService } from './../transacoes.service';
import { Component, OnInit } from '@angular/core';
import { Pagina } from "app/Pagina";



@Component({
  selector: 'app-usuarios-detail',
  templateUrl: './transacoes-detail.component.html',
  styleUrls: ['./transacoes-detail.component.css']
})
export class TransacoesDetailComponent
{
   conta: Pagina;
   transacao: Object[] = [];


   constructor(public transacoesService: TransacoesService, public contasService: ContasService, private router: Router, public activatedRoute: ActivatedRoute)
   {
     activatedRoute.params.subscribe(params => 
     {
        var id = params['id'];
        this.transacoesService.findById(id).subscribe( transacao => this.transacao = transacao, 
        erro => console.log(erro));
     });

     contasService.listarContas(0,5).subscribe(contas =>
     {
        this.conta = contas;
     },
     erro => console.log(erro));
    }

  download(transacao)
  {
      window.location.assign("/desafio/transacao/downloadFile/" + transacao.id);
  }

   
}
    
       


