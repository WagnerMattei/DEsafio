import { CovalentLayoutModule, CovalentStepsModule, TdMediaService, TdDialogService, CovalentPagingModule, TdConfirmDialogComponent, CovalentDataTableModule, CovalentLoadingModule, CovalentFileModule, CovalentDialogsModule, CovalentChipsModule, CovalentMessageModule, CovalentExpansionPanelModule, TdSearchBoxComponent, TdSearchInputComponent, TdLoadingService, CovalentCommonModule } from '@covalent/core';

import { CovalentHttpModule } from '@covalent/http';
import { CovalentHighlightModule } from '@covalent/highlight';
import { CovalentMarkdownModule } from '@covalent/markdown';
import { CovalentDynamicFormsModule } from '@covalent/dynamic-forms';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Pipe } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule, MdProgressBarModule, MdProgressSpinnerModule, MdSliderModule, MdDialogModule,
MdListModule, MdTabsModule, MdSnackBarModule, MdRadioModule, MdInputModule, MdMenuModule,
MdCardModule, MdIconModule, MdButtonModule, MdCoreModule, MdDatepickerModule, DateAdapter, MdDatepickerIntl, MdDatepicker, MdDatepickerToggle, MdNativeDateModule
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// (optional) Additional Covalent Modules imports

import { Headers } from '@angular/http' 
import { FilterName } from './usuarios/usuarios.pipes';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { AppRoutingModule } from './app-routing.module';
import { UsuariosFormComponent } from './usuarios/usuarios-form/usuarios-form.component'; 
import { UsuariosDetailComponent } from './usuarios/usuarios-detail/usuarios-detail.component'; 
import { UsuariosService } from './usuarios/usuarios.service';
import { ContasFormComponent } from './contas/contas-form/contas-form.component';
import { ContasDetailComponent } from './contas/contas-detail/contas-detail.component';
import { ContasService } from './contas/contas.service';
import { TransacoesFormComponent } from './transacoes/transacoes-form/transacoes-form.component';
import { TransacoesDetailComponent } from './transacoes/transacoes-detail/transacoes-detail.component';
import { TransacoesService } from './transacoes/transacoes.service';
import { CommonModule } from '@angular/common';
import { AuthService } from './auth/auth.service';
import { CpfPipe } from './usuarios/cpf.pipes';
import { UsuariosListComponent } from './usuarios/usuarios-list/usuarios-list.component';
import { ContasListComponent } from './contas/contas-list/contas-list.component';
import { TransacoesListComponent } from './transacoes/transacoes-list/transacoes-list.component';


@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    UsuariosListComponent,
    UsuariosFormComponent,
    UsuariosDetailComponent,
    ContasListComponent,
    ContasFormComponent,
    ContasDetailComponent,
    TransacoesListComponent,
    TransacoesFormComponent,
    TransacoesDetailComponent, 
    FilterName,
    TdSearchBoxComponent,
    TdSearchInputComponent,
    CpfPipe    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CovalentLayoutModule,
    CovalentStepsModule,

    MdDatepickerModule,
    MdNativeDateModule,
    CovalentHttpModule.forRoot(),
    CovalentHighlightModule,
    CovalentMarkdownModule,
    CovalentDynamicFormsModule,
    CovalentPagingModule,   
    CovalentCommonModule,
    MaterialModule,
    BrowserAnimationsModule,
    CovalentLayoutModule,
    CovalentStepsModule,
    CovalentHttpModule.forRoot(),
    CovalentHighlightModule,
    CovalentMarkdownModule,
    CovalentDynamicFormsModule,
    CovalentExpansionPanelModule,
    MdCoreModule,
    MdButtonModule,
    MdListModule,
    MdIconModule,
    MdCardModule,
    MdMenuModule,
    CovalentDynamicFormsModule,
    MdInputModule,
    FormsModule, 
    MdRadioModule,
    FormsModule,
    AppRoutingModule,
    CovalentMessageModule,
    MdSnackBarModule, 
    CovalentChipsModule, 
    MdTabsModule,
    MdListModule,
    MdDialogModule,
    CovalentDialogsModule,
    MdSliderModule, 
    CovalentFileModule, 
    HttpModule, 
    MdProgressSpinnerModule,
    CovalentLoadingModule,
    MdProgressBarModule,
    CovalentDataTableModule,
    CovalentPagingModule,
    
    
  ],
  providers: [
    AppRoutingModule,
    UsuariosService,
    ContasService,
    TransacoesService,
    TdMediaService,
    TdDialogService,  
    TdLoadingService,
    AuthService

    
    
    
  ],
  exports: [],
  bootstrap: [AppComponent, ]
})
export class AppModule { }