import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { StoreComponent } from './features/store/store.component';

export const routes: Routes = [
    {path: '', component:HomeComponent},
    {path: 'store', component:StoreComponent},
    
    /*
    {path: 'login', component:LoginComponent},
    {path: 'register', component:RegisterComponent},
    {path: 'dashboard', component:DashboardComponent},
    {path: 'about', component:AboutComponent},
    {path: 'profile', component:ProfileComponent}
    */
];
