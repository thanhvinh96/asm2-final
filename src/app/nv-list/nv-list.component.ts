import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { INhanVien } from '../inhan-vien';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DulieuService } from '../dulieu.service';

@Component({
  selector: 'app-nv-list',
  standalone: true,
  imports: [CommonModule , FormsModule ],
  templateUrl: './nv-list.component.html',
  styleUrl: './nv-list.component.css'
})
export class NvListComponent {
  list_nhan_vien:INhanVien[]=[]
  constructor(private route: ActivatedRoute, private router: Router,private nv:DulieuService) {}
  ngOnInit():void{
    this.layNhanVien();
  }
  layNhanVien(){
    this.nv.layNhanVien().subscribe((data:any)=>{
      this.list_nhan_vien = data.sort((a:any, b:any)=>b.id - a.id);
    })
  }
  themNhanVien():void{
    this.router.navigate(['/nhan_vien/them'])
  }
  suaNhanVien(id:number):void{
    this.router.navigate([`/nhan_vien/sua/${id}`]);
  }
  
  xoaNhanVien(id: number): void {
    if (confirm('Bạn có chắc chắn muốn xóa dự án này?')) {
      this.nv.xoaDuAn(id).subscribe(()=>{
        this.layNhanVien();
      })
    } 
  }
  

}
