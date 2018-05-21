class ArticleItem {
    pubId: number;
    title: string;
    abstract: string;
    pubTime: string;
    type: string;
    category: string;
    visitorCount: number;
    voteCount: number;
    commentaryCount: number;
    link: string;
}
const BASE_URL = 'blog/'
const item1 = {
    pubId: 18051701,
    title: 'Stable AngularJS and Long Term Support',
    abstract: `
    AngularJS is an extremely stable framework for building web applications, and has been used by millions of developers across the web. Angular is its successor and uses the same philosophies such as declarative templates and dependency injection.
    Angular has been growing more than 5x faster than AngularJS did since its original release. In October of 2017, the user base of Angular passed 1 million developers (based on 30 day users to our documentation), and became larger than the user base of AngularJS. We have many exciting Angular releases planned in 2018 and beyond.
    `,
    pubTime: '2018-05-27 15:06',
    type: 'Original',
    category: 'AngularJS',
    visitorCount: 786,
    voteCount: 124,
    commentaryCount: 53,
    link: BASE_URL + 'article/18051701'
}

const item2 = {
    pubId: 18051702,
    title: 'Trip report from ng-conf 2018',
    abstract: `
    There were a lot of amazing sessions at ng-conf, and you can watch all of them on YouTube. The only reason Angular is successful is because we have a great community that contributes to the ecosystem and shares their knowledge with the world.
    Here’s a brief summary of what the Angular team shared this year.
    `,
    pubTime: '2018-01-27 15:12',
    type: 'Original',
    category: 'ng-cli',
    visitorCount: 1024,
    voteCount: 200,
    commentaryCount: 71,
    link: BASE_URL + 'article/18051702'
}

const item3 = {
    pubId: 18051813,
    title: 'The Power of Emotional Decision-Making',
    abstract: `
    This is the story of how I decided to leave my first marriage. It is also a story of self-reckoning in which I teeter and stumble to a realization that despite the myth I’ve long treated as truth, I can, and must, trust myself. The narrative concludes happily, more or less. But I cannot supply you with the ending — resolving, at last, to leave — without explaining to you why I chose to marry in the first place.
    `,
    pubTime: '2018-05-17 14:12',
    type: 'Reproduced',
    category: 'life',
    visitorCount: 204,
    voteCount: 99,
    commentaryCount: 10,
    link: BASE_URL + 'article/18051813'
}

const item4 = {
    pubId: 18051936,
    title: 'WebSocket协议深入探究',
    abstract: `
    WebSocket的出现，使得浏览器具备了实时双向通信的能力。本文由浅入深，介绍了WebSocket如何建立连接、交换数据的细节，以及数据帧的格式。此外，还简要介绍了针对WebSocket的安全攻击，以及协议是如何抵御类似攻击的。
    `,
    pubTime: '2018-05-17 14:12',
    type: 'Translation',
    category: 'WebSocket',
    visitorCount: 294,
    voteCount: 47,
    commentaryCount: 16,
    link: BASE_URL + 'article/18051936'
}

const item5 = {
    pubId: 18051149,
    title: '浅议区块链改变人工智能的可能性',
    abstract: `
    乍看上去，区块链和AI似乎并没有交集：一个是在封闭数据平台上培育中心化的智能，另一个则是在开放数据环境下促进分布化的应用。但是，要明确的是人工智能涉及多种学科，多个细分领域。所以可以确定的说，区块链和人工智能肯定有可以交叉结合的空间。区块链技术有智能合约机制，而智能合约就是一段可执行的代码。人工智能中有很多算法，这些算法肯定是可以应用到智能合约中的。另外，多技术间的融合是大势所趋。今天我们编译了本文，来看看区块链改变人工智能的可能性。
    `,
    pubTime: '2018-05-17 8:50',
    type: 'Original',
    category: '区块链',
    visitorCount: 987,
    voteCount: 137,
    commentaryCount: 19,
    link: BASE_URL + 'article/18051149'
}

const item6 = {
    pubId: 18051256,
    title: '微服务与站点可靠性工程',
    abstract: `
    在过去的几年间，我们已经讨论过站点可靠性工程（Site Reliability Engineering，SRE）的角色，尤其这个群体如何从Google这种领域的公司得到发展，进而满足金融和医疗等行业公司的期望。最近科技记者Alex Handy撰写了SRE和微服务架构如何适配的文章：,
    `,
    pubTime: '2018-05-17 8:50',
    type: 'Original',
    category: '微服务',
    visitorCount: 357,
    voteCount: 37,
    commentaryCount: 8,
    link: BASE_URL + 'article/18051256'
}


export const ARTICLE_ITEMS: ArticleItem[] = [
    item1, item2, item3, item4, item5, item6, item1, item2, item3, item4, item5, item6
]