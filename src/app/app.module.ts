import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './services/in-memory-data.service'
import { NgxDhtmlxGanttModule } from '../ngx-dhtmlx-gantt/ngx-dhtmlx-gantt.module';

import { TaskService } from './services/task.service';
import { LinkService } from './services/link.service';
import { AppComponent } from './app.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService),
    NgxDhtmlxGanttModule
  ],
  declarations: [
    AppComponent
  ],
  providers: [
    TaskService,
    LinkService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
