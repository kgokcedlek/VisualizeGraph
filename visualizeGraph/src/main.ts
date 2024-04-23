import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

bootstrapApplication(AppComponent, 
  {
  providers: [
    provideHttpClient(), provideAnimationsAsync(), // Include HttpClient for dependency injection
    // Other providers if necessary
  ],
  }).catch((err) => console.error(err));
