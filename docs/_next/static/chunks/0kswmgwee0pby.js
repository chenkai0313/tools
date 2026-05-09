(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,38792,e=>{"use strict";let t={zh:{nav:{home:"首页",articles:"文章",tools:"工具",time:"时间转换",json:"JSON 工具",base64:"Base64 图片",password:"密码生成",cron:"Cron 表达式",case:"命名转换",qrcode:"二维码生成",crypto:"加解密",hash:"哈希计算",encoding:"编码转换",regex:"正则表达式",config:"配置文件格式转化"},home:{hotArticles:"🔥 热点文章",categories:{frontend:"前端开发",devops:"运维监控",tools:"站长工具",security:"安全相关"},siteIntro:"ken 站长工具是一个面向开发者和站长的在线工具集合。所有工具均在前端浏览器中本地运行，数据不会上传至任何服务器。平台目前提供时间戳转换、JSON 格式化与校验、Base64 图片转换、密码生成、Cron 表达式解析、命名格式转换、二维码生成、哈希计算、编码转换、正则表达式测试、配置文件格式转换、AES/DES/RSA 加解密等 12 个工具，覆盖日常开发、运维部署、安全加密等常见场景。",whyUs:{title:"为什么选择我们",points:[{title:"数据本地处理，保护隐私",desc:"所有计算在浏览器内完成，无需后端服务。数据不会离开你的设备，适合处理代码、配置、密钥等敏感信息。"},{title:"完全免费，无需注册",desc:"所有工具免费使用，无调用次数限制，无需注册或登录。即开即用，无需任何配置和安装。"},{title:"专注开发者体验",desc:"命令行风格界面，响应式设计支持桌面和移动端。支持双击复制结果、实时预览等效率细节。"}]},toolCategories:{title:"工具分类",dev:{title:"开发辅助",desc:"JSON 格式化与校验、正则表达式测试、命名格式转换、编码转换，覆盖日常编码与调试需求。"},security:{title:"安全加密",desc:"哈希计算、AES/DES/RSA 加解密、密码生成器，满足数据加密和密码管理需求。"},convert:{title:"格式转换",desc:"时间戳与日期互转、Base64 与图片互转、YAML/TOML/JSON 配置文件格式互转。"},utility:{title:"实用工具",desc:"二维码生成、Cron 表达式解析，解决日常开发中的零散需求。"}},scenarios:{title:"使用场景",items:[{title:"Web 开发",desc:"接口联调时快速格式化 JSON、编写正则匹配规则、转换命名格式与 URL 编码，提升日常开发调试效率。"},{title:"运维部署",desc:"时间戳与日期互转、Cron 表达式解析、不同配置文件格式互转，简化服务器和部署流程中的操作。"},{title:"安全需求",desc:"在本地计算文件与字符串的哈希值、使用 AES/RSA 加密敏感配置、生成高强度随机密码，保护数据安全。"}]},popularTools:"热门工具推荐"},article:{title:"全部文章",category:"分类",sort:"排序",latest:"最新",popular:"最热",readMore:"阅读更多",prev:"上一篇",next:"下一篇",minRead:"分钟阅读",allCategories:"全部分类"},tool:{placeholder:"功能开发中，敬请期待...",input:"输入",output:"结果",copy:"复制",copied:"已复制",clear:"清空",uppercase:"大写",flags:{g:"全局匹配",i:"忽略大小写",m:"多行模式",s:"点号匹配换行",u:"Unicode 模式",y:"粘性匹配"}},footer:{copyright:"© 2025 站长工具",desc:"为站长和开发者提供实用的在线工具",friends:"友情链接",friendDesc:"免费在线简历生成工具",contactTitle:"联系我们",contactDesc:"有任何建议或想法？发邮件告诉我，我会及时更新开发！"},common:{breadcrumb:{home:"首页",articles:"文章",tools:"工具"}}},en:{nav:{home:"Home",articles:"Articles",tools:"Tools",time:"Time Converter",json:"JSON Tools",base64:"Base64 Image",password:"Password Generator",cron:"Cron Expression",case:"Case Converter",qrcode:"QR Code",crypto:"Encrypt/Decrypt",hash:"Hash",encoding:"Encoding",regex:"Regex Tester",config:"Config Convert"},home:{hotArticles:"🔥 Hot Articles",categories:{frontend:"Frontend",devops:"DevOps",tools:"Webmaster Tools",security:"Security"},siteIntro:"Ken Webmaster Tools is a free online toolset for developers and webmasters. All tools run entirely in the browser — no backend server, no data upload. Currently offering 12 tools including timestamp conversion, JSON formatting & validation, Base64 image conversion, password generation, Cron expression parsing, case conversion, QR code generation, hash calculation, encoding conversion, regex testing, config format conversion, and AES/DES/RSA encryption/decryption. Covers everyday scenarios in development, deployment, and security.",whyUs:{title:"Why Choose Us",points:[{title:"Client-Side Processing, Privacy First",desc:"All computation happens in your browser. Your data never leaves your device — safe for handling code, configs, and sensitive keys."},{title:"Completely Free, No Sign-Up",desc:"All tools are free with no usage limits. No registration, no login, no configuration required. Just open and use."},{title:"Built for Developer Experience",desc:"Clean terminal-inspired UI, responsive design for desktop and mobile. Double-click to copy results, real-time preview, and more."}]},toolCategories:{title:"Tool Categories",dev:{title:"Development",desc:"JSON formatting & validation, regex testing, case conversion, encoding conversion — essential tools for daily coding."},security:{title:"Security & Encryption",desc:"Hash calculation, AES/DES/RSA encryption, password generator — for data protection and password management."},convert:{title:"Format Conversion",desc:"Timestamp & date conversion, Base64 & image conversion, YAML/TOML/JSON config format conversion."},utility:{title:"Utilities",desc:"QR code generation, Cron expression parsing — handy tools for everyday needs."}},scenarios:{title:"Use Scenarios",items:[{title:"Web Development",desc:"Quickly format JSON during API integration, write and test regex patterns, convert naming conventions and URL encoding."},{title:"DevOps & Deployment",desc:"Convert timestamps to readable dates, parse Cron expressions, transform config files between YAML, TOML, and JSON."},{title:"Security Needs",desc:"Compute hashes for files and strings locally, encrypt sensitive configs with AES/RSA, generate strong random passwords."}]},popularTools:"Popular Tools"},article:{title:"All Articles",category:"Category",sort:"Sort",latest:"Latest",popular:"Popular",readMore:"Read More",prev:"Previous",next:"Next",minRead:"min read",allCategories:"All Categories"},tool:{placeholder:"Tool functionality coming soon...",input:"Input",output:"Result",copy:"Copy",copied:"Copied!",clear:"Clear",uppercase:"Uppercase",flags:{g:"Global match",i:"Case insensitive",m:"Multiline mode",s:"Dot matches newline",u:"Unicode mode",y:"Sticky mode"}},footer:{copyright:"© 2025 Webmaster Tools",desc:"Practical online tools for webmasters and developers",friends:"Friends",friendDesc:"Free Online Resume Builder",contactTitle:"Contact",contactDesc:"Have suggestions or ideas? Email us and I'll build them!"},common:{breadcrumb:{home:"Home",articles:"Articles",tools:"Tools"}}}};e.s(["getDictionary",0,function(e){return t[e]??t.zh}],38792)},9325,e=>{"use strict";var t=e.i(15722),s=e.i(17862),o=e.i(6862),a=e.i(79317);function r({article:e,locale:o}){return(0,t.jsx)(s.default,{href:`/${o}/articles/${e.slug}`,className:"group block rounded-xl border border-white/[0.06] bg-white/[0.03] p-5 transition-all hover:bg-white/[0.06] hover:border-indigo-500/30 hover:shadow-[0_0_24px_rgba(99,102,241,0.1)]",children:(0,t.jsx)("div",{className:"flex items-start justify-between gap-3",children:(0,t.jsxs)("div",{className:"flex-1 min-w-0",children:[(0,t.jsxs)("div",{className:"flex items-center gap-2 mb-2",children:[(0,t.jsx)("span",{className:"inline-flex items-center rounded-md bg-indigo-500/10 px-2 py-0.5 text-xs font-medium text-indigo-300",children:e.category}),e.hot&&(0,t.jsx)("span",{className:"inline-flex items-center rounded-md bg-pink-500/10 px-2 py-0.5 text-xs font-medium text-pink-300",children:"HOT"})]}),(0,t.jsx)("h3",{className:"text-base font-semibold text-dark-50 group-hover:text-indigo-300 transition-colors line-clamp-1",children:e.title}),(0,t.jsx)("p",{className:"mt-1 text-sm text-dark-300 line-clamp-2",children:e.description}),(0,t.jsxs)("div",{className:"mt-3 flex items-center gap-3 text-xs text-dark-400",children:[(0,t.jsx)("span",{children:e.date}),(0,t.jsx)("span",{children:"·"}),(0,t.jsxs)("span",{children:[e.readTime," ","zh"===o?"分钟阅读":"min read"]})]})]})})})}var i=e.i(38792);let n=[{key:"frontend",label:{zh:"前端开发",en:"Frontend"}},{key:"devops",label:{zh:"运维监控",en:"DevOps"}},{key:"security",label:{zh:"安全相关",en:"Security"}},{key:"ai",label:{zh:"AI 相关",en:"AI"}},{key:"news",label:{zh:"热点文章",en:"Hot News"}}],c=[{slug:"json-format-guide",title:"什么是 JSON？如何格式化 JSON",description:"JSON 基础语法详解，常见错误避坑指南，多种编程语言的 JSON 格式化方法。",category:"前端开发",categoryKey:"frontend",date:"2026-04-23",readTime:4,hot:!0,content:`## 什么是 JSON？

JSON（JavaScript Object Notation）是一种轻量级的数据交换格式。它基于 JavaScript 语法，但独立于语言——几乎所有编程语言都支持 JSON 的解析和生成。

JSON 的核心优势在于可读性强、结构简单，目前已经成为 API 接口通信、配置文件存储的事实标准。

## JSON 的基本结构

JSON 只有两种结构：

**键值对集合（对象）**：用花括号 \`{}\` 包裹，键是字符串，值可以是任意类型。

\`\`\`json
{"name": "Ken", "age": 30, "active": true}
\`\`\`

**有序值列表（数组）**：用方括号 \`[]\` 包裹，值可以是任意类型。

\`\`\`json
["apple", "banana", "cherry"]
\`\`\`

## JSON 支持的数据类型

JSON 一共支持 6 种数据类型：

- **字符串**：双引号包裹，如 \`"hello"\`
- **数字**：整数或浮点数，如 \`42\`、\`3.14\`
- **布尔值**：\`true\` 或 \`false\`
- **null**：表示空值
- **对象**：键值对集合
- **数组**：有序值列表

JSON 的语法限制比较严格：
- 键必须用双引号（不支持单引号或无引号）
- 字符串必须用双引号
- 不支持注释
- 最后一个元素后面不能有逗号

## 常见错误

写 JSON 时最容易犯的几个错误：

### 1. 末尾逗号

\`\`\`json
{"a": 1, "b": 2,}  // 错误
{"a": 1, "b": 2}   // 正确
\`\`\`

### 2. 键没有用双引号

\`\`\`json
{name: "Ken"}  // 错误
{"name": "Ken"}  // 正确
\`\`\`

### 3. 使用单引号

\`\`\`json
{'name': 'Ken'}  // 错误
{"name": "Ken"}  // 正确
\`\`\`

### 4. 注释

JSON 不支持注释。如果你需要注释，可以考虑使用 YAML 或 JSONC（带注释的 JSON 变体）。

## 如何格式化 JSON

格式化 JSON 的核心目标就是让结构清晰可读。主要做两件事：
1. **缩进**：每层嵌套缩进 2 个空格（或 4 个）
2. **换行**：每个键值对单独一行

格式化前：

\`\`\`json
{"name":"Ken","scores":[98,87,92],"address":{"city":"Beijing","zip":"100000"}}
\`\`\`

格式化后：

\`\`\`json
{
  "name": "Ken",
  "scores": [
    98,
    87,
    92
  ],
  "address": {
    "city": "Beijing",
    "zip": "100000"
  }
}
\`\`\`

绝大多数编程语言的标准库都提供了 JSON 格式化功能：

**JavaScript：**

\`\`\`javascript
const formatted = JSON.stringify(obj, null, 2)
\`\`\`

**Python：**

\`\`\`python
import json
formatted = json.dumps(obj, indent=2)
\`\`\`

**Go：**

\`\`\`go
import "encoding/json"
data, _ := json.MarshalIndent(obj, "", "  ")
\`\`\`

## JSON 的用途

JSON 最常见的几个使用场景：

### API 数据交换

RESTful API 几乎全部使用 JSON 作为数据格式。前端向后端发请求、后端返回数据，基本都是 JSON。

### 配置文件

很多现代工具和框架使用 JSON 做配置，如 VS Code 的 \`settings.json\`、\`package.json\`、TypeScript 的 \`tsconfig.json\`。

### 数据存储

一些 NoSQL 数据库（如 MongoDB）直接使用 JSON-like 格式存储数据。

## 总结

JSON 简单、通用、跨语言，是开发者必须掌握的数据格式。理解它的语法规则和使用场景，能让你在日常开发中更高效地处理数据。配合格式化工具使用，可以显著提升调试体验。`},{slug:"base64-encoding-guide",title:"Base64 编码原理及使用场景",description:"Base64 编码的工作原理、为什么体积会增加 33%、在前端开发中的常见用途。",category:"前端开发",categoryKey:"frontend",date:"2026-04-24",readTime:4,hot:!0,content:`## 什么是 Base64？

Base64 是一种将二进制数据转换成可打印字符的编码方式。它用 64 个可打印字符（A-Z、a-z、0-9、+、/）来表示任意二进制数据，等号 \`=\` 用作填充。

Base64 不是加密算法，不是压缩算法——它只是一种编码方式。编码后的数据体积会比原始数据增加约 33%。

## Base64 编码原理

### 转换过程

1. 将每 3 个字节（24 bit）作为一组
2. 将这 24 bit 分成 4 个 6 bit 的组
3. 每个 6 bit 的值（0-63）映射到 Base64 字符表
4. 如果最后一组不足 3 字节，用 \`=\` 填充

### 示例

把字符串 \`Man\` 编码成 Base64：

\`\`\`
M 的 ASCII 值: 77  →  01001101
a 的 ASCII 值: 97  →  01100001
n 的 ASCII 值: 110 →  01101110

合并 24 bit:  01001101 01100001 01101110
分成 4 组 6 bit:  010011 010110 000101 101110
对应的 Base64 字符:  T  W  F  u

结果: "TWFu"
\`\`\`

### 为什么体积会增加 33%？

3 个字节（24 bit）编码成 4 个 Base64 字符，每个字符在传输中占 1 字节，编码后变成了 4 字节。比例 4:3，即增加了 1/3。

## Base64 的使用场景

### 在 HTML/CSS 中嵌入图片

把小图片（图标、小素材）转成 Base64，直接嵌入 HTML 或 CSS，减少 HTTP 请求数：

\`\`\`html
<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA..." />
\`\`\`

\`\`\`css
.logo {
  background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0i...");
}
\`\`\`

适合小于 10KB 的图片。大图片不建议用 Base64，体积膨胀和编码开销会影响页面性能。

### JWT（JSON Web Token）

JWT 的三个部分（header、payload、signature）都是用 Base64 编码的：

\`\`\`
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIn0.dozjgNryP4J3jVmNHl0w5N_XgL0n3I9PlFUP0THsR8U
\`\`\`

对中间部分解码后可以看到 JSON 格式的内容。

### URL-safe Base64

标准 Base64 包含 \`+\` 和 \`/\`，在 URL 中需要转义。URL-safe Base64 做了两处修改：
- \`+\` 换成 \`-\`
- \`/\` 换成 \`_\`
- 去掉末尾的 \`=\`

### 在 JSON 中嵌入二进制数据

某些文本协议不支持二进制数据，可以用 Base64 编码后在 JSON 中传输：

\`\`\`json
{
  "filename": "photo.jpg",
  "data": "/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAA..."
}
\`\`\`

## 注意事项

- Base64 编码后体积增加约 33%，不适合编码大文件
- Base64 不是加密，不要用它来保护敏感数据
- URL-safe Base64 和标准 Base64 不能混用，需要根据场景选择
- Data URL 格式：\`data:[MIME];base64,[data]\`

## 总结

Base64 是一个非常实用的编码方案，理解其原理能帮助你在合适场景下正确使用。本站的 Base64 工具支持图片与 Base64 互转，也可以直接生成图片的 Data URL。`},{slug:"cron-expression-guide",title:"Cron 表达式详解（附示例）",description:"Cron 表达式语法详解，5位/6位/7位格式区别，常用定时任务表达式对照表，实际编程中的应用示例。",category:"运维监控",categoryKey:"devops",date:"2026-04-25",readTime:5,content:`## 什么是 Cron 表达式？

Cron 表达式是一个字符串，用来定义任务在什么时间执行。它广泛用于 Linux 系统的定时任务、CI/CD 流水线、云函数调度等场景。

## 标准 Cron 格式

标准 Cron 表达式包含 5 个字段：

\`\`\`
* * * * *
| | | | |
| | | | +---- 星期 (0-7, 0 和 7 都表示周日)
| | | +------ 月份 (1-12)
| | +-------- 日期 (1-31)
| +---------- 小时 (0-23)
+------------ 分钟 (0-59)
\`\`\`

每个字段可以使用的特殊字符：

- \`*\`：所有值（如 \`*\` 在小时字段表示每小时）
- \`,\`：枚举多个值（如 \`1,3,5\`）
- \`-\`：范围（如 \`1-5\` 表示 1 到 5）
- \`/\`：步长（如 \`*/5\` 表示每 5 个单位）

## 示例解读

- \`30 8 * * *\` — 每天早上 8:30
- \`0 9 * * 1-5\` — 每个工作日早 9:00
- \`*/15 * * * *\` — 每 15 分钟
- \`0 0 1 * *\` — 每月 1 号凌晨 0 点
- \`0 2 * * 0\` — 每周日凌晨 2 点

## 常用 Cron 表达式

- \`0 0 * * *\` — 每小时整点
- \`0 */2 * * *\` — 每 2 小时
- \`0 9 * * *\` — 每天早上 9 点
- \`0 9,18 * * *\` — 每天 9 点和 18 点
- \`0 0 * * 0\` — 每周日凌晨
- \`0 0 1 * *\` — 每月 1 号
- \`0 0 1 1 *\` — 每年 1 月 1 号
- \`*/5 * * * *\` — 每 5 分钟
- \`0 8-18 * * *\` — 每天 8 点到 18 点每小时
- \`30 4 * * 1\` — 每周一凌晨 4:30

## 扩展格式：6 位和 7 位

有些系统使用 6 位或 7 位格式，在最前面增加了秒或年。

6 位（带秒）：

\`\`\`
0 */5 * * * *   每 5 秒
\`\`\`

7 位（带秒和年）：

\`\`\`
0 0 9 * * * 2026   2026 年每天早 9 点
\`\`\`

## 实际应用场景

### Linux Crontab

\`\`\`bash
# 每天凌晨 3 点备份数据库
0 3 * * * /usr/bin/mysqldump -u root mydb > /backup/mydb.sql

# 每周日清理日志
0 0 * * 0 rm -rf /var/log/app/*.log

# 每 10 分钟检查服务状态
*/10 * * * * /usr/local/bin/health-check.sh
\`\`\`

### Node.js (node-cron)

\`\`\`javascript
const cron = require('node-cron')

cron.schedule('0 9 * * *', () => {
  console.log('每天早上 9 点执行')
})

cron.schedule('*/30 * * * *', () => {
  console.log('每 30 分钟执行')
})
\`\`\`

### GitHub Actions

\`\`\`yaml
on:
  schedule:
    - cron: '0 2 * * *'  # 每天凌晨 2 点运行
\`\`\`

## 容易踩的坑

1. **时区问题**：Cron 默认使用系统时区，跨时区服务器需要注意时区转换
2. **分钟字段不能省略 \`0\`**：\`* * * * *\` 是每分钟执行，不是每小时
3. **星期和日期同时设置**：同时指定日期和星期时，满足任意一个就会执行，这可能导致预期之外的执行频率
4. **夏令时**：部分系统在夏令时切换时可能出现跳过或重复执行的情况

## 总结

Cron 表达式是定时任务的核心工具，语法简单但功能强大。掌握基本格式和常用模式可以覆盖绝大多数调度需求。记不住的时候，使用在线 Cron 解析工具可以快速验证表达式是否正确。`},{slug:"ip-address-guide",title:"IP 地址基础知识（IPv4/IPv6）",description:"IPv4 地址结构、IPv6 格式与简写规则、私有地址段、CIDR 子网划分入门。",category:"运维监控",categoryKey:"devops",date:"2026-04-26",readTime:5,content:`## 什么是 IP 地址？

IP 地址（Internet Protocol Address）是网络中设备的标识符。就像现实世界中的门牌号，数据包通过 IP 地址找到目标设备。

目前有两个版本在使用：IPv4 和 IPv6。

## IPv4

### 格式

IPv4 地址是 32 位的二进制数，通常用点分十进制表示：

\`\`\`
192.168.1.1
\`\`\`

每 8 位（1 字节）转成十进制，用点隔开。范围从 \`0.0.0.0\` 到 \`255.255.255.255\`。

### 私有 IP 地址段

以下地址段用于内网，不会在互联网上路由：

- **10.0.0.0/8**：\`10.0.0.0\` ~ \`10.255.255.255\`，大型企业内部网络
- **172.16.0.0/12**：\`172.16.0.0\` ~ \`172.31.255.255\`，中型网络
- **192.168.0.0/16**：\`192.168.0.0\` ~ \`192.168.255.255\`，家庭和小型办公室

### 特殊地址

- **127.0.0.1**：回环地址（localhost），指向本机
- **0.0.0.0**：表示所有网络接口
- **255.255.255.255**：广播地址

## IPv6

### 为什么需要 IPv6？

IPv4 只有约 43 亿个地址。到 2019 年，全球 IPv4 地址已经耗尽。IPv6 使用 128 位地址，数量是 2^128，几乎取之不尽。

### 格式

IPv6 地址是 128 位的十六进制数，用冒号分成 8 组，每组 16 位：

\`\`\`
2001:0db8:85a3:0000:0000:8a2e:0370:7334
\`\`\`

### 简化规则

IPv6 地址可以大幅简写。

**规则 1：去掉每组前导的 0**

\`\`\`
2001:0db8:85a3:0000:0000:8a2e:0370:7334
→ 2001:db8:85a3:0:0:8a2e:370:7334
\`\`\`

**规则 2：连续的 0 组可以用 \`::\` 代替（只能出现一次）**

\`\`\`
2001:db8:85a3:0:0:8a2e:370:7334
→ 2001:db8:85a3::8a2e:370:7334
\`\`\`

\`::\` 代表若干组全 0，自动推断缺了多少组。

### IPv6 地址类型

- **单播（Unicast）**：一对一的通信
- **多播（Multicast）**：一对多通信
- **任播（Anycast）**：发送给最近的目标

### 特殊地址

- \`::1\` — IPv6 回环地址（相当于 IPv4 的 \`127.0.0.1\`）
- \`::\` — 未指定地址
- \`fe80::/10\` — 链路本地地址

## CIDR 表示法

CIDR（Classless Inter-Domain Routing）用 \`/\` 表示网络前缀的长度：

\`\`\`
192.168.1.0/24
\`\`\`

\`/24\` 表示前 24 位是网络部分，后 8 位是主机部分。子网掩码是 \`255.255.255.0\`，包含 254 个可用地址。

常见前缀长度：
- \`/8\` → 子网掩码 \`255.0.0.0\` → 约 1677 万个地址
- \`/16\` → 子网掩码 \`255.255.0.0\` → 约 6.5 万个地址
- \`/24\` → 子网掩码 \`255.255.255.0\` → 254 个地址
- \`/32\` → 子网掩码 \`255.255.255.255\` → 1 个地址

计算可用地址的公式：2^(32 - 前缀长度) - 2（减去网络地址和广播地址）。

## 如何查看 IP 地址

\`\`\`bash
# Linux / macOS
ip addr          # 查看所有网络接口（Linux）
ifconfig         # 查看所有网络接口（macOS / 旧 Linux）

# 查看公网 IP
curl ifconfig.me
curl ip.sb

# Windows
ipconfig
\`\`\`

## 总结

IP 地址是网络通信的基础。理解 IPv4 与 IPv6 的区别、CIDR 表示法以及常见地址段，能帮助你在配置服务器、设置防火墙规则、排查网络问题时更加得心应手。`},{slug:"encryption-algorithm-guide",title:"常见加密算法（MD5/SHA/AES）区别",description:"MD5、SHA、AES 三种算法的本质区别，哈希和加密的不同之处，各自的实际使用场景。",category:"安全相关",categoryKey:"security",date:"2026-04-27",readTime:4,content:`## 概述

日常开发中经常会遇到 MD5、SHA、AES 这些名字，但它们用途完全不同。简单来说：MD5 和 SHA 是哈希算法，AES 是加密算法。哈希是单向的，加密是可逆的。

## MD5

### 是什么

MD5（Message Digest Algorithm 5）是一个 128 位的哈希算法，输出 32 个十六进制字符。诞生于 1991 年，曾经是最流行的哈希算法之一。

### 特点

- 输出固定 128 bit（32 个十六进制字符）
- 计算速度快
- **已不再安全**——2004 年被证明存在碰撞攻击，2008 年已被攻破

### 实际用途

- **文件完整性校验**：非安全性场景的快速校验
- **数据库哈希键**：一致性哈希
- **旧系统兼容**：遗留系统维护

### 安全建议

不要再将 MD5 用于密码存储、数字签名、证书验证等安全场景。如果只是需要快速校验文件完整性，MD5 仍然可用。

## SHA 家族

SHA（Secure Hash Algorithm）由美国国家安全局设计，是目前使用最广泛的哈希算法族。

### SHA-1

- 输出 160 bit（40 个十六进制字符）
- 2017 年 Google 展示了 SHAttered 碰撞攻击
- 已不再推荐使用

### SHA-2

SHA-2 是当前推荐使用的哈希算法，包含多个输出长度：

- **SHA-224**：224 bit，兼容性场景
- **SHA-256**：256 bit，最常用，证书签名、文件校验
- **SHA-384**：384 bit，更高安全性
- **SHA-512**：512 bit，最高安全性

SHA-256 是当前最推荐的哈希算法。Git 用它来标识提交（commit hash），HTTPS 证书签名也在使用。

### SHA-3

2015 年发布的最新 SHA 标准，基于 Keccak 算法。与 SHA-2 完全不同，安全性更高。目前尚未大规模普及，但作为备用方案存在。

### 使用示例

\`\`\`bash
# Linux 计算文件哈希
md5sum file.txt
sha256sum file.txt
sha512sum file.txt
\`\`\`

\`\`\`javascript
// JavaScript (Web Crypto API)
const hash = await crypto.subtle.digest('SHA-256', data)
\`\`\`

\`\`\`go
// Go
import "crypto/sha256"
hash := sha256.Sum256(data)
\`\`\`

## AES

### 是什么

AES（Advanced Encryption Standard）是一种对称加密算法，加密和解密使用同一个密钥。2001 年被 NIST 采纳为联邦标准。

### 密钥长度

- **AES-128**：128 bit 密钥，加密 10 轮
- **AES-192**：192 bit 密钥，加密 12 轮
- **AES-256**：256 bit 密钥，加密 14 轮

密钥越长越安全，但性能也越慢。AES-256 是目前最常用的选择。

### 加密模式

- **ECB**：最简单，不安全，不推荐
- **CBC**：最常用，需要 IV（初始化向量）
- **GCM**：认证加密模式，同时保证机密性和完整性，推荐使用
- **CTR**：计数器模式，支持并行计算

### 使用场景

- 文件加密
- 数据库字段加密
- VPN 数据传输
- 磁盘加密（BitLocker、FileVault 都使用 AES）

### 使用示例

\`\`\`javascript
// Web Crypto API
const key = await crypto.subtle.generateKey(
  { name: 'AES-GCM', length: 256 },
  true,
  ['encrypt', 'decrypt']
)
\`\`\`

## 哈希 vs 加密

**哈希（MD5 / SHA）：**
- 方向：单向，不可逆
- 输出长度：固定长度
- 密钥：不需要
- 用途：完整性校验、数据指纹
- 典型场景：文件校验、密码哈希存储

**加密（AES）：**
- 方向：双向，可解密
- 输出长度：与输入长度相同
- 密钥：需要密钥
- 用途：数据保密
- 典型场景：数据传输加密、文件加密

## RSA 非对称加密

除了 AES 这类对称加密，还有 RSA 这类非对称加密。RSA 使用公钥加密、私钥解密，解决了密钥分发的问题。但 RSA 速度比 AES 慢很多，通常只用来加密少量数据（如 AES 密钥），实际数据用 AES 加密。

## 总结

- **MD5**：已不安全，只在非安全场景使用
- **SHA-256**：当前推荐的哈希算法，日常开发首选
- **AES-256-GCM**：推荐使用的对称加密方案
- **RSA**：适合密钥交换和数字签名
- 哈希不是加密，加密不是哈希，两者不能相互替代

本站的哈希计算工具支持 MD5、SHA-1、SHA-256、SHA-384、SHA-512，加解密工具支持 AES、DES、RSA，可以在线验证和测试这些算法。`},{slug:"docker-install-ubuntu",title:"Ubuntu 安装 Docker 和 Docker Compose",description:"Ubuntu 上安装 Docker 和 Docker Compose 的步骤，区分国内和国外网络环境，附带代理配置说明。",category:"运维监控",categoryKey:"devops",date:"2026-04-28",readTime:5,hot:!0,content:`Ubuntu 装 Docker 最省事的方式是用官方源，系统自带 apt 仓库里的 docker.io 版本太老，不推荐。

## 卸载旧版本

之前装过 Docker 的话先清理：

\`\`\`bash
sudo apt remove docker docker-engine docker.io containerd runc
\`\`\`

## 安装依赖

\`\`\`bash
sudo apt update
sudo apt install ca-certificates curl gnupg lsb-release
\`\`\`

## 添加 Docker 官方源

添加 GPG 密钥和 apt 源，这里分两种情况。

### 国外服务器（可以直接访问 docker.com）

\`\`\`bash
sudo mkdir -p /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg

echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
\`\`\`

### 国内服务器（用清华镜像源）

\`\`\`bash
sudo mkdir -p /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg

echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://mirrors.tuna.tsinghua.edu.cn/docker-ce/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
\`\`\`

## 安装 Docker

\`\`\`bash
sudo apt update
sudo apt install docker-ce docker-ce-cli containerd.io docker-compose-plugin
\`\`\`

验证：

\`\`\`bash
sudo docker run hello-world
\`\`\`

## 非 root 用户执行 docker（可选）

每次加 sudo 比较麻烦，把当前用户加到 docker 组：

\`\`\`bash
sudo usermod -aG docker $USER
newgrp docker
\`\`\`

## 配置镜像加速器

国内拉 Docker Hub 镜像很慢，建议配置 mirrors。编辑 /etc/docker/daemon.json：

\`\`\`json
{
  "registry-mirrors": [
    "https://docker.mirrors.ustc.edu.cn",
    "https://hub-mirror.c.163.com",
    "https://mirror.baidubce.com"
  ]
}
\`\`\`

重启：

\`\`\`bash
sudo systemctl daemon-reload
sudo systemctl restart docker
\`\`\`

确认生效：

\`\`\`bash
docker info | grep -A 5 "Registry Mirrors"
\`\`\`

## 配置 HTTP 代理

如果 Docker 需要通过代理拉镜像，可以在 daemon.json 中配置。编辑 /etc/docker/daemon.json（和镜像加速器配在一起）：

\`\`\`json
{
  "registry-mirrors": [
    "https://docker.mirrors.ustc.edu.cn",
    "https://hub-mirror.c.163.com",
    "https://mirror.baidubce.com"
  ],
  "proxies": {
    "http-proxy": "http://127.0.0.1:7890",
    "https-proxy": "http://127.0.0.1:7890",
    "no-proxy": "localhost,127.0.0.1,.local"
  }
}
\`\`\`

端口根据你的代理软件设置，Clash 默认 7890。

重启 Docker：

\`\`\`bash
sudo systemctl restart docker
\`\`\`

确认：

\`\`\`bash
docker info | grep -i proxy
\`\`\`

## Docker Compose

新版 Docker 已经把 Compose 作为插件集成进来了，上面安装 docker-compose-plugin 后直接使用：

\`\`\`bash
docker compose version
\`\`\`

如果要手动安装独立版本：

\`\`\`bash
DOCKER_CONFIG=\${DOCKER_CONFIG:-$HOME/.docker}
mkdir -p $DOCKER_CONFIG/cli-plugins
curl -SL "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o $DOCKER_CONFIG/cli-plugins/docker-compose
chmod +x $DOCKER_CONFIG/cli-plugins/docker-compose
\`\`\`

国内服务器 curl GitHub 可能超时，可以加代理下载：

\`\`\`bash
export http_proxy=http://127.0.0.1:7890
export https_proxy=http://127.0.0.1:7890
\`\`\`

验证：

\`\`\`bash
docker compose version
\`\`\``},{slug:"k3s-cluster-setup",title:"Ubuntu 搭建 K3s 集群",description:"从零开始部署 K3s 集群，包含系统初始化、Docker 配置、NFS 存储。",category:"运维监控",categoryKey:"devops",date:"2026-04-29",readTime:8,hot:!0,content:`记录一下 Ubuntu 上搭 K3s 集群的步骤。三台机器，一个 master 两个 node，带 NFS 存储。

## 系统初始化（所有节点都要做）

### 关闭防火墙

\`\`\`bash
systemctl stop firewalld
systemctl disable firewalld
\`\`\`

### 关闭 SELinux

\`\`\`bash
# 临时
setenforce 0
# 永久
sed -i 's/enforcing/disabled/' /etc/selinux/config
\`\`\`

### 关闭交换分区

\`\`\`bash
# 临时
swapoff -a
# 永久
sed -ri 's/.*swap.*/#&/' /etc/fstab
\`\`\`

## 安装 Docker（所有节点装同一版本）

\`\`\`bash
sudo apt update
sudo apt upgrade -y
sudo apt install -y apt-transport-https ca-certificates curl software-properties-common gnupg lsb-release
\`\`\`

添加 Docker 官方源：

\`\`\`bash
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt update
\`\`\`

安装 Docker：

\`\`\`bash
sudo apt install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
docker version
docker compose version
\`\`\`

## 配置 Docker

编辑 /etc/docker/daemon.json：

\`\`\`json
{
  "storage-driver": "overlay2",
  "storage-opts": ["overlay2.override_kernel_check=true"],
  "log-opts": {
    "max-size": "100m",
    "max-file": "3"
  }
}
\`\`\`

重启 Docker：

\`\`\`bash
sudo systemctl restart docker
\`\`\`

## 配置 hosts（三台机器都要配）

\`\`\`bash
cat >> /etc/hosts <<EOF
192.168.0.146 k8s-master
192.168.0.172 k8s-node1
192.168.0.193 k8s-node2
EOF
\`\`\`

IP 换成你实际的。

## 安装 K3s Master

\`\`\`bash
hostnamectl set-hostname master
\`\`\`

--tls-san 填你的公网 IP 和内网 IP，不然证书会报错：

\`\`\`bash
curl -sfL https://get.k3s.io | sh -s - server \
  --cluster-init \
  --tls-san 8.219.59.132 \
  --tls-san 172.21.128.220
\`\`\`

安装完后查看节点 token 和 kubeconfig：

\`\`\`bash
cat /var/lib/rancher/k3s/server/node-token
cat /etc/rancher/k3s/k3s.yaml
\`\`\`

配 kubeconfig：

\`\`\`bash
mkdir -p ~/.kube
sudo cp /etc/rancher/k3s/k3s.yaml ~/.kube/config
sudo chown $(id -u):$(id -g) ~/.kube/config
\`\`\`

## 加入 Worker 节点

每个 node 上执行，替换 MASTER_IP 和 TOKEN：

\`\`\`bash
hostnamectl set-hostname node-1
\`\`\`

\`\`\`bash
curl -sfL https://get.k3s.io | K3S_URL=https://172.24.199.171:6443 K3S_TOKEN=K103014e2ca5d99f1aeea880fafacd2e099df65861cf949afe0569026974328cb63::server:290c5798ebabf10dd395b0ed4962fdcc sh -
\`\`\`

## 安装 Helm

\`\`\`bash
curl https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3 | bash
\`\`\`

## 配置 NFS 存储

### 服务端（master 节点）

\`\`\`bash
apt install -y nfs-kernel-server
mkdir -p /opt/nfsstore/boex
chown nobody:nogroup /opt/nfsstore/boex
\`\`\`

编辑 /etc/exports：

\`\`\`
/opt/nfsstore/boex 172.21.128.0/24(rw,sync,no_subtree_check,no_root_squash)
\`\`\`

启动服务：

\`\`\`bash
systemctl restart nfs-server
systemctl enable nfs-server
systemctl enable rpcbind
showmount -e
\`\`\`

### 客户端（node 节点）

\`\`\`bash
apt install -y nfs-common
\`\`\`

## kubectl 别名（可选）

\`\`\`bash
kq() {
    kubectl -n boex-system "$@"
}
\`\`\`

加到 ~/.bashrc 里永久生效。`},{slug:"deepseek-intro-guide",title:"DeepSeek AI 介绍与使用指南",description:"DeepSeek 是什么？有哪些核心功能？如何通过网页、API 和本地部署使用 DeepSeek？一文讲透。",category:"AI 相关",categoryKey:"ai",date:"2026-05-02",readTime:5,hot:!0,content:`## DeepSeek 是什么？

DeepSeek（深度求索）是一家专注于人工智能研究的中国公司，由幻方量化创立。其开发的 DeepSeek AI 模型系列在自然语言处理、代码生成、数学推理等领域表现出色，尤其以超高的性价比和开源策略在 AI 社区引起广泛关注。

## DeepSeek 的发展历程

DeepSeek 从 2023 年开始陆续发布多个模型版本：

- **DeepSeek LLM**：首个开源模型，奠定了技术基础
- **DeepSeek-V2**：引入 MoE（混合专家）架构，大幅提升效率
- **DeepSeek-V3**：671B 参数的强大模型，性能达到开源顶尖水平
- **DeepSeek-R1**：首个开源推理模型，在数学和逻辑推理上媲美 OpenAI o1

## DeepSeek 的核心特点

### 开源策略

DeepSeek 坚持开源，模型的权重和技术报告公开可查。这意味着开发者可以在本地部署、微调和二次开发，不受 API 限制，也不用担心数据隐私问题。

### 超高性价比

DeepSeek API 的价格远低于同类产品。以 DeepSeek-V3 为例，其 API 调用成本仅为 GPT-4 的几十分之一。对于需要大量调用 AI 的场景来说，这是非常显著的成本优势。

### 强大的代码能力

DeepSeek 在编程任务上表现优异，支持 Python、JavaScript、Go、Rust、Java 等多种编程语言，能够完成代码生成、调试、重构等任务。在 HumanEval 等编程基准测试中成绩靠前。

### 长上下文支持

DeepSeek 支持 128K 的上下文长度，可以处理整本书籍或大型代码库的内容。这个特性在文档分析、代码审查、长文本处理等需要大量上下文的任务中非常有优势。

## 如何使用 DeepSeek

### 方式一：网页版

访问 DeepSeek 官网（chat.deepseek.com）即可直接使用网页版对话。界面简洁，支持文件上传（图片、PDF、Word、Excel 等）和联网搜索功能，无需任何配置即可上手。

### 方式二：API 调用

DeepSeek 提供兼容 OpenAI 格式的 API，可以无缝替换现有的 OpenAI 集成。只需要修改 base_url 和 api_key 即可：

\`\`\`python
from openai import OpenAI

client = OpenAI(
    api_key="your-deepseek-api-key",
    base_url="https://api.deepseek.com"
)

response = client.chat.completions.create(
    model="deepseek-chat",
    messages=[
        {"role": "user", "content": "用 Python 写一个快速排序算法"}
    ]
)
print(response.choices[0].message.content)
\`\`\`

### 方式三：本地部署

借助 Ollama、vLLM 等工具，可以在本地 GPU 上运行 DeepSeek 的蒸馏版本。这对于数据安全和隐私要求高的企业场景非常重要。

## DeepSeek 的局限性

- 部分复杂推理任务上仍与 GPT-4 和 Claude 有一定差距
- 虽然中文表现出色，但英文内容的精细度偶尔不如原生英文模型
- 本地部署蒸馏版本对硬件仍有较高要求
- 联网搜索功能的实时性和准确度有待进一步提升

## 总结

DeepSeek 是目前最值得关注的中国 AI 模型之一。其开源策略、低廉的价格和扎实的性能，使其成为开发者在选择 AI 助手时的重要选项。无论你是通过网页版快速体验，还是通过 API 集成到自己的应用中，DeepSeek 都能提供出色的体验。`},{slug:"typeless-ai-writing-guide",title:"用了 Typeless 一个月，我彻底离不开它了",description:"一个深度用户的真实体验：Typeless 如何改变我的写作习惯，AI 辅助写作的终极形态可能就是这个样子。",category:"AI 相关",categoryKey:"ai",date:"2026-05-09",readTime:6,hot:!0,content:`## 我承认，一开始我是拒绝的

先坦白一件事：我其实是个挺抗拒 AI 写作的人。

之前试过 ChatGPT 写文章，每次看着它吐出来的那些四平八稳、毫无灵魂的文字，我就觉得——这不对。文字应该是活的，应该有作者的气息在里面。AI 写的东西，怎么说呢，就像方便面，闻着香，吃多了总觉得少了点烟火气。

所以当朋友跟我推荐 Typeless 的时候，我第一反应是：又是一个 ChatGPT 套壳吧？

但朋友说了一句让我动摇了的话："你试试，它不替你写，它帮你写。"

"帮你写"和"替你写"，这区别我 get 到了。于是我抱着"大不了删掉"的心态，下载了 Typeless。

结果，真香了。

## 什么是 Typeless？它跟其他 AI 工具有什么不一样？

简单来说，Typeless 是一个把 AI 揉进写作每一个环节的笔记工具。但它不像 ChatGPT 那样给你一个对话框让你输入 prompt，然后吐一大段文字给你。Typeless 的思路完全不同——它在你写作的过程中默默待命，你需要的时候它出现，不需要的时候它绝不打扰。

我自己的理解是：ChatGPT 是代驾，Typeless 是副驾。代驾替你开车，你全程只能看；副驾在旁边帮你看着路况、递瓶水、偶尔提醒你"这个地方是不是该转弯了"，但方向盘始终在你手里。

这个区别真的太重要了。

## 功能一：心流模式——让你沉浸的"秘密通道"

我写作最大的敌人是什么？不是写不出来，是打断。

写着写着突然想查个资料，切出去；发现一个词不太对，打开浏览器搜同义词，切出去；写完一段想润色一下，复制粘贴到 ChatGPT，切出去——等再回来的时候，刚才的思路已经凉了半截。

Typeless 的心流模式解决的就是这个问题。它把所有你可能需要做的事——查资料、改措辞、翻译、扩写——都集成在编辑器里面，用一个快捷键就呼出来。

我的真实感受是：第一次用这个功能的时候，我连续写了两个小时没停。真的，两个小时。从大学写博客到现在，我从来没有连续写作超过四十分钟不跑神的。

### 怎么用？

真的简单到爆炸。你在写文章的时候，遇到以下几种情况：

1. **卡壳了写不下去**：直接按 \`Cmd+K\`，选择"续写"，AI 会根据你前面写的内容帮你接下去。注意，是"接"，不是"从头写"——它读了你前面写的风格，尽量模仿你的语气。
2. **觉得某段写得不够好**：选中那段文字，按 \`Cmd+K\`，选"改写"。你可以选"更专业"、"更轻松"、"更简洁"等风格。
3. **突然想到一个相关的话题**：按 \`Cmd+K\`，选"展开"，AI 会基于当前内容扩展出相关的要点。

整个过程你不需要离开编辑器，不需要切到浏览器，不需要复制粘贴。文字就在那里，你的思路也不会断。

## 功能二：AI 续写——不是帮你写，是推你一把

这个功能我必须详细说说，因为它彻底治好了我"开头恐惧症"。

我写文章有个毛病：标题想好了，开头第一段要纠结半小时。总觉得第一句必须惊艳，必须把读者勾住，于是一遍遍删了写、写了删。

用了 Typeless 之后，我的做法是：

直接写一个糙得不能再糙的开头，比如：

> 今天聊一个工具，挺好用的。

然后选中这句话，按 \`Cmd+K\`，选"续写"。Typeless 会给出几个不同方向的续写建议：

> 版本一：其实之前有人跟我推荐过，我当时没当回事，后来因为一个偶然的机会试了试，结果彻底改观了。
>
> 版本二：说实话我一开始是拒绝的，但用了一个月之后，我想说——真香。
>
> 版本三：这不是一篇广告，纯粹是一个深度用户的真实感受分享。

看到第三个的时候我笑了——对，就是这个调调。选一个，继续往下写。那种对着空白页面发怵的感觉，消失了。

### 一些小技巧

不是 AI 给什么你就用什么。我的习惯是：

- 让 AI 给 2-3 个版本
- 选一个最接近我想法的做基础
- 然后用我自己的话改一遍

这样出来的东西，既有 AI 帮忙"推一把"的效率，又有我自己语言风格的灵魂。说白了，AI 是帮我热身的，正式上场还得是我自己。

## 功能三：自动知识关联——原来我写过这么多东西

Typeless 有一个很神奇的功能：它会自动分析你所有笔记的内容，然后建立关联。

我用了两周之后，某天打开 Typeless 的"知识图谱"视图，发现它把我三个月前写的一篇 Docker 笔记和现在正在写的 K8s 文章关联了起来。我点开一看，还真的，那篇 Docker 笔记里有几个观点可以直接引用到现在的文章里。

说实话，这件事如果 AI 不提醒我，我自己都忘了写过那篇笔记了。

Typeless 的关联不是简单的关键词匹配——它真的是语义层面的理解。比如我写了一篇关于"写作效率"的文章，它不会因为我提到了"sublime text"就把我所有提到"text"的笔记都关联上。它会准确判断哪些是真的相关的。

这种"被自己的知识库提醒"的感觉，很奇妙，有点像几年前写的自己给现在的自己递小纸条。

## 功能四：模板库——从零开始的恐惧它帮你治

我平时写技术博客、项目文档、周报、会议记录，每一类的开头方式都不一样。

以前每次都要想：技术博客的格式是啥来着？项目文档的开头要写什么？版本信息放在哪？

Typeless 的模板库把这个痛苦彻底解决了。它内置了几十种模板，覆盖了我能想到的所有写作场景：

- 技术博客模板：自动生成 frontmatter、目录结构、代码块格式
- 项目提案模板：背景、目标、方案、时间线，结构清晰
- 会议记录模板：参会人、议题、结论、待办事项
- 学习笔记模板：知识点、示例、思考、关联

### 我是怎么用模板的

比如说写周报，我直接选"周报模板"，它会自动生成一个结构：

> ## 本周完成
> （这里填写）
>
> ## 遇到的问题
> （这里填写）
>
> ## 下周计划
> （这里填写）

你只需要往里填内容就行。结构不用想，格式不用调，直接写。省下来的精力，拿来思考真正有价值的事情。

## 谈谈收费

Typeless 的价格说实话不算便宜，但我觉得物有所值。

免费版能用大部分核心功能，但 AI 调用次数有限制。我用了两周免费版之后，果断升级了付费版。原因是：它帮我省下来的时间，远超我付出去的钱。

算笔账：以前写一篇 2000 字的文章，从构思到完稿大概要 3-4 个小时。现在用 Typeless，同样的文章 1.5-2 小时能搞定。假设我一周写 3 篇文章，一周省下 6 个小时。一个月就是 24 个小时——整整三天的工作时间。

时间就是钱，这个道理不用我多说。

## 谁适合用 Typeless？

说实话，不是所有人都需要 Typeless。

如果你是那种一年写不了几篇文章的人，用免费的 ChatGPT 偶尔救救急就够了。但如果你是——

- 经常写技术博客的开发者
- 需要写周报、月报、项目文档的职场人
- 有做知识管理习惯的学习者
- 或者任何需要高频写作的人

那我强烈推荐你试试 Typeless。

## 最后说几句真心话

我写这篇文章，没有收 Typeless 一分钱，纯粹是一个用户的真实分享。

我见过太多 AI 工具，它们都很强，但总觉得缺了点什么。后来我想明白了——缺的是对人的尊重。有些 AI 工具恨不得替你完成所有事，你只要按一个按钮就好。这种设计看似方便，其实在剥夺你创作的乐趣。

Typeless 不一样。它始终把你放在驾驶座上，自己甘愿当副驾。它懂什么时候该说话，什么时候该闭嘴。它帮你解决写作中那些琐碎的、重复的、没有创造力的部分，让你可以专注于真正重要的事——表达你的想法。

如果你也想找回那种"一口气写完一篇文章"的畅快感，去试试 Typeless 吧。用一周，如果觉得不合适，删掉就好。

但如果它让你也"真香"了——记得回来告诉我。`},{slug:"obsidian-note-taking-guide",title:"用了两年 Obsidian，我再也回不去别的笔记软件了",description:"一个 Obsidian 重度用户的真实体验：为什么本地优先、纯 Markdown 的笔记方式让我彻底放弃了 Notion 和 Evernote。",category:"AI 相关",categoryKey:"ai",date:"2026-05-09",readTime:8,hot:!0,content:`## 起因：我厌倦了"笔记搬家"

作为一个喜欢折腾的人，我用过的笔记软件两只手数不过来。

最早是 Evernote，印象笔记刚出那会儿我就开始用了，攒了上千条笔记。然后是 Notion，被它的数据库和看板功能吸引，花了一个周末把 Evernote 的数据全部迁移过去。再后来是 Bear、Craft、Roam Research……每换一次就要折腾一次数据迁移，每次迁移都会丢失一些格式、乱掉一些链接。

直到 2024 年初，一个朋友跟我说："你用一下 Obsidian 吧，这次不用再搬家了。"

我不信。你 Obsidian 凭什么特殊？

用了两年之后，我想对两年前的自己说——他真没骗我。

## 为什么 Obsidian 能终结"笔记搬家"？

核心原因其实就一句话：你的笔记是纯文本 Markdown 文件，存在你的电脑上。

这意味着什么？

- Obsidian 倒闭了，你的笔记还在——随便一个文本编辑器就能打开
- 你想换工具了，直接复制文件夹走人，根本不叫"迁移"
- 你可以用 Git 管理你的笔记，版本控制、多人协作、自动备份，随便来
- iCloud、Dropbox、Syncthing——你想用什么同步用什么，不受 Obsidian 限制

我前两天还在跟自己感叹：那种"这家公司会不会倒闭啊""要不要趁还能导出赶紧备份"的焦虑感，彻底没有了。

## 核心功能一：双向链接——笔记不再是孤岛

Obsidian 最核心的功能就是双向链接。乍一听好像没什么特别的——现在哪个笔记软件没有双向链接？但 Obsidian 是最早把这件事做透的，而且直到今天它做得最好。

### 怎么用？

超级简单。你在写笔记的时候，只要打两个方括号：

\`\`\`markdown
今天研究了一下 [[Docker 网络模式]]，发现和 [[Kubernetes 网络模型]]有很多相似之处。
\`\`\`

然后 Obsidian 会自动做两件事：

1. 你在"Docker 网络模式"这篇笔记里，能看到一个"反向链接"面板，告诉你"Obsidian 使用指南"引用了这里
2. 你在图谱视图里，能看到两个节点之间多了一条连线

看起来微不足道的功能，坚持用半年之后，效果就出来了。你的笔记不再是一个个孤立文件，而是一张越织越密的知识网。

### 我的实际体验

上个月我在写一篇关于 API 网关的文章，在 Obsidian 里搜索"网关"，结果搜出来十几篇相关笔记——其中有几篇是我一年前写的，我自己都忘了写过。

双击打开一看：里面有个架构图的想法，正好可以引用到现在的文章里。

那一刻的感觉很奇妙。像是过去的自己给现在的自己送了一份礼物。没有双向链接的话，那篇笔记就会在文件夹里永远吃灰，再也不会被翻出来。

## 核心功能二：图谱视图——看到你的知识宇宙

图谱视图（Graph View）是 Obsidian 最标志性的功能，也是每次我给别人安利时一定会展示的功能。

打开图谱视图，你会看到一个由节点和线条组成的网络。每个节点是一篇笔记，每条线是两个笔记之间的引用关系。

说实话这个功能刚出来的时候我觉得只是个花架子——好看，但有什么用？

但用久了你会发现它的真正价值：

1. **发现孤岛笔记**：图谱里那些没有任何连线的孤立节点，就是被你遗忘的笔记。要么给它建立关联，要么删掉。
2. **发现主题集群**：放大某个区域，你能直观地看到哪些主题是你研究最深的（节点最多、连线最密的地方）。
3. **重新发现关联**：有时候你随意拖动图谱，看到两个看似不相关的主题凑在一起，突然就有了新的灵感。

我的习惯是每周打开图谱看一眼，清理一下孤立节点，看看有哪些笔记可以建立新的关联。这个习惯本身就在帮我不断巩固和扩展知识体系。

## 核心功能三：插件系统——你想要的功能全都有

Obsidian 的插件生态是我见过所有笔记软件里最强悍的，没有之一。社区有上千个插件，基本你能想到的需求都有人实现过。

### 我每天必用的几个插件

**Dataview**：这个插件把 Obsidian 变成了一个数据库。你可以用类似 SQL 的语法查询你的笔记：

\`\`\`dataview
TABLE title, created, status
FROM "projects"
WHERE status = "进行中"
SORT created DESC
\`\`\`

这段代码会自动渲染成一个表格，列出所有 "projects" 文件夹下状态为"进行中"的笔记。听起来可能有点技术向，但一旦用上了就回不去。

**Excalidraw**：在笔记里直接画白板、画架构图、画流程图。画完之后图片直接嵌入笔记，不需要切换到其他工具，不需要截图，不需要上传图床。

**Calendar**：侧边栏显示一个日历，点击任意日期就能跳转到那天的日记。配合 Daily Notes 使用，效果绝佳。

**Obsidian Git**：每隔一段时间自动把笔记提交到 GitHub。免费的版本控制，再也不用担心误删或者改错内容。

### 插件的安装方式

我一开始也觉得"装插件好麻烦"，但实际操作起来真的很简单：

1. 打开设置 → 社区插件 → 关闭安全模式
2. 点击"浏览"，搜索你要的插件
3. 点击安装并启用

全程不需要接触命令行，不需要写配置文件，像装手机 App 一样简单。

## 核心功能四：Daily Notes + 渐进式总结

这是我最想推荐的工作流，也是我觉得 Obsidian 最能提升生产力的地方。

### 我是这样用的

每天早上打开 Obsidian，按 \`Cmd+N\` 创建今天的日记。日记模板是这样：

\`\`\`markdown
# {{date}}

## 今天要做什么

## 学到了什么

## 有意思的想法

## 待跟进
\`\`\`

白天随时往里面记。下班前花五分钟回顾一遍，把值得保留的内容提炼到永久笔记中。

一周下来，日记可能有七八篇。周末回顾的时候：

1. 把有用的知识点从日记复制到正式笔记
2. 在正式笔记中建立链接
3. 给新笔记打上标签

这个流程叫"渐进式总结"，本质上就是"先记录，后整理"。好处是你写日记的时候不需要考虑格式和分类，只管写。整理是之后的事。

我坚持这个习惯一年多了，最大的感受是——再也没有"这个知识点我好像学过但记不清在哪"的感觉了。因为我每篇笔记都有关联、都有来处。

## 谈谈学习曲线

说实话，Obsidian 的学习曲线比 Notion 陡峭。

我刚用第一周的时候，内心 OS 是这样的：

- 这界面也太朴素了吧？
- 插件怎么装？这啥？关闭安全模式？
- 什么是 Dataview？还得学语法？
- Markdown 是什么？我要记语法？

但我坚持了两周之后，慢慢就上手了。然后我发现——我之前觉得"好用"的 Notion，其实处处在替我做决定。Notion 的块编辑器很好用，但它限定了你能做什么、不能做什么。Obsidian 给你的是自由——你想怎么组织笔记就怎么组织，想做啥插件就做啥插件。

这种自由的代价是你要花点时间学习，但回报是巨大的。

我的建议是：

1. **第一周**：只要学会双向链接和 Markdown 基本语法就够了
2. **第一个月**：开始用 Daily Notes 和模板
3. **三个月后**：开始尝试插件，从 Calendar 和 Dataview 入手

不要一上来就装二十个插件，你会被劝退的。Obsidian 的哲学是"慢慢来，比较快"。

## Obsidian + AI

虽然 Obsidian 不是一个 AI 工具，但通过社区插件你可以给它加上 AI 能力。

我现在在用的是 **Copilot 插件**，它直接在 Obsidian 里面接入了 ChatGPT/Claude，你可以选中一段笔记让 AI 帮你总结、改写或者翻译，不需要切到浏览器。

还有一个叫 **Smart Connections** 的插件，它会用 AI 分析你的笔记内容，自动推荐关联笔记——比 Obsidian 自带的反向链接更智能，因为它是语义级别的关联。

这样搭配的好处很明显：你拥有了 Obsidian 的本地优先和数据所有权，同时又能在需要的时候享受 AI 的效率提升。

## 谁适合用 Obsidian？

说实话，不适合所有人。

如果你只想要一个"打开就写、不用动脑子"的笔记软件，Apple Notes 或者 Bear 更适合你。

但如果你符合下面任何一条：

- 你写的东西很多，需要长期管理
- 你在意数据所有权，不想被平台绑定
- 你喜欢折腾，想要一个可以无限定制的工具
- 你是开发者或技术写作者，熟悉 Markdown
- 你有"知识管理"的需求——不只是记笔记，还想把笔记串联起来

那 Obsidian 可能会成为你用过最好的笔记软件。

## 最后说几句

写了这么多，其实就想表达一件事：工具是为你服务的，不应该是你为工具服务。

Evernote 这些年改得越来越臃肿，Notion 什么都想做结果变得很慢，Roam Research 一上来就要收费而且公司体量让人不放心。而 Obsidian，它选择做减法——只做本地文件、纯 Markdown、插件生态。它把选择权完全交给你。

两年了，我的 Obsidian 库里躺了 800 多篇笔记。每次打开看到那些节点和连线，看到自己知识体系的成长，那种踏实感，是以前用任何笔记软件都没有过的。

如果你还没试过 Obsidian，下载一个，用两周试试。刚开始可能觉得丑、觉得不顺手，但坚持一下。

记住：所有好的工具，刚上手时都有点不习惯。`},{slug:"deepseek-coding-tips",title:"DeepSeek 在编程中的应用与实践技巧",description:"如何用 DeepSeek 提升编程效率？代码生成、调试、审查、文档生成等实用技巧汇总。",category:"AI 相关",categoryKey:"ai",date:"2026-05-03",readTime:5,content:`## AI 辅助编程的现状

AI 辅助编程已经从实验阶段进入到日常开发的标配。GitHub Copilot、ChatGPT、Claude 等工具被广泛使用，而 DeepSeek 凭借其强大的代码能力、超长上下文和开源策略，成为越来越多开发者的选择。

## DeepSeek 在编程中的优势

### 1. 深度理解代码逻辑

DeepSeek 不仅能生成代码片段，更能理解完整的代码逻辑结构。对于复杂的算法题、架构设计问题，DeepSeek 能够给出思路清晰、结构完整的解决方案。在处理多文件、多模块的项目时，128K 的上下文窗口可以容纳整个代码库的核心部分。

### 2. 多语言支持

无论是 Python、JavaScript、Go、Rust、Java 还是 C++，DeepSeek 都能熟练处理。在不同语言之间进行代码转换时，DeepSeek 表现得尤其出色。比如把 Python 的算法实现改写成 Go 版本，或者把 JavaScript 代码转成 TypeScript，都能一次性完成。

### 3. 代码审查与调试

将一段有问题的代码粘贴给 DeepSeek，它能够迅速定位 bug 并给出修复建议。对于性能优化，DeepSeek 也能提供有针对性的改进方案，例如指出可以优化的循环、不必要的内存分配等。

### 4. 文档与注释生成

DeepSeek 可以自动为代码生成文档注释、README 文件和 API 文档。支持 Javadoc、GoDoc、TSDoc 等主流文档格式，帮助团队保持代码文档的完整性和一致性。

## 实际使用技巧

### 技巧一：提供充足的上下文

给 DeepSeek 提供足够的上下文信息——包括使用的技术栈、框架版本、代码目录结构——可以得到更准确的回答。不要只贴一段代码，而是简单说明这个代码在项目中的角色和你要解决的问题。

### 技巧二：分步骤提问

复杂任务拆解成多个步骤。先让 DeepSeek 设计整体架构，再逐一实现每个模块。DeepSeek 有 128K 的上下文，可以记住整个对话链路上的所有内容，所以分步骤对话效果很好。

### 技巧三：提供输入输出示例

在写正则表达式、数据转换脚本或 API 集成代码时，提供输入输出的示例可以让 DeepSeek 更准确地理解你的需求。示例比文字描述更精确，能显著减少反复修改的沟通成本。

### 技巧四：迭代优化

对于代码生成任务，先让 DeepSeek 生成一个基础版本，然后逐步提出优化需求。例如先让它实现基本功能，再要求增加错误处理，最后优化性能。DeepSeek 能够基于之前的上下文进行迭代改进，不需要每次都从头开始。

## 注意事项

### 代码安全性

AI 生成的代码可能存在安全漏洞。不要直接在生产环境使用未经审查的 AI 生成代码，特别是涉及 SQL 查询、用户输入处理、加密解密等敏感场景时，必须人工审查。

### 版权合规

AI 训练数据中可能包含开源代码，生成的代码可能带有类似 GPL 等许可证的约束。在商业项目中使用时需要注意合规性，尤其是复制大量生成的代码时。

### 避免过度依赖

AI 辅助编程提高了效率，但也可能导致开发者忽视基础能力的积累。建议将 AI 作为辅助工具来提升效率，而非完全替代学习和深入思考。理解代码为什么能工作，比让 AI 生成能工作的代码更重要。

## 总结

DeepSeek 在编程领域的表现相当出色。无论是日常编码、调试排错还是代码审查，都能提供有效的帮助。合理使用 DeepSeek，可以显著提升开发效率，让开发者将更多精力放在架构设计和业务逻辑上。但要记住，AI 是工具不是替代品，代码质量和安全的责任始终在开发者自己手上。`}];function l({lang:e}){let[s,o]=(0,a.useState)([]),[r,i]=(0,a.useState)(!0),[n,c]=(0,a.useState)(!1),[d,p]=(0,a.useState)(null);return((0,a.useEffect)(()=>{let e=new AbortController;return fetch("https://sitehub.schg.xyz/api/v1/news/list?page=1&page_size=12",{signal:e.signal}).then(e=>e.json()).then(e=>{0===e.code&&e.data?.list&&o(e.data.list),i(!1)}).catch(e=>{"AbortError"!==e.name&&(c(!0),i(!1))}),()=>e.abort()},[]),r)?(0,t.jsx)("div",{className:"grid gap-4 sm:grid-cols-2 lg:grid-cols-3",children:[1,2,3,4,5,6].map(e=>(0,t.jsxs)("div",{className:"animate-pulse rounded-xl border border-white/[0.06] bg-white/[0.03] p-4",children:[(0,t.jsx)("div",{className:"mb-2 h-4 w-3/4 rounded bg-white/[0.06]"}),(0,t.jsx)("div",{className:"mb-3 h-3 w-1/2 rounded bg-white/[0.04]"}),(0,t.jsxs)("div",{className:"space-y-1.5",children:[(0,t.jsx)("div",{className:"h-3 w-full rounded bg-white/[0.04]"}),(0,t.jsx)("div",{className:"h-3 w-5/6 rounded bg-white/[0.04]"})]})]},e))}):n?(0,t.jsx)("div",{className:"flex flex-col items-center justify-center py-16 text-dark-400",children:(0,t.jsx)("p",{className:"text-lg",children:"zh"===e?"资讯加载失败":"Failed to load news"})}):0===s.length?(0,t.jsx)("div",{className:"flex flex-col items-center justify-center py-16 text-dark-400",children:(0,t.jsx)("p",{className:"text-lg",children:"zh"===e?"暂无资讯":"No news available"})}):(0,t.jsx)("div",{className:"space-y-3",children:s.map(e=>{let s=d===e.id;return(0,t.jsxs)("div",{className:"rounded-xl border border-white/[0.06] bg-white/[0.03] overflow-hidden cursor-pointer hover:border-white/[0.12] transition-colors",onClick:()=>{var t;p(d===(t=e.id)?null:t)},children:[(0,t.jsxs)("div",{className:"flex items-start gap-3 p-4",children:[(0,t.jsxs)("div",{className:"min-w-0 flex-1",children:[(0,t.jsx)("h3",{className:`text-sm font-semibold text-dark-50 leading-snug ${s?"":"line-clamp-2"}`,children:e.title}),!s&&(0,t.jsx)("p",{className:"text-xs text-dark-400 mt-1.5 line-clamp-2 leading-relaxed",children:e.content?.replace(/<[^>]+>/g,"").slice(0,120)}),!s&&(0,t.jsxs)("div",{className:"mt-2 flex items-center gap-2 text-[11px] text-dark-500",children:[(0,t.jsx)("span",{children:e.source_name}),(0,t.jsx)("span",{children:"·"}),(0,t.jsx)("span",{children:e.created_at?.slice(0,10)})]})]}),(0,t.jsx)("svg",{className:`mt-1 h-4 w-4 shrink-0 text-dark-500 transition-transform ${s?"rotate-180":""}`,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2,children:(0,t.jsx)("path",{d:"M19 9l-7 7-7-7"})})]}),s&&(0,t.jsxs)("div",{className:"border-t border-white/[0.06] px-4 pb-4 pt-3",children:[(0,t.jsx)("p",{className:"text-sm text-dark-300 leading-relaxed whitespace-pre-wrap",children:e.is_markdown?e.content:e.content?.replace(/<[^>]+>/g,"")}),(0,t.jsxs)("div",{className:"mt-3 flex items-center gap-2 text-[11px] text-dark-500",children:[(0,t.jsx)("span",{children:e.source_name}),(0,t.jsx)("span",{children:"·"}),(0,t.jsx)("span",{children:e.created_at?.slice(0,10)})]})]})]},e.id)})})}function d(){let{lang:e}=(0,o.useParams)(),d=(0,o.useSearchParams)().get("category"),p=(0,i.getDictionary)(e),m=(0,a.useMemo)(()=>d?"news"===d?[]:c.filter(e=>e.categoryKey===d):c,[d]);return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)("h1",{className:"mb-6 text-2xl font-bold text-dark-50",children:p.article.title}),(0,t.jsxs)("div",{className:"mb-6 flex flex-wrap gap-2",children:[(0,t.jsx)(s.default,{href:`/${e}/articles`,className:`rounded-full px-3 py-1.5 text-xs font-medium transition-all ${!d?"bg-indigo-500/20 text-indigo-300 border border-indigo-500/30":"bg-white/[0.04] text-dark-300 border border-white/[0.06] hover:bg-white/[0.08] hover:text-dark-100"}`,children:p.article.allCategories}),n.map(o=>(0,t.jsx)(s.default,{href:`/${e}/articles?category=${o.key}`,className:`rounded-full px-3 py-1.5 text-xs font-medium transition-all ${d===o.key?"bg-indigo-500/20 text-indigo-300 border border-indigo-500/30":"bg-white/[0.04] text-dark-300 border border-white/[0.06] hover:bg-white/[0.08] hover:text-dark-100"}`,children:o.label[e]},o.key))]}),"news"===d?(0,t.jsx)(l,{lang:e}):m.length>0?(0,t.jsx)("div",{className:"grid gap-4 sm:grid-cols-2 lg:grid-cols-3",children:m.map(s=>(0,t.jsx)(r,{article:s,locale:e},s.slug))}):(0,t.jsxs)("div",{className:"flex flex-col items-center justify-center py-16 text-dark-400",children:[(0,t.jsx)("p",{className:"text-lg",children:"zh"===e?"该分类暂无文章":"No articles in this category"}),(0,t.jsx)(s.default,{href:`/${e}/articles`,className:"mt-2 text-sm text-indigo-400 hover:text-indigo-300",children:"zh"===e?"查看全部文章 →":"View all articles →"})]})]})}e.s(["default",0,function(){let{lang:e}=(0,o.useParams)(),r=(0,i.getDictionary)(e);return(0,t.jsxs)("div",{className:"mx-auto max-w-6xl px-4 py-8",children:[(0,t.jsxs)("nav",{className:"mb-6 text-sm text-dark-400",children:[(0,t.jsx)(s.default,{href:`/${e}`,className:"hover:text-dark-200 transition-colors",children:r.common.breadcrumb.home}),(0,t.jsx)("span",{className:"mx-2",children:"›"}),(0,t.jsx)("span",{className:"text-dark-200",children:r.nav.articles})]}),(0,t.jsx)(a.Suspense,{fallback:(0,t.jsx)("div",{className:"text-dark-400 py-8",children:"zh"===e?"加载中...":"Loading..."}),children:(0,t.jsx)(d,{})})]})}],9325)}]);