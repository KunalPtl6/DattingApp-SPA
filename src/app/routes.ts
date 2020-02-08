import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ListsComponent } from './lists/lists.component';
import { MessagesComponent } from './messages/messages.component';
import { AuthGuard } from './_gaurds/auth.guard';
import { MemberListComponent } from './members/member-list/member-list.component';
import { MemberDetailsComponent } from './members/member-details/member-details.component';
import { MemberDetailsResolver } from './_resolver/member-detail-resolver';
import { MemberListResolver } from './_resolver/member-list-resolver';

export const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    {
        path: '', runGuardsAndResolvers: 'always', canActivate: [AuthGuard],
        children: [
            { path: 'lists', component: ListsComponent },
            {
                path: 'members', component: MemberListComponent,
                resolve: { users: MemberListResolver }
            },
            {
                path: 'members/:id', component: MemberDetailsComponent,
                resolve: { user: MemberDetailsResolver }
            },
            { path: 'messages', component: MessagesComponent }
        ]
    },
    { path: '**', redirectTo: '', pathMatch: 'full' }
];

