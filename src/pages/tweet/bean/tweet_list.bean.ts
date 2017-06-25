/**
 * Created by hero on 2017/6/5.
 */
export class TweetListBean {
  tweetlist: TweetItemBean[]
}

export class TweetItemBean {
  id: number;
  pubDate: string;
  body: string;
  author: string;
  authorid: number;
  commentCount: number;
}
