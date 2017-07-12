import { Router, ActivatedRoute } from '@angular/router';
import { UsuariosService } from './../usuarios.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-usuarios-detail',
  templateUrl: './usuarios-detail.component.html',
  styleUrls: ['./usuarios-detail.component.css']
})
export class UsuariosDetailComponent
{
   usuario: Object[] = [];
   userLogado: Object;


   constructor(public usuariosService: UsuariosService, private router: Router, public activatedRoute: ActivatedRoute)
   {
     activatedRoute.params.subscribe(params => 
     {
        var id = params['id'];
        this.usuariosService.findById(id).subscribe( usuario => 
        {
          this.usuario = usuario;
        },
        erro => 
          console.log(erro));
     });

     usuariosService.getCurrentUser().subscribe(user => 
      { 
        this.userLogado = user;
      }, 
      erro => 
        console.log(erro));

   }
}
    
       


