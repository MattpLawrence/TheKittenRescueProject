import { Component, OnInit, ViewChild, ElementRef  } from '@angular/core';
import { BaseComponent } from 'src/app/common/components/base/base.component';
import { APIService } from 'src/app/common/services/api.service';
import { takeUntil} from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { CatLoaderComponent } from 'src/app/common/components/cat-loader/cat-loader.component';
import { CommonService } from 'src/app/common/services/common.service';
import { BreakPointsEnum } from 'src/app/common/models/common.enum';


@Component({
  selector: 'app-adopt-page',
  templateUrl: './adopt-page.component.html',
  styleUrls: ['./adopt-page.component.scss']
})
export class AdoptPageComponent extends BaseComponent implements OnInit {

  petList: any | undefined;
  isLoading: boolean = true;
  currentBreakpoint: BreakPointsEnum = BreakPointsEnum.isDesktop;
  

  @ViewChild('adoptList') adoptList: ElementRef |undefined;

  constructor(
    private apiService: APIService,
    private commonService: CommonService,
    public dialog: MatDialog
    ) {super() }

  ngOnInit(): void {

    this.initBreakpoints();
  }

  initBreakpoints = () => {
    this.commonService.getBreakpointSubject().pipe(takeUntil(this.ngUnsubscribe)).subscribe(res => {
      this.currentBreakpoint = res
      //call find pets the first time
      if(this.isLoading) this.findPets();

    })
  }

  findPets = () => {

    let modalWidth: string = "50vw";

    switch(this.currentBreakpoint){
      case BreakPointsEnum.isDesktop:
        modalWidth = "50vw";
        break;

      case BreakPointsEnum.isTablet:
        modalWidth = "80vw";
        break;

      case BreakPointsEnum.isMobile:
        modalWidth = "100vw";
        break;
    }
    //init loader
    const dialogRef = this.dialog.open(CatLoaderComponent, {
      disableClose: true,
      panelClass: "noPadding",
      width: modalWidth
    })
    setTimeout(() => {
      if(!this.isLoading)dialogRef.close();
      else this.isLoading = false;
    },2200)
    this.apiService.searchAnimals().subscribe(response => {
      
      if(this.isLoading)this.isLoading = false;
      else dialogRef.close();
      //close loader
      //set animal list
      if(response.animals != undefined) this.petList = response.animals;

    });
  }

  scroll = (id:string) => {

    console.log('scroll')
    console.log(this.adoptList)
    this.adoptList?.nativeElement.scrollIntoView({ behavior: 'smooth', block: "start" });
 
  }

}
