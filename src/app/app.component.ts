import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataService } from './services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  showBar = false;

  constructor(private dataService: DataService, private snackbar: MatSnackBar){
    this.dataService.isLoading.subscribe(isLoading =>{
      this.showBar = isLoading;
    });

    this.dataService.message.subscribe(msg =>{
      this.snackbar.open(msg, "OK", {duration: 3000});
    });
  }
}
