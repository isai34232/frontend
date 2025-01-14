import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { ListProductsComponent } from './app/components/list-products/list-products.component';
import { provideHttpClient } from '@angular/common/http';


bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));

