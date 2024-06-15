import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IDuAn } from '../idu-an';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DulieuService } from '../dulieu.service';

@Component({
  selector: 'app-duan-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './duan-list.component.html',
  styleUrls: ['./duan-list.component.css']
})
export class DuanListComponent implements OnInit {
  list_du_an: IDuAn[] = [];

  constructor(private route: ActivatedRoute, private router: Router, private da:DulieuService) {}
  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.da.layDuAn().subscribe((data:any)=>{
      this.list_du_an = data.sort((a:any, b:any)=>b.id - a.id);
    })
  }
  themDuAn(): void {
    this.router.navigate(['/du_an/them']);
  }

  suaDuAn(id: number): void {
    this.router.navigate([`/du_an/sua/${id}`]);
  }

  xoaDuAn(id: number): void {
    if (confirm('Bạn có chắc chắn muốn xóa dự án này?')) {
      this.da.xoaDuAn(id).subscribe(()=>{
        this.loadData();
      })
    } 
  }
}
