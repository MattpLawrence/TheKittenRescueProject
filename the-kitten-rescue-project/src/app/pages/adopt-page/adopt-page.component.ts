import { Component, OnInit } from '@angular/core';
import { APIService } from 'src/app/common/services/api.service';

@Component({
  selector: 'app-adopt-page',
  templateUrl: './adopt-page.component.html',
  styleUrls: ['./adopt-page.component.scss']
})
export class AdoptPageComponent implements OnInit {

  constructor(private apiService: APIService) { }

  ngOnInit(): void {
  }

  findPets = () => {
    console.log('search')
    this.apiService.searchAnimals('cat').subscribe(response => {
      console.log(response)
    });
  }
}
