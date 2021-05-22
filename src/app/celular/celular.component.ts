import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Celular } from '../model/Celular.model';
import { CelularService } from '../services/celular.service'
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-celular',
  templateUrl: './celular.component.html',
  styleUrls: ['./celular.component.css']
})
export class CelularComponent implements OnInit {
  formCelular: FormGroup = this.formBuilder.group({});
  disableButton = false;
  id: string = '';
  title = "crear elemento";

  constructor(private formBuilder: FormBuilder,private celularService: CelularService, private dataService: DataService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.formCelular = this.formBuilder.group({
      celularMarca: ['',[Validators.required, Validators.minLength(2)]],
      celularColor: ['',[Validators.required, Validators.minLength(3)]],
      celularMaterial: ['',[Validators.required]]
    });
    this.dataService.isLoading.subscribe(isLoading =>{
      this.disableButton = isLoading;
    });

    this.activatedRoute.params.subscribe(parameters =>{
      if(parameters.id){
        this.id = parameters.id;
        this.title = "Actualizar elemento";

        this.dataService.isLoading.next(true)
        this.celularService.getSingleCelular(parameters.id).subscribe(item =>{
          this.formCelular.get("celularMarca")?.setValue(item.brand);
          this.formCelular.get("celularColor")?.setValue(item.color);
          this.formCelular.get("celularMaterial")?.setValue(item.material);
        });
        this.dataService.isLoading.next(false)
      }
    });
   }

  ngOnInit(): void {
  }
  save(): void{
    const data ={
      brand: this.formCelular.get('celularMarca')?.value,
      color: this.formCelular.get('celularColor')?.value,
      material: this.formCelular.get('celularMaterial')?.value
    } as Celular;

    this.dataService.isLoading.next(true)

    this.celularService.saveCelular(data, this.id).subscribe((res) =>{
      this.dataService.isLoading.next(false);
      this.router.navigate(['home'])
    }, () =>{
      this.dataService.isLoading.next(false);
      this.dataService.message.next("Ha ocurrido un error");
      //alert('Unexpected error')
    });
  }

  newItem(): void{
    this.router.navigate(['celular'])
  }

}
