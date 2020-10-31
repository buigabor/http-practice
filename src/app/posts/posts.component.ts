import { NotFoundError } from './../errors/notFoundError';
import { AppError } from './../errors/appError';
import { PostService } from './../post-service.service';
import { Component, OnInit } from '@angular/core';
import { Post } from '../post-service.service';
import { BadInputError } from '../errors/badInputError';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
})
export class PostsComponent implements OnInit {
  posts: Post[];
  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.postService
      .getAll()
      .subscribe((posts: Post[]) => (this.posts = posts));
  }

  createPost(input: HTMLInputElement): void {
    const post: Post = { title: input.value };
    this.posts.unshift(post);

    input.value = '';

    this.postService.create(post).subscribe(
      (recivedPost: Post) => {
        post.id = recivedPost.id;
      },
      (error: AppError) => {
        this.posts.splice(0, 1);

        if (error instanceof BadInputError) {
          console.log(error.originalError);
        } else {
          throw error;
        }
      }
    );
  }

  deletePost(post: Post): void {
    const index = this.posts.indexOf(post);
    this.posts.splice(index, 1);
    this.postService.delete(post.id).subscribe(
      () => {},
      (error: AppError) => {
        this.posts.splice(index, 0, post);
        if (error instanceof NotFoundError) {
          alert('This post has been already deleted');
          console.log(error);
        } else {
          throw error;
        }
      }
    );
  }
}
