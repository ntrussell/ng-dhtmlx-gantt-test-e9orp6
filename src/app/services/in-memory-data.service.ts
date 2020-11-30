import { InMemoryDbService } from 'angular-in-memory-web-api';

import { GanttTask } from '../../ngx-dhtmlx-gantt/models/task';
import { GanttLink } from '../../ngx-dhtmlx-gantt/models/link';

export class InMemoryDataService implements InMemoryDbService {

  createDb() {
    let tasks: GanttTask[] = [
      { id: 1, text: 'Task #1', start_date: '2019-10-15 00:00', end_date : '2019-10-30 00:00', duration: null, progress: 0.6, parent: undefined },
      { id: 2, text: 'Task #2', end_date : '2019-10-15 00:00', start_date: '2019-10-18 00:00', duration: 3, progress: 0.4, parent: undefined }
    ];
    let links: GanttLink[] = [
      { id: 1, source: 1, target: 2, type: '0' }
    ];
    return { tasks, links };
  }

}