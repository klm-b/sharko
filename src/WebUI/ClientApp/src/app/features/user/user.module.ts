import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { RouterModule, Routes } from '@angular/router';
import { TabMenuModule } from 'primeng/tabmenu';
import { TagModule } from 'primeng/tag';
import { RippleModule } from 'primeng/ripple';
import { TabViewModule } from 'primeng/tabview';
import { MessageModule } from 'primeng/message';
import { ButtonModule } from 'primeng/button';
import { SettingsComponent } from './settings/settings.component';
import { ProfileComponent } from './profile/profile.component';
import { IsProfileOwnerGuard } from './guards/is-profile-owner.guard';
import { InputSwitchModule } from 'primeng/inputswitch';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { MessagesModule } from 'primeng/messages';
import { PersonalComponent } from './settings/personal/personal.component';
import { AvatarComponent } from './settings/avatar/avatar.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { AuthorizationComponent } from './settings/authorization/authorization.component';
import { PreferencesComponent } from './settings/preferences/preferences.component';
import { PrivacyComponent } from './settings/privacy/privacy.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ErrorComponent } from './settings/personal/error/error.component';
import { SummariesComponent } from './summaries/summaries.component';
import { DataViewModule } from 'primeng/dataview';
import { ChipModule } from 'primeng/chip';
import { DividerModule } from 'primeng/divider';
import { BadgeModule } from 'primeng/badge';
import { SelectButtonModule } from 'primeng/selectbutton';
import { AwardsComponent } from './awards/awards.component';
import { CollectionsComponent } from './collections/collections.component';
import { CommentsComponent } from './comments/comments.component';

const routes: Routes = [
  {
    path: ':username',
    component: UserComponent,
    children: [
      // { path: '', redirectTo: 'profile', pathMatch: 'full' },
      { path: '', component: ProfileComponent, pathMatch: 'full' },
      { path: 'summaries', component: SummariesComponent },
      { path: 'awards', component: AwardsComponent },
      { path: 'collections', component: CollectionsComponent },
      { path: 'comments', component: CommentsComponent },
      {
        path: 'settings',
        component: SettingsComponent,
        canActivate: [IsProfileOwnerGuard],
        children: [
          { path: '', redirectTo: 'personal', pathMatch: 'full' },
          { path: 'personal', component: PersonalComponent },
          { path: 'avatar', component: AvatarComponent },
          { path: 'authorization', component: AuthorizationComponent },
          { path: 'preferences', component: PreferencesComponent },
          { path: 'privacy', component: PrivacyComponent },
        ],
      },
    ],
  },
];

@NgModule({
  declarations: [
    UserComponent,
    SettingsComponent,
    ProfileComponent,
    PersonalComponent,
    AvatarComponent,
    AuthorizationComponent,
    PreferencesComponent,
    PrivacyComponent,
    ErrorComponent,
    SummariesComponent,
    AwardsComponent,
    CollectionsComponent,
    CommentsComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    TabViewModule,
    SelectButtonModule,
    TabMenuModule,
    BadgeModule,
    TagModule,
    MessageModule,
    TabMenuModule,
    RippleModule,
    ButtonModule,
    InputSwitchModule,
    DropdownModule,
    FileUploadModule,
    MessagesModule,
    ImageCropperModule,
    ReactiveFormsModule,
    DividerModule,
    InputTextModule,
    ChipModule,
    DataViewModule,
    RouterModule.forChild(routes),
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'ru-UA' }, IsProfileOwnerGuard],
})
export class UserModule {}
