import { Component, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/common/components/base/base.component';
import { APIService } from 'src/app/common/services/api.service';
import { takeUntil} from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { CatLoaderComponent } from 'src/app/common/components/cat-loader/cat-loader.component';

@Component({
  selector: 'app-adopt-page',
  templateUrl: './adopt-page.component.html',
  styleUrls: ['./adopt-page.component.scss']
})
export class AdoptPageComponent extends BaseComponent implements OnInit {

  petList: any | undefined;
  isLoading: boolean = true;

  constructor(
    private apiService: APIService,
    public dialog: MatDialog
    ) {super() }

  ngOnInit(): void {
    this.findPets();

  }

  findPets = () => {
    console.log('search')
    //init loader
    const dialogRef = this.dialog.open(CatLoaderComponent, {
      width: "50vw"
    })
    setTimeout(() => {
      console.log(this.petList)
      if(!this.isLoading)dialogRef.close();
      else this.isLoading = false;
    },2000)
    this.apiService.searchAnimals().subscribe(response => {
      if(this.isLoading)this.isLoading = false;
      else dialogRef.close();
      //close loader
      console.log(response)
      //set animal list
      if(response.animals != undefined) this.petList = response.animals;

    });
  }

}
