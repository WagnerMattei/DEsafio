import { Observable } from 'rxjs/Observable';
import { Http, Headers, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { Pagina } from "app/Pagina";

@Injectable()
export class TransacoesService 
{
  headers: Headers;
  headersFile: Headers;

  url: String = '/desafio/transacao';
  constructor(public http: Http) 
  { 
    this.headers = new Headers();

    this.headersFile = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headersFile.append('Content-Type', 'multipart/form-data');


  }

  //INSERIR TRNASACAO//
  inserirTransacao(transacao): Observable<Response>
  {
    //Alterar transação
    if (transacao.id != undefined)
    {
      console.log(transacao);
      return this.http.put(this.url + '/edit', JSON.stringify(transacao), { headers: this.headers });
    }
    //Inserir nova transação
    else
    {   

       console.log(transacao);

       return this.http.post(this.url + '/new', JSON.stringify(transacao), { headers: this.headers });
    }
  }

   //LISTAR TRANSACOES//
   listarTransacoes(page: number, size: number): Observable<Pagina>
   {
     return this.http.get(this.url + '/pag/' + page + '/' + size).map(res => res.json());
   }

   //LISTAR TRANSACOES POR FILTRO//
   listTransacoesByFilters(filter: String, page: number, size: number): Observable<Pagina>
   {
     return this.http.get(this.url + '/filter/' + filter + '/' + page + '/' + size).map(res => res.json());
   }

   //Efetivar Transação
   efetivar(transacao):Observable<Response>
   {  
      return this.http.patch(this.url + '/efetivar/' + transacao.id, JSON.stringify(transacao), { headers: this.headers }); 
   }

  //FIND CONTA//
  findById(id)
  {
    return this.http.get(this.url + '/' + id).map(res => res.json());
  }


   //EXCLUIR TRANSACAO//
  excluirTransacao(transacao)
  {
    console.log(transacao);
    return this.http.delete(this.url + '/delete/' + transacao.id);
  }

  //Download de arquivo
  downloadFile(id: Number)
  {
    return this.http.get(this.url + '/downloadFile/' + id);
  }
  
  //Upload de arquivo
  updateFile(file: FormData, id: Number): Observable<Response>
  {
    console.log(file);
    return this.http.post(this.url + '/uploadFile/' + id, file);
  }

  
}