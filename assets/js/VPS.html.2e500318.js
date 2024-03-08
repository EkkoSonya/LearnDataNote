"use strict";(self.webpackChunklearn_data=self.webpackChunklearn_data||[]).push([[4925],{3671:(n,e)=>{e.A=(n,e)=>{const a=n.__vccOpts||n;for(const[n,s]of e)a[n]=s;return a}},1421:(n,e,a)=>{a.r(e),a.d(e,{comp:()=>K,data:()=>Z});var s=a(7847);const l=(0,s.Lk)("h2",{id:"环境部署",tabindex:"-1"},[(0,s.Lk)("a",{class:"header-anchor",href:"#环境部署"},[(0,s.Lk)("span",null,"环境部署")])],-1),t=(0,s.Lk)("p",null,"部署应用前，为服务器配置好包管理工具，以便节省部署时间。主流的前端包管理工具有 npm、yarn、pnpm、以及国内的镜像 cnpm、tyarn 等，这些包管理器都是基于 nodejs。",-1),i=(0,s.Lk)("h3",{id:"包管理安装",tabindex:"-1"},[(0,s.Lk)("a",{class:"header-anchor",href:"#包管理安装"},[(0,s.Lk)("span",null,"包管理安装")])],-1),o={href:"https://nodejs.org/en/download/",target:"_blank",rel:"noopener noreferrer"},p=(0,s.Fv)('<p>全局安装 yarn 是 <code>npm i yarn -g</code>，pnpm 是 <code>npm i pnpm -g</code>。如果不想全局安装，则去除 <code>-g</code>。</p><h3 id="包管理源" tabindex="-1"><a class="header-anchor" href="#包管理源"><span>包管理源</span></a></h3><p>包管理源的修改命令类似，将下方的 npm 替换 yarn 或 pnpm 即可修改包管理源。</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token comment">#查看源</span>\n<span class="token function">npm</span> config get registry\n<span class="token comment">#更换国内源</span>\n<span class="token function">npm</span> config <span class="token builtin class-name">set</span> registry https://registry.npmmirror.com/\n<span class="token comment">#换回默认源</span>\n<span class="token function">npm</span> config <span class="token builtin class-name">set</span> registry https://registry.npmjs.org/\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="部署包" tabindex="-1"><a class="header-anchor" href="#部署包"><span>部署包</span></a></h3><p>npm、yarn 和 pnpm 的包安装及管理命令。</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token comment">#全局安装</span>\n<span class="token function">npm</span> i 包 <span class="token parameter variable">-g</span>\n<span class="token function">yarn</span> global <span class="token function">add</span> 包\n<span class="token function">pnpm</span> <span class="token function">add</span> 包 <span class="token parameter variable">-g</span>\n\n<span class="token comment">#移除全局包</span>\n<span class="token function">pnpm</span> remove 包 <span class="token parameter variable">--global</span>\n<span class="token comment">#更新全局包</span>\n<span class="token function">pnpm</span> upgrade 包 <span class="token parameter variable">--global</span>\n\n<span class="token comment">#升级当前目录的依赖以确保你的项目只包含单个版本的相关包</span>\n<span class="token comment">#本方法能解决大部分的部署报错</span>\n<span class="token function">npm</span> i <span class="token operator">&amp;&amp;</span> <span class="token function">npm</span> update\n<span class="token function">yarn</span> <span class="token operator">&amp;&amp;</span> <span class="token function">yarn</span> upgrade\n<span class="token function">pnpm</span> i <span class="token operator">&amp;&amp;</span> <span class="token function">pnpm</span> up\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="本地测试" tabindex="-1"><a class="header-anchor" href="#本地测试"><span>本地测试</span></a></h3><p>有些静态文件不支持直接打开，可以用 anywhere 架构本地服务器来进行测试。</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token comment"># 安装静态服务 anywhere</span>\n<span class="token function">npm</span> <span class="token function">install</span> anywhere <span class="token parameter variable">-g</span>\n<span class="token comment"># 进入静态页面存放目录，执行 anywhere</span>\nanywhere <span class="token parameter variable">-p</span> <span class="token number">8081</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="服务器-ecs" tabindex="-1"><a class="header-anchor" href="#服务器-ecs"><span>服务器 ECS</span></a></h2><p>服务器系统为 Debian 11，配置包管理器 nodejs 和 yarn。<sup class="footnote-ref"><a href="#footnote1">[1]</a><a class="footnote-anchor" id="footnote-ref1"></a></sup></p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token function">apt-get</span> update   <span class="token comment"># 从数据源更新软件包的列表，运行产生软件包数据库</span>\n<span class="token function">apt-get</span> <span class="token function">install</span> <span class="token function">wget</span> <span class="token operator">&amp;&amp;</span> <span class="token function">apt-get</span> <span class="token function">install</span> <span class="token function">sudo</span> <span class="token comment"># 安装 wget 和 sudo</span>\n\n<span class="token comment"># 大版本升级必须先建立快照</span>\n<span class="token function">apt-get</span> upgrade  <span class="token comment"># 更新所有软件包（慎用，不要用！）之前 CentOS 系统错误就是使用了 upgrade 命令。</span>\n\n<span class="token comment"># 新建用户，非 root 权限</span>\nadduser xxx\n<span class="token comment"># 为新用户设置密码</span>\n<span class="token function">passwd</span> xxx\n\n<span class="token comment"># 安装 Node.js 18 和 yarn</span>\n<span class="token function">curl</span> <span class="token parameter variable">-fsSL</span> https://deb.nodesource.com/setup_18.x <span class="token operator">|</span> <span class="token function">bash</span> -\n<span class="token function">apt-get</span> <span class="token function">install</span> <span class="token parameter variable">-y</span> nodejs\n<span class="token function">sudo</span> <span class="token function">apt-get</span> <span class="token function">install</span> <span class="token function">yarn</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果服务器的 Node.js 安装遇到问题，可以用宝塔面板的 Node.js 版本管理器来进行部署。</p><h3 id="网站重定向" tabindex="-1"><a class="header-anchor" href="#网站重定向"><span>网站重定向</span></a></h3><p>更改 nginx 配置后，nginx 重载配置后实现网站重定向。<code>$1</code> 表示第一个 <code>()</code> 内的正则匹配内容，<code>$2</code> 为第二个。<sup class="footnote-ref"><a href="#footnote2">[2]</a><a class="footnote-anchor" id="footnote-ref2"></a></sup></p>',16),r={href:"https://www.jb51.net/article/146957.htm",target:"_blank",rel:"noopener noreferrer"},c=(0,s.Fv)('<div class="language-ini line-numbers-mode" data-ext="ini" data-title="ini"><pre class="language-ini"><code><span class="token comment">#隐性链接跳转</span>\nlocation /xx1 {proxy_pass &lt;https://xxx.com/;&gt;}\n\n<span class="token comment">#404 前，将旧文章链接格式转为新的，使用绝对路径</span>\nlocation ^~ /p{\n    rewrite ^/p/(.*)$  https://newzone.top/posts/$1.html;\n}\n\n<span class="token comment"># huginn 设置中 location 添加 301 定向，兼容老路径链接</span>\n<span class="token key attr-name">if ( $request_uri</span> <span class="token punctuation">=</span> <span class="token value attr-value">&quot;/users/1/web_requests/21/guoke.xml&quot; ) {</span>\nrewrite ^ http://xxx.com/users/1/web_requests/19/guoke.xml permanent;\n}\n\n<span class="token comment">#只匹配主页，将主页跳转为其中一个子页面</span>\n<span class="token key attr-name">location</span> <span class="token punctuation">=</span> <span class="token value attr-value">/ {</span>\n rewrite https://xxx.com/ permanent;\n}\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="全新安装服务器" tabindex="-1"><a class="header-anchor" href="#全新安装服务器"><span>全新安装服务器</span></a></h3>',2),d={href:"https://www.bt.cn/bbs/thread-19376-1-1.html",target:"_blank",rel:"noopener noreferrer"},u=(0,s.Fv)('<li><p>删除阿里云主机监控。</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token function">service</span> aegis stop  <span class="token comment">#停止服务</span>\n<span class="token function">chkconfig</span> <span class="token parameter variable">--del</span> aegis  <span class="token comment"># 删除服务</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></li>',1),m={href:"https://www.bt.cn/bbs/thread-2897-1-1.html",target:"_blank",rel:"noopener noreferrer"},k=(0,s.Fv)("<li><p>宝塔上修改默认账号密码，并修改登录 22 的默认 SSH 端口。如果开通了 FTP，修改 FTP 端口。</p></li><li><p>选择「网站」&gt;「添加站点」，将站点根目录放在 /www/wwwroot/xxx，同时新建数据库。</p></li><li><p>上传全站文件并解压，然后按照安装提示重新安装一次，最后导入备份数据库。</p></li><li><p>404.html 起效，宝塔网站配置文件中，删除 <code>error_page 404 /404.html;</code> 中的 <code>#</code>。</p></li><li><p>SSL 证书设置，开启强制 HTTPS；PHP 版本；301 重定向；添加伪静态设置（metinfo 或其他网站后台有代码）。如果 301 设置失败，直接在「伪静态」配置中，放入跳转代码。</p></li>",5),h={href:"https://www.digitalocean.com/community/tools/nginx?global.app.lang=zhCN",target:"_blank",rel:"noopener noreferrer"},v={href:"https://www.bt.cn/bbs/forum.php?mod=viewthread&tid=3117",target:"_blank",rel:"noopener noreferrer"},b=(0,s.Lk)("ul",null,[(0,s.Lk)("li",null,"添加计划任务，定期释放内存，建议设置每天释放一次，执行时机为半夜，如：04:00。"),(0,s.Lk)("li",null,"打开 Linux 工具箱添加 Swap。Swap 推荐与物理内存相同。"),(0,s.Lk)("li",null,"安装 PHP 缓存扩展，尽量使用更高的 PHP 版本，另外安装 opcache(脚本缓存)、redis(内容缓存)、imagemagick、fileinfo、exif。"),(0,s.Lk)("li",null,[(0,s.eW)("Redis 优化，在/etc/sysctl.conf 中添加 "),(0,s.Lk)("code",null,"net.core.somaxconn = 2048"),(0,s.eW)("，然后终端运行 "),(0,s.Lk)("code",null,"sysctl -p"),(0,s.eW)("。")])],-1),g=(0,s.Lk)("li",null,[(0,s.Lk)("p",null,[(0,s.eW)("防火墙白名单（自定义），如：添加 url 规则 "),(0,s.Lk)("code",null,"^/rss.php"),(0,s.eW)(" 到防火墙 URL 白名单，防止 rss 服务被屏蔽。")])],-1),f=(0,s.Lk)("h3",{id:"服务器迁移",tabindex:"-1"},[(0,s.Lk)("a",{class:"header-anchor",href:"#服务器迁移"},[(0,s.Lk)("span",null,"服务器迁移")])],-1),w=(0,s.Lk)("li",null,"购买按量付费服务器。",-1),L={href:"https://smc.console.aliyun.com/overview",target:"_blank",rel:"noopener noreferrer"},x=(0,s.Lk)("li",null,"将域名解析到临时系统，确定服务基本正常。",-1),y=(0,s.Lk)("li",null,"对旧服务器先建立云盘快照，然后更换操作系统，进行全新部署。",-1),S=(0,s.Lk)("li",null,"对比新旧服务器，确认配置正常。",-1),W=(0,s.Lk)("h2",{id:"网站设计",tabindex:"-1"},[(0,s.Lk)("a",{class:"header-anchor",href:"#网站设计"},[(0,s.Lk)("span",null,"网站设计")])],-1),_=(0,s.Lk)("h3",{id:"网站字体",tabindex:"-1"},[(0,s.Lk)("a",{class:"header-anchor",href:"#网站字体"},[(0,s.Lk)("span",null,"网站字体")])],-1),C=(0,s.Lk)("p",null,[(0,s.eW)("网站为了提高访问速度并保持设计的一致性，通常会选默认字体。这导致网站设计难以突出重点。针对这点，我通常会修改网站的导航栏字体，将其从默认字体改为 "),(0,s.Lk)("code",null,"思源黑体 - 粗"),(0,s.eW)("。")],-1),P={href:"https://www.iconfont.cn/webfont",target:"_blank",rel:"noopener noreferrer"},j=(0,s.Lk)("li",null,"点击「生成字体」后，在选中字体的下方，点击「本地下载」。",-1),F=(0,s.Lk)("li",null,"将字体包上传到服务器，修改新字体的位置参数。",-1),N=(0,s.Lk)("li",null,[(0,s.eW)("在导航栏的 "),(0,s.Lk)("code",null,"class"),(0,s.eW)(" 属性中添加 "),(0,s.Lk)("code",null,"web-font"),(0,s.eW)("。")],-1),T=(0,s.Lk)("h3",{id:"米拓",tabindex:"-1"},[(0,s.Lk)("a",{class:"header-anchor",href:"#米拓"},[(0,s.Lk)("span",null,"米拓")])],-1),q=(0,s.Lk)("p",null,"早期的动态网站通过米拓开发的，记录：",-1),A={href:"https://www.metinfo.cn/download/54.html",target:"_blank",rel:"noopener noreferrer"},O=(0,s.Lk)("li",null,"metinfo 新版静态页会删除 index.html，后续都改用 index.php。",-1),I=(0,s.Fv)('<h2 id="常见问题" tabindex="-1"><a class="header-anchor" href="#常见问题"><span>常见问题</span></a></h2><h3 id="cpu-100" tabindex="-1"><a class="header-anchor" href="#cpu-100"><span>CPU 100%</span></a></h3><p>当服务器 CPU 或内存突然飙升 100% 时，依次排除当前运行进程，检查是否安装更新了插件、应用或服务。</p><p>如果找不到原因，可以临时设置定期任务。每隔 3 小时重启一次 nginx/apache。有时重启不正常，因此重启命令后 10 秒，再启动一次 nginx/apache。</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>/etc/init.d/nginx restart\n<span class="token function">sleep</span> 10s\n/etc/init.d/nginx start\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="ssl-证书" tabindex="-1"><a class="header-anchor" href="#ssl-证书"><span>SSL 证书</span></a></h3><p>如果 SSL 证书部署报错，可以按自动生成来部署。</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token comment">#证书设置修改 /www/server/panel/vhost/nginx</span>\n<span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token variable">$server_port</span> <span class="token operator">!</span>~ <span class="token number">443</span><span class="token punctuation">)</span><span class="token punctuation">{</span>\n    rewrite ^<span class="token punctuation">(</span>.*<span class="token punctuation">)</span> <span class="token operator">&lt;</span>https://www.xxx.com<span class="token variable">$1</span><span class="token operator">&gt;</span> permanent<span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n<span class="token comment">#证书修改</span>\n/www/server/panel/vhost/cert/\n<span class="token comment">#证书位置</span>\n/www/server/panel/vhost/ssl\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果同一网站部署了多个域名，并且都需要部署 SSL，则需要在 <code>/www/server/panel/vhost/cert</code> 目录下为每个域名创建独立的证书文件夹。同时，在网站的配置文件中创建两个独立的<code>server</code>配置，确保它们之间有换行。请注意，宝塔面板中的网站配置在重启 Nginx 后有时会被重置，所以请务必进行检查和确认配置的正确性。<sup class="footnote-ref"><a href="#footnote3">[3]</a><a class="footnote-anchor" id="footnote-ref3"></a></sup></p><h3 id="cors-跨域" tabindex="-1"><a class="header-anchor" href="#cors-跨域"><span>CORS 跨域</span></a></h3><p>POST 表单等操作需要涉及第三方 API，需要添加扩域域名，避免 CORS 报错。</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>    add_header Access-Control-Allow-Origin <span class="token string">&quot;*&quot;</span><span class="token punctuation">;</span>\n    add_header Access-Control-Allow-Credentials <span class="token string">&quot;true&quot;</span><span class="token punctuation">;</span>\n    add_header Access-Control-Allow-Methods <span class="token string">&quot;GET, POST, OPTIONS&quot;</span><span class="token punctuation">;</span>\n    add_header Access-Control-Allow-Headers <span class="token string">&quot;DNT,web-token,app-token,Authorization,Accept,Origin,Keep-Alive,User-Agent,X-Mx-ReqToken,X-Data-Type,X-Auth-Token,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range&quot;</span><span class="token punctuation">;</span>\n    add_header Access-Control-Expose-Headers <span class="token string">&quot;Content-Length,Content-Range&quot;</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="piwik-手动升级" tabindex="-1"><a class="header-anchor" href="#piwik-手动升级"><span>piwik 手动升级</span></a></h3><p>Matomo/Piwik 是免费的统计服务。有时无法使用自动安装包，需要手动升级。</p><ol><li>下载最新版应用，并解压到服务器。</li><li>将原目录中的 config/config.ini.php 粘贴到新版中，然后就可以更新数据库进行升级了。</li><li>选择「设置」&gt;「系统」&gt;「地理位置」，拖到页面底部，按页面要求下载 DBIP 包，并重命名保存为 <code>/www/wwwroot/piwik/misc/DBIP-City.mmdb</code>。</li></ol><hr class="footnotes-sep">',16),R={class:"footnotes"},D={class:"footnotes-list"},E={id:"footnote1",class:"footnote-item"},z={href:"https://nodejs.org/zh-cn/download/package-manager#debian-and-ubuntu-based-linux-distributions-enterprise-linux-fedora-and-snap-packages",target:"_blank",rel:"noopener noreferrer"},H=(0,s.Lk)("a",{href:"#footnote-ref1",class:"footnote-backref"},"↩︎",-1),V={id:"footnote2",class:"footnote-item"},$={href:"https://www.w3cschool.cn/nginxsysc/nginxsysc-rewrite.html",target:"_blank",rel:"noopener noreferrer"},M=(0,s.Lk)("a",{href:"#footnote-ref2",class:"footnote-backref"},"↩︎",-1),X={id:"footnote3",class:"footnote-item"},U={href:"https://cloud.tencent.com/developer/article/2220049?areaSource=102001.7&traceId=SwSyuKeYOHVCQ_bcIFnkh",target:"_blank",rel:"noopener noreferrer"},B=(0,s.Lk)("a",{href:"#footnote-ref3",class:"footnote-backref"},"↩︎",-1),G={},K=(0,a(3671).A)(G,[["render",function(n,e){const a=(0,s.g2)("ExternalLinkIcon");return(0,s.uX)(),(0,s.CE)("div",null,[l,t,i,(0,s.Lk)("p",null,[(0,s.eW)("通过集成了 npm 的 "),(0,s.Lk)("a",o,[(0,s.eW)("Node.js"),(0,s.bF)(a)]),(0,s.eW)(" 来安装 npm，然后执行 npm i 命令安装其他。")]),p,(0,s.Lk)("p",null,[(0,s.Lk)("a",r,[(0,s.eW)("网站重定向"),(0,s.bF)(a)])]),c,(0,s.Lk)("ol",null,[(0,s.Lk)("li",null,[(0,s.Lk)("p",null,[(0,s.eW)("安装"),(0,s.Lk)("a",d,[(0,s.eW)("宝塔面板"),(0,s.bF)(a)]),(0,s.eW)("。")])]),u,(0,s.Lk)("li",null,[(0,s.Lk)("p",null,[(0,s.eW)("配置"),(0,s.Lk)("a",m,[(0,s.eW)("阿里云端口开放"),(0,s.bF)(a)]),(0,s.eW)("，导入安全规则。")])]),k,(0,s.Lk)("li",null,[(0,s.Lk)("p",null,[(0,s.eW)("服务器设置参考 "),(0,s.Lk)("a",h,[(0,s.eW)("NginxConfig"),(0,s.bF)(a)]),(0,s.eW)(" 适合新手配置高性能、安全、稳定的 NGINX 服务器的最简单方法。")])]),(0,s.Lk)("li",null,[(0,s.Lk)("p",null,[(0,s.Lk)("a",v,[(0,s.eW)("ECS 宝塔设置优化"),(0,s.bF)(a)]),(0,s.eW)("：")]),b]),g]),f,(0,s.Lk)("ol",null,[w,(0,s.Lk)("li",null,[(0,s.eW)("用"),(0,s.Lk)("a",L,[(0,s.eW)("服务器迁移中心 SMC"),(0,s.bF)(a)]),(0,s.eW)(" 将旧服务器同步到临时服务器。")]),x,y,S]),W,_,C,(0,s.Lk)("ol",null,[(0,s.Lk)("li",null,[(0,s.eW)("进入 "),(0,s.Lk)("a",P,[(0,s.eW)("iconfont‑webfont"),(0,s.bF)(a)]),(0,s.eW)("，输入导航栏内所有文字，并设置所需字体。")]),j,F,N]),T,q,(0,s.Lk)("ul",null,[(0,s.Lk)("li",null,[(0,s.eW)("后台忘记密码，使用 "),(0,s.Lk)("a",A,[(0,s.eW)("Metinfo 米拓重置工具"),(0,s.bF)(a)]),(0,s.eW)("。")]),O]),I,(0,s.Lk)("section",R,[(0,s.Lk)("ol",D,[(0,s.Lk)("li",E,[(0,s.Lk)("p",null,[(0,s.Lk)("a",z,[(0,s.eW)("通过包管理器方式安装 Node.js"),(0,s.bF)(a)]),(0,s.eW)(),H])]),(0,s.Lk)("li",V,[(0,s.Lk)("p",null,[(0,s.Lk)("a",$,[(0,s.eW)("Nginx rewrite 设置"),(0,s.bF)(a)]),(0,s.eW)(),M])]),(0,s.Lk)("li",X,[(0,s.Lk)("p",null,[(0,s.Lk)("a",U,[(0,s.eW)("针对宝塔面板一个站点多个域名使用 SSL 证书的解决方案"),(0,s.bF)(a)]),(0,s.eW)(),B])])])])])}]]),Z=JSON.parse('{"path":"/deploy/VPS.html","title":"服务器 VPS","lang":"zh-CN","frontmatter":{"article":false,"title":"服务器 VPS","icon":"IO","order":3,"description":"环境部署 部署应用前，为服务器配置好包管理工具，以便节省部署时间。主流的前端包管理工具有 npm、yarn、pnpm、以及国内的镜像 cnpm、tyarn 等，这些包管理器都是基于 nodejs。 包管理安装 通过集成了 npm 的 Node.js 来安装 npm，然后执行 npm i 命令安装其他。 全局安装 yarn 是 npm i yarn -g...","head":[["meta",{"property":"og:url","content":"https://newzone.top/deploy/VPS.html"}],["meta",{"property":"og:site_name","content":"LearnData-开源笔记"}],["meta",{"property":"og:title","content":"服务器 VPS"}],["meta",{"property":"og:description","content":"环境部署 部署应用前，为服务器配置好包管理工具，以便节省部署时间。主流的前端包管理工具有 npm、yarn、pnpm、以及国内的镜像 cnpm、tyarn 等，这些包管理器都是基于 nodejs。 包管理安装 通过集成了 npm 的 Node.js 来安装 npm，然后执行 npm i 命令安装其他。 全局安装 yarn 是 npm i yarn -g..."}],["meta",{"property":"og:type","content":"website"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-03-08T11:40:14.000Z"}],["meta",{"property":"article:author","content":"LearnData"}],["meta",{"property":"article:modified_time","content":"2024-03-08T11:40:14.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"WebPage\\",\\"name\\":\\"服务器 VPS\\",\\"description\\":\\"环境部署 部署应用前，为服务器配置好包管理工具，以便节省部署时间。主流的前端包管理工具有 npm、yarn、pnpm、以及国内的镜像 cnpm、tyarn 等，这些包管理器都是基于 nodejs。 包管理安装 通过集成了 npm 的 Node.js 来安装 npm，然后执行 npm i 命令安装其他。 全局安装 yarn 是 npm i yarn -g...\\"}"]]},"headers":[{"level":2,"title":"环境部署","slug":"环境部署","link":"#环境部署","children":[{"level":3,"title":"包管理安装","slug":"包管理安装","link":"#包管理安装","children":[]},{"level":3,"title":"包管理源","slug":"包管理源","link":"#包管理源","children":[]},{"level":3,"title":"部署包","slug":"部署包","link":"#部署包","children":[]},{"level":3,"title":"本地测试","slug":"本地测试","link":"#本地测试","children":[]}]},{"level":2,"title":"服务器 ECS","slug":"服务器-ecs","link":"#服务器-ecs","children":[{"level":3,"title":"网站重定向","slug":"网站重定向","link":"#网站重定向","children":[]},{"level":3,"title":"全新安装服务器","slug":"全新安装服务器","link":"#全新安装服务器","children":[]},{"level":3,"title":"服务器迁移","slug":"服务器迁移","link":"#服务器迁移","children":[]}]},{"level":2,"title":"网站设计","slug":"网站设计","link":"#网站设计","children":[{"level":3,"title":"网站字体","slug":"网站字体","link":"#网站字体","children":[]},{"level":3,"title":"米拓","slug":"米拓","link":"#米拓","children":[]}]},{"level":2,"title":"常见问题","slug":"常见问题","link":"#常见问题","children":[{"level":3,"title":"CPU 100%","slug":"cpu-100","link":"#cpu-100","children":[]},{"level":3,"title":"SSL 证书","slug":"ssl-证书","link":"#ssl-证书","children":[]},{"level":3,"title":"CORS 跨域","slug":"cors-跨域","link":"#cors-跨域","children":[]},{"level":3,"title":"piwik 手动升级","slug":"piwik-手动升级","link":"#piwik-手动升级","children":[]}]}],"git":{"createdTime":1709898014000,"updatedTime":1709898014000,"contributors":[{"name":"EkkoSonya","email":"101685001+EkkoSonya@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":6.49,"words":1946},"filePathRelative":"deploy/VPS.md","localizedDate":"2024年3月8日","excerpt":"<h2>环境部署</h2>\\n<p>部署应用前，为服务器配置好包管理工具，以便节省部署时间。主流的前端包管理工具有 npm、yarn、pnpm、以及国内的镜像 cnpm、tyarn 等，这些包管理器都是基于 nodejs。</p>\\n<h3>包管理安装</h3>\\n<p>通过集成了 npm 的 <a href=\\"https://nodejs.org/en/download/\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">Node.js</a> 来安装 npm，然后执行 npm i 命令安装其他。</p>\\n<p>全局安装 yarn 是 <code>npm i yarn -g</code>，pnpm 是 <code>npm i pnpm -g</code>。如果不想全局安装，则去除 <code>-g</code>。</p>","autoDesc":true}')}}]);