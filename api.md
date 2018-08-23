```json
ArticleItem: 
{
    "pubId": 0,
    "title": "",
    "abstract": "",
    "pubTime": "string|number",
    "type": "string",
    "category": "string",
    "visitorCount": 0,
    "voteCount": 0,
    "commentaryCount": 0,
    "link": "string",
}

Draft:
{
    "pubId": 0,
    "title": "string",
    "pubTime": "string|number",
    "type": "string",
    "category": "string",
    "visitorCount": 0,
    "voteCount": 0,
    "content": "string",
}

SideInformation: 
{
    "title": "string",
    "link": "string",
    "score": 0
}

Commentary:
{
    "commentaryId": 0,
    "commentator": "string",
    "commentTime": "string|number",
    "commentaryContent": "string",
    "childCommentaries": [],
}

ChildCommentary:
{
    "parentCommentary": 0,
    "commentaryId": 0,
    "commentTime": "string|number",
    "commentator": "string",
    "commentaryContent": "string",
    "replyTo": "string",
}

Comment 
{
  "parent": 0,
  "replyTo": {
      "id": 0,
      "name": "name"
  },
  "commentator": "string",
  "content": "string",
}

```

|url|method|return|send|
|---|---|---|---|
|/blog/articles/all/p/${pageIndex}|GET|{articleItems:ArticleItem[],totalNumber: number}|
|/blog/articles/category/${categoryId}/p/${pageIndex}|GET|{articleItems:ArticleItem[],totalNumber: number, categoryName: string}|
|/blog/articles/search/p/${pageIndex}?keywords=${keywords}|GET|{articleItems:ArticleItem[],totalNumber: number}|
|/blog/article/${pubId}|GET|Draft|
|/blog/article/${pubId}/commentaries/p/${pageIndex}|GET|{commentaries: Commentary[], totalNumber: number}|
|/blog/article/${pubId}/vote|POST|Boolean|
|/blog/article/${pubId}/commentary|POST|Boolean|Comment
|/blog/side/latestArticles|GET|SideInformation[]|
|/blog/side/popularArticles|GET|SideInformation[]|
|/blog/side/categories|GET|SideInformation[]|
|/blog/message|POST|Boolean|Message


