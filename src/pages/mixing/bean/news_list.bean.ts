/**
 * Created by hero on 2017/6/5.
 */
export class NewsListBean {
  newslist: NewsItemBean[]
}

export class NewsItemBean {
  id: number;
  author: string;
  pubDate: string;
  title: string;
  authorid: number;
  commentCount: number;
  type: number;
}
