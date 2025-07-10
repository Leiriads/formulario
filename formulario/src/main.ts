import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app/app';
import { FormularioComponent } from './app/components/formulario/formulario';


const routes = [
  { path: '', component: FormularioComponent }
];

bootstrapApplication(AppComponent, {
  providers: [provideRouter(routes)]
});
