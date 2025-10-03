import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { OneOneCoachComponent } from './one-one-coach/one-one-coach.component';
import { PersonalTrainingComponent } from './personal-training/personal-training.component';
import { OnlineProgramsComponent } from './online-programs/online-programs.component';
import { DietNutritionComponent } from './diet-nutrition/diet-nutrition.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { NotfoundComponent } from './notfound/notfound.component';

export const routes: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    { path: 'home', component: HomeComponent},
    // { path: 'about-us', component: AboutUsComponent},
    { path: 'programs/1-1-offline-coaching', component: OneOneCoachComponent},
    { path: 'programs/online-coaching', component: PersonalTrainingComponent},
    { path: 'programs/corporate-wellness-programs', component: OnlineProgramsComponent},
    { path: 'programs/nutrition-consulting', component: DietNutritionComponent},
    { path: 'contact-us', component: ContactUsComponent},
    { path: '**', component: NotfoundComponent } // Wildcard route for 404
];
