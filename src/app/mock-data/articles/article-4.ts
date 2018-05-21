export const CONTENT_4 = `			
<h2>一、内容概览</h2>
<p>WebSocket的出现，使得浏览器具备了实时双向通信的能力。本文由浅入深，介绍了WebSocket如何建立连接、交换数据的细节，以及数据帧的格式。此外，还简要介绍了针对WebSocket的安全攻击，以及协议是如何抵御类似攻击的。</p>
<h2>二、什么是WebSocket</h2>
<p>HTML5开始提供的一种浏览器与服务器进行全双工通讯的网络技术，属于应用层协议。它基于TCP传输协议，并复用HTTP的握手通道。</p>
<p>对大部分web开发者来说，上面这段描述有点枯燥，其实只要记住几点：</p>
<ol>
	<li>WebSocket可以在浏览器里使用</li>
	<li>支持双向通信</li>
	<li>使用很简单</li>
</ol>

<h3>1、有哪些优点</h3>
	        
	        <p>说到优点，这里的对比参照物是HTTP协议，概括地说就是：支持双向通信，更灵活，更高效，可扩展性更好。</p>

<ol>
	<li>支持双向通信，实时性更强。</li>
	<li>更好的二进制支持。</li>
	<li>较少的控制开销。连接创建后，ws客户端、服务端进行数据交换时，协议控制的数据包头部较小。在不包含头部的情况下，服务端到客户端的包头只有2~10字节（取决于数据包长度），客户端到服务端的的话，需要加上额外的4字节的掩码。而HTTP协议每次通信都需要携带完整的头部。</li>
	<li>支持扩展。ws协议定义了扩展，用户可以扩展协议，或者实现自定义的子协议。（比如支持自定义压缩算法等）</li>
</ol>

<p>对于后面两点，没有研究过WebSocket协议规范的同学可能理解起来不够直观，但不影响对WebSocket的学习和使用。</p>

<h3>2、需要学习哪些东西</h3>

<p>对网络应用层协议的学习来说，最重要的往往就是<strong>连接建立过程</strong>、<strong>数据交换教程</strong>。当然，数据的格式是逃不掉的，因为它直接决定了协议本身的能力。好的数据格式能让协议更高效、扩展性更好。</p>


	        
	        
	            <div id="lowerFullwidthVCR"></div>
	        
	       	<p>下文主要围绕下面几点展开：</p>

<ol>
	<li>如何建立连接</li>
	<li>如何交换数据</li>
	<li>数据帧格式</li>
	<li>如何维持连接</li>
</ol>

<h2>三、入门例子</h2>

<p>在正式介绍协议细节前，先来看一个简单的例子，有个直观感受。例子包括了WebSocket服务端、WebSocket客户端（网页端）。完整代码可以在 <a href="https://github.com/chyingp/blog/tree/master/demo/2017.05.22-web-socket/ws">这里</a> 找到。</p>

<p>这里服务端用了<code>ws</code>这个库。相比大家熟悉的<code>socket.io</code>，<code>ws</code>实现更轻量，更适合学习的目的。</p>

<h3>1、服务端</h3>

<p>代码如下，监听8080端口。当有新的连接请求到达时，打印日志，同时向客户端发送消息。当收到到来自客户端的消息时，同样打印日志。</p>

<pre class=" language-java"><code class=" language-java">var app <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'express'</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
var server <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'http'</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Server</span><span class="token punctuation">(</span>app<span class="token punctuation">)</span><span class="token punctuation">;</span>
var WebSocket <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'ws'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
var wss <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">WebSocket<span class="token punctuation">.</span>Server</span><span class="token punctuation">(</span><span class="token punctuation">{</span> port<span class="token operator">:</span> <span class="token number">8080</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
wss<span class="token punctuation">.</span><span class="token function">on</span><span class="token punctuation">(</span><span class="token string">'connection'</span><span class="token punctuation">,</span> function <span class="token function">connection</span><span class="token punctuation">(</span>ws<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'server: receive connection.'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    ws<span class="token punctuation">.</span><span class="token function">on</span><span class="token punctuation">(</span><span class="token string">'message'</span><span class="token punctuation">,</span> function <span class="token function">incoming</span><span class="token punctuation">(</span>message<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'server: received: %s'</span><span class="token punctuation">,</span> message<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    ws<span class="token punctuation">.</span><span class="token function">send</span><span class="token punctuation">(</span><span class="token string">'world'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
app<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">'/'</span><span class="token punctuation">,</span> <span class="token function">function</span> <span class="token punctuation">(</span>req<span class="token punctuation">,</span> res<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  res<span class="token punctuation">.</span><span class="token function">sendfile</span><span class="token punctuation">(</span>__dirname <span class="token operator">+</span> <span class="token string">'/index.html'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
app<span class="token punctuation">.</span><span class="token function">listen</span><span class="token punctuation">(</span><span class="token number">3000</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code></pre>

<h3>2、客户端</h3>

<p>代码如下，向8080端口发起WebSocket连接。连接建立后，打印日志，同时向服务端发送消息。接收到来自服务端的消息后，同样打印日志。</p>

<pre class=" language-javascript"><code class=" language-javascript"><span class="token operator">&lt;</span>script<span class="token operator">&gt;</span>
  <span class="token keyword">var</span> ws <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">WebSocket</span><span class="token punctuation">(</span><span class="token string">'ws://localhost:8080'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  ws<span class="token punctuation">.</span>onopen <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'ws onopen'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    ws<span class="token punctuation">.</span><span class="token function">send</span><span class="token punctuation">(</span><span class="token string">'from client: hello'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>
  ws<span class="token punctuation">.</span>onmessage <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span>e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'ws onmessage'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'from server: '</span> <span class="token operator">+</span> e<span class="token punctuation">.</span>data<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token operator">&lt;</span><span class="token operator">/</span>script<span class="token operator">&gt;</span></code></pre>

<h3>3、运行结果</h3>

<p>可分别查看服务端、客户端的日志，这里不展开。</p>

<p>服务端输出：</p>

<pre><code>server: receive connection.
server: received hello</code></pre>

<p>客户端输出：</p>

<pre><code>client: ws connection is open
client: received world</code></pre>

<h2>四、如何建立连接</h2>

<p>前面提到，WebSocket复用了HTTP的握手通道。具体指的是，客户端通过HTTP请求与WebSocket服务端协商升级协议。协议升级完成后，后续的数据交换则遵照WebSocket的协议。</p>

<h3>1、客户端：申请协议升级</h3>

<p>首先，客户端发起协议升级请求。可以看到，采用的是标准的HTTP报文格式，且只支持<code>GET</code>方法。</p>

<pre><code>GET / HTTP/1.1
Host: localhost:8080
Origin: http://127.0.0.1:3000
Connection: Upgrade
Upgrade: websocket
Sec-WebSocket-Version: 13
Sec-WebSocket-Key: w4v7O6xFTi36lq3RNcgctw==</code></pre>

<p>重点请求首部意义如下：</p>

<ul>
	<li><code>Connection: Upgrade</code>：表示要升级协议</li>
	<li><code>Upgrade: websocket</code>：表示要升级到websocket协议。</li>
	<li><code>Sec-WebSocket-Version: 13</code>：表示websocket的版本。如果服务端不支持该版本，需要返回一个<code>Sec-WebSocket-Version</code>header，里面包含服务端支持的版本号。</li>
	<li><code>Sec-WebSocket-Key</code>：与后面服务端响应首部的<code>Sec-WebSocket-Accept</code>是配套的，提供基本的防护，比如恶意的连接，或者无意的连接。</li>
</ul>

<div style="background:#eeeeee;border:1px solid #cccccc;padding:5px 10px;">注意，上面请求省略了部分非重点请求首部。由于是标准的HTTP请求，类似Host、Origin、Cookie等请求首部会照常发送。在握手阶段，可以通过相关请求首部进行 安全限制、权限校验等。</div>

<h3>2、服务端：响应协议升级</h3>

<p>服务端返回内容如下，状态代码<code>101</code>表示协议切换。到此完成协议升级，后续的数据交互都按照新的协议来。</p>

<pre><code>HTTP/1.1 101 Switching Protocols
Connection:Upgrade
Upgrade: websocket
Sec-WebSocket-Accept: Oy4NRAQ13jhfONC7bP8dTKb4PTU=</code></pre>

<div style="background:#eeeeee;border:1px solid #cccccc;padding:5px 10px;">备注：每个header都以<code>\r\n</code>结尾，并且最后一行加上一个额外的空行<code>\r\n</code>。此外，服务端回应的HTTP状态码只能在握手阶段使用。过了握手阶段后，就只能采用特定的错误码。</div>

<h3>3、Sec-WebSocket-Accept的计算</h3>

<p><code>Sec-WebSocket-Accept</code>根据客户端请求首部的<code>Sec-WebSocket-Key</code>计算出来。</p>

<p>计算公式为：</p>

<ol>
	<li>将<code>Sec-WebSocket-Key</code>跟<code>258EAFA5-E914-47DA-95CA-C5AB0DC85B11</code>拼接。</li>
	<li>通过SHA1计算出摘要，并转成base64字符串。</li>
</ol>

<p>伪代码如下：</p>

<pre><code>&gt;toBase64( sha1( Sec-WebSocket-Key + 258EAFA5-E914-47DA-95CA-C5AB0DC85B11 ) )</code></pre>

<p>验证下前面的返回结果：</p>

<pre class=" language-java"><code class=" language-java"><span class="token keyword">const</span> crypto <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'crypto'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> magic <span class="token operator">=</span> <span class="token string">'258EAFA5-E914-47DA-95CA-C5AB0DC85B11'</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> secWebSocketKey <span class="token operator">=</span> <span class="token string">'w4v7O6xFTi36lq3RNcgctw=='</span><span class="token punctuation">;</span>
let secWebSocketAccept <span class="token operator">=</span> crypto<span class="token punctuation">.</span><span class="token function">createHash</span><span class="token punctuation">(</span><span class="token string">'sha1'</span><span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token function">update</span><span class="token punctuation">(</span>secWebSocketKey <span class="token operator">+</span> magic<span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token function">digest</span><span class="token punctuation">(</span><span class="token string">'base64'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>secWebSocketAccept<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment" spellcheck="true">// Oy4NRAQ13jhfONC7bP8dTKb4PTU=</span></code></pre>

<h2>五、数据帧格式</h2>

<p>客户端、服务端数据的交换，离不开数据帧格式的定义。因此，在实际讲解数据交换之前，我们先来看下WebSocket的数据帧格式。</p>

<p>WebSocket客户端、服务端通信的最小单位是帧（frame），由1个或多个帧组成一条完整的消息（message）。</p>

<ol>
	<li>发送端：将消息切割成多个帧，并发送给服务端；</li>
	<li>接收端：接收消息帧，并将关联的帧重新组装成完整的消息；</li>
</ol>

<p>本节的重点，就是讲解<strong>数据帧</strong>的格式。详细定义可参考 <a href="https://tools.ietf.org/html/rfc6455#section-5.2">RFC6455 5.2节</a> 。</p>

<h3>1、数据帧格式概览</h3>

<p>下面给出了WebSocket数据帧的统一格式。熟悉TCP/IP协议的同学对这样的图应该不陌生。</p>

<ol>
	<li>从左到右，单位是比特。比如<code>FIN</code>、<code>RSV1</code>各占据1比特，<code>opcode</code>占据4比特。</li>
	<li>内容包括了标识、操作代码、掩码、数据、数据长度等。（下一小节会展开）</li>
</ol>

<pre><code>  0                   1                   2                   3
  0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1
 +-+-+-+-+-------+-+-------------+-------------------------------+
 |F|R|R|R| opcode|M| Payload len |    Extended payload length    |
 |I|S|S|S|  (4)  |A|     (7)     |             (16/64)           |
 |N|V|V|V|       |S|             |   (if payload len==126/127)   |
 | |1|2|3|       |K|             |                               |
 +-+-+-+-+-------+-+-------------+ - - - - - - - - - - - - - - - +
 |     Extended payload length continued, if payload len == 127  |
 + - - - - - - - - - - - - - - - +-------------------------------+
 |                               |Masking-key, if MASK set to 1  |
 +-------------------------------+-------------------------------+
 | Masking-key (continued)       |          Payload Data         |
 +-------------------------------- - - - - - - - - - - - - - - - +
 :                     Payload Data continued ...                :
 + - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - +
 |                     Payload Data continued ...                |
 +---------------------------------------------------------------+</code></pre>

<h3>2、数据帧格式详解</h3>

<p>针对前面的格式概览图，这里逐个字段进行讲解，如有不清楚之处，可参考协议规范，或留言交流。</p>

<p><strong>FIN</strong>：1个比特。</p>

<p>如果是1，表示这是消息（message）的最后一个分片（fragment），如果是0，表示不是是消息（message）的最后一个分片（fragment）。</p>

<p><strong>RSV1, RSV2, RSV3</strong>：各占1个比特。</p>

<p>一般情况下全为0。当客户端、服务端协商采用WebSocket扩展时，这三个标志位可以非0，且值的含义由扩展进行定义。如果出现非零的值，且并没有采用WebSocket扩展，连接出错。</p>

<p><strong>Opcode</strong>: 4个比特。</p>

<p>操作代码，Opcode的值决定了应该如何解析后续的数据载荷（data payload）。如果操作代码是不认识的，那么接收端应该断开连接（fail the connection）。可选的操作代码如下：</p>

<ul>
	<li>%x0：表示一个延续帧。当Opcode为0时，表示本次数据传输采用了数据分片，当前收到的数据帧为其中一个数据分片。</li>
	<li>%x1：表示这是一个文本帧（frame）</li>
	<li>%x2：表示这是一个二进制帧（frame）</li>
	<li>%x3-7：保留的操作代码，用于后续定义的非控制帧。</li>
	<li>%x8：表示连接断开。</li>
	<li>%x8：表示这是一个ping操作。</li>
	<li>%xA：表示这是一个pong操作。</li>
	<li>%xB-F：保留的操作代码，用于后续定义的控制帧。</li>
</ul>

<p><strong>Mask</strong>: 1个比特。</p>

<p>表示是否要对数据载荷进行掩码操作。从客户端向服务端发送数据时，需要对数据进行掩码操作；从服务端向客户端发送数据时，不需要对数据进行掩码操作。</p>

<p>如果服务端接收到的数据没有进行过掩码操作，服务端需要断开连接。</p>

<p>如果Mask是1，那么在Masking-key中会定义一个掩码键（masking key），并用这个掩码键来对数据载荷进行反掩码。所有客户端发送到服务端的数据帧，Mask都是1。</p>

<p>掩码的算法、用途在下一小节讲解。</p>

<p><strong>Payload length</strong>：数据载荷的长度，单位是字节。为7位，或7+16位，或1+64位。</p>

<p>假设数Payload length === x，如果</p>

<ul>
	<li>x为0~126：数据的长度为x字节。</li>
	<li>x为126：后续2个字节代表一个16位的无符号整数，该无符号整数的值为数据的长度。</li>
	<li>x为127：后续8个字节代表一个64位的无符号整数（最高位为0），该无符号整数的值为数据的长度。</li>
</ul>

<p>此外，如果payload length占用了多个字节的话，payload length的二进制表达采用网络序（big endian，重要的位在前）。</p>

<p><strong>Masking-key</strong>：0或4字节（32位）</p>

<p>所有从客户端传送到服务端的数据帧，数据载荷都进行了掩码操作，Mask为1，且携带了4字节的Masking-key。如果Mask为0，则没有Masking-key。</p>

<p>备注：载荷数据的长度，不包括mask key的长度。</p>

<p><strong>Payload data</strong>：(x+y) 字节</p>

<p>载荷数据：包括了扩展数据、应用数据。其中，扩展数据x字节，应用数据y字节。</p>

<p>扩展数据：如果没有协商使用扩展的话，扩展数据数据为0字节。所有的扩展都必须声明扩展数据的长度，或者可以如何计算出扩展数据的长度。此外，扩展如何使用必须在握手阶段就协商好。如果扩展数据存在，那么载荷数据长度必须将扩展数据的长度包含在内。</p>

<p>应用数据：任意的应用数据，在扩展数据之后（如果存在扩展数据），占据了数据帧剩余的位置。载荷数据长度 减去 扩展数据长度，就得到应用数据的长度。</p>

<h3>3、掩码算法</h3>

<p>掩码键（Masking-key）是由客户端挑选出来的32位的随机数。掩码操作不会影响数据载荷的长度。掩码、反掩码操作都采用如下算法：</p>

<p>首先，假设：</p>

<ul>
	<li>original-octet-i：为原始数据的第i字节。</li>
	<li>transformed-octet-i：为转换后的数据的第i字节。</li>
	<li>j：为<code>i mod 4</code>的结果。</li>
	<li>masking-key-octet-j：为mask key第j字节。</li>
</ul>

<p>算法描述为： original-octet-i 与 masking-key-octet-j 异或后，得到 transformed-octet-i。</p>

<div style="background:#eeeeee;border:1px solid #cccccc;padding:5px 10px;">j = i MOD 4<br>
transformed-octet-i = original-octet-i XOR masking-key-octet-j</div>

<h2>六、数据传递</h2>

<p>一旦WebSocket客户端、服务端建立连接后，后续的操作都是基于数据帧的传递。</p>

<p>WebSocket根据<code>opcode</code>来区分操作的类型。比如<code>0x8</code>表示断开连接，<code>0x0</code>-<code>0x2</code>表示数据交互。</p>

<h3>1、数据分片</h3>

<p>WebSocket的每条消息可能被切分成多个数据帧。当WebSocket的接收方收到一个数据帧时，会根据<code>FIN</code>的值来判断，是否已经收到消息的最后一个数据帧。</p>

<p>FIN=1表示当前数据帧为消息的最后一个数据帧，此时接收方已经收到完整的消息，可以对消息进行处理。FIN=0，则接收方还需要继续监听接收其余的数据帧。</p>

<p>此外，<code>opcode</code>在数据交换的场景下，表示的是数据的类型。<code>0x01</code>表示文本，<code>0x02</code>表示二进制。而<code>0x00</code>比较特殊，表示延续帧（continuation frame），顾名思义，就是完整消息对应的数据帧还没接收完。</p>

<h3>2、数据分片例子</h3>

<p>直接看例子更形象些。下面例子来自<a href="https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API/Writing_WebSocket_servers">MDN</a>，可以很好地演示数据的分片。客户端向服务端两次发送消息，服务端收到消息后回应客户端，这里主要看客户端往服务端发送的消息。</p>

<p><strong>第一条消息</strong></p>

<p>FIN=1, 表示是当前消息的最后一个数据帧。服务端收到当前数据帧后，可以处理消息。opcode=0x1，表示客户端发送的是文本类型。</p>

<p><strong>第二条消息</strong></p>

<ol>
	<li>FIN=0，opcode=0x1，表示发送的是文本类型，且消息还没发送完成，还有后续的数据帧。</li>
	<li>FIN=0，opcode=0x0，表示消息还没发送完成，还有后续的数据帧，当前的数据帧需要接在上一条数据帧之后。</li>
	<li>FIN=1，opcode=0x0，表示消息已经发送完成，没有后续的数据帧，当前的数据帧需要接在上一条数据帧之后。服务端可以将关联的数据帧组装成完整的消息。</li>
</ol>

<pre><code>Client: FIN=1, opcode=0x1, msg="hello"
Server: (process complete message immediately) Hi.
Client: FIN=0, opcode=0x1, msg="and a"
Server: (listening, new message containing text started)
Client: FIN=0, opcode=0x0, msg="happy new"
Server: (listening, payload concatenated to previous message)
Client: FIN=1, opcode=0x0, msg="year!"
Server: (process complete message) Happy new year to you too!</code></pre>

<h2>七、连接保持+心跳</h2>

<p>WebSocket为了保持客户端、服务端的实时双向通信，需要确保客户端、服务端之间的TCP通道保持连接没有断开。然而，对于长时间没有数据往来的连接，如果依旧长时间保持着，可能会浪费包括的连接资源。</p>

<p>但不排除有些场景，客户端、服务端虽然长时间没有数据往来，但仍需要保持连接。这个时候，可以采用心跳来实现。</p>

<ul>
	<li>发送方-&gt;接收方：ping</li>
	<li>接收方-&gt;发送方：pong</li>
</ul>

<p>ping、pong的操作，对应的是WebSocket的两个控制帧，<code>opcode</code>分别是<code>0x9</code>、<code>0xA</code>。</p>

<p>举例，WebSocket服务端向客户端发送ping，只需要如下代码（采用<code>ws</code>模块）</p>

<pre class=" language-java"><code class=" language-java">ws<span class="token punctuation">.</span><span class="token function">ping</span><span class="token punctuation">(</span><span class="token string">''</span><span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code></pre>

<h2>八、Sec-WebSocket-Key/Accept的作用</h2>

<p>前面提到了，<code>Sec-WebSocket-Key/Sec-WebSocket-Accept</code>在主要作用在于提供基础的防护，减少恶意连接、意外连接。</p>

<p>作用大致归纳如下：</p>

<ol>
	<li>避免服务端收到非法的websocket连接（比如http客户端不小心请求连接websocket服务，此时服务端可以直接拒绝连接）</li>
	<li>确保服务端理解websocket连接。因为ws握手阶段采用的是http协议，因此可能ws连接是被一个http服务器处理并返回的，此时客户端可以通过Sec-WebSocket-Key来确保服务端认识ws协议。（并非百分百保险，比如总是存在那么些无聊的http服务器，光处理Sec-WebSocket-Key，但并没有实现ws协议。。。）</li>
	<li>用浏览器里发起ajax请求，设置header时，Sec-WebSocket-Key以及其他相关的header是被禁止的。这样可以避免客户端发送ajax请求时，意外请求协议升级（websocket upgrade）</li>
	<li>可以防止反向代理（不理解ws协议）返回错误的数据。比如反向代理前后收到两次ws连接的升级请求，反向代理把第一次请求的返回给cache住，然后第二次请求到来时直接把cache住的请求给返回（无意义的返回）。</li>
	<li>Sec-WebSocket-Key主要目的并不是确保数据的安全性，因为Sec-WebSocket-Key、Sec-WebSocket-Accept的转换计算公式是公开的，而且非常简单，最主要的作用是预防一些常见的意外情况（非故意的）。</li>
</ol>

<div style="background:#eeeeee;border:1px solid #cccccc;padding:5px 10px;">强调：Sec-WebSocket-Key/Sec-WebSocket-Accept 的换算，只能带来基本的保障，但连接是否安全、数据是否安全、客户端/服务端是否合法的 ws客户端、ws服务端，其实并没有实际性的保证。</div>

<h2>九、数据掩码的作用</h2>

<p>WebSocket协议中，数据掩码的作用是增强协议的安全性。但数据掩码并不是为了保护数据本身，因为算法本身是公开的，运算也不复杂。除了加密通道本身，似乎没有太多有效的保护通信安全的办法。</p>

<p>那么为什么还要引入掩码计算呢，除了增加计算机器的运算量外似乎并没有太多的收益（这也是不少同学疑惑的点）。</p>

<p>答案还是两个字：<strong>安全</strong>。但并不是为了防止数据泄密，而是为了防止早期版本的协议中存在的代理缓存污染攻击（proxy cache poisoning attacks）等问题。</p>

<h3>1、代理缓存污染攻击</h3>

<p>下面摘自2010年关于安全的一段讲话。其中提到了代理服务器在协议实现上的缺陷可能导致的安全问题。<a href="http://w2spconf.com/2011/papers/websocket.pdf">猛击出处</a>。</p>

<blockquote>
<p>“We show, empirically, that the current version of the WebSocket consent mechanism is vulnerable to proxy cache poisoning attacks. Even though the WebSocket handshake is based on HTTP, which should be understood by most network intermediaries, the handshake uses the esoteric “Upgrade” mechanism of HTTP [5]. In our experiment, we find that many proxies do not implement the Upgrade mechanism properly, which causes the handshake to succeed even though subsequent traffic over the socket will be misinterpreted by the proxy.”</p>

<p>[TALKING] Huang, L-S., Chen, E., Barth, A., Rescorla, E., and C.<br>
Jackson, "Talking to Yourself for Fun and Profit", 2010,</p>
</blockquote>

<p>在正式描述攻击步骤之前，我们假设有如下参与者：</p>

<ul>
	<li>攻击者、攻击者自己控制的服务器（简称“邪恶服务器”）、攻击者伪造的资源（简称“邪恶资源”）</li>
	<li>受害者、受害者想要访问的资源（简称“正义资源”）</li>
	<li>受害者实际想要访问的服务器（简称“正义服务器”）</li>
	<li>中间代理服务器</li>
</ul>

<p>攻击步骤一：</p>

<ol>
	<li><strong>攻击者</strong>浏览器 向 <strong>邪恶服务器</strong> 发起WebSocket连接。根据前文，首先是一个协议升级请求。</li>
	<li>协议升级请求 实际到达 <strong>代理服务器</strong>。</li>
	<li><strong>代理服务器</strong> 将协议升级请求转发到 <strong>邪恶服务器</strong>。</li>
	<li><strong>邪恶服务器</strong> 同意连接，<strong>代理服务器</strong> 将响应转发给 <strong>攻击者</strong>。</li>
</ol>

<p>由于 upgrade 的实现上有缺陷，<strong>代理服务器</strong> 以为之前转发的是普通的HTTP消息。因此，当<strong>协议服务器</strong> 同意连接，<strong>代理服务器</strong> 以为本次会话已经结束。</p>

<p>攻击步骤二：</p>

<ol>
	<li><strong>攻击者</strong> 在之前建立的连接上，通过WebSocket的接口向 <strong>邪恶服务器</strong> 发送数据，且数据是精心构造的HTTP格式的文本。其中包含了 <strong>正义资源</strong> 的地址，以及一个伪造的host（指向<strong>正义服务器</strong>）。（见后面报文）</li>
	<li>请求到达 <strong>代理服务器</strong> 。虽然复用了之前的TCP连接，但 <strong>代理服务器</strong> 以为是新的HTTP请求。</li>
	<li><strong>代理服务器</strong> 向 <strong>邪恶服务器</strong> 请求 <strong>邪恶资源</strong>。</li>
	<li><strong>邪恶服务器</strong> 返回 <strong>邪恶资源</strong>。<strong>代理服务器</strong> 缓存住 <strong>邪恶资源</strong>（url是对的，但host是 <strong>正义服务器</strong> 的地址）。</li>
</ol>

<p>到这里，受害者可以登场了：</p>

<ol>
	<li><strong>受害者</strong> 通过 <strong>代理服务器</strong> 访问 <strong>正义服务器</strong> 的 <strong>正义资源</strong>。</li>
	<li><strong>代理服务器</strong> 检查该资源的url、host，发现本地有一份缓存（伪造的）。</li>
	<li><strong>代理服务器</strong> 将 <strong>邪恶资源</strong> 返回给 <strong>受害者</strong>。</li>
	<li><strong>受害者</strong> 卒。</li>
</ol>

<p>附：前面提到的精心构造的“HTTP请求报文”。</p>

<pre><code>Client → Server:
POST /path/of/attackers/choice HTTP/1.1 Host: host-of-attackers-choice.com Sec-WebSocket-Key: &lt;connection-key&gt;
Server → Client:
HTTP/1.1 200 OK
Sec-WebSocket-Accept: &lt;connection-key&gt;</code></pre>

<h3>2、当前解决方案</h3>

<p>最初的提案是对数据进行加密处理。基于安全、效率的考虑，最终采用了折中的方案：对数据载荷进行掩码处理。</p>

<p>需要注意的是，这里只是限制了浏览器对数据载荷进行掩码处理，但是坏人完全可以实现自己的WebSocket客户端、服务端，不按规则来，攻击可以照常进行。</p>

<p>但是对浏览器加上这个限制后，可以大大增加攻击的难度，以及攻击的影响范围。如果没有这个限制，只需要在网上放个钓鱼网站骗人去访问，一下子就可以在短时间内展开大范围的攻击。</p>

<h2>十、写在后面</h2>

<p>WebSocket可写的东西还挺多，比如WebSocket扩展。客户端、服务端之间是如何协商、使用扩展的。WebSocket扩展可以给协议本身增加很多能力和想象空间，比如数据的压缩、加密，以及多路复用等。</p>

<p>篇幅所限，这里先不展开，感兴趣的同学可以留言交流。文章如有错漏，敬请指出。</p>


`