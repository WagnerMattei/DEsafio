import { UsuariosService } from './usuarios/usuarios.service';
import { Component } from '@angular/core';
import {MdToolbarModule} from '@angular/material';
import {MdSidenavModule} from '@angular/material';
import { TdMediaService } from '@covalent/core';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';

  userLogado: Object;

  constructor(public media: TdMediaService, public usuariosService: UsuariosService){
    usuariosService.getCurrentUser().subscribe(user => 
    { 
       this.userLogado = user;
       console.log(this.userLogado);
    }, 
      erro => console.log(erro));
  }
  
  
  ngAfterViewInit(): void {
    // broadcast to all listener observables when loading the page
    this.media.broadcast();
    
  }





}
