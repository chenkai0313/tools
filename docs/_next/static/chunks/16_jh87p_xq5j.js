(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,38792,e=>{"use strict";let t={zh:{nav:{home:"首页",articles:"文章",tools:"工具",time:"时间转换",json:"JSON 工具",base64:"Base64 图片",password:"密码生成",cron:"Cron 表达式",case:"命名转换",qrcode:"二维码生成",crypto:"加解密",hash:"哈希计算",encoding:"编码转换",regex:"正则表达式",config:"配置文件格式转化",bmi:"BMI 计算","random-data":"随机数据","image-tools":"图片工具","world-clock":"世界时钟","roman-numeral":"罗马数字","number-chinese":"数字转中文","loan-calc":"贷款计算"},home:{hotArticles:"🔥 热点文章",categories:{frontend:"前端开发",devops:"运维监控",tools:"站长工具",security:"安全相关"},siteIntro:"ken 站长工具是一个面向开发者和站长的在线工具集合。所有工具均在前端浏览器中本地运行，数据不会上传至任何服务器。平台目前提供时间戳转换、JSON 格式化与校验、Base64 图片转换、密码生成、Cron 表达式解析、命名格式转换、二维码生成、哈希计算、编码转换、正则表达式测试、配置文件格式转换、AES/DES/RSA 加解密、BMI 计算、随机数据生成、图片压缩裁剪、世界时钟时差、罗马数字转换、数字转中文、贷款计算器等 20 个工具，覆盖日常开发、运维部署、安全加密等常见场景。",whyUs:{title:"为什么选择我们",points:[{title:"数据本地处理，保护隐私",desc:"所有计算在浏览器内完成，无需后端服务。数据不会离开你的设备，适合处理代码、配置、密钥等敏感信息。"},{title:"完全免费，无需注册",desc:"所有工具免费使用，无调用次数限制，无需注册或登录。即开即用，无需任何配置和安装。"},{title:"专注开发者体验",desc:"命令行风格界面，响应式设计支持桌面和移动端。支持双击复制结果、实时预览等效率细节。"}]},toolCategories:{title:"工具分类",dev:{title:"开发辅助",desc:"JSON 格式化与校验、正则表达式测试、命名格式转换、编码转换，覆盖日常编码与调试需求。"},security:{title:"安全加密",desc:"哈希计算、AES/DES/RSA 加解密、密码生成器，满足数据加密和密码管理需求。"},convert:{title:"格式转换",desc:"时间戳与日期互转、Base64 与图片互转、YAML/TOML/JSON 配置文件格式互转。"},utility:{title:"实用工具",desc:"二维码生成、Cron 表达式解析，解决日常开发中的零散需求。"}},scenarios:{title:"使用场景",items:[{title:"Web 开发",desc:"接口联调时快速格式化 JSON、编写正则匹配规则、转换命名格式与 URL 编码，提升日常开发调试效率。"},{title:"运维部署",desc:"时间戳与日期互转、Cron 表达式解析、不同配置文件格式互转，简化服务器和部署流程中的操作。"},{title:"安全需求",desc:"在本地计算文件与字符串的哈希值、使用 AES/RSA 加密敏感配置、生成高强度随机密码，保护数据安全。"}]},popularTools:"热门工具推荐"},article:{title:"全部文章",category:"分类",sort:"排序",latest:"最新",popular:"最热",readMore:"阅读更多",prev:"上一篇",next:"下一篇",minRead:"分钟阅读",allCategories:"全部分类"},tool:{placeholder:"功能开发中，敬请期待...",input:"输入",output:"结果",copy:"复制",copied:"已复制",clear:"清空",uppercase:"大写",flags:{g:"全局匹配",i:"忽略大小写",m:"多行模式",s:"点号匹配换行",u:"Unicode 模式",y:"粘性匹配"}},footer:{copyright:"© 2025 站长工具",desc:"为站长和开发者提供实用的在线工具",friends:"友情链接",friendDesc:"免费在线简历生成工具",contactTitle:"联系我们",contactDesc:"有任何建议或想法？发邮件告诉我，我会及时更新开发！"},common:{breadcrumb:{home:"首页",articles:"文章",tools:"工具"}}},en:{nav:{home:"Home",articles:"Articles",tools:"Tools",time:"Time Converter",json:"JSON Tools",base64:"Base64 Image",password:"Password Generator",cron:"Cron Expression",case:"Case Converter",qrcode:"QR Code",crypto:"Encrypt/Decrypt",hash:"Hash",encoding:"Encoding",regex:"Regex Tester",config:"Config Convert",bmi:"BMI Calculator","random-data":"Random Data","image-tools":"Image Tools","world-clock":"World Clock","roman-numeral":"Roman Numeral","number-chinese":"Number to Chinese","loan-calc":"Loan Calculator"},home:{hotArticles:"🔥 Hot Articles",categories:{frontend:"Frontend",devops:"DevOps",tools:"Webmaster Tools",security:"Security"},siteIntro:"Ken Webmaster Tools is a free online toolset for developers and webmasters. All tools run entirely in the browser — no backend server, no data upload. Currently offering 19 tools including timestamp conversion, JSON formatting & validation, Base64 image conversion, password generation, Cron expression parsing, case conversion, QR code generation, hash calculation, encoding conversion, regex testing, config format conversion, AES/DES/RSA encryption/decryption, BMI calculator, random data generator, image compressor, world clock, Roman numeral converter, number to Chinese converter, and loan calculator. Covers everyday scenarios in development, deployment, and security.",whyUs:{title:"Why Choose Us",points:[{title:"Client-Side Processing, Privacy First",desc:"All computation happens in your browser. Your data never leaves your device — safe for handling code, configs, and sensitive keys."},{title:"Completely Free, No Sign-Up",desc:"All tools are free with no usage limits. No registration, no login, no configuration required. Just open and use."},{title:"Built for Developer Experience",desc:"Clean terminal-inspired UI, responsive design for desktop and mobile. Double-click to copy results, real-time preview, and more."}]},toolCategories:{title:"Tool Categories",dev:{title:"Development",desc:"JSON formatting & validation, regex testing, case conversion, encoding conversion — essential tools for daily coding."},security:{title:"Security & Encryption",desc:"Hash calculation, AES/DES/RSA encryption, password generator — for data protection and password management."},convert:{title:"Format Conversion",desc:"Timestamp & date conversion, Base64 & image conversion, YAML/TOML/JSON config format conversion."},utility:{title:"Utilities",desc:"QR code generation, Cron expression parsing — handy tools for everyday needs."}},scenarios:{title:"Use Scenarios",items:[{title:"Web Development",desc:"Quickly format JSON during API integration, write and test regex patterns, convert naming conventions and URL encoding."},{title:"DevOps & Deployment",desc:"Convert timestamps to readable dates, parse Cron expressions, transform config files between YAML, TOML, and JSON."},{title:"Security Needs",desc:"Compute hashes for files and strings locally, encrypt sensitive configs with AES/RSA, generate strong random passwords."}]},popularTools:"Popular Tools"},article:{title:"All Articles",category:"Category",sort:"Sort",latest:"Latest",popular:"Popular",readMore:"Read More",prev:"Previous",next:"Next",minRead:"min read",allCategories:"All Categories"},tool:{placeholder:"Tool functionality coming soon...",input:"Input",output:"Result",copy:"Copy",copied:"Copied!",clear:"Clear",uppercase:"Uppercase",flags:{g:"Global match",i:"Case insensitive",m:"Multiline mode",s:"Dot matches newline",u:"Unicode mode",y:"Sticky mode"}},footer:{copyright:"© 2025 Webmaster Tools",desc:"Practical online tools for webmasters and developers",friends:"Friends",friendDesc:"Free Online Resume Builder",contactTitle:"Contact",contactDesc:"Have suggestions or ideas? Email us and I'll build them!"},common:{breadcrumb:{home:"Home",articles:"Articles",tools:"Tools"}}}};e.s(["getDictionary",0,function(e){return t[e]??t.zh}],38792)},9325,e=>{"use strict";var t=e.i(15722),o=e.i(17862),s=e.i(6862),a=e.i(79317);function n({article:e,locale:s}){return(0,t.jsx)(o.default,{href:`/${s}/articles/${e.slug}`,className:"group block rounded-xl border border-white/[0.06] bg-white/[0.03] p-5 transition-all hover:bg-white/[0.06] hover:border-indigo-500/30 hover:shadow-[0_0_24px_rgba(99,102,241,0.1)]",children:(0,t.jsx)("div",{className:"flex items-start justify-between gap-3",children:(0,t.jsxs)("div",{className:"flex-1 min-w-0",children:[(0,t.jsxs)("div",{className:"flex items-center gap-2 mb-2",children:[(0,t.jsx)("span",{className:"inline-flex items-center rounded-md bg-indigo-500/10 px-2 py-0.5 text-xs font-medium text-indigo-300",children:e.category}),e.hot&&(0,t.jsx)("span",{className:"inline-flex items-center rounded-md bg-pink-500/10 px-2 py-0.5 text-xs font-medium text-pink-300",children:"HOT"})]}),(0,t.jsx)("h3",{className:"text-base font-semibold text-dark-50 group-hover:text-indigo-300 transition-colors line-clamp-1",children:e.title}),(0,t.jsx)("p",{className:"mt-1 text-sm text-dark-300 line-clamp-2",children:e.description}),(0,t.jsxs)("div",{className:"mt-3 flex items-center gap-3 text-xs text-dark-400",children:[(0,t.jsx)("span",{children:e.date}),(0,t.jsx)("span",{children:"·"}),(0,t.jsxs)("span",{children:[e.readTime," ","zh"===s?"分钟阅读":"min read"]})]})]})})})}var i=e.i(38792);let r=[{key:"frontend",label:{zh:"前端开发",en:"Frontend"}},{key:"devops",label:{zh:"运维监控",en:"DevOps"}},{key:"security",label:{zh:"安全相关",en:"Security"}},{key:"ai",label:{zh:"AI 相关",en:"AI"}},{key:"news",label:{zh:"热点文章",en:"Hot News"}}],l=[{slug:"json-format-guide",title:"What is JSON? How to Format, Validate and Parse JSON Data",description:"Complete guide to JSON format: learn JSON syntax rules, common mistakes to avoid, how to format JSON in JavaScript/Python/Go, and best practices for API development.",category:"Frontend",categoryKey:"frontend",date:"2026-04-23",readTime:4,hot:!0,content:`## What is JSON?

JSON (JavaScript Object Notation) is a lightweight data interchange format. Based on JavaScript syntax but language-independent — almost every programming language supports parsing and generating JSON.

JSON's core strengths are readability and simplicity. It has become the de facto standard for API communication and configuration files.

## JSON Basic Structure

JSON has only two structures:

**Key-value pair collection (object)**: Wrapped in curly braces \`{}\`, keys are strings, values can be any type.

\`\`\`json
{"name": "Ken", "age": 30, "active": true}
\`\`\`

**Ordered value list (array)**: Wrapped in square brackets \`[]\`, values can be any type.

\`\`\`json
["apple", "banana", "cherry"]
\`\`\`

## JSON Data Types

JSON supports 6 data types:

- **String**: Double-quoted, e.g. \`"hello"\`
- **Number**: Integer or float, e.g. \`42\`, \`3.14\`
- **Boolean**: \`true\` or \`false\`
- **null**: Represents empty value
- **Object**: Key-value pair collection
- **Array**: Ordered value list

JSON syntax rules are strict:
- Keys must be double-quoted (no single quotes or unquoted keys)
- Strings must use double quotes
- No comments allowed
- No trailing commas

## Common JSON Errors

### 1. Trailing Commas

\`\`\`json
{"a": 1, "b": 2,}  // Invalid
{"a": 1, "b": 2}   // Valid
\`\`\`

### 2. Unquoted Keys

\`\`\`json
{name: "Ken"}  // Invalid
{"name": "Ken"}  // Valid
\`\`\`

### 3. Single Quotes

\`\`\`json
{'name': 'Ken'}  // Invalid
{"name": "Ken"}  // Valid
\`\`\`

### 4. Comments

JSON does not support comments. If you need comments, consider using YAML or JSONC (JSON with comments).

## How to Format JSON

Formatting JSON makes it readable. Two key operations:
1. **Indentation**: 2 or 4 spaces per nesting level
2. **Line breaks**: Each key-value pair on its own line

Before formatting:

\`\`\`json
{"name":"Ken","scores":[98,87,92],"address":{"city":"Beijing","zip":"100000"}}
\`\`\`

After formatting:

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

**JavaScript:**

\`\`\`javascript
const formatted = JSON.stringify(obj, null, 2)
\`\`\`

**Python:**

\`\`\`python
import json
formatted = json.dumps(obj, indent=2)
\`\`\`

**Go:**

\`\`\`go
import "encoding/json"
data, _ := json.MarshalIndent(obj, "", "  ")
\`\`\`

## JSON Common Use Cases

### API Data Exchange

RESTful APIs almost universally use JSON. Frontend sends requests, backend returns responses — all in JSON format. Understanding JSON parsing is essential for full-stack development.

### Configuration Files

Modern tools use JSON for configuration: VS Code's \`settings.json\`, Node.js \`package.json\`, TypeScript \`tsconfig.json\`.

### Data Storage

NoSQL databases like MongoDB store data in JSON-like format directly.

## Conclusion

JSON is simple, universal, and cross-language — an essential data format for developers. Understanding its syntax rules and use cases helps you handle data more efficiently. Use a JSON formatter tool to validate and beautify your JSON data during development.`},{slug:"base64-encoding-guide",title:"Base64 Encoding Explained: How It Works and When to Use It",description:"Learn how Base64 encoding works, why it increases file size by 33%, and practical use cases like embedding images in HTML, JWT tokens, and URL-safe encoding.",category:"Frontend",categoryKey:"frontend",date:"2026-04-24",readTime:4,hot:!0,content:`## What is Base64 Encoding?

Base64 is a binary-to-text encoding scheme that converts binary data into printable ASCII characters. It uses 64 characters (A-Z, a-z, 0-9, +, /) to represent binary data, with \`=\` used for padding.

Base64 is NOT encryption, NOT compression — it is purely an encoding method. Encoded data is approximately 33% larger than the original.

## How Base64 Encoding Works

### The Conversion Process

1. Take every 3 bytes (24 bits) as a group
2. Split the 24 bits into four 6-bit groups
3. Map each 6-bit value (0-63) to the Base64 character table
4. If the last group has fewer than 3 bytes, pad with \`=\`

### Example

Encoding the string \`Man\` to Base64:

\`\`\`
M ASCII: 77  →  01001101
a ASCII: 97  →  01100001
n ASCII: 110 →  01101110

Combined 24 bits:  01001101 01100001 01101110
Four 6-bit groups:  010011 010110 000101 101110
Base64 characters:  T  W  F  u

Result: "TWFu"
\`\`\`

### Why 33% Size Increase?

3 bytes (24 bits) become 4 Base64 characters, each taking 1 byte in transmission. The ratio is 4:3, a 1/3 increase.

## Common Base64 Use Cases

### Embedding Images in HTML and CSS

Convert small icons and images to Base64 data URIs to reduce HTTP requests:

\`\`\`html
<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA..." />
\`\`\`

\`\`\`css
.logo {
  background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0i...");
}
\`\`\`

Best for images under 10KB. Larger images should not use Base64 due to the size overhead.

### JWT (JSON Web Tokens)

All three parts of a JWT (header, payload, signature) are Base64-encoded:

\`\`\`
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIn0.dozjgNryP4J3jVmNHl0w5N_XgL0n3I9PlFUP0THsR8U
\`\`\`

Decoding the middle part reveals the JSON payload content.

### URL-safe Base64

Standard Base64 contains \`+\` and \`/\` which need URL escaping. URL-safe Base64 replaces:
- \`+\` with \`-\`
- \`/\` with \`_\`
- Removes trailing \`=\`

### Sending Binary Data in JSON

Some text-based protocols don't support binary data. Base64 encoding allows binary transmission within JSON:

\`\`\`json
{
  "filename": "photo.jpg",
  "data": "/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAA..."
}
\`\`\`

## Important Notes

- Base64 increases size by ~33%, not suitable for large files
- Base64 is not encryption — never use it to protect sensitive data
- URL-safe and standard Base64 are not interchangeable
- Data URI format: \`data:[MIME];base64,[data]\`

## Conclusion

Base64 is a practical encoding scheme. Understanding how it works helps you choose the right approach for embedding images, handling JWT tokens, or transmitting binary data in text-based protocols. Use our free online Base64 encoder and decoder to convert between Base64 strings and images instantly.`},{slug:"cron-expression-guide",title:"Cron Expression Guide: Syntax, Examples and Common Schedules",description:"Complete cron expression tutorial covering 5-field syntax, special characters, common scheduling patterns, and real-world examples for Linux, Node.js and GitHub Actions.",category:"DevOps",categoryKey:"devops",date:"2026-04-25",readTime:5,content:`## What is a Cron Expression?

A cron expression is a string that defines when a scheduled task should run. It is widely used in Linux systems, CI/CD pipelines, cloud functions, and automated job scheduling.

## Standard Cron Format

A standard cron expression has 5 fields:

\`\`\`
* * * * *
| | | | |
| | | | +---- Day of week (0-7, 0 and 7 are Sunday)
| | | +------ Month (1-12)
| | +-------- Day of month (1-31)
| +---------- Hour (0-23)
+------------ Minute (0-59)
\`\`\`

Special characters per field:

- \`*\`: Every value (e.g., \`*\` in hour field means every hour)
- \`,\`: Multiple values (e.g., \`1,3,5\`)
- \`-\`: Range (e.g., \`1-5\` means 1 through 5)
- \`/\`: Step (e.g., \`*/5\` means every 5 units)

## Cron Expression Examples

- \`30 8 * * *\` — Every day at 8:30 AM
- \`0 9 * * 1-5\` — Weekdays at 9:00 AM
- \`*/15 * * * *\` — Every 15 minutes
- \`0 0 1 * *\` — First day of every month at midnight
- \`0 2 * * 0\` — Every Sunday at 2:00 AM

## Common Cron Schedules

- \`0 0 * * *\` — Every hour on the hour
- \`0 */2 * * *\` — Every 2 hours
- \`0 9 * * *\` — Every morning at 9 AM
- \`0 9,18 * * *\` — Every day at 9 AM and 6 PM
- \`0 0 * * 0\` — Every Sunday at midnight
- \`0 0 1 * *\` — Every 1st of the month
- \`0 0 1 1 *\` — Every January 1st
- \`*/5 * * * *\` — Every 5 minutes
- \`0 8-18 * * *\` — Every hour from 8 AM to 6 PM
- \`30 4 * * 1\` — Every Monday at 4:30 AM

## Extended Formats: 6-field and 7-field

Some systems use 6 or 7 fields, adding seconds or year at the beginning.

6-field (with seconds):

\`\`\`
0 */5 * * * *   Every 5 seconds
\`\`\`

7-field (with seconds and year):

\`\`\`
0 0 9 * * * 2026   Every day at 9 AM in 2026
\`\`\`

## Real-world Cron Use Cases

### Linux Crontab

\`\`\`bash
# Backup database at 3 AM daily
0 3 * * * /usr/bin/mysqldump -u root mydb > /backup/mydb.sql

# Clean logs every Sunday
0 0 * * 0 rm -rf /var/log/app/*.log

# Health check every 10 minutes
*/10 * * * * /usr/local/bin/health-check.sh
\`\`\`

### Node.js with node-cron

\`\`\`javascript
const cron = require('node-cron')

cron.schedule('0 9 * * *', () => {
  console.log('Running daily task at 9 AM')
})

cron.schedule('*/30 * * * *', () => {
  console.log('Running every 30 minutes')
})
\`\`\`

### GitHub Actions Scheduled Workflows

\`\`\`yaml
on:
  schedule:
    - cron: '0 2 * * *'  # Run daily at 2 AM UTC
\`\`\`

## Common Pitfalls

1. **Timezone issues**: Cron uses the system timezone by default. Cross-timezone servers need careful configuration.
2. **Never omit \`0\` for minutes**: \`* * * * *\` runs every minute, not every hour.
3. **Day-of-week AND day-of-month**: When both are specified, the task runs if EITHER matches, which may cause unexpected execution frequency.
4. **Daylight saving time**: Some systems skip or repeat tasks during DST transitions.

## Conclusion

Cron expressions are the backbone of task scheduling. Master the basic format and common patterns to handle most automation needs. Use an online cron expression parser to validate and preview your schedules before deploying to production.`},{slug:"ip-address-guide",title:"IP Address Basics: IPv4 vs IPv6, CIDR Notation and Subnetting",description:"Learn IP addressing fundamentals: IPv4 structure, IPv6 simplified notation, private address ranges, CIDR subnetting explained with examples for network configuration.",category:"DevOps",categoryKey:"devops",date:"2026-04-26",readTime:5,content:`## What is an IP Address?

An IP address (Internet Protocol Address) is a unique identifier for devices on a network. Think of it like a mailing address — data packets use IP addresses to find their destination.

Two versions are in use today: IPv4 and IPv6.

## IPv4 Explained

### Format

IPv4 is a 32-bit number, typically shown in dotted-decimal notation:

\`\`\`
192.168.1.1
\`\`\`

Each 8-bit segment (1 byte) converts to decimal, separated by dots. Range: \`0.0.0.0\` to \`255.255.255.255\`.

### Private IP Address Ranges

These addresses are for internal networks and never routed on the internet:

- **10.0.0.0/8**: \`10.0.0.0\` ~ \`10.255.255.255\`, large enterprise networks
- **172.16.0.0/12**: \`172.16.0.0\` ~ \`172.31.255.255\`, medium networks
- **192.168.0.0/16**: \`192.168.0.0\` ~ \`192.168.255.255\`, home and small offices

### Special Addresses

- **127.0.0.1**: Loopback address (localhost), points to the local machine
- **0.0.0.0**: Represents all network interfaces
- **255.255.255.255**: Broadcast address

## IPv6 Explained

### Why IPv6 is Needed

IPv4 has only ~4.3 billion addresses. By 2019, all IPv4 addresses were exhausted. IPv6 uses 128-bit addresses — 2^128 addresses, virtually inexhaustible.

### Format

IPv6 is a 128-bit hexadecimal number, colon-separated into 8 groups of 16 bits:

\`\`\`
2001:0db8:85a3:0000:0000:8a2e:0370:7334
\`\`\`

### IPv6 Shortening Rules

IPv6 addresses can be significantly shortened.

**Rule 1: Remove leading zeros in each group**

\`\`\`
2001:0db8:85a3:0000:0000:8a2e:0370:7334
→ 2001:db8:85a3:0:0:8a2e:370:7334
\`\`\`

**Rule 2: Consecutive zero groups can be replaced with \`::\` (once only)**

\`\`\`
2001:db8:85a3:0:0:8a2e:370:7334
→ 2001:db8:85a3::8a2e:370:7334
\`\`\`

### IPv6 Address Types

- **Unicast**: One-to-one communication
- **Multicast**: One-to-many communication
- **Anycast**: Send to the nearest destination

### IPv6 Special Addresses

- \`::1\` — IPv6 loopback (equivalent to IPv4 \`127.0.0.1\`)
- \`::\` — Unspecified address
- \`fe80::/10\` — Link-local addresses

## CIDR Notation Explained

CIDR (Classless Inter-Domain Routing) uses \`/\` to indicate the network prefix length:

\`\`\`
192.168.1.0/24
\`\`\`

\`/24\` means the first 24 bits are the network portion, the remaining 8 bits are for hosts. Subnet mask \`255.255.255.0\`, 254 usable addresses.

Common prefix lengths:
- \`/8\` → Subnet mask \`255.0.0.0\` → ~16.7 million addresses
- \`/16\` → Subnet mask \`255.255.0.0\` → ~65,000 addresses
- \`/24\` → Subnet mask \`255.255.255.0\` → 254 addresses
- \`/32\` → Subnet mask \`255.255.255.255\` → 1 address

Usable address formula: 2^(32 - prefix length) - 2 (subtract network address and broadcast address).

## How to Check Your IP Address

\`\`\`bash
# Linux / macOS
ip addr          # Show all network interfaces (Linux)
ifconfig         # Show all network interfaces (macOS / older Linux)

# Check public IP
curl ifconfig.me
curl ip.sb

# Windows
ipconfig
\`\`\`

## Conclusion

Understanding IP addressing is fundamental to networking. Knowing the differences between IPv4 and IPv6, CIDR notation, and private address ranges helps you configure servers, set up firewall rules, and troubleshoot network issues more effectively.`},{slug:"encryption-algorithm-guide",title:"MD5 vs SHA vs AES: Key Differences Between Hash and Encryption Algorithms",description:"Learn the differences between MD5, SHA-256, AES and RSA algorithms. Understand when to use hash functions vs encryption, with practical code examples for developers.",category:"Security",categoryKey:"security",date:"2026-04-27",readTime:4,content:`## Overview

MD5, SHA, and AES appear frequently in development, but they serve completely different purposes. Simply put: MD5 and SHA are hash functions (one-way), AES is encryption (reversible). Hashing is one-way, encryption is two-way.

## MD5 Explained

### What is MD5?

MD5 (Message Digest Algorithm 5) produces a 128-bit hash, output as 32 hex characters. Created in 1991, it was once the most popular hash algorithm.

### Characteristics

- Fixed 128-bit output (32 hex characters)
- Fast computation
- **No longer secure** — collision attacks proven in 2004, fully broken by 2008

### Current Legitimate Uses

- **File integrity checks**: Non-security quick verification
- **Database hash keys**: Consistent hashing
- **Legacy system compatibility**: Maintaining old systems

### Security Recommendation

Do NOT use MD5 for password storage, digital signatures, or certificate verification. For non-security file integrity checks, MD5 remains usable.

## SHA Family of Hash Algorithms

SHA (Secure Hash Algorithm), designed by NSA, is the most widely used hash algorithm family today.

### SHA-1

- 160-bit output (40 hex characters)
- Google demonstrated SHAttered collision attack in 2017
- No longer recommended

### SHA-2 (Current Standard)

SHA-2 is the recommended hash algorithm family with multiple output sizes:

- **SHA-224**: 224-bit, compatibility scenarios
- **SHA-256**: 256-bit, most common, certificate signing and file verification
- **SHA-384**: 384-bit, higher security
- **SHA-512**: 512-bit, highest security

SHA-256 is the most recommended hash algorithm today. Git uses it for commit identification, and HTTPS certificates rely on it.

### SHA-3

Published in 2015, based on the Keccak algorithm. Completely different from SHA-2 with better security margins. Not yet widely adopted but serves as a hedge against future SHA-2 vulnerabilities.

### Code Examples

\`\`\`bash
# Linux hash computation
md5sum file.txt
sha256sum file.txt
sha512sum file.txt
\`\`\`

\`\`\`javascript
// JavaScript Web Crypto API
const hash = await crypto.subtle.digest('SHA-256', data)
\`\`\`

\`\`\`go
// Go
import "crypto/sha256"
hash := sha256.Sum256(data)
\`\`\`

## AES Encryption

### What is AES?

AES (Advanced Encryption Standard) is a symmetric encryption algorithm — the same key encrypts and decrypts. Adopted by NIST as the federal standard in 2001.

### Key Sizes

- **AES-128**: 128-bit key, 10 rounds
- **AES-192**: 192-bit key, 12 rounds
- **AES-256**: 256-bit key, 14 rounds

Longer keys are more secure but slower. AES-256-GCM is the recommended choice for most applications.

### Encryption Modes

- **ECB**: Simplest, insecure, not recommended
- **CBC**: Most common, requires IV (initialization vector)
- **GCM**: Authenticated encryption, provides both confidentiality and integrity — recommended
- **CTR**: Counter mode, supports parallel computation

### Real-world Applications

- File encryption
- Database field encryption
- VPN data transmission
- Disk encryption (BitLocker, FileVault both use AES)

### Code Example

\`\`\`javascript
// Web Crypto API
const key = await crypto.subtle.generateKey(
  { name: 'AES-GCM', length: 256 },
  true,
  ['encrypt', 'decrypt']
)
\`\`\`

## Hash vs Encryption: Key Differences

**Hash (MD5 / SHA):**
- Direction: One-way, irreversible
- Output: Fixed length
- Key: Not required
- Purpose: Integrity verification, data fingerprinting
- Use cases: File verification, password hashing

**Encryption (AES):**
- Direction: Two-way, reversible with key
- Output: Same length as input
- Key: Required
- Purpose: Data confidentiality
- Use cases: Secure data transmission, file encryption

## RSA Asymmetric Encryption

Beyond symmetric algorithms like AES, RSA is the most popular asymmetric encryption. RSA uses a public key for encryption and a private key for decryption, solving the key distribution problem. However, RSA is significantly slower than AES. The typical approach uses RSA to encrypt an AES key, then AES for bulk data encryption.

## Conclusion

- **MD5**: Insecure for security, use only for non-critical checksums
- **SHA-256**: Current recommended hash for general development
- **AES-256-GCM**: Recommended symmetric encryption
- **RSA**: Best for key exchange and digital signatures
- Hash is not encryption — they serve fundamentally different purposes

Use our free online hash calculator for MD5, SHA-1, SHA-256, SHA-384, SHA-512, and encryption/decryption tool for AES, DES, and RSA to test these algorithms in your browser.`},{slug:"docker-install-ubuntu",title:"How to Install Docker and Docker Compose on Ubuntu: Complete Guide",description:"Step-by-step guide to install Docker Engine and Docker Compose on Ubuntu. Includes registry mirror setup for China, proxy configuration, and post-installation tips.",category:"DevOps",categoryKey:"devops",date:"2026-04-28",readTime:5,hot:!0,content:`This guide covers installing Docker Engine and Docker Compose on Ubuntu. The official apt repository is recommended — Ubuntu's built-in docker.io package is outdated.

## Remove Old Versions

If you have older Docker installations, clean them first:

\`\`\`bash
sudo apt remove docker docker-engine docker.io containerd runc
\`\`\`

## Install Prerequisites

\`\`\`bash
sudo apt update
sudo apt install ca-certificates curl gnupg lsb-release
\`\`\`

## Add Docker's Official Repository

### For Servers with Direct Docker Access

\`\`\`bash
sudo mkdir -p /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg

echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
\`\`\`

### For Servers in China (Use Tsinghua Mirror)

\`\`\`bash
sudo mkdir -p /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg

echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://mirrors.tuna.tsinghua.edu.cn/docker-ce/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
\`\`\`

## Install Docker Engine

\`\`\`bash
sudo apt update
sudo apt install docker-ce docker-ce-cli containerd.io docker-compose-plugin
\`\`\`

Verify the installation:

\`\`\`bash
sudo docker run hello-world
\`\`\`

## Run Docker Without Root (Optional)

Add your user to the docker group to avoid typing \`sudo\`:

\`\`\`bash
sudo usermod -aG docker $USER
newgrp docker
\`\`\`

## Configure Registry Mirrors for China

Pulling images from Docker Hub is slow in China. Configure mirrors in \`/etc/docker/daemon.json\`:

\`\`\`json
{
  "registry-mirrors": [
    "https://docker.mirrors.ustc.edu.cn",
    "https://hub-mirror.c.163.com",
    "https://mirror.baidubce.com"
  ]
}
\`\`\`

Restart Docker:

\`\`\`bash
sudo systemctl daemon-reload
sudo systemctl restart docker
\`\`\`

Verify mirrors are active:

\`\`\`bash
docker info | grep -A 5 "Registry Mirrors"
\`\`\`

## Configure HTTP Proxy for Docker

If Docker needs a proxy to pull images, add proxy settings to \`/etc/docker/daemon.json\`:

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

Restart Docker:

\`\`\`bash
sudo systemctl restart docker
\`\`\`

Verify:

\`\`\`bash
docker info | grep -i proxy
\`\`\`

## Docker Compose

Modern Docker includes Compose as a built-in plugin (docker-compose-plugin from the installation above). Use it directly:

\`\`\`bash
docker compose version
\`\`\`

To install the standalone version:

\`\`\`bash
DOCKER_CONFIG=\${DOCKER_CONFIG:-$HOME/.docker}
mkdir -p $DOCKER_CONFIG/cli-plugins
curl -SL "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o $DOCKER_CONFIG/cli-plugins/docker-compose
chmod +x $DOCKER_CONFIG/cli-plugins/docker-compose
\`\`\`

For servers in China that cannot reach GitHub, use a proxy:

\`\`\`bash
export http_proxy=http://127.0.0.1:7890
export https_proxy=http://127.0.0.1:7890
\`\`\`

Verify:

\`\`\`bash
docker compose version
\`\`\``},{slug:"k3s-cluster-setup",title:"How to Set Up a K3s Kubernetes Cluster on Ubuntu: Step-by-Step",description:"Complete guide to deploying a K3s cluster on Ubuntu with system initialization, Docker configuration, NFS storage setup, and Helm installation for production workloads.",category:"DevOps",categoryKey:"devops",date:"2026-04-29",readTime:8,hot:!0,content:`This guide walks through setting up a K3s Kubernetes cluster on Ubuntu with 3 nodes: one master and two workers, with NFS shared storage.

## System Initialization (All Nodes)

### Disable Firewall

\`\`\`bash
systemctl stop firewalld
systemctl disable firewalld
\`\`\`

### Disable SELinux

\`\`\`bash
# Temporary
setenforce 0
# Permanent
sed -i 's/enforcing/disabled/' /etc/selinux/config
\`\`\`

### Disable Swap

\`\`\`bash
# Temporary
swapoff -a
# Permanent
sed -ri 's/.*swap.*/#&/' /etc/fstab
\`\`\`

## Install Docker (Same Version on All Nodes)

\`\`\`bash
sudo apt update
sudo apt upgrade -y
sudo apt install -y apt-transport-https ca-certificates curl software-properties-common gnupg lsb-release
\`\`\`

Add Docker's official GPG key:

\`\`\`bash
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt update
\`\`\`

Install Docker:

\`\`\`bash
sudo apt install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
docker version
docker compose version
\`\`\`

## Configure Docker

Edit \`/etc/docker/daemon.json\`:

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

Restart Docker:

\`\`\`bash
sudo systemctl restart docker
\`\`\`

## Configure Hosts File (All Nodes)

\`\`\`bash
cat >> /etc/hosts <<EOF
192.168.0.146 k8s-master
192.168.0.172 k8s-node1
192.168.0.193 k8s-node2
EOF
\`\`\`

Replace IPs with your actual node addresses.

## Install K3s on the Master Node

\`\`\`bash
hostnamectl set-hostname master
\`\`\`

Use \`--tls-san\` with your public and private IPs to avoid certificate errors:

\`\`\`bash
curl -sfL https://get.k3s.io | sh -s - server \
  --cluster-init \
  --tls-san 8.219.59.132 \
  --tls-san 172.21.128.220
\`\`\`

After installation, retrieve the node token and kubeconfig:

\`\`\`bash
cat /var/lib/rancher/k3s/server/node-token
cat /etc/rancher/k3s/k3s.yaml
\`\`\`

Configure kubectl:

\`\`\`bash
mkdir -p ~/.kube
sudo cp /etc/rancher/k3s/k3s.yaml ~/.kube/config
sudo chown $(id -u):$(id -g) ~/.kube/config
\`\`\`

## Join Worker Nodes

On each worker node, run:

\`\`\`bash
hostnamectl set-hostname node-1
\`\`\`

\`\`\`bash
curl -sfL https://get.k3s.io | K3S_URL=https://172.24.199.171:6443 K3S_TOKEN=your-token-here sh -
\`\`\`

Replace the URL and token with your master node values.

## Install Helm

\`\`\`bash
curl https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3 | bash
\`\`\`

## Configure NFS Storage

### NFS Server (Master Node)

\`\`\`bash
apt install -y nfs-kernel-server
mkdir -p /opt/nfsstore/data
chown nobody:nogroup /opt/nfsstore/data
\`\`\`

Edit \`/etc/exports\`:

\`\`\`
/opt/nfsstore/data 172.21.128.0/24(rw,sync,no_subtree_check,no_root_squash)
\`\`\`

Start the NFS service:

\`\`\`bash
systemctl restart nfs-server
systemctl enable nfs-server
systemctl enable rpcbind
showmount -e
\`\`\`

### NFS Client (Worker Nodes)

\`\`\`bash
apt install -y nfs-common
\`\`\`

## Verify the Cluster

\`\`\`bash
kubectl get nodes
kubectl get pods --all-namespaces
\`\`\`

## Useful kubectl Aliases

\`\`\`bash
kq() {
    kubectl -n your-namespace "$@"
}
\`\`\`

Add to \`~/.bashrc\` for persistence.`},{slug:"deepseek-intro-guide",title:"DeepSeek AI Guide: Features, Pricing, API Integration and Local Deployment",description:"Complete DeepSeek AI guide covering model capabilities, API usage with OpenAI-compatible endpoints, local deployment with Ollama, and practical tips for developers.",category:"AI",categoryKey:"ai",date:"2026-05-02",readTime:5,hot:!0,content:`## What is DeepSeek?

DeepSeek is a Chinese AI company founded by High-Flyer, a quantitative hedge fund. Their DeepSeek AI model series has gained global attention for outstanding performance in natural language processing, code generation, and mathematical reasoning — combined with aggressive open-source strategy and remarkably low API pricing.

## DeepSeek Model Timeline

- **DeepSeek LLM**: First open-source model, establishing the technical foundation
- **DeepSeek-V2**: Introduced MoE (Mixture of Experts) architecture for better efficiency
- **DeepSeek-V3**: 671B parameter model achieving state-of-the-art open-source performance
- **DeepSeek-R1**: First open-source reasoning model, rivaling OpenAI o1 on math and logic benchmarks

## Key Features

### Open Source Strategy

DeepSeek releases model weights and technical reports publicly. Developers can deploy locally, fine-tune, and build upon the models without API restrictions — ideal for privacy-sensitive enterprise applications.

### Cost-Effective Pricing

DeepSeek API costs a fraction of comparable models. DeepSeek-V3 is roughly 20-50x cheaper than GPT-4 for equivalent quality, making it attractive for high-volume AI workloads.

### Code Generation Excellence

DeepSeek excels at programming tasks across Python, JavaScript, Go, Rust, Java, and more. It handles code generation, debugging, and refactoring. Performance on HumanEval and similar benchmarks is among the best for open models.

### Long Context Window

DeepSeek supports 128K tokens of context, enough to process entire books or large codebases. This is valuable for document analysis, code review, and long-form content processing.

## How to Use DeepSeek

### Option 1: Web Interface

Visit chat.deepseek.com for the web chat interface. Clean design with file upload support (images, PDF, Word, Excel) and web search — no configuration needed.

### Option 2: API Integration

DeepSeek provides OpenAI-compatible API endpoints. Migrate from OpenAI by changing the base URL and API key:

\`\`\`python
from openai import OpenAI

client = OpenAI(
    api_key="your-deepseek-api-key",
    base_url="https://api.deepseek.com"
)

response = client.chat.completions.create(
    model="deepseek-chat",
    messages=[
        {"role": "user", "content": "Write a quicksort algorithm in Python"}
    ]
)
print(response.choices[0].message.content)
\`\`\`

### Option 3: Local Deployment

Use Ollama or vLLM to run DeepSeek distilled models on local GPU hardware. This is crucial for data-sensitive enterprise environments where data cannot leave the premises.

## Limitations

- Complex reasoning tasks still lag behind GPT-4 and Claude on some benchmarks
- While Chinese performance is excellent, English output occasionally lacks native-level nuance
- Local deployment of distilled models still requires significant GPU resources
- Web search accuracy and timeliness need improvement

## Conclusion

DeepSeek represents the most compelling Chinese AI model for developers today. Its open-source philosophy, competitive pricing, and strong performance make it a serious option for AI integration. Whether through the web interface for quick tasks or API integration for production applications, DeepSeek delivers excellent value.`},{slug:"deepseek-coding-tips",title:"How to Use DeepSeek for Programming: Tips for Code Generation and Debugging",description:"Practical DeepSeek coding tips for developers: prompt engineering strategies, code review workflows, multi-file context management, and common pitfalls to avoid.",category:"AI",categoryKey:"ai",date:"2026-05-03",readTime:5,content:`## AI-Assisted Programming Today

AI-assisted coding has become standard in development. GitHub Copilot, ChatGPT, and Claude are widely adopted. DeepSeek stands out with strong code generation, a 128K context window, and open-source availability.

## DeepSeek Advantages for Programming

### 1. Deep Code Understanding

DeepSeek doesn't just generate code snippets — it understands complete code logic structures. For complex algorithms and architecture design, DeepSeek provides clear, well-structured solutions. The 128K context window can accommodate core portions of multi-file projects.

### 2. Multi-Language Proficiency

DeepSeek handles Python, JavaScript, Go, Rust, Java, C++, and more. It excels at cross-language translation — converting Python algorithms to Go, or JavaScript to TypeScript — often in a single pass.

### 3. Code Review and Debugging

Paste problematic code to DeepSeek and it quickly identifies bugs with fix suggestions. For performance optimization, DeepSeek provides targeted improvements — identifying inefficient loops, unnecessary memory allocations, and suboptimal data structures.

### 4. Documentation Generation

DeepSeek generates code documentation, README files, and API docs automatically. Supports Javadoc, GoDoc, TSDoc, and other mainstream formats.

## Practical Tips

### Tip 1: Provide Sufficient Context

Share enough context — tech stack, framework versions, project structure — for accurate responses. Don't just paste a code snippet; explain its role in the project and what problem you're solving.

### Tip 2: Break Down Complex Tasks

Split complex tasks into steps. First ask DeepSeek to design the overall architecture, then implement each module. With 128K context, DeepSeek remembers the full conversation chain.

### Tip 3: Provide Input/Output Examples

When writing regular expressions, data transformation scripts, or API integration code, provide input/output examples. Examples are more precise than text descriptions and significantly reduce back-and-forth iteration.

### Tip 4: Iterative Refinement

For code generation, start with a basic version, then refine. Ask for basic functionality first, add error handling, then optimize performance. DeepSeek builds on previous context for each iteration.

## Important Considerations

### Code Security

AI-generated code may contain security vulnerabilities. Never use unverified AI-generated code in production, especially for SQL queries, user input handling, and cryptography. Always perform thorough code review.

### License Compliance

Training data may include open-source code. Generated code could carry license restrictions similar to GPL. Be mindful of compliance in commercial projects, especially when copying substantial generated code.

### Avoid Over-Reliance

AI-assisted programming improves efficiency but can hinder fundamental skill development. Use AI as a productivity multiplier, not a replacement for learning and deep understanding. Knowing WHY code works matters more than generating code that works.

## Conclusion

DeepSeek performs exceptionally well in programming. For daily coding, debugging, and code review, it provides effective assistance. Used wisely, DeepSeek significantly boosts development productivity, letting developers focus on architecture and business logic. Remember: AI is a tool, not a replacement — code quality and security responsibility always rests with the developer.`},{slug:"typeless-ai-writing-guide",title:"Typeless AI Writing Tool Review: Why I Switched After One Month",description:"Honest Typeless review from a daily user: how AI-assisted writing in flow state mode transformed my writing workflow. Features, pricing, and who it is for.",category:"AI",categoryKey:"ai",date:"2026-05-09",readTime:6,hot:!0,content:`## I Was Skeptical at First

Let me be honest: I was someone who resisted AI writing tools.

I had tried ChatGPT for writing before. Every time I read its output — perfectly structured, utterly soulless text — I felt something was wrong. Writing should be alive. It should carry the author's voice. AI-generated text is like instant noodles: smells good, but something is missing.

So when a friend recommended Typeless, my first thought was: "Another ChatGPT wrapper?"

But my friend said something that changed my mind: "Try it. It doesn't write FOR you. It helps you write."

That distinction got my attention. I downloaded Typeless, fully expecting to delete it within a week.

Spoiler: I didn't.

## What Makes Typeless Different from ChatGPT?

Typeless is an AI writing tool built into a note-taking app. But unlike ChatGPT where you type a prompt and get a wall of text, Typeless works differently — it stays quietly in the background while you write, appearing only when you need it.

My analogy: ChatGPT is a chauffeur. Typeless is a co-pilot. A chauffeur drives FOR you — you sit in the back. A co-pilot sits next to you, watches the road, hands you water when needed, and occasionally says "maybe turn here" — but your hands stay on the wheel.

That difference matters enormously.

## Feature 1: Flow State Mode — No More Interruptions

My biggest writing enemy isn't writer's block. It's interruption.

I used to write like this: write a paragraph, need to check something — switch to browser. Find a word doesn't feel right — open a thesaurus — switch to browser. Finish a paragraph, want to polish it — copy to ChatGPT — switch to browser. By the time I tab back, my train of thought is cold.

Flow State Mode in Typeless solves this. Everything you might need — research, rewording, translation, expansion — lives inside the editor. One keyboard shortcut summons it.

My honest experience: the first time I used it, I wrote for two straight hours. Not forty minutes. Two hours. I haven't written uninterrupted for that long since college.

### How to Use It

When you hit a wall while writing:

1. **Stuck on what comes next**: Press \`Cmd+K\`, select "Continue". AI reads your previous text and continues in your style — it ADAPTS to your voice, it doesn't overwrite it.
2. **Not happy with a paragraph**: Select the text, \`Cmd+K\`, choose "Rewrite". Pick "more professional", "more casual", or "more concise".
3. **Thought of a related topic**: \`Cmd+K\`, "Expand" — AI extends your current content with relevant points.

The entire flow happens within the editor. No browser switches. No copy-paste. Your thoughts stay warm.

## Feature 2: AI Continue Writing — A Nudge, Not a Takeover

This feature deserves special attention because it cured my "blank page anxiety".

I have a bad writing habit: once the title is set, I agonize over the opening paragraph for 30 minutes. The first sentence must hook the reader. So I delete and rewrite, delete and rewrite.

With Typeless, I now do this instead:

Write the roughest possible opening:

> Let me talk about this tool I have been using.

Select it, \`Cmd+K\`, "Continue". Typeless offers directions:

> Version 1: Someone recommended it to me before but I did not take it seriously. Then I tried it by chance and everything changed.
>
> Version 2: Honestly I was skeptical at first, but after a month I have to admit — it just works.
>
> Version 3: This is not a sponsored post. Just honest thoughts from a real user.

Pick one that matches your intent. Write from there. The fear of the blank page? Gone.

### Pro Tips

Don't blindly accept AI suggestions. My workflow:
- Ask AI for 2-3 versions
- Pick the closest to what I had in mind
- Rewrite it in my own words

This gives me the efficiency of AI "warm-up" with the authenticity of my own voice.

## Feature 3: Knowledge Graph — Discovering What You Already Know

Typeless automatically analyzes your notes and builds connections between them.

Two weeks in, I opened the Knowledge Graph view and saw it had connected a Docker note from three months ago to a Kubernetes article I was currently writing. I clicked it — and yes, that Docker note had a few points I could reference.

Honestly, if the AI hadn't reminded me, I would have completely forgotten that note existed.

Typeless doesn't just match keywords — it understands semantic relationships. A note about "writing productivity" won't trigger on every note mentioning "text" — it accurately judges what's truly relevant.

Getting "reminded by your past self" is a surprisingly rewarding experience.

## Feature 4: Templates — Never Start from Scratch

I write technical blogs, project docs, weekly reports, and meeting notes. Each has a different structure.

Typeless offers dozens of templates:

- Technical blog template: frontmatter, table of contents, code block formatting
- Project proposal: background, objectives, timeline
- Meeting notes: attendees, agenda, decisions, action items
- Learning notes: key concepts, examples, reflections

For weekly reports, I select the template and get a structure:

> ## Completed This Week
> (fill in)
>
> ## Issues Faced
> (fill in)
>
> ## Next Week Plan
> (fill in)

Just fill in the blanks. No structural decisions, no formatting. All mental energy goes into what matters.

## Pricing: Is It Worth It?

Typeless isn't cheap, but it delivers value.

The free plan covers core features with limited AI calls. I upgraded to paid after two weeks. Why? The time it saved exceeded the cost.

Quick math: a 2000-word article used to take 3-4 hours from concept to completion. With Typeless, the same article takes 1.5-2 hours. At 3 articles per week, that's 6 hours saved weekly — 24 hours monthly. That's three full work days.

Time is money.

## Who Should Use Typeless?

Not everyone needs Typeless. If you write a few articles per year, free ChatGPT occasional help is sufficient.

But if you are:
- A developer writing technical blogs regularly
- A professional writing weekly reports and project documentation
- A knowledge worker with note-taking habits
- Anyone writing frequently

I strongly recommend giving Typeless a try.

## Final Thoughts

I wrote this review without any sponsorship. Pure user experience.

I have seen many AI tools. They are powerful, but something always feels missing. I eventually realized what: respect for the human. Some AI tools try to do everything for you — just press a button. Convenient as it seems, it steals the joy of creation.

Typeless is different. It keeps you in the driver's seat, happy to be the co-pilot. It knows when to speak and when to stay quiet. It handles the tedious, repetitive, uncreative parts — so you can focus on what matters: expressing your ideas.

If you want that feeling of writing a full article in one uninterrupted flow, try Typeless. Use it for a week. If it's not for you, delete it.

But if it clicks — you will know.`},{slug:"obsidian-note-taking-guide",title:"Obsidian Review: Why I Switched from Notion After Two Years of Daily Use",description:"Two-year Obsidian review covering bidirectional links, graph view, plugin ecosystem, daily notes workflow, and why local-first Markdown beats cloud-based note apps.",category:"AI",categoryKey:"ai",date:"2026-05-09",readTime:8,hot:!0,content:`## Why I Got Tired of Note App Hopping

I have used more note apps than I can count.

It started with Evernote — I was an early adopter, accumulated thousands of notes. Then Notion, lured by databases and kanban views. A weekend spent migrating everything. Then Bear, Craft, Roam Research, each promising something better. Each migration broke some formatting, lost some links, wasted some weekend.

Then in early 2024, a friend told me: "Try Obsidian. You won't need to migrate again."

I didn't believe him. What makes Obsidian so special?

Two years later, I want to tell my past self: he was right.

## Why Obsidian Ends the Migration Cycle

One reason: your notes are plain Markdown files on your local machine.

What this means:
- Obsidian could shut down tomorrow — your notes are still there, readable by any text editor
- Switching tools? Just copy the folder. It's not even "migration"
- Use Git for version control, backup, and collaboration
- Sync with iCloud, Dropbox, Syncthing — whatever you prefer

The anxiety of "will this company survive?" and "should I export while I still can?" — completely gone.

## Core Feature 1: Bidirectional Links — Notes Are No Longer Islands

Bidirectional links are Obsidian's killer feature. While many apps now offer similar functionality, Obsidian pioneered it and still does it best.

### How It Works

Type double square brackets in your note:

\`\`\`markdown
I have been researching [[Docker Networking]] and found similarities with [[Kubernetes Network Model]].
\`\`\`

Obsidian automatically does two things:
1. In the "Docker Networking" note, a backlinks panel shows "Obsidian Review" references it
2. On the graph view, a new connection appears between two nodes

After six months, the effect compounds. Your notes transform from isolated files into an interconnected knowledge network.

### My Experience

Last month, I was writing about API gateways. I searched "gateway" in Obsidian and found fifteen relevant notes — some written over a year ago, completely forgotten.

Double-clicking one revealed a architecture diagram idea that perfectly fit my current article.

It felt like receiving a gift from past-me. Without bidirectional links, that note would have gathered digital dust forever.

## Core Feature 2: Graph View — Visualize Your Knowledge Universe

The Graph View is Obsidian's most iconic feature. Open it and you see a network of nodes (notes) connected by lines (links).

I initially thought it was just eye candy — pretty but impractical.

Over time, I discovered its real value:

1. **Find orphan notes**: Isolated nodes with no connections are forgotten notes. Either link them or delete them.
2. **Spot theme clusters**: Zoom into dense areas — those are your deepest research topics.
3. **Discover serendipitous connections**: Sometimes two unrelated topics near each other spark new ideas.

I check the Graph View weekly. It helps me maintain and grow my knowledge base intentionally.

## Core Feature 3: Plugin Ecosystem

Obsidian's community plugin ecosystem is unmatched. Thousands of plugins cover virtually any need.

### My Must-Have Plugins

**Dataview**: Turns Obsidian into a database. Query your notes with SQL-like syntax:

\`\`\`dataview
TABLE title, created, status
FROM "projects"
WHERE status = "active"
SORT created DESC
\`\`\`

This renders as a live table. Sounds technical, but once you use it, there is no going back.

**Excalidraw**: Draw diagrams, wireframes, and flowcharts directly in your notes. No external tool, no screenshots, no image hosting.

**Calendar**: Opens a sidebar calendar. Click any date to jump to that day's note. Works perfectly with Daily Notes.

**Obsidian Git**: Auto-commits notes to GitHub on schedule. Free version control, never worry about accidental deletions again.

### Installing Plugins

Simpler than expected:
1. Settings → Community plugins → Turn off safe mode
2. Browse → Search → Install → Enable

No terminal commands. No config files. Like installing phone apps.

## Core Feature 4: Daily Notes + Progressive Summarization

This workflow transformed my productivity.

### My Setup

Each morning, \`Cmd+N\` creates today's daily note:

\`\`\`markdown
# {{date}}

## Today's Tasks

## What I Learned

## Interesting Ideas

## Follow-ups
\`\`\`

I jot things down throughout the day. At end of day, five minutes reviewing — extract worthwhile content to permanent notes.

After a week, I have 7 daily notes. Weekend review:
1. Copy valuable knowledge from daily notes to structured notes
2. Link new notes to existing ones
3. Tag for discoverability

This is "progressive summarization" — capture first, organize later. The beauty: zero pressure about format while writing. Organizing comes after.

I have maintained this for over a year. The biggest benefit? Never again thinking "I remember learning this but cannot find it." Every note has connections, every note has provenance.

## Learning Curve: Honest Assessment

Obsidian's learning curve is steeper than Notion's.

First week reactions:
- "The interface is so plain."
- "How do I install plugins? What is safe mode?"
- "Dataview requires learning syntax?"
- "I need to learn Markdown?"

But after two weeks, it clicks. Then you realize: Notion, for all its polish, makes decisions FOR you. Its block editor is intuitive but limiting — you can only do what it allows. Obsidian gives you freedom — organize however you want, build whatever you need.

Freedom has a learning cost, but the return is massive.

My recommendation:
1. **Week 1**: Learn bidirectional links and basic Markdown
2. **Month 1**: Start Daily Notes and templates
3. **Month 3**: Explore plugins, start with Calendar and Dataview

Do NOT install 20 plugins on day one. Obsidian's philosophy: slow is smooth, smooth is fast.

## Obsidian + AI

Obsidian is not an AI tool, but community plugins add AI capabilities.

**Copilot plugin**: Integrates ChatGPT/Claude into Obsidian. Select text, ask AI to summarize or rewrite — no browser needed.

**Smart Connections**: AI-powered note recommendations. Smarter than backlinks — it understands semantic relationships.

This combination gives you Obsidian's local-first ownership with on-demand AI efficiency.

## Who Should Use Obsidian?

Honest answer: not everyone.

If you want a "just open and write" app, Apple Notes or Bear serve you better.

But if any of these apply:
- You write extensively and need long-term management
- You care about data ownership and platform independence
- You enjoy customizing tools to your exact needs
- You are a developer or technical writer comfortable with Markdown
- You want knowledge management — not just note-taking, but connecting ideas

Obsidian might be the best note-taking app you will ever use.

## Closing Thoughts

After two years, my Obsidian vault holds 800+ notes. Every time I open the Graph View and see those nodes and connections — the growth of my knowledge base — I feel something no other note app gave me: ownership.

Evernote became bloated. Notion tried to do everything and got slow. Roam asked for payment upfront from a questionable company. Obsidian chose subtraction: local files, plain Markdown, plugin ecosystem. It gives you full control.

If you haven't tried Obsidian, download it. Give it two weeks. It might look ugly at first, it might feel unfamiliar. Push through.

All great tools feel strange at first.`}];function d({lang:e}){let[o,s]=(0,a.useState)([]),[n,i]=(0,a.useState)(!0),[r,l]=(0,a.useState)(!1),[c,u]=(0,a.useState)(null);return((0,a.useEffect)(()=>{let e=new AbortController;return fetch("https://sitehub.schg.xyz/api/v1/news/list?page=1&page_size=12",{signal:e.signal}).then(e=>e.json()).then(e=>{0===e.code&&e.data?.list&&s(e.data.list),i(!1)}).catch(e=>{"AbortError"!==e.name&&(l(!0),i(!1))}),()=>e.abort()},[]),n)?(0,t.jsx)("div",{className:"grid gap-4 sm:grid-cols-2 lg:grid-cols-3",children:[1,2,3,4,5,6].map(e=>(0,t.jsxs)("div",{className:"animate-pulse rounded-xl border border-white/[0.06] bg-white/[0.03] p-4",children:[(0,t.jsx)("div",{className:"mb-2 h-4 w-3/4 rounded bg-white/[0.06]"}),(0,t.jsx)("div",{className:"mb-3 h-3 w-1/2 rounded bg-white/[0.04]"}),(0,t.jsxs)("div",{className:"space-y-1.5",children:[(0,t.jsx)("div",{className:"h-3 w-full rounded bg-white/[0.04]"}),(0,t.jsx)("div",{className:"h-3 w-5/6 rounded bg-white/[0.04]"})]})]},e))}):r?(0,t.jsx)("div",{className:"flex flex-col items-center justify-center py-16 text-dark-400",children:(0,t.jsx)("p",{className:"text-lg",children:"zh"===e?"资讯加载失败":"Failed to load news"})}):0===o.length?(0,t.jsx)("div",{className:"flex flex-col items-center justify-center py-16 text-dark-400",children:(0,t.jsx)("p",{className:"text-lg",children:"zh"===e?"暂无资讯":"No news available"})}):(0,t.jsx)("div",{className:"space-y-3",children:o.map(e=>{let o=c===e.id;return(0,t.jsxs)("div",{className:"rounded-xl border border-white/[0.06] bg-white/[0.03] overflow-hidden cursor-pointer hover:border-white/[0.12] transition-colors",onClick:()=>{var t;u(c===(t=e.id)?null:t)},children:[(0,t.jsxs)("div",{className:"flex items-start gap-3 p-4",children:[(0,t.jsxs)("div",{className:"min-w-0 flex-1",children:[(0,t.jsx)("h3",{className:`text-sm font-semibold text-dark-50 leading-snug ${o?"":"line-clamp-2"}`,children:e.title}),!o&&(0,t.jsx)("p",{className:"text-xs text-dark-400 mt-1.5 line-clamp-2 leading-relaxed",children:e.content?.replace(/<[^>]+>/g,"").slice(0,120)}),!o&&(0,t.jsxs)("div",{className:"mt-2 flex items-center gap-2 text-[11px] text-dark-500",children:[(0,t.jsx)("span",{children:e.source_name}),(0,t.jsx)("span",{children:"·"}),(0,t.jsx)("span",{children:e.created_at?.slice(0,10)})]})]}),(0,t.jsx)("svg",{className:`mt-1 h-4 w-4 shrink-0 text-dark-500 transition-transform ${o?"rotate-180":""}`,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2,children:(0,t.jsx)("path",{d:"M19 9l-7 7-7-7"})})]}),o&&(0,t.jsxs)("div",{className:"border-t border-white/[0.06] px-4 pb-4 pt-3",children:[(0,t.jsx)("p",{className:"text-sm text-dark-300 leading-relaxed whitespace-pre-wrap",children:e.is_markdown?e.content:e.content?.replace(/<[^>]+>/g,"")}),(0,t.jsxs)("div",{className:"mt-3 flex items-center gap-2 text-[11px] text-dark-500",children:[(0,t.jsx)("span",{children:e.source_name}),(0,t.jsx)("span",{children:"·"}),(0,t.jsx)("span",{children:e.created_at?.slice(0,10)})]})]})]},e.id)})})}function c(){let{lang:e}=(0,s.useParams)(),c=(0,s.useSearchParams)().get("category"),u=(0,i.getDictionary)(e),p=(0,a.useMemo)(()=>c?"news"===c?[]:l.filter(e=>e.categoryKey===c):l,[c]);return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)("h1",{className:"mb-6 text-2xl font-bold text-dark-50",children:u.article.title}),(0,t.jsxs)("div",{className:"mb-6 flex flex-wrap gap-2",children:[(0,t.jsx)(o.default,{href:`/${e}/articles`,className:`rounded-full px-3 py-1.5 text-xs font-medium transition-all ${!c?"bg-indigo-500/20 text-indigo-300 border border-indigo-500/30":"bg-white/[0.04] text-dark-300 border border-white/[0.06] hover:bg-white/[0.08] hover:text-dark-100"}`,children:u.article.allCategories}),r.map(s=>(0,t.jsx)(o.default,{href:`/${e}/articles?category=${s.key}`,className:`rounded-full px-3 py-1.5 text-xs font-medium transition-all ${c===s.key?"bg-indigo-500/20 text-indigo-300 border border-indigo-500/30":"bg-white/[0.04] text-dark-300 border border-white/[0.06] hover:bg-white/[0.08] hover:text-dark-100"}`,children:s.label[e]},s.key))]}),"news"===c?(0,t.jsx)(d,{lang:e}):p.length>0?(0,t.jsx)("div",{className:"grid gap-4 sm:grid-cols-2 lg:grid-cols-3",children:p.map(o=>(0,t.jsx)(n,{article:o,locale:e},o.slug))}):(0,t.jsxs)("div",{className:"flex flex-col items-center justify-center py-16 text-dark-400",children:[(0,t.jsx)("p",{className:"text-lg",children:"zh"===e?"该分类暂无文章":"No articles in this category"}),(0,t.jsx)(o.default,{href:`/${e}/articles`,className:"mt-2 text-sm text-indigo-400 hover:text-indigo-300",children:"zh"===e?"查看全部文章 →":"View all articles →"})]})]})}e.s(["default",0,function(){let{lang:e}=(0,s.useParams)(),n=(0,i.getDictionary)(e);return(0,t.jsxs)("div",{className:"mx-auto max-w-6xl px-4 py-8",children:[(0,t.jsxs)("nav",{className:"mb-6 text-sm text-dark-400",children:[(0,t.jsx)(o.default,{href:`/${e}`,className:"hover:text-dark-200 transition-colors",children:n.common.breadcrumb.home}),(0,t.jsx)("span",{className:"mx-2",children:"›"}),(0,t.jsx)("span",{className:"text-dark-200",children:n.nav.articles})]}),(0,t.jsx)(a.Suspense,{fallback:(0,t.jsx)("div",{className:"text-dark-400 py-8",children:"zh"===e?"加载中...":"Loading..."}),children:(0,t.jsx)(c,{})})]})}],9325)}]);