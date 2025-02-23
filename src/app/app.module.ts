import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { AppComponent } from './app.component';
import { PostCreateComponent } from './post/post-create/post.create.components';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.components';
import { PostListComponent } from './post/post-list/post-list.component';
import { MatToolbarModule} from '@angular/material/toolbar';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatCardModule} from '@angular/material/card';
import { MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {HttpClientModule} from '@angular/common/http';




@NgModule({
  declarations: [
    AppComponent,
    PostCreateComponent,
    HeaderComponent,
    PostListComponent

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    FormsModule,
    MatToolbarModule,
    MatExpansionModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    HttpClientModule

  
  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
