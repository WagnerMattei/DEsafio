
import { Component, OnInit, NgModule } from '@angular/core';
import { Http } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import { MdSnackBar, MdDialog, MdDialogModule, MdIconModule, MdMenuTrigger, MdSlideToggleModule, MdButtonModule } from '@angular/material';
import { ITdDataTableColumn, TdDialogService, CovalentSearchModule, CovalentMenuModule, IPageChangeEvent } from '@covalent/core';
import { UsuariosService } from '../../usuarios/usuarios.service';
import { Pagina } from "app/Pagina";
import { Usuario } from "app/usuarios/Usuario";
import { TransacoesService } from '../../transacoes/transacoes.service';


@Component({
  selector: 'app-usuarios', 
  templateUrl: './transacoes-list.component.html',
  styleUrls: ['./transacoes-list.component.css']
})
export class TransacoesListComponent  
{
    transacoes: Pagina;
    userLogado: Usuario;
    totalElementos: Number;
    page : number;
    size: number;
    filtro: String;
    rodar: boolean;

  ngOnInit()
  {
    this.route.queryParams.subscribe(
    (queryParams: any) => 
    {
      this.size = 5;
      this.page = queryParams['page'] - 1;
  })}
  constructor(public route: ActivatedRoute, public usuariosService: UsuariosService,
    public transacoesService: TransacoesService, private router: Router, 
    private _snackBarService: MdSnackBar, public dialogService: TdDialogService)
  {
     transacoesService.listarTransacoes(0,5).subscribe(transacoes =>
     {
       this.totalElementos = transacoes.totalElements;
       this.transacoes = transacoes;
     },
     erro => 
      console.log(erro));
     usuariosService.getCurrentUser().subscribe(user => 
      { 
        this.userLogado = user;
      }, 
      erro => 
        console.log(erro));
  }
  //Listar Transações
  listTransacoesByFilter(filtro : String)
  {
    this.filtro = filtro;
    if ((filtro == '') || (filtro == undefined))
    {
      
      this.transacoesService.listarTransacoes(this.page, this.size).subscribe(res =>
      {   
        this.transacoes = res;
        this.totalElementos = this.transacoes.totalElements;
      }, erro => 
        console.log(erro))
    }
    else
    {
      this.transacoesService.listTransacoesByFilters(this.filtro, 0, this.size).subscribe(res =>
      {
        this.totalElementos = this.transacoes.totalElements;
        this.transacoes = res;
      }, erro => 
        console.log(erro))
    }
  }
  //ConfirmarExclusao
  confirmarExclusao(transacao): void
  {
    if(this.userLogado.permissoes === 'ADMINISTRADOR')
    {
      if (transacao.efetivado)
      {
        this._snackBarService.open('Transações efetivadas não podem ser removidas', 'OK', {duration: 3000});
      }
      else
      {
        console.log(transacao);
        this.dialogService.openConfirm({
          message: 'Tem certeza que deseja excluir a transação?.',
          title: 'Confirmação de exclusão',
          cancelButton: 'Não',
          acceptButton: 'Sim',
          }).afterClosed().subscribe((accept: boolean) => {
          if (accept) 
            {
                this.transacoesService.excluirTransacao(transacao).subscribe(() => 
                {
                  this.listTransacoesByFilter(this.filtro);
              },
                erro => 
                {
                  console.log(erro);
                  this._snackBarService.open('Não foi possível remover a Transação ' + transacao.id, 'Erro!', {duration: 3000});
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

confirmarEfetivar(transacao): void
{
  if (transacao.efetivado)
  {
    this._snackBarService.open('Transação ja efetivada', 'Erro!!', {duration: 3000})
  }
  else
  {
    this.dialogService.openConfirm({
      message: 'Tem certeza que deseja efetivar a transação?.',
      title: 'Confirmação de efetivação',
      cancelButton: 'Não',
      acceptButton: 'Sim',
      }).afterClosed().subscribe((accept: boolean) => {
      if (accept) 
        {          
          this.rodar = true;   
          this.transacoesService.efetivar(transacao).subscribe(() => 
          {               
            this.listTransacoesByFilter(this.filtro);
            this._snackBarService.open('Transação efetivada com sucesso', 'Sucesso!', {duration: 3000});
            this.rodar = false;    
          },
          erro => 
          {
            console.log(erro);
            this._snackBarService.open(erro._body, 'Ok!', {duration: 3000});
            this.rodar = false;
          }
          );
        }
        else
        {
    
        }
        });
    }
  }

  change(event: IPageChangeEvent): void 
  {
      this.transacoesService.listarTransacoes(event.page.valueOf() - 1, event.pageSize).subscribe(transacoes => 
      { 
        this.transacoes = transacoes;
        this.size = event.pageSize;
      },  
      erro => 
        console.log(erro));
      this.router.navigate(['/transacoes'],
      {queryParams: {'page': event.page.valueOf()}})
  }
}



