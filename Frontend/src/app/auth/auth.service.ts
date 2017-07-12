import { CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';

import { UsuariosService } from '../usuarios/usuarios.service';
import { Usuario } from "app/usuarios/Usuario";

@Injectable()
export class AuthService implements CanActivate
{
  userLogado : Usuario;

  constructor ( public usuarioService: UsuariosService, public router: Router)
  {
    this.usuarioService.getCurrentUser().subscribe(user => 
    { 
      this.userLogado = user;
    }, 
    erro => console.log(erro));

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> 
  {
    
    if ( this.userLogado.permissoes == 'ADMINISTRADOR' )
    {
      return true;
    }
      this.router.navigate(['']);
      
      return false;
  }
}