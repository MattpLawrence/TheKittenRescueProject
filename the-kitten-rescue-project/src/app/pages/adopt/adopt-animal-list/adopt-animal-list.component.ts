import { Component, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs';
import { BaseComponent } from 'src/app/common/components/base/base.component';
import { PetDisplay } from 'src/app/common/models/common.model';
import { APIService } from 'src/app/common/services/api.service';

@Component({
  selector: 'app-adopt-animal-list',
  templateUrl: './adopt-animal-list.component.html',
  styleUrls: ['./adopt-animal-list.component.scss']
})
export class AdoptAnimalListComponent extends BaseComponent implements OnInit {

  petList: PetDisplay[] | undefined;

  constructor(
    private apiService: APIService
  ) {super() }

  ngOnInit(): void {
    this.initPetList()
    
  }

  initPetList = () => {
    this.apiService.getAnimalsSubject().pipe(takeUntil(this.ngUnsubscribe)).subscribe(res => {
      if(res){
        //filter to remove any without primary photo
        let filteredList = res.animals.filter((animal: any) => animal.primary_photo_cropped != null)
        //map to get needed keys
        let petListMap = filteredList.map((animal:any) => <PetDisplay> {
          petId: animal.id,
          petName: animal.name,
          mainImg: animal.primary_photo_cropped?.full
        })
        console.log(petListMap)
        this.petList = petListMap;
      }
    })
  }
}
