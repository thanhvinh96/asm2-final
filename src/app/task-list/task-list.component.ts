import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ITask } from '../itask';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute , Router } from '@angular/router';
import { DulieuService } from '../dulieu.service';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent {
  list_task:ITask[]=[]
  constructor(private route:ActivatedRoute , private router:Router, private t:DulieuService){}
  ngOnInit():void{
    this.layTask()

  }
  layTask(){
    this.t.layTask().subscribe((data:any)=>{
      this.list_task = data.sort((a:any, b:any)=>b.id - a.id);
    })
  }
  themTask():void{
    this.router.navigate(['/task/them'])
  }
  suaTask(id:number):void{
    this.router.navigate([`/task/sua/${id}`]);
  }
  xoaTask(id: number): void {
    if (confirm('Bạn có chắc chắn muốn xóa task này?')) {
      this.t.xoaTask(id).subscribe(()=>{
        this.layTask();
      })
    } 
  }
}
