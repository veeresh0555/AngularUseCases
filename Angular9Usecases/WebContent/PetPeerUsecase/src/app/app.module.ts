import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DataService } from './service/api/data.service';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';

import { HighlightDirective } from './directive/highlight.directive';
import { ReactiveFormComponent } from './forms/reactiveform/reactiveform.component';
import { TemplateFormComponent } from './forms/templateform/templateform.component';
import { PetDetailsComponent } from './pets/pet-details/pet-details.component';
import { PetListComponent } from './pets/pet-list/pet-list.component';

@NgModule({
  declarations: [
    AppComponent,
    HighlightDirective,
    ReactiveFormComponent,
    TemplateFormComponent,
    PetDetailsComponent,
    PetListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
