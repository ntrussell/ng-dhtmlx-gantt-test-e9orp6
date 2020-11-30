import {
  Component,
  Input,
  Output,
  EventEmitter,
  ElementRef,
  OnInit,
  OnDestroy,
  OnChanges,
  SimpleChanges
} from "@angular/core";

import { GanttTask } from "../models/task";
import { GanttLink } from "../models/link";

@Component({
  selector: "dhtmlx-gantt",
  template: "",
  styleUrls: ["./gantt.component.scss"]
})
export class GanttComponent implements OnInit, OnDestroy, OnChanges {
  // @Input() config: GanttConfigOptions;
  @Input() data: { data: GanttTask[]; links: GanttLink[] };
  @Output() taskAdd: EventEmitter<{ id; item }> = new EventEmitter<{
    id;
    item;
  }>();
  @Output() taskUpdate: EventEmitter<{ id; item }> = new EventEmitter<{
    id;
    item;
  }>();
  @Output() taskDelete: EventEmitter<{ id }> = new EventEmitter<{ id }>();
  @Output() linkAdd: EventEmitter<{ id; item }> = new EventEmitter<{
    id;
    item;
  }>();
  @Output() linkUpdate: EventEmitter<{ id; item }> = new EventEmitter<{
    id;
    item;
  }>();
  @Output() linkDelete: EventEmitter<{ id }> = new EventEmitter<{ id }>();

  constructor(private el: ElementRef) {}

  ngOnInit() {
    var textEditor = {type: "text", map_to: "text"};
var dateEditor = {type: "date", map_to: "start_date", min: new Date(2018, 0, 1), 
    max: new Date(2019, 0, 1)};
var durationEditor = {type: "number", map_to: "duration", min:0, max: 100};
    gantt.config.xml_date = "%Y-%m-%d %H:%i";
gantt.config.order_branch = true;
gantt.config.order_branch_free = true;
gantt.config.sort = true; 
gantt.config.order_branch = "marker";
var drag_id = null;
gantt.attachEvent("onRowDragStart", function(id, target, e) {
    drag_id = id;
    return true;
});
gantt.attachEvent("onRowDragEnd", function(id, target) {
    drag_id = null;
    gantt.render();
});
 
gantt.templates.grid_row_class = function(start, end, task){
    if(drag_id && task.id != drag_id){
        if(task.$level != gantt.getTask(drag_id).$level)
            return "cant-drop";
        }
    return "";
};
    gantt.config.columns = [
    {name: "text", tree: true, width: '*', resize: true, editor: textEditor},
    {name: "start_date", align: "center", resize: true, editor: dateEditor},
    {name: "duration", align: "center", editor: durationEditor},
    {name: "add", width: 44}
];
    gantt.init(this.el.nativeElement);
    gantt.attachEvent("onAfterTaskAdd", (id, item) => {
      console.log("Added - Gannt component");
      this.taskAdd.emit({ id, item });
    });
    gantt.config.details_on_create = false;
    gantt.attachEvent("onBeforeLightbox", function(id) {
      var task = gantt.getTask(id);
      if (task.$new) {
					gantt.addTask(task);
        return false;
      }
      return true;
    });
    gantt.attachEvent("onAfterTaskUpdate", (id, item) =>
      this.taskUpdate.emit({ id, item })
    );
    gantt.attachEvent("onAfterTaskDelete", id => this.taskDelete.emit({ id }));
    gantt.attachEvent("onAfterLinkAdd", (id, item) =>
      this.linkAdd.emit({ id, item })
    );
    gantt.attachEvent("onAfterLinkUpdate", (id, item) =>
      this.linkUpdate.emit({ id, item })
    );
    gantt.attachEvent("onAfterLinkDelete", id => this.linkDelete.emit({ id }));
  }

  ngOnDestroy() {
    gantt.detachAllEvents();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.data && changes.data.currentValue) {
      gantt.parse(changes.data.currentValue);
    }
  }
}
