import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';

import { provideAnimations } from '@angular/platform-browser/animations';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { APP_INITIALIZER, enableProdMode, provideAppInitializer } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { IAppConfig } from './app/models/app-config.model';
import { environment } from './environments/environment';
import { Globals } from './app/services/globals.service';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';

if (environment.production) {
  enableProdMode();
}

function configurationFactory(httpClient: HttpClient, globals: Globals): () => Observable<any> {
  const jsonFile = `/assets/config.${environment.name}.json`;
  return () => httpClient.get<IAppConfig>(jsonFile)
    .pipe(
       tap(config => { 
        Globals.settingsStatic = config;
        globals.settingsValue = config; 
        console.log('main ==> configurationFactory', Globals.settingsStatic);
        return config;
       }));
  }

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    provideHttpClient(),
    { provide: APP_INITIALIZER, useFactory: configurationFactory, multi: true, deps: [HttpClient, Globals]},
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { floatLabel: 'always' } }
  ]
});



