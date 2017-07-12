import { Router, ActivatedRoute } from '@angular/router';
import { ContasService } from './../contas.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-usuarios-detail',
  templateUrl: './contas-detail.component.html',
  styleUrls: ['./contas-detail.component.css']
})
export class ContasDetailComponent
{
   conta: Object[] = [];


   constructor(public contasService: ContasService, private router: Router, public activatedRoute: ActivatedRoute)
   {
     //Two way dataBinding
     activatedRoute.params.subscribe(params => 
     {
        var numero = params['numero'];
        this.contasService.findByNumero(numero).subscribe( conta => this.conta = conta, 
        erro => console.log(erro));
     });

   }
}
    
       


