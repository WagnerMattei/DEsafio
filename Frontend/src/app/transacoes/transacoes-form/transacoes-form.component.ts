
import { Observable } from 'rxjs/Observable';
import { Component, OnInit, Injectable, ViewChild, ElementRef } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/map'
import { TransacoesService } from '../transacoes.service';
import { ContasService } from '../../contas/contas.service';
import { TdDialogService } from '@covalent/core';
import { MdSelectModule, MdSnackBar } from '@angular/material';
import { Pagina } from "app/Pagina";
import { Transacao } from '../../transacoes/Transacao';



@Component({
  selector: 'app-usuarios-form',
  templateUrl: './transacoes-form.component.html',
  styleUrls: ['./transacoes-form.component.css'],

})

export class TransacoesFormComponent 
{
    transacao: Transacao = new Transacao;
    contas: Pagina;
    rodar: boolean;
    hoje: Date;
    @ViewChild('fileInput') inputEl: ElementRef;
    file: File;
   


    constructor(private _snackBarService: MdSnackBar, private dialogService: TdDialogService,public contasService: ContasService, public transacoesService : TransacoesService, public router:Router, activatedRoute: ActivatedRoute)
    {   
      activatedRoute.params.subscribe(params => {
               
                let id = params['id'];
                if (id)
                {
                  this.transacoesService.findById(id).subscribe( transacao => this.transacao = transacao, erro => console.log(erro));
                }
                
            }); 
            
            //variavel usada para estabelecer a data minima do input de data
            this.hoje = new Date();

            this.hoje.setDate(this.hoje.getDate() - 1);
            
            if (!(this.transacao.filePath))
            {
              this.transacao.filePath = null;
              console.log(this.transacao.filePath)
            }
            if (!(this.file))
            {
              this.file = null;
              
            }

    }
    listContasOrigemByFilter(filtro : String)
    {
      if (filtro == '')
      {
        this.contas = null;
      }
      else
      {
        
        this.contasService.listContasByFilters(filtro, 0,10).subscribe(res =>
        {
          this.contas = res;
        }, erro => console.log(erro))
      }    
    }
    
    contasAux : Pagina;
    listContasDestinoByFilter(filtro : String)
    {
      if (filtro == '')
      {
        this.contasAux = null;
      }
      else
      {
        
        this.contasService.listContasByFilters(filtro, 0,10).subscribe(res =>
        {
          this.contasAux= res;
        }, erro => console.log(erro))
      }    
    }

  selectEvent(file: File, id:Number): void 
  {
    let formData = new FormData();
    formData.append('file', file);
    this.transacoesService.updateFile(formData, id).subscribe(() => 
    {
    },erro=> this._snackBarService.open(erro._body,'Erro!')), {duration: 3000};
    
    
  }


    inserirTransacao(event)
    {
      this.rodar = true;
      if (this.file)
      {
        console.log(this.file);
        this.transacao.filePath = this.file.name;
      }
      
      this.transacao.dataEfetivacao = null;
      this.transacoesService.inserirTransacao(this.transacao).subscribe(() => 
      {  
        if (this.file)
        {
          this.selectEvent(this.file, this.transacao.id);
        }
        this.router.navigate(['/transacoes'], { queryParams: {page:1}}) ;
        this._snackBarService.open('Operação realizada com sucesso', 'Ok!', {duration: 3000})
      }, 
      erro => 
      {  
        this.rodar = false;
        this._snackBarService.open(erro._body, 'Erro!', {duration: 3000});
      });
    }


    confirmarSaida(): void
    {
      this.dialogService.openConfirm({
        message: 'Tem certeza que deseja cancelar?.',
        title: 'Confirmação de cancelamento',
        cancelButton: 'Não',
        acceptButton: 'Sim',
        }).afterClosed().subscribe((accept: boolean) => {
      if (accept)
      {
        this.router.navigate(['/transacoes'], { queryParams: {page:1}}) ;
      } 
      else
      {
      
      }
    });
  

  }

  clearInput(transacao)
  {
    this.file = null;
    this.transacao.filePath  = null;
  }


  
}
