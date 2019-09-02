import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HeroComponent} from './hero/hero.component';
import { HeroInfoComponent } from './hero/hero-info/hero-info.component';

const routes: Routes = [
  { path: 'hero', component: HeroComponent , data: { animation: 'Hero'}},
  { path: 'hero/:id', component: HeroInfoComponent , data: { animation: 'heroInfo'}},
  { path: '**', component: HeroComponent }

];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes)]
})
export class AppRoutingModule { }
