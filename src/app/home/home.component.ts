import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Celular } from '../model/Celular.model';
import { CelularService } from '../services/celular.service';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  dataSource = new MatTableDataSource<Celular>();
  columns = ['brand','color','material','actions'];
  disableButton = false;
  //Brand, Color, Material
  //https://super-rest.herokuapp.com/test/'<CATEGORIA>'
  //https://super-rest.herokuapp.com/test/celulares
  constructor(private dataService: DataService, private celular: CelularService, private router: Router) {
    this.loadData();

    this.dataService.isLoading.subscribe(isLoading =>{
      this.disableButton = isLoading
    });
  }


  ngOnInit(): void {
  }


  loadData(): void{
    this.dataService.isLoading.next(true);
    this.celular.getCelulares().subscribe(celulares =>{
      this.dataSource.data = celulares;
      this.dataService.isLoading.next(false);
    }, () =>{
      this.dataService.isLoading.next(false)
      this.dataService.message.next("Lo sentimos no se pudo mostrar los datos");
      //alert("Lo sentimos no se pudo mostrar los datos");
    });
  }

  edit(item: Celular): void{
    this.router.navigate(['celular',item._id])
  }

  newItem():void{
    this.router.navigate(['celular'])
  }

  deleteItem(id: string):void{

    this.dataService.isLoading.next(true);

    this.celular.deleteCelular(id).subscribe(delCelular =>{
      this.dataService.message.next("Registro Eliminado");
      this.loadData();
      this.dataService.isLoading.next(false)
    }, () =>{
      this.dataService.isLoading.next(false)
      this.dataService.message.next("Lo sentimos no se pudo eliminar el registro");
    });
  }

}
