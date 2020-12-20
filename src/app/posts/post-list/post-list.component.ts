import { Component, OnInit} from '@angular/core';
import { Post } from '../post.model';
import { PostsService } from '../posts.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {

  constructor(public postService: PostsService) { }
  posts: Post[] = []
  isLoading = false;
  private postSub: Subscription;

  ngOnInit(): void {  // this is a function angular will automatically execute for us when this conponent is created 
      this.isLoading = true;
      this.postService.getPosts();
      this.postSub = this.postService.getPostUpdatedListener().subscribe((posts: Post[]) => {
        this.isLoading = false;
        this.posts = posts;
      });
  }

  onDelete(postId: string) {
    this.postService.deletePost(postId)
  }
}
