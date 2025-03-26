import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { NgModel } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'; // Aggiungi questo import
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideClientHydration } from '@angular/platform-browser';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideClientHydration(),
    provideHttpClient(withFetch()), // <-- Configura HttpClient con fetch  ],
  ],
};
