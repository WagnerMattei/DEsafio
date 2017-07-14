import { Observable } from 'rxjs/Observable';
import { Component, OnInit, Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/map'
import { UsuariosService } from '../usuarios.service';
import { TdDialogService, IPageChangeEvent, TdConfirmDialogComponent } from '@covalent/core';
import { MdInputModule, MdSnackBar, MdDialogModule, MdProgressSpinnerModule} from '@angular/material';






@Component({
  selector: 'app-usuarios-form',
  templateUrl: './usuarios-form.component.html',
  styleUrls: ['./usuarios-form.component.css'],

})

  

export class UsuariosFormComponent 
{
    usuario: Object = {};
    rodar: boolean;
    expand: boolean = false;

    permissoes =
    [
      {
        value: 'ADMINISTRADOR', viewValue: 'Administrador'
      },
      {
        value: 'COLABORADOR', viewValue: 'Colaborador'
      }
    ];

    constructor(  private _snackBarService: MdSnackBar, public _dialogService: TdDialogService, public usuariosService : UsuariosService, public router:Router, activatedRoute: ActivatedRoute)
    {   
      activatedRoute.params.subscribe(params => {
               
                let id = params['id'];
                if (id)
                {
                  this.usuariosService.findById(id).subscribe( usuario => this.usuario = usuario, erro => console.log(erro));
                }
                
            }); 
    }
    inserirUsuario(event, usuarioId)
    {
      this.rodar = true;
      this.usuariosService.inserirUsuario(this.usuario).subscribe(() =>
      {
        this.router.navigate(['/usuarios'], { queryParams: {page:1}}) ;
        this._snackBarService.open('Operação realizada com sucesso', 'Ok!', {duration: 3000})
      },
      erro =>
      {
        console.log(erro);
        this._snackBarService.open(erro._body, 'Ok!', {duration: 3000})
        this.rodar = false;
      });
    }

    confirmarSaida(): void
    {
        this._dialogService.openConfirm({
        message: 'Tem certeza que deseja cancelar?.',
        title: 'Confirmação de cancelamento',
        cancelButton: 'Não',
        acceptButton: 'Sim',
        }).afterClosed().subscribe((accept: boolean) => {
      if (accept)
      {
        this.router.navigate(['./usuarios'], { queryParams: {page:1}});
      } 
      else
      {
      
      }
    });
  
  }
  
  updateUsuarioToSenha(usuario)
  {    
    this.expand = false;
    this.usuariosService.updateUsuarioToSenha(usuario).subscribe(() => 
    {
      this._snackBarService.open('Senha Atualizada com sucesso', 'Sucesso!', {duration: 3000});
    }, 
    erro => 
       this._snackBarService.open(erro._body, 'Ok!', {duration: 3000}));
    }


}
