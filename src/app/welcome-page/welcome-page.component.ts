import { SubscriptionComponent } from 'src/app/infrastructure/subscription-component'
import { DataService } from 'src/app/services/shared-data.service';
import { Component, OnInit, NgZone } from '@angular/core';
import { Auth, Hub } from 'aws-amplify';
import { Router } from '@angular/router';
import { AmplifyService } from 'aws-amplify-angular'
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['../page.scss', './welcome-page.component.scss'],
})
export class WelcomePageComponent extends SubscriptionComponent implements OnInit {
  jwtToken: string;
  constructor(
    private sharedDataService: DataService,
    private router: Router,
    private amplifyService: AmplifyService,
    private zone: NgZone,
    private spinner: NgxSpinnerService
  ) {
    super()

    // Used for listening to login events
    Hub.listen("auth", ({ payload: { event, data } }) => {
      if (event === "cognitoHostedUI" || event === "signedIn") {
        console.log(event);
        this.zone.run(() => this.router.navigate(['/']));
      } else {
        this.spinner.hide();
      }
    });

    //currentAuthenticatedUser: when user comes to login page again
    Auth.currentAuthenticatedUser()
      .then(() => {
        this.router.navigate(['/'], { replaceUrl: true });
      }).catch((err) => {
      this.spinner.hide();
      console.log(err);
    })

    // Get the JWT token
    Auth.currentSession()
      .then(session => {
        this.jwtToken = session.getIdToken().getJwtToken();
        console.log('JWT Token:', this.jwtToken);
        function parseJwt(jwtToken) {
          if (!jwtToken) { return; }
          const base64Url = jwtToken.split('.')[1];
          const base64 = base64Url.replace('-', '+').replace('_', '/');
          return JSON.parse(window.atob(base64));
        }

        const data = parseJwt(this.jwtToken)
        console.log(data)
        sharedDataService.sharedData = data;
      })
      .catch(error => console.error(error));
  }

  ngOnInit() {
  }

  onLoginClickOkta() {
    this.spinner.show();

    Auth.federatedSignIn({
      customProvider: 'test3'
    });
  }

}
