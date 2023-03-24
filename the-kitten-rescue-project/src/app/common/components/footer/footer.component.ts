import { Component, OnInit } from '@angular/core';
import { faShieldCat} from '@fortawesome/free-solid-svg-icons';
import { faYoutube, faTiktok, faFacebook, faInstagram} from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  icons = {
    youtube: faYoutube,
    tiktok: faTiktok,
    facebook: faFacebook,
    instagram: faInstagram
  }

  constructor() { }

  ngOnInit(): void {
  }

}
