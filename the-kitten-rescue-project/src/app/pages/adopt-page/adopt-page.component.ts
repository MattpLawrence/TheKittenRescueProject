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

  constructor(
    private apiService: APIService,
    public dialog: MatDialog
    ) {super() }

  ngOnInit(): void {
    this.findPets();
    this.initLoader();
  }

  findPets = () => {
    console.log('search')
    this.apiService.searchAnimals().subscribe(response => {
      console.log(response)
      //set animal list
      if(response.animals != undefined) this.petList = response.animals;

    });
  }

  initLoader = () => {
    console.log('hit')
      const dialogRef = this.dialog.open(CatLoaderComponent, {

      })

      dialogRef.afterClosed().subscribe(res => {
        console.log('close')
      })
  }
}
