
import { Observable } from 'rxjs/Observable';
import { Http, Headers, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router'
import { Pagina } from "app/Pagina";



@Injectable()
export class UsuariosService 
{
  headers: Headers;
  url: String = '/desafio/usuario';
  constructor(public router: Router, public http: Http) 
  { 
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
  }

  //INSERIR USUARIO//
  inserirUsuario(usuario): Observable<Response>
  {
    //Alterar Usuario
    if(usuario.id != undefined )
    {
       return this.http.put(this.url + '/edit/', JSON.stringify(usuario), { headers: this.headers });     
    }
    //Inserir novo usuario
    else
    {
       return this.http.post(this.url + '/new', JSON.stringify(usuario), { headers: this.headers });
    }
  }

   //LISTAR USUARIOS//
   listarUsuarios(page: number, size: Number): Observable<Pagina>
   {
     return this.http.get(this.url + '/pag/' + page + '/' + size).map(res => res.json());
   }

   //LISTAR USUARIOS POR FILTRO//
   listUsuariosByFilters(filter: String, page: number, size: number): Observable<Pagina>
   {
     return this.http.get(this.url + '/filter/' + filter + '/' + page + '/' + size).map(res => res.json());
   }

  //FIND USUARIO//
  findById(id)
  {
    return this.http.get(this.url + '/' + id).map(res => res.json());
  }
  

  //Pegar usuario logado//
  getCurrentUser()
  {
    return this.http.get(this.url + '/getCurrentUser').map(res => res.json());
  }

  //ALTERAR STATUS//
  AlterarStatus(usuario):Observable<Response>
  {  
      return this.http.patch(this.url + '/alterarstatus/' + usuario.id, JSON.stringify(usuario), { headers: this.headers }); 
  }

  //ALTERAR SENHA//
  updateUsuarioToSenha(usuario): Observable<Response>
  {
    return this.http.patch(this.url + '/updateSenha', JSON.stringify(usuario), { headers: this.headers });
  }

}