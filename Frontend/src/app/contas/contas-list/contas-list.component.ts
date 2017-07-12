
import { Component, OnInit, NgModule } from '@angular/core';
import { Http } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import { MdDialog, MdDialogModule, MdIconModule, MdMenuTrigger, MdSlideToggleModule, MdButtonModule, MdSnackBar } from '@angular/material';
import { ITdDataTableColumn, TdDialogService, CovalentSearchModule, CovalentMenuModule, IPageChangeEvent } from '@covalent/core';
import { Pagina } from "app/Pagina";
import { Usuario } from "app/usuarios/Usuario";
import { UsuariosService } from '../../usuarios/usuarios.service';
import { ContasService } from '../../contas/contas.service';

@Component({
  selector: 'app-usuarios', 
  templateUrl: './contas-list.component.html',
  styleUrls: ['./contas-list.component.css']
})
export class ContasListComponent  
{

    contas: Pagina;
    userLogado: Usuario;
    totalElementos : Number;
    page: Number;
    size: number;
    filtro: String;

  ngOnInit()
  {
    this.route.queryParams.subscribe(
    (queryParams: any) => 
    {
      this.size = 5;
      this.page = queryParams['page'] - 1;
  })}
  constructor(public route:ActivatedRoute, public usuariosService: UsuariosService, private activatedRoute: ActivatedRoute, private dialogService: TdDialogService, 
    public contasService: ContasService, private router: Router, 
    private _snackBarService: MdSnackBar)
  {
     contasService.listarContas(0, 5).subscribe(contas =>
     {
       this.totalElementos = contas.totalElements;
       this.contas = contas;
     },
     erro => console.log(erro));

     //Pegar o usuario logado
     usuariosService.getCurrentUser().subscribe(user => 
      { 
        this.userLogado = user;
      }, 
      erro => console.log(erro));
  

    activatedRoute.params.subscribe(params => {          
      let numero = params['numero'];
      if (numero)
      {
        this.contasService.findByNumero(numero).subscribe( conta => this.contas = conta, erro => console.log(erro));
      }
        
    }); 
  }

  listContasByFilter(filtro : String)
  {
    this.filtro = filtro;
    if ((filtro == '') || (filtro == undefined))
    {
      
      this.contasService.listarContas(this.page, this.size).subscribe(res =>
      {
        
        this.contas = res;
        this.totalElementos = this.contas.totalElements;
      }, erro => console.log(erro))
    }
    else
    {
      this.contasService.listContasByFilters(this.filtro, 0, this.size).subscribe(res =>
      {
        this.totalElementos = this.contas.totalElements;
        this.contas = res;
      }, erro => console.log(erro))
    }
  }

  confirmarExclusao(conta): void
  {
    if (this.userLogado.permissoes === 'ADMINISTRADOR')
    {
      if(conta.saldo < 0)
      {
        this._snackBarService.open('Não é possivel remover uma conta com saldo negativo', 'Erro', {duration: 3000})
      }
      else
      {

        this.dialogService.openConfirm({
          message: 'Tem certeza que deseja excluir a conta?.',
          title: 'Confirmação de exclusão',
          cancelButton: 'Não',
          acceptButton: 'Sim',
          }).afterClosed().subscribe((accept: boolean) => {
          if (accept) 
            {
                this.contasService.excluirConta(conta).subscribe(() => 
                {
                    this.listContasByFilter(this.filtro);      
                },
                erro => 
                {
            

                  this._snackBarService.open(erro._body, 'Ok!', {duration: 4000});
                }
                );
            }
          else
          {
        
          }
        });
      }
    }
    else
    {
      console.log('Sem permissão para realizar a operação');
    }
  }


  change(event: IPageChangeEvent): void 
  {
      this.contasService.listarContas(event.page.valueOf() - 1, event.pageSize).subscribe(contas => 
      { 
        this.contas = contas;
        this.size = event.pageSize;
      },  
      erro => console.log(erro));
      this.router.navigate(['/contas'],
      {queryParams: {'page': event.page.valueOf()}})
  }
}