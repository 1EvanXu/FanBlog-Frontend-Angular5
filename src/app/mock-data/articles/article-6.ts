export const CONTENT_6 = `
   	<blockquote>
<p><em>看新闻很累？看技术新闻更累？试试<a href="https://time.geekbang.org/?utm_source=website&amp;utm_medium=infoq&amp;utm_campaign=news&amp;utm_content=app &#10;&#10;" target="_blank">下载InfoQ手机客户端</a>，每天上下班路上听新闻，有趣还有料！</em></p>
</blockquote>

<p>在过去的几年间，<a href="https://www.infoq.com/sre">我们已经讨论过</a>站点可靠性工程（Site Reliability Engineering，SRE）的角色，尤其这个群体如何从Google这种领域的公司得到发展，进而满足金融和医疗等行业公司的期望。最近科技记者<a href="https://thenewstack.io/author/alex-handy/">Alex Handy</a>撰写了<a href="https://thenewstack.io/the-role-of-site-reliability-engineering-in-microservices/">SRE和微服务架构如何适配</a>的文章：</p>

<blockquote>
<p>[...]尽管SRE和微服务在世界范围内的软件公司中并行发展，但是前者实际上让后者的生活更加艰难。</p>
</blockquote>

<p>Alex认为造成这一点的原因是非常清晰的：</p>

<blockquote>
<p>[...]SRE的存亡依托于所要维护和优化的整个系统的全栈视角。这个角色将开发人员的技巧和管理员的技巧结合在了起来，这样所产生的员工能够在事情偏离方向的时候，调试生产环境中的应用。</p>
</blockquote>

<p>Alex接着介绍了SRE的一些背景知识以及该功能如何在像Google这种规模的公司中运转，他引用了Google的一位SRE主管Todd Underwood的观点，阐述了Google如何安排实践和系统，帮助开发团队能够在分布式系统中既能考虑到可靠性和可用性，又能采用像Paxos这样的技术方式实现一致性。</p>

<blockquote>
<p>Underwood强调SRE工作的另外一个重要方面，也就是可见性。当微服务在不断变化的基于的云的服务器、容器和数据库中运行时，会抛出数以亿计的数据包，不管处理哪种类型的问题，首先找到哪里有问题都是至关重要的。这也就是SRE工作的全栈性要发挥作用的地方了。</p>
</blockquote>

<p>按照Google的一位产品主管Morgan McLean的说法，这里的关键在于微服务的监控和跟踪，关于这个话题，过去有人也<a href="https://www.infoq.com/news/2017/11/debug-container-microservices">提到过</a>，<a href="https://www.infoq.com/news/2017/11/monitoring-microservices">我们也曾经在其他地方讨论过</a>。在Alex的文章中，他提到了Google发布的一些新工具，以便于解决这个问题：</p>

<blockquote>
<p>[...]Google最近发布了<a href="https://cloud.google.com/trace/">Stackdriver Trace</a>、<a href="https://cloud.google.com/debugger/">Stackdriver Debugger</a>和<a href="https://cloud.google.com/profiler/">Stackdriver Profiler</a>。这些工具的名字听起来很像传统企业厂商的老式测试和运维工具，其实这是有原因的：它们所执行的正是传统的故障诊断任务，也就是开发人员和运维人员所熟悉的工作内容，但是它们聚焦于微服务，并且在云端完成它们的任务。</p>
</blockquote>

<p>Alex引用Morgan McLean的内容总结了这些工具是如何确保SRE团队更好地管理新的基于微服务的架构的，尽管跟踪非常重要，但是Google相信他们所提供的工具目前在profiling和调试方面是独一无二的，能够为开发人员和SRE带来重要的收益。在文章的结尾处，Alex通过Google和其他的行业参考资料进一步介绍了监控、指标（metrics）和可见性，这是非常重要的，因为它们可能会与越来越多的公司息息相关。</p>

<p>我们看到越来越多的开发人员和公司采用微服务，其中很多正在使用，或者将要使用SRE团队，了解架构和工具如何演化以保证可靠性、可用性以及一致性是非常有意思的事情，这样的话，开发人员和SRE团队才能和谐相处。如果在这方面你有经验要分享，不管是正面的还是负面的，对于整个社区来说，能够倾听这些经验都是非常有用的。</p>

<p><strong>查看英文原文</strong>：<a href="https://www.infoq.com/news/2018/04/microservices-sre">Microservices and Site Reliability Engineering</a></p>

`