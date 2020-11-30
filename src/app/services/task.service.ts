import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { GanttTask } from '../../ngx-dhtmlx-gantt/models/task';

@Injectable()
export class TaskService {

	private taskUrl = 'api/tasks';

	constructor(
    private http: HttpClient
  ) { }

	get(): Observable<GanttTask[]>{
		return this.http.get<GanttTask[]>(this.taskUrl);
	}

	insert(task: GanttTask): Observable<GanttTask> {
		return this.http.post<GanttTask>(this.taskUrl, JSON.stringify(task));
	}

	update(task: GanttTask): Observable<void> {
		return this.http.put<void>(`${this.taskUrl}/${task.id}`, JSON.stringify(task));
	}

	remove(id: number): Observable<void> {
		return this.http.delete<void>(`${this.taskUrl}/${id}`);
	}

}