import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { Post } from "../post.model";
import { PostsService } from "../posts.service";

@Component({
    selector: 'app-post-list',
    templateUrl: './post-list.component.html',
    styleUrls: ['./post-list.component.css'],
})

export class PostListComponent implements OnInit, OnDestroy { 
    posts: Post[] = [];
    private postsSub!: Subscription;

    constructor(public postsService: PostsService) {}

    ngOnInit(): void {
        this.postsService.getPost();
        this.postsSub = this.postsService.getPostUpdatedListener()
            .subscribe((posts: Post[]) => {
                this.posts = posts; // Update posts array
            });
    }

    ngOnDestroy(): void {
        if (this.postsSub) {
            this.postsSub.unsubscribe();
        }
    }
}
