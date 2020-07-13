-- recommend
CREATE TABLE IF NOT EXISTS recommend (
   id             TEXT PRIMARY KEY NOT NULL,
   commentsCount  INTEGER COMMENT '评论数',
   likeCount      INTEGER COMMENT '点赞数',
   originalUrl    TEXT COMMENT '文章链接',
   content        TEXT COMMENT '文章摘要',
   category       TEXT COMMENT '文章类别',
   tags           TEXT COMMENT '文章标签, 多个用逗号分隔',
   title          TEXT COMMENT '文章标题',
   user           TEXT COMMENT '作者',
   createdAt      TEXT COMMENT '创建时间',
   updatedAt      TEXT COMMENT '修改时间'
);

-- category
CREATE TABLE IF NOT EXISTS category (
   id             TEXT PRIMARY KEY NOT NULL,
   name           TEXT COMMENT '名称'
);

-- tag
CREATE TABLE IF NOT EXISTS tag (
   id             TEXT PRIMARY KEY NOT NULL,
   title          TEXT COMMENT '名称'
);

-- user
CREATE TABLE IF NOT EXISTS user (
   id             TEXT PRIMARY KEY NOT NULL,
   role           TEXT COMMENT '角色',
   avatarLarge    TEXT COMMENT '头像',
   username       TEXT COMMENT '用户名'
);

-- 初始数据
INSERT OR REPLACE INTO category (id, name) VALUES ('5562b415e4b00c57d9b94ac8', '前端');
INSERT OR REPLACE INTO category (id, name) VALUES ('5562b428e4b00c57d9b94b9d', '阅读');
INSERT OR REPLACE INTO category (id, name) VALUES ('5562b405e4b00c57d9b94a41', 'iOS');
INSERT OR REPLACE INTO category (id, name) VALUES ('5562b419e4b00c57d9b94ae2', '后端');

INSERT OR REPLACE INTO tag (id, title) VALUES ('555e9a98e4b00c57d9955f68', 'Vue.js');
INSERT OR REPLACE INTO tag (id, title) VALUES ('55964d83e4b08a686cc6b353', 'JavaScript');
INSERT OR REPLACE INTO tag (id, title) VALUES ('55e7d00800b0c86e8e693ef4', 'HTTP');
INSERT OR REPLACE INTO tag (id, title) VALUES ('5bfcde44f265da3ff4cc84cf', 'HTTP3');
INSERT OR REPLACE INTO tag (id, title) VALUES ('559e7cc0e4b0796c19675383', 'Swift');
INSERT OR REPLACE INTO tag (id, title) VALUES ('5a96291f6fb9a0535b535438', 'Flutter');
INSERT OR REPLACE INTO tag (id, title) VALUES ('57029a6971cfe4005cd12757', '阿里巴巴');
INSERT OR REPLACE INTO tag (id, title) VALUES ('5b6cffe9f265da1b969e30f2', '云原生');

INSERT OR REPLACE INTO user (id, role, avatarLarge, username) VALUES ('57e60c005bbb50005d51d852', 'guest', 'https://user-gold-cdn.xitu.io/2020/7/11/1733c56f84384f0f?w=360&h=364&f=jpeg&s=22881', '前端进击者');
INSERT OR REPLACE INTO user (id, role, avatarLarge, username) VALUES ('5e477d7ce51d4526c550a27d', 'guest', 'https://user-gold-cdn.xitu.io/2020/7/8/1732ee33bc6d7dc6?w=713&h=300&f=jpeg&s=16489', '魔王哪吒');
INSERT OR REPLACE INTO user (id, role, avatarLarge, username) VALUES ('591ea3c32f301e006becc1bc', 'guest', "https://mirror-gold-cdn.xitu.io/168e084cb9e78362b6b", "吕小鸣");
INSERT OR REPLACE INTO user (id, role, avatarLarge, username) VALUES ('5a52075e6fb9a01c9d31b107', 'editor', "https://user-gold-cdn.xitu.io/2019/3/7/16956cee70a4bd79?w=1200&h=1200&f=png&s=140662", "老司机技术周报");
INSERT OR REPLACE INTO user (id, role, avatarLarge, username) VALUES ('5ad01d036fb9a028d444fc82', 'guest', "https://user-gold-cdn.xitu.io/2019/5/17/16ac4dafd827d7b7?w=191&h=191&f=jpeg&s=35551", "阿里巴巴云原生");

INSERT OR REPLACE INTO recommend (id, commentsCount, likeCount, originalUrl, content, category, tags, title, user, createdAt, updatedAt) 
VALUES ('5f0b99c9e51d4534c14db4e7', 45, 308, "https://juejin.im/post/5f0b12296fb9a07eb7358b42", "在前面的文章中，小编为大家带来了许多Vue 实战技巧，也得到了大家的许多好评。其实在前面那些技巧之外，我们还可以做的更多，让我们的开发流程更流畅，开发体验更好，项目性能更上一层楼，怎么做呢，我们一起来看看。 在我们开发的时候，为了方便调试，我们需要使用源码进行调试，但在生产环境…", "5562b415e4b00c57d9b94ac8", "555e9a98e4b00c57d9955f68,55964d83e4b08a686cc6b353", "我在项目中是这样配置Vue的", "57e60c005bbb50005d51d852", "2020-07-12T23:16:25.114Z", "2020-07-13T08:45:03.025Z");
INSERT OR REPLACE INTO recommend (id, commentsCount, likeCount, originalUrl, content, category, tags, title, user, createdAt, updatedAt) 
VALUES ('5f0bb6d7e51d45346c510566', 145, 248, "https://juejin.im/post/5ee27de06fb9a047f7131eb2", "计算机网络知识，是面试常考的内容，在实际工作中也常常会涉及到。 http0.9只是一个简单的协议，只有一个GET方法，没有首部，目标用来获取HTML。 HTTP1.0协议大量内容：首部，响应码，重定向，错误，条件请求，内容编码等。 因为不足缺陷，就有了http1.1。 http…", "5562b415e4b00c57d9b94ac8", "55e7d00800b0c86e8e693ef4", "14期-连肝7个晚上，总结了计算机网络的知识点！（共66条）", "5e477d7ce51d4526c550a27d", "2020-07-13T02:57:25.075Z", "2020-07-13T08:44:56.402Z");
INSERT OR REPLACE INTO recommend (id, commentsCount, likeCount, originalUrl, content, category, tags, title, user, createdAt, updatedAt) 
VALUES ('5f0bde54f265da22e93e5cd0', 125, 268, "https://juejin.im/post/5f0bb78fe51d4534a711efbf", "HTTP3.0，也称作HTTP over QUIC。核心是QUIC(读音quick)协议，由Google在2015年提出的SPDY v3演化而来的新协议，传统的HTTP协议是基于传输层TCP的协议，而QUIC是基于传输层UDP上的协议，可以定义成：HTTP3.0基于UDP的安全…", "5562b428e4b00c57d9b94b9d", "5bfcde44f265da3ff4cc84cf", "在Nginx中支持HTTP3.0/QUIC", "591ea3c32f301e006becc1bc", "2020-07-13T08:27:00.324Z", "2020-07-13T08:45:02.837Z");
INSERT OR REPLACE INTO recommend (id, commentsCount, likeCount, originalUrl, content, category, tags, title, user, createdAt, updatedAt) 
VALUES ('5f0c124a5188252e98364dfb', 325, 568, "https://juejin.im/post/5f0c12046fb9a07e8f2ee45b", "老司机 iOS 周报，只为你呈现有价值的信息。 你也可以为这个项目出一份力，如果发现有价值的信息、文章、工具等可以到 Issues 里提给我们，我们会尽快处理。记得写上推荐的理由哦。有建议和意见也欢迎到 Issues 提出。 热烈欢迎周报团队的第 33 个编辑 - @JonyF…", "5562b405e4b00c57d9b94a41", "559e7cc0e4b0796c19675383,5a96291f6fb9a0535b535438", "老司机 iOS 周报 #119 | 2020-07.13", "5a52075e6fb9a01c9d31b107", "2020-07-13T07:50:34.817Z", "2020-07-13T08:45:02.774Z");
INSERT OR REPLACE INTO recommend (id, commentsCount, likeCount, originalUrl, content, category, tags, title, user, createdAt, updatedAt) 
VALUES ('5f0c09ac6fb9a07eac066e4c', 365, 268, "https://juejin.im/post/5f0c0936e51d45349b5ca8e8", "毕业时间为 2020 年 11 月- 2021-10 月海内外高校的全日制本科、硕士、博士。 关注开源技术，有开源贡献者优先。 下面跟你说说阿里云那么多团队，为什么你要来云原生团队。 云原生团队诞生了 Apache RocketMQ、Apache Dubbo、Spring Cl…", "5562b419e4b00c57d9b94ae2", "57029a6971cfe4005cd12757,5b6cffe9f265da1b969e30f2", "长话短说，阿里云原生团队招人，急", "5ad01d036fb9a028d444fc82", "2020-07-13T07:13:48.701Z", "2020-07-13T08:44:57.059Z");

