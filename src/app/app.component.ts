import { Component } from '@angular/core';
import { NumberValueAccessor } from '@angular/forms';

interface Post {
  id: number;
  title: any;
  content: any;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'casquejod';
  storedPosts: Post[] = [];
  onPostAdded(post: any): void{
    this.storedPosts.push(post);
  }
}
