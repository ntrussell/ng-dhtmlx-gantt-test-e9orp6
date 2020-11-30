import 'dhtmlx-gantt';
// import { } from '@types/dhtmlxgantt';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GanttComponent } from './gantt/gantt.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    GanttComponent
  ],
  exports: [
    GanttComponent
  ]
})
export class NgxDhtmlxGanttModule { }