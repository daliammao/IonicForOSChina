/**
 * Created by hero on 2017/6/5.
 */
export class BlogListBean {
  bloglist: BlogItemBean[]
}

export class BlogItemBean {
  id: number;
  author: string;
  pubDate: string;
  title: string;
  authorid: number;
  commentCount: number;
  type: number;
}
