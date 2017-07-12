import { Observable } from 'rxjs/Observable';
import { Component, OnInit, Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/map'
import { ContasService } from '../contas.service';
import { TdDialogService } from '@covalent/core';
import { MdSnackBar } from "@angular/material";

@Component({
  selector: 'app-usuarios-form',
  templateUrl: './contas-form.component.html',
  styleUrls: ['./contas-form.component.css'],

})

export class ContasFormComponent 
{
    conta: Object = {};
    
    //Variavel para controlar a animação de loading
    rodar: boolean;
   
    /**
     * 
     * @param _snackBarService 
     * @param dialogService 
     * @param contasService 
     * @param router 
     * @param activatedRoute 
     */ 

    constructor(private _snackBarService: MdSnackBar, private dialogService: TdDialogService, public contasService : ContasService, public router:Router, activatedRoute: ActivatedRoute)
    {   
      activatedRoute.params.subscribe(params => { 
        let numero = params['numero'];
          if (numero)
          {
            this.contasService.findByNumero(numero).subscribe( conta => this.conta = conta, erro => console.log(erro));
          }
                
      }); 
    }
    inserirConta(event)
    {
      this.rodar = true;
      this.contasService.inserirConta(this.conta).subscribe(() =>
      {
        this.router.navigate(['/contas'], { queryParams: {page:1}});
        this._snackBarService.open('Operação realizada com sucesso', 'Ok!', {duration: 3000})
      },
      erro =>
      {
        this._snackBarService.open(erro._body, 'Ok!', {duration: 3000});
        this.rodar = false;
      });
    }

    //Dialog de confirmação de cancelamento de preenchimento de formualrio
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
        this.router.navigate(['./contas'], { queryParams: {page:1}});
      } 
      else
      {
      
      }
    });

    }

    
  
    

}
