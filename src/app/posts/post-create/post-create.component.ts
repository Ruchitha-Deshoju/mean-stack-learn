import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PostsService } from '../posts.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Post } from '../post.model';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {

  enteredContent: string = "";
  enteredTitle: string = "";
  private mode = 'create';
  isLoading = false;
  private postId: string;
  post: Post;

  constructor(public postService: PostsService, public route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if(paramMap.has('postId')) {
        this.mode = 'edit'
        this.postId = paramMap.get('postId')
        this.isLoading = true;
        this.postService.getPost(this.postId).subscribe(postData => {
          this.isLoading = false;
          this.post = {id: postData._id, title: postData.title, content: postData.content}
        })
      } else {
        this.mode = 'create'
        this.postId = null;
      }
    });
  }

  onAddPost(form: NgForm) {
    if(form.invalid) {
      return 
    }
    this.isLoading = true;
    if (this.mode === 'create') {
      this.postService.addPost(form.value.title, form.value.content)
    } else {
      this.postService.updatePost(this.postId, form.value.title, form.value.content)
    }
    form.resetForm();
  }

}
