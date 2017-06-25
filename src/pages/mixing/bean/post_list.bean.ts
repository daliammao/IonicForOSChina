/**
 * Created by hero on 2017/6/5.
 */
export class PostListBean {
  post_list: PostItemBean[]
}

export class PostItemBean {
  id: number;
  author: string;
  pubDate: string;
  title: string;
  authorid: number;
  portrait: string;
  answerCount: number;
  viewCount: number;
  type: number;
}
