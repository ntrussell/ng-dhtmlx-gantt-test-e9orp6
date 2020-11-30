import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { filter } from 'rxjs/operators';

import { GanttTask } from '../ngx-dhtmlx-gantt/models/task';
import { GanttLink } from '../ngx-dhtmlx-gantt/models/link';
import { TaskService } from './services/task.service';
import { LinkService } from './services/link.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  data: { data: GanttTask[], links: GanttLink[] } = { data: [], links: [] };

  constructor(
    private taskService: TaskService,
    private linkService: LinkService
  ) { }

  ngOnInit() {
    forkJoin([
      this.taskService.get(),
      this.linkService.get()
    ])
    .subscribe(([data,links])=>{
      this.data = { data, links }
      console.log(this.data);
    })
        
  }

  onTaskAdd(id, item) {
    console.log('Added a task');
    console.log(item);
    return this.taskService.insert(this.serializeTask(item, true))
      .pipe(filter(res => res.id !== id))
      .subscribe(res => gantt.changeTaskId(id, res.id));
  }

  onTaskUpdate(id, item) {
    return this.taskService.update(this.serializeTask(item))
      .subscribe(res => {});
  }

  onTaskDelete(id) {
    return this.taskService.remove(id)
      .subscribe(res => {});
  }

  onLinkAdd(id, item) {
    return this.linkService.insert(this.serializeLink(item, true))
      .pipe(filter(res => res.id !== id))
      .subscribe((res) => gantt.changeLinkId(id, res.id));
  }

  onLinkUpdate(id, item) {
    return this.linkService.update(this.serializeLink(item))
      .subscribe(res => {});
  }

  onLinkDelete(id) {
    return this.linkService.remove(id)
      .subscribe(res => {});
  }

  private serializeTask(data: any, insert: boolean = false): GanttTask {
    return this.serializeItem(data, insert) as GanttTask;
  }
  private serializeLink(data: any, insert: boolean = false): GanttLink {
    return this.serializeItem(data, insert) as GanttLink;
  }
  private serializeItem(data: any, insert: boolean): any {
    const result = {};
    for (let i in data) {
      if (i.charAt(0) === '$' || i.charAt(0) === '_') {
        continue;
      }
      if (insert && i === 'id') {
        continue;
      }
      if (data[i] instanceof Date) {
        result[i] = gantt.templates.xml_format(data[i]);
      } else {
        result[i] = data[i];
      }
    }
    return result;
  }

}
