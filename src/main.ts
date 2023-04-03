import { enableProdMode } from '@angular/core'
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic'

import { AppModule } from 'src/app/app.module'
import { environment } from 'src/environments/environment'

import awsmobile from 'src/app/aws-export';
import Amplify from "aws-amplify";


Amplify.configure(awsmobile);


if (environment.production) {
  enableProdMode()
}

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch(err => console.log(err))
