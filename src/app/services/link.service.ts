import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { GanttLink } from '../../ngx-dhtmlx-gantt/models/link';

@Injectable()
export class LinkService {
  
	private linkUrl = 'api/links';

	constructor(
    private http: HttpClient
  ) { }

	get(): Observable<GanttLink[]> {
		return this.http.get<GanttLink[]>(this.linkUrl);
	}

	insert(GanttLink: GanttLink): Observable<GanttLink> {
		return this.http.post<GanttLink>(this.linkUrl, JSON.stringify(GanttLink));
	}

	update(GanttLink: GanttLink): Observable<void> {
		return this.http.put<void>(`${this.linkUrl}/${GanttLink.id}`, JSON.stringify(GanttLink));
	}

	remove(id: number): Observable<void> {
		return this.http.delete<void>(`${this.linkUrl}/${id}`);
	}

}