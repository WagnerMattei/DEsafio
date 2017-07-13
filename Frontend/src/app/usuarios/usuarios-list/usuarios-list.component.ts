
import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import { NgModule, Pipe } from '@angular/core';
import { MdDialog, MdDialogModule, MdSnackBar, MdIconModule, MdMenuTrigger, MdSlideToggleModule, MdButtonModule } from '@angular/material';
import { ITdDataTableColumn, TdSearchBoxComponent, TdSearchInputComponent, TdDialogService, CovalentSearchModule, CovalentMenuModule, IPageChangeEvent, CovalentCommonModule } from '@covalent/core';

import { Broker } from 'eits-ng2';
import { Pagina } from "app/Pagina";
import { UsuariosService } from '../../usuarios/usuarios.service';

@Component({
  selector: 'app-usuarios', 
  templateUrl: './usuarios-list.component.html',
  styleUrls: ['./usuarios-list.component.css']
})
export class UsuariosListComponent  
{
  //Variaveis locais
  usuarios: Pagina;
  page: number;
  size: number;
  userLogado: Object = {
    id: Number
  };
  totalElementos : Number;
  filtro: String;
 
  ngOnInit()
    {
      this.route.queryParams.subscribe(
      (queryParams: any) => 
      {
        this.size = 5;
        this.page = queryParams['page'] - 1;
    })}
  constructor(public route:ActivatedRoute, public usuariosService: UsuariosService,
              private router: Router, private _snackBarService: MdSnackBar)
  {
     usuariosService.listarUsuarios(0,5).subscribe(usuario =>
     {
       this.totalElementos = usuario.totalElements;
       this.usuarios = usuario;
     },
     erro =>
       console.log(erro)
     );

     usuariosService.getCurrentUser().subscribe(user => 
     { 
       this.userLogado = user;
     }, 
     erro => 
       console.log(erro));
  }
  

  listUsuariosByFilter(filtro : String)
  {
    this.filtro = filtro;
    if ((filtro == '') || (filtro == undefined))
    {    
      this.usuariosService.listarUsuarios(this.page, this.size).subscribe(res =>
      {
        this.usuarios = res;
        this.totalElementos = this.usuarios.totalElements;
      }, erro => 
        console.log(erro))
    }
    else
    {
      this.usuariosService.listUsuariosByFilters(this.filtro, 0, this.size).subscribe(res =>
      {
        this.totalElementos = this.usuarios.totalElements;
        this.usuarios = res;
      }, erro => 
        console.log(erro))
    }
  }

  AlterarStatus(event, usuario)
  {
    if (!(usuario === this.userLogado))
    {
      this.usuariosService.AlterarStatus(usuario).subscribe(res =>
      {
        this._snackBarService.open('Status Alterado com sucesso', 'OK!', { duration: 3000 });
        this.listUsuariosByFilter(this.filtro);
      },
      erro => 
         this._snackBarService.open(erro._body, 'Ok!', {duration: 3000}));
    }
    else
    {
      console.log('Usuarios logados não podem ser desativados');
    }
  }

  change(event: IPageChangeEvent): void 
  {
      this.usuariosService.listarUsuarios(event.page.valueOf() - 1, event.pageSize).subscribe(usuario => 
      { 
        this.usuarios = usuario;
        console.log(this.usuarios);
        this.size = event.pageSize;
      },  
      erro => 
        console.log(erro));
      this.router.navigate(['/usuarios'],
      {queryParams: {'page': event.page.valueOf()}})
  }

  /*testeDWR()
  {
      Broker.of("UsuarioService").promise("getCurrent").then((result) => {
      console.log(result);
      })
      .catch((message) => {
        console.log(message);
    });
  }*/
}



