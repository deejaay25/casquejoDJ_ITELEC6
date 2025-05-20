import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { Post } from "../post.model";
import { PostsService } from "../posts.service";
import { PageEvent } from '@angular/material/paginator';  
import { AuthService } from "src/app/authentication/auth.service";




@Component({
    selector: 'app-post-list',
    templateUrl: './post-list.component.html',
    styleUrls: ['./post-list.component.css'],
})




export class PostListComponent implements OnInit, OnDestroy {
   
    totalposts = 10;
    postperpage = 2;
    currentpage = 1;
    pageSizeOption = [1, 2, 5, 10];  
    Loading = false;
    posts: Post[] = [];
    private postsSub!: Subscription;
    searchTerm: string = '';
    userId: string | null = null;
   
    userIsAuthenticated = false;


    private authStatusSub!: Subscription;


    constructor(public postsService: PostsService, private authService: AuthService) {}
    onLike(post: Post): void {
      if (!post.likes) {
        post.likes = 1;
      } else {
        post.likes++;
      }
   
      this.postsService.updateLikes(post.id, post.likes).subscribe({
        next: () => {
          console.log('Likes updated successfully');
        },
        error: (error) => {
          console.error('Error updating likes:', error);
        }
      });
    }
   
    ngOnInit(): void {
        this.Loading = true;
        this.fetchPosts();
   
        this.userId = this.authService.getUserId();  
        this.postsSub = this.postsService.getPostUpdatedListener()
          .subscribe((postData: { posts: Post[], postCount: number }) => {
            this.posts = postData.posts;
            this.totalposts = postData.postCount;
            this.Loading = false;
          });
   
   
        this.userIsAuthenticated = this.authService.getIsAuth();
       
        this.authStatusSub = this.authService.getAuthStatusListener()
          .subscribe(isAuthenticated => {
            this.userIsAuthenticated = isAuthenticated;
            this.userId = this.authService.getUserId();
          });
      }
   


    fetchPosts(): void {
        this.Loading = true;
        this.postsService.getPosts(this.postperpage, this.currentpage);  
    }




    onChangedPage(pageData: PageEvent): void {
        this.Loading = true;  
        this.currentpage = pageData.pageIndex + 1;  
        this.postperpage = pageData.pageSize;
        this.fetchPosts();  
    }




    onDelete(postId: string): void {
        this.Loading = true;  
        this.postsService.deletePost(postId)
          .subscribe({
            next: () => {
                this.fetchPosts();
            },
            error: (error) => {
                console.error('Error deleting post:', error);
                this.Loading = false;  
            },
            complete: () => {
                this.Loading = false;
            }
          });
    }
   
    ngOnDestroy(): void {
        if (this.postsSub) {
            this.postsSub.unsubscribe();
        }
    }
   
  filteredPosts(): Post[] {
      if (!this.searchTerm) {
        return this.posts;
      }
      const lowerTerm = this.searchTerm.toLowerCase();
      return this.posts.filter(post =>
        post.title.toLowerCase().includes(lowerTerm) ||
        post.content.toLowerCase().includes(lowerTerm)
      );
    }


onView(post: Post): void {
  if (!post.viewed) {
    this.postsService.incrementViews(post.id).subscribe({
      next: () => {
        post.views = (post.views || 0) + 1;
        post.viewed = true;
      },
      error: (err) => {
        console.error('Failed to increment views', err);
      }
    });
  }
}


 
}



