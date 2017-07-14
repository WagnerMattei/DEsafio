import { Observable } from 'rxjs/Observable';
import { Http, Headers, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { Pagina } from "app/Pagina";


@Injectable()
export class ContasService 
{
  headers: Headers;
  url: String = '/desafio/api/conta';
  constructor(public http: Http) 
  { 
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
  }


  //INSERIR CONTA//
  inserirConta(conta): Observable<Response>
  {
    console.log(conta.numero);
    console.log(conta);
    //Alterar Conta
    if(conta.numero != undefined )
    {
       return this.http.put(this.url + '/edit', JSON.stringify(conta), { headers: this.headers });
    }
    //Inserir Conta
    else
    {
       console.log(conta);                                                                                                                                                                                                       
       return this.http.post(this.url + '/new', JSON.stringify(conta), { headers: this.headers });
    }
  }

   //LISTAR CONTAS//
   listarContas(page: Number, size: number): Observable<Pagina>
   {
     return this.http.get(this.url + '/pag/' + page + '/' + size).map(res => res.json());
   }

   //LISTAR CONTAS POR FILTRO//
   listContasByFilters(filter: String, page: number, size: number): Observable<Pagina>
   {
     return this.http.get(this.url + '/filter/' + filter + '/' + page + '/' + size).map(res => res.json());
   }
  //FIND CONTA//
  findByNumero(numero)
  {
    return this.http.get(this.url + '/' + numero).map(res => res.json());
  }
   //EXCLUIR CONTA//
  excluirConta(conta)
  {
    return this.http.delete(this.url + '/delete/' + conta.numero);
  } 
}