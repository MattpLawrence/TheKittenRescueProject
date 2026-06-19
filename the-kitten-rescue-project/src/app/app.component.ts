import { AfterViewInit, Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { BaseComponent } from './common/components/base/base.component';
import { AdoptStepperViewEnum } from './common/models/common.enum';
import { AuthService } from './common/services/auth.service';
import { CommonService } from './common/services/common.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent extends BaseComponent implements OnInit, AfterViewInit {
  title = 'the-kitten-rescue-project';
  private observedRoots = new WeakSet<Node>();

  constructor(
    private authService: AuthService,
    private commonService: CommonService,
    private router: Router
  ) { super() };

  ngOnInit(): void {
    this.initAuthTokenTimer();
    this.initStep();
  }

  ngAfterViewInit(): void {
    this.initGivebutterIframe();
  }

  initGivebutterIframe(): void {
    // The Givebutter iframe is nested several open shadow roots deep
    // (widget > button > dialog > giving-form > givebutter-iframe > iframe).
    // Neither querySelectorAll nor MutationObserver cross shadow boundaries,
    // so we recurse through every open shadow root, apply scrolling="no" to
    // any iframe, and attach an observer to each root so the dialog opening
    // (deep inside) re-triggers the scan.
    const scan = (root: Document | ShadowRoot) => {
      root.querySelectorAll('iframe').forEach(f => {
        if (f.getAttribute('scrolling') !== 'yes') {
          f.setAttribute('scrolling', 'yes');
          f.style.setProperty('overflow-y', 'scroll', 'important');
          f.style.setProperty('overflow-x', 'hidden', 'important');
        }
      });

      root.querySelectorAll('button[aria-label="Donate"]').forEach(btn => {
        const el = btn as HTMLElement;
        el.style.setProperty('bottom', '4rem', 'important');
        el.style.setProperty('right', '1rem', 'important');
      });

      root.querySelectorAll('*').forEach(el => {
        const sr = (el as HTMLElement).shadowRoot;
        if (sr) scan(sr);
      });

      if (!this.observedRoots.has(root)) {
        this.observedRoots.add(root);
        // Watch childList for the dialog opening AND the scrolling attribute,
        // since iframe-resizer keeps resetting scrolling back to "auto".
        new MutationObserver(() => scan(root)).observe(root, {
          childList: true,
          subtree: true,
          attributes: true,
          attributeFilter: ['scrolling']
        });
      }
    };

    scan(document);
  }

  initAuthTokenTimer() {
    //kick off timer to refresh oAuth token
    this.authService.startTokenTimer();
    //get initial oAuth token
    this.authService.getToken();
  }

  initStep = () => {
    let step: AdoptStepperViewEnum = AdoptStepperViewEnum.home;
    this.router.events.subscribe(
      (event: any) => {
        if (event instanceof NavigationEnd) {
          switch (true) {
            case this.getParamValueString("form-adopter-info"):
              step = AdoptStepperViewEnum.userInfo
              break;
            case this.getParamValueString("form-home-info"):
              step = AdoptStepperViewEnum.homeInfo
              break;
            case this.getParamValueString("form-pet-info"):
              step = AdoptStepperViewEnum.petInfo
              break;
            default:
              step = AdoptStepperViewEnum.home;
              break
          }

          this.commonService.setAdoptStepSubject(step);
        }
      })
  }

  //manual query because angular native solution is too slow to catch the params first time.
  getParamValueString(paramName: string) {
    const url = window.location.href;
    let contains: boolean = false;
    if (url.includes(paramName)) contains = true

    return contains;
  }
}
