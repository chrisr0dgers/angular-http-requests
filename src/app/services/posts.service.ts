import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { Post } from "../post.model";

@Injectable({
  providedIn: "root",
})
export class PostsService {
  constructor(private http: HttpClient) {}

  createAndStorePost(postData: Post) {
    return this.http
      .post<{ name: string }>(
        "https://angular-course-6b225-default-rtdb.firebaseio.com/posts.json",
        postData
      )
  }

  fetchPosts() {
    return this.http
      .get<{ [key: string]: Post }>(
        "https://angular-course-6b225-default-rtdb.firebaseio.com/posts.json"
      )
      .pipe(
        map((responseData) => {
          const postsArray: Post[] = [];
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              postsArray.push({ ...responseData[key], id: key });
            }
          }
          return postsArray;
        })
      );
  }

  clearPosts() {
    return this.http.delete(
      "https://angular-course-6b225-default-rtdb.firebaseio.com/posts.json"
    );
  }
}
