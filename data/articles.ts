export interface Article {
  slug: string
  title: string
  description: string
  category: string
  categoryKey: string
  date: string
  readTime: number
  hot?: boolean
  content: string
}

export const categories: { key: string; label: Record<string, string> }[] = [
  { key: 'frontend', label: { zh: '前端开发', en: 'Frontend' } },
  { key: 'devops', label: { zh: '运维监控', en: 'DevOps' } },
  { key: 'security', label: { zh: '安全相关', en: 'Security' } },
  { key: 'ai', label: { zh: 'AI 相关', en: 'AI' } },
  { key: 'news', label: { zh: '热点文章', en: 'Hot News' } },
]

export const articles: Article[] = [
  {
    slug: 'frontend-seo-developer-guide',
    title: 'Frontend SEO for Developers: What SPAs, Crawlers, and Structured Data Actually Mean',
    description: 'Practical frontend SEO guide covering SPA crawler limitations, server-side rendering vs static export, semantic HTML, JSON-LD structured data, and Core Web Vitals for developers who actually ship code.',
    category: 'Frontend',
    categoryKey: 'frontend',
    date: '2026-05-19',
    readTime: 8,
    hot: true,
    content: `## I Shipped a Vue App That Google Could Not Read

Three years ago I launched a side project — a Vue 2 SPA with Vue Router in history mode. It looked great. The client was happy. A week later I checked Google Search Console. Zero indexed pages. Not one.

I had been writing frontend code for five years at that point. Nobody had ever told me that Google might not see my content the way users did. CSS was rendering, JavaScript was executing, the app was fast — but to a search crawler, it was an empty `<div id="app">` followed by a 200-line webpack bundle it would never run.

That moment changed how I think about frontend architecture. SEO is not something you bolt on after launch. It is a constraint that shapes how you render, how you route, and how you structure HTML. Here is what I have learned since.

## How Search Crawlers Actually Work

Search engine crawlers are not browsers. They do not have your GPU, they do not have infinite time, and they definitely do not want to run your 2MB webpack bundle.

Googlebot uses a two-phase crawl. The first pass downloads the HTML and indexes whatever text it finds immediately. Days or weeks later, a second pass runs JavaScript and indexes any dynamically rendered content. That delay between passes is the problem — if your content depends entirely on JavaScript to appear, you are invisible during the first pass, which is when most ranking decisions happen.

Bing, Baidu, and smaller search engines are even less forgiving. Some run zero JavaScript. Baidu's crawler, which matters enormously if you target the Chinese market, has notoriously weak JS rendering. If your `<title>` tag is set via `document.title = "..."` instead of in the HTML source, Baidu simply does not see it.

What this means in practice: every piece of content you want indexed must exist in the initial HTML payload. Not after hydration. Not after an API call. In the raw HTTP response body.

## The SPA Problem and Three Ways Out

A traditional Vue or React SPA built with `create-vue` or Create React App ships an HTML file that looks like this:

\`\`\`html
<!DOCTYPE html>
<html>
<head>
  <title>My App</title>
</head>
<body>
  <div id="app"></div>
  <script src="/assets/index.abc123.js"></script>
</body>
</html>
\`\`\`

Every page on your site — homepage, about, pricing, blog posts — serves this exact same HTML. The `<div id="app">` is empty. The JavaScript bundle replaces it with actual content after it downloads, parses, and executes. That chain takes 2-5 seconds for a user on a fast connection. For a crawler on a budget, it might time out before any content appears.

There are three ways out of this hole.

### Static Site Generation

Tools like Next.js, Nuxt, and Astro pre-render your pages at build time into static HTML files. No server, no runtime rendering — just flat HTML with the content already in it. This is what I use for schg.xyz. Every tool page compiles to an HTML file with the title, description, and JSON-LD already embedded. The crawler sees everything on the first request.

\`\`\`bash
# Static export in Next.js
next build && next export
# Output: out/zh/tools/time/index.html — full HTML, no JS required
\`\`\`

The trade-off: content that changes frequently needs a rebuild. For a blog or tool site, that is fine. For a dashboard with user-specific data, it is not.

### Server-Side Rendering

With SSR, every request hits your Node.js server, which renders the React/Vue tree to an HTML string and sends it back. The crawler gets full content. The user gets an interactive page after hydration.

The catch: SSR adds server cost and complexity. Every page load runs your component tree on the server. At scale, you need caching layers, CDN integration, and fallback handling for when rendering fails. I have debugged SSR memory leaks at 3 AM and I do not recommend the experience.

### Hybrid: ISR and Partial Prerendering

Next.js Incremental Static Regeneration lets you statically generate pages at request time and cache the result. The first visitor triggers a build; subsequent visitors get static HTML. It gives you the SEO benefits of static with the freshness of SSR, without running a render server for every request.

\`\`\`javascript
// Next.js ISR — revalidate every 60 seconds
export async function getStaticProps() {
  const posts = await fetchPosts()
  return { props: { posts }, revalidate: 60 }
}
\`\`\`

## The HTML Tags That Search Engines Actually Read

You can write the most beautiful React component tree in the world. If these HTML elements are wrong or missing, your rankings suffer.

### Title Tag

The `<title>` is the single most important on-page SEO element. It must be unique per page, include the primary keyword near the beginning, and stay under 60 characters. Never default to the app name on every page.

\`\`\`tsx
// Good: unique, keyword-first, concise
export async function generateMetadata({ params }) {
  const { lang } = await params
  return {
    title: lang === 'zh' ? '时间戳转换 - 站长工具' : 'Timestamp Converter - Webmaster Tools',
  }
}
\`\`\`

Framework-specific note: if you are using Vue with `vue-meta` or React Helmet, verify that the title appears in the source HTML, not just after hydration. Right-click → View Page Source. If you do not see the title tag, the crawler does not either.

### Meta Description

Not a direct ranking factor, but it controls the snippet text under your link in search results. A compelling snippet gets more clicks. More clicks signal relevance to Google. Indirectly, description matters a lot.

### Hreflang Tags

If your site has multiple languages, hreflang tells Google which version to show to which user. Missing or broken hreflang is one of the most common international SEO issues I see.

\`\`\`html
<link rel="alternate" hreflang="zh" href="https://schg.xyz/zh/tools/time/" />
<link rel="alternate" hreflang="en" href="https://en/tools/time/" />
<link rel="alternate" hreflang="x-default" href="https://schg.xyz/zh/tools/time/" />
\`\`\`

Important detail: hreflang URLs must be absolute and must include the trailing slash if your canonical does. Inconsistent trailing slashes between canonical and hreflang confuse Google and split your indexing signals between two URLs it treats as different pages.

### Semantic HTML Structure

Crawlers parse heading hierarchy (`<h1>` through `<h6>`) to understand document structure. A page with one `<h1>`, clear `<h2>` sections, and proper semantic tags (`<nav>`, `<main>`, `<article>`) signals well-organized content.

I used to wrap everything in `<div>` tags because it was easier to style. The crawler saw undifferentiated text blocks. Switching to semantic HTML took an afternoon and gave every page a machine-readable outline for free.

## JSON-LD: The Structured Data Most Developers Skip

Structured data lets you tell search engines exactly what your page contains — not through inference, but through explicit typed data. JSON-LD is the format Google recommends, and it belongs in every page's `<head>`.

For schg.xyz, I added three schema types to every tool page.

### WebApplication Schema

Tells Google this page is an interactive web application, not just a document. Includes the application category, operating system requirements, and publisher information.

\`\`\`html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Timestamp Converter",
  "description": "Convert between Unix timestamps and human-readable dates.",
  "url": "https://schg.xyz/en/tools/time/",
  "applicationCategory": "DeveloperApplication",
  "operatingSystem": "Any",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
}
</script>
\`\`\`

### BreadcrumbList Schema

Produces the breadcrumb trail you see under search results. Instead of a bare URL, users see "Home > Tools > Timestamp Converter" which increases click-through.

\`\`\`html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://schg.xyz/en/" },
    { "@type": "ListItem", "position": 2, "name": "Tools", "item": "https://schg.xyz/en/tools/time/" },
    { "@type": "ListItem", "position": 3, "name": "Timestamp Converter", "item": "https://schg.xyz/en/tools/time/" }
  ]
}
</script>
\`\`\`

### Testing Structured Data

Google's Rich Results Test tool validates your JSON-LD. Paste your URL or code snippet and it shows exactly which rich results your page is eligible for. I run this on every new page type before launch. A missing `"@type"` or wrong URL format means your structured data is silently ignored.

You can also use the [JSON Tools](https://schg.xyz/en/tools/json/) on schg.xyz to format and validate your JSON-LD snippets before embedding them — catching syntax errors in structured data is much faster with a formatter than squinting at a minified string in your `<head>`.

## Core Web Vitals and SEO: The Performance Connection

In 2021 Google made Core Web Vitals a ranking signal. The three metrics that matter:

- **LCP (Largest Contentful Paint)**: How fast the main content loads. Target under 2.5 seconds.
- **INP (Interaction to Next Paint)**: How fast the page responds to clicks and taps. Target under 200ms.
- **CLS (Cumulative Layout Shift)**: How much the page jumps around while loading. Target under 0.1.

For a static HTML site, these are easy to hit. For a heavy SPA, they are not. Here is what matters in practice.

### LCP: Kill the Render-Blocking Chain

Your LCP is only as fast as the slowest resource in the critical path. A common culprit: loading a web font from Google Fonts, which blocks text rendering until the font file arrives.

\`\`\`html
<!-- Bad: blocks rendering -->
<link href="https://fonts.googleapis.com/css2?family=Inter" rel="stylesheet">

<!-- Better: self-host with font-display: swap -->
<style>
@font-face {
  font-family: 'Inter';
  src: url('/fonts/inter.woff2') format('woff2');
  font-display: swap;
}
</style>
\`\`\`

Self-hosting fonts and using `font-display: swap` means text renders immediately in a fallback font, then swaps when the custom font loads. No blank screen while waiting for the font CDN.

### CLS: Reserve Space for Dynamic Content

Layout shift happens when content pops in after the initial render and pushes everything down. The fix is simple: always specify width and height on images, and never inject ads or embeds without a reserved container.

\`\`\`css
img {
  width: 100%;
  height: auto;
  aspect-ratio: attr(width) / attr(height);
}
\`\`\`

For ad slots, reserve the container dimensions even when the ad has not loaded. An empty 300x250 box is better than a 0-height box that expands and shifts your content.

### INP: Less JavaScript, Faster Responses

Interaction delay usually comes from long tasks — JavaScript functions that block the main thread for more than 50ms. The fix is less about optimization tricks and more about shipping less JavaScript in the first place.

This is another argument for static generation. A statically exported page has zero framework JavaScript to hydrate. The browser parses HTML and paints it. There is nothing to block interaction because there is nothing to execute.

## A Practical Checklist for Frontend SEO

Here is what I check on every project before launch. It takes about 30 minutes and catches 90% of SEO issues.

- View Page Source on every page type. Is the title tag there? The meta description? The heading hierarchy?
- Run Google's Rich Results Test on one URL per page type. Are your JSON-LD schemas valid?
- Check hreflang tags with a crawler like Screaming Frog. Are all alternates reciprocal (A links to B, B links back to A)?
- Run Lighthouse in incognito mode. Is LCP under 2.5s, CLS under 0.1?
- Submit the sitemap to Google Search Console. Are all important URLs included? Are any 404s or redirects in the index?
- Verify the `<html lang>` attribute matches the page language. A hardcoded `lang="en"` on a Chinese page or vice versa confuses screen readers and search engines.
- Use a [regex tester](https://schg.xyz/en/tools/regex/) to validate URL patterns in your sitemap and hreflang tags before deployment. A mistyped regex in your routing config can silently break dozens of pages.

## Conclusion

Frontend SEO stopped being someone else's problem the moment SPAs became the default. The good news is that the most impactful fixes are the simplest ones: ship HTML with content in it, write a unique `<title>` per page, add JSON-LD structured data, and do not make crawlers run your JavaScript.

I rebuilt schg.xyz as a fully static export after wasting months with an SPA that barely got indexed. The improvement was immediate — every new tool page was indexed within days instead of weeks. For content sites, documentation, blogs, and marketing pages, static generation is not just a performance optimization. It is an SEO requirement.

The tools mentioned in this article — JSON formatter, regex tester, config converter — are all available for free at [schg.xyz](https://schg.xyz). They run entirely in your browser. No uploads, no registration, no server-side processing. Just tools that work.`,
  },
  {
    slug: 'json-format-guide',
    title: 'What is JSON? How to Format, Validate and Parse JSON Data',
    description: 'Complete guide to JSON format: learn JSON syntax rules, common mistakes to avoid, how to format JSON in JavaScript/Python/Go, and best practices for API development.',
    category: 'Frontend',
    categoryKey: 'frontend',
    date: '2026-04-23',
    readTime: 6,
    hot: true,
    content: `## Why JSON Won

I have been writing APIs for eight years, and I have seen data formats come and go. XML was the standard when I started — verbose, namespaced, and painful to read. YAML is pleasant for config files but a nightmare for API responses (significant whitespace in a data interchange format? no thanks).

JSON struck the right balance. It is readable enough for a human to scan, strict enough for a machine to parse reliably, and simple enough that implementing a parser from scratch takes an afternoon.

Here is what you need to know to use it well.

## JSON Basic Structure

JSON has only two structures, and understanding this makes everything else easier.

**Key-value pair collection (object)**: Wrapped in curly braces {}, keys are strings, values can be any type.

\`\`\`json
{"name": "Ken", "age": 30, "active": true}
\`\`\`

**Ordered value list (array)**: Wrapped in square brackets [], values can be any type.

\`\`\`json
["apple", "banana", "cherry"]
\`\`\`

Objects nest inside arrays, arrays nest inside objects. Every JSON document starts with either {} or [].

## JSON Data Types

JSON supports exactly 6 data types. There is no date type, no undefined, no binary — you represent those as strings or numbers by convention.

- **String**: Double-quoted only, e.g. "hello"
- **Number**: Integer or float, e.g. 42, 3.14
- **Boolean**: true or false
- **null**: Represents empty value
- **Object**: Key-value pair collection
- **Array**: Ordered value list

The strictness catches beginners. In JavaScript you can write {name: "Ken"} but JSON requires {"name": "Ken"}. Single quotes are invalid. Trailing commas will break your parser. These rules exist because JSON is designed for cross-language data exchange — it has to be unambiguous.

## Common JSON Errors

### 1. Trailing Commas

\`\`\`json
{"a": 1, "b": 2,}  // Invalid
{"a": 1, "b": 2}   // Valid
\`\`\`

This is the most common JSON error I see in code reviews. In JavaScript, trailing commas in objects are legal since ES5. In JSON, they are not. Your fetch response will fail silently and you will spend twenty minutes debugging.

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

### 4. Nested Complexity

A less obvious issue: deeply nested JSON (4+ levels) becomes unreadable fast.

\`\`\`json
{
  "user": {
    "profile": {
      "settings": {
        "notifications": {
          "email": true
        }
      }
    }
  }
}
\`\`\`

When you need to access user.profile.settings.notifications.email, something has gone wrong with your schema design. Consider flattening or splitting into separate resources.

## How to Format JSON in Code

Pretty-printing JSON is essential during development. Every language has a built-in way:

\`\`\`javascript
// JavaScript
const formatted = JSON.stringify(obj, null, 2)
\`\`\`

\`\`\`python
# Python
import json
formatted = json.dumps(obj, indent=2)
\`\`\`

\`\`\`go
// Go
import "encoding/json"
data, _ := json.MarshalIndent(obj, "", "  ")
\`\`\`

The second parameter (null or "" ) is a replacer or prefix, and the third is the indentation string. Use 2 spaces — tabs in JSON files will annoy your teammates.

## JSON in the Real World

### API Responses

Every REST API I have consumed in the last five years returned JSON. The pattern is always the same:

\`\`\`json
{
  "status": 200,
  "data": { ... },
  "meta": {
    "page": 1,
    "total": 42
  }
}
\`\`\`

Consistent response structure matters more than you think. When every endpoint returns a different shape, your frontend error handling becomes a tangle of optional chaining and null checks.

### Configuration Files

VS Code settings.json, tsconfig.json, package.json — modern tooling runs on JSON. One practical tip: keep your package.json dependencies alphabetized. It makes merge conflicts easier to resolve.

### When Not to Use JSON

JSON has limits. It has no comments, so complex configuration with explanations should use YAML or TOML. It has no schema enforcement by default — validate incoming JSON with tools like JSON Schema or Zod. And for high-performance logging, JSON is verbose; consider protobuf or msgpack for throughput-sensitive paths.

## JSON Validation

Catching invalid JSON early saves debugging time. The fastest way: paste into any JSON validator. For automated validation in your CI pipeline:

\`\`\`bash
# Validate JSON files in CI
echo '{"key": "value"}' | python3 -m json.tool
# If invalid, this command exits with non-zero status
\`\`\`

For JavaScript projects, I rely on AJV (Another JSON Validator) with JSON Schema:

\`\`\`javascript
import Ajv from "ajv"
const ajv = new Ajv()

const schema = {
  type: "object",
  properties: {
    name: { type: "string" },
    age: { type: "integer", minimum: 0 }
  },
  required: ["name", "age"]
}

const validate = ajv.compile(schema)
validate({ name: "Ken", age: 30 }) // true
validate({ name: "Ken", age: -1 }) // false
\`\`\`

## JSON Security

JSON has security considerations that many developers overlook.

### Prototype Pollution

When parsing JSON in JavaScript, never use the dangerous object literal pattern:

\`\`\`javascript
// Dangerous
const data = eval("(" + jsonString + ")")

// Safe
const data = JSON.parse(jsonString)
\`\`\`

### Too Deep Nesting Attacks

An attacker can send deeply nested JSON to cause a stack overflow in your parser. Set a depth limit:

\`\`\`javascript
const data = JSON.parse(jsonString, (key, value) => {
  return value
}, 512) // Max depth
\`\`\`

## Wrapping Up

JSON is not the newest or the fastest data format, but it is the most universal. Learn its quirks early — the strict quoting rules, the lack of comments, the no-trailing-comma rule — and they will never surprise you in production.
## Conclusion

JSON is everywhere because it works. Learn its syntax rules, keep your nesting shallow, validate at the boundary, and pretty-print during development. That is 90% of what you need to know.`,
  },
  {
    slug: 'base64-encoding-guide',
    title: 'Base64 Encoding Explained: How It Works and When to Use It',
    description: 'Learn how Base64 encoding works, why it increases file size by 33%, and practical use cases like embedding images in HTML, JWT tokens, and URL-safe encoding.',
    category: 'Frontend',
    categoryKey: 'frontend',
    date: '2026-04-24',
    readTime: 6,
    hot: true,
    content: `## What is Base64 Encoding?

Base64 is a binary-to-text encoding scheme that converts binary data into printable ASCII characters. It uses 64 characters (A-Z, a-z, 0-9, +, /) to represent binary data, with = used for padding.

A common misunderstanding: Base64 is NOT encryption and NOT compression. If you Base64-encode a file and it gets smaller, that is coincidence — the encoded output is always larger than the input, by about 33%.

## How Base64 Encoding Works

### The Conversion Process

1. Take every 3 bytes (24 bits) as a group
2. Split the 24 bits into four 6-bit groups
3. Map each 6-bit value (0-63) to the Base64 character table
4. If the last group has fewer than 3 bytes, pad with =

### Example

Encoding the string Man to Base64:

\`\`\`
M ASCII: 77  ->  01001101
a ASCII: 97  ->  01100001
n ASCII: 110 ->  01101110

Combined 24 bits:  01001101 01100001 01101110
Four 6-bit groups:  010011 010110 000101 101110
Base64 characters:  T  W  F  u

Result: "TWFu"
\`\`\`

### Why 33% Size Increase?

3 bytes (24 bits) become 4 Base64 characters, each taking 1 byte in transmission. The ratio is 4:3, a 1/3 increase. If you are sending large files, this overhead adds up fast.

## When to Use Base64 (and When Not To)

### Image Data URIs

Embedding small images directly in HTML eliminates HTTP requests:

\`\`\`html
<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA..." />
\`\`\`

I use this for icons and logos under 10KB. For anything larger, the HTML file size bloat is not worth it — serve the image file normally and let the browser cache it.

### CSS Background Images

\`\`\`css
.logo {
  background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0i...");
}
\`\`\`

### JWT Tokens

JWT (JSON Web Tokens) use Base64URL encoding — a variant that replaces + with - and / with _, and strips the = padding. Every time you decode a JWT on jwt.io, you are looking at three Base64-encoded sections.

\`\`\`javascript
// Decoding a JWT payload in JavaScript
const token = "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjF9.ZeMqMQ"
const payload = JSON.parse(atob(token.split(".")[1]))
console.log(payload) // { "userId": 1 }
\`\`\`

### Email Attachments

Email protocols (SMTP) were designed for text. Binary attachments are Base64-encoded before sending. This is why email messages are about 37% larger than the original attachment — the Base64 overhead plus MIME headers.

## Browser API: btoa() and atob()

Modern browsers provide two Base64 functions:

\`\`\`javascript
// Encode a string to Base64
const encoded = btoa("hello world")
console.log(encoded) // "aGVsbG8gd29ybGQ="

// Decode Base64 to string
const decoded = atob("aGVsbG8gd29ybGQ=")
console.log(decoded) // "hello world"
\`\`\`

Important: btoa() throws an error on non-Latin1 characters. For UTF-8 text, encode first:

\`\`\`javascript
function base64Encode(str) {
  const bytes = new TextEncoder().encode(str)
  let binary = ""
  bytes.forEach(b => binary += String.fromCharCode(b))
  return btoa(binary)
}
\`\`\`

## Base64 in Other Languages

\`\`\`python
import base64

# Encode
encoded = base64.b64encode(b"hello world")
print(encoded)  # b'aGVsbG8gd29ybGQ='

# Decode
decoded = base64.b64decode("aGVsbG8gd29ybGQ=")
print(decoded)  # b'hello world'
\`\`\`

\`\`\`go
import "encoding/base64"

// Encode
encoded := base64.StdEncoding.EncodeToString([]byte("hello world"))

// Decode
decoded, _ := base64.StdEncoding.DecodeString("aGVsbG8gd29ybGQ=")
\`\`\`

## URL-Safe Base64

Standard Base64 uses + and / characters, which have special meaning in URLs. Base64URL encoding replaces them:

\`\`\`javascript
function base64UrlEncode(str) {
  return btoa(str)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "")
}
\`\`\`

JWT tokens use this variant. If you decode a JWT and get garbled output, check whether you are using Base64URL instead of standard Base64.

## Base64 in Node.js

Node.js adds Buffer-based Base64 methods:

\`\`\`javascript
// Encode
const encoded = Buffer.from("hello world").toString("base64")

// Decode
const decoded = Buffer.from("aGVsbG8gd29ybGQ=", "base64").toString("utf-8")
\`\`\`

This is more reliable than btoa() because Buffer handles UTF-8 and binary data natively.

## A Real Debugging Story

Last month I spent two hours debugging a corrupted image upload. The frontend was encoding a JPEG as Base64 and sending it in a JSON body. The backend decoded it and saved to disk. But the image was unreadable — a pink-tinted mess.

The culprit: the Base64 string had a URL-encoded + somewhere in the query string layer. The server decoded %2B back to + but the frontend had already replaced + with spaces during serialization.

The fix: always use Base64URL for data that passes through URLs, and standard Base64 for data embedded directly in JSON bodies. Never mix them.

## When NOT to Use Base64

Three scenarios where Base64 is actively harmful:

1. **Large files over 1MB**: The 33% overhead adds significant bandwidth cost. Send raw binary with proper Content-Type headers.
2. **CDN-hosted images**: A CDN-delivered image loads faster and caches better than a Base64 data URI in your HTML.
3. **Binary APIs**: If your API is internal and both client and server control the transport, use protobuf or MessagePack. They are smaller and faster to encode/decode.
## Performance Considerations

Base64 encoding and decoding is CPU-cheap on modern hardware, but the 33% size increase means more data on the wire. For APIs returning large payloads, consider whether Base64 is necessary. Binary JSON formats like MessagePack or BSON avoid the overhead entirely.

My rule of thumb: if the encoded data fits in a single HTTP response (under 1MB), Base64 is fine. For file uploads or streaming data, send raw binary with the correct Content-Type header instead.`,
  },
  {
    slug: 'cron-expression-guide',
    title: 'Cron Expression Guide: Syntax, Examples and Common Schedules',
    description: 'Complete cron expression tutorial covering 5-field syntax, special characters, common scheduling patterns, and real-world examples for Linux, Node.js and GitHub Actions.',
    category: 'DevOps',
    categoryKey: 'devops',
    date: '2026-04-25',
    readTime: 6,
    content: `## What is a Cron Expression?

A cron expression is a string that defines when a scheduled task should run. If you have ever needed to run a script "every day at 3 AM" or "every Monday at 9:30 AM", cron is the tool you reach for.

Cron has been around since the 1970s. It has not changed much because it does not need to — the 5-field expression system is compact, precise, and universally supported across Unix-like systems.

## The 5-Field Syntax

A cron expression has 5 fields separated by spaces:

\`\`\`
┬    ┬    ┬    ┬    ┬
│    │    │    │    └─  Day of Week (0-7, 0 and 7 = Sunday)
│    │    │    └──────  Month (1-12)
│    │    └────────────  Day of Month (1-31)
│    └─────────────────  Hour (0-23)
└──────────────────────  Minute (0-59)
\`\`\`

Each field supports:

- **Wildcard (*)**: Matches every value. \`*\` in the hour field means "every hour".
- **Range (-)**: \`9-17\` means "from 9 AM to 5 PM inclusive".
- **Step (/)**: \`*/15\` in minutes means "every 15 minutes".
- **List (,)**: \`1,3,5\` means "Monday, Wednesday, Friday".
- **Combined**: \`*/10 9-17 * * 1-5\` means "every 10 minutes, between 9 AM and 5 PM, Monday through Friday".

## Common Cron Schedules

Here are patterns I use regularly:

\`\`\`
# Every day at 3:00 AM (backup scripts, log rotation)
0 3 * * *

# Every hour (health checks, cache warming)
0 * * * *

# Every 5 minutes (high-frequency monitoring)
*/5 * * * *

# Every Monday at 9:00 AM (weekly reports)
0 9 * * 1

# First day of every month at midnight (monthly cleanup)
0 0 1 * *

# Every weekday at 6:00 PM (end-of-day tasks)
0 18 * * 1-5
\`\`\`

## Setting Up a Cron Job

Cron jobs are managed through the crontab file. Each user has their own.

\`\`\`bash
# Edit your crontab
crontab -e

# List your current cron jobs
crontab -l

# Remove all cron jobs
crontab -r
\`\`\`

The crontab format adds six optional environment variable fields before the schedule:

\`\`\`bash
# Example crontab entry
SHELL=/bin/bash
PATH=/usr/local/bin:/usr/bin:/bin

# Run backup script every day at 2:30 AM
30 2 * * * /home/user/scripts/backup.sh >> /var/log/backup.log 2>&1

# Clean temp files every hour
0 * * * * find /tmp -type f -mtime +1 -delete
\`\`\`

## Special Syntax: @reboot and Friends

Some cron implementations support @-strings for common schedules:

\`\`\`bash
@reboot     # Run once at startup
@daily      # Run once a day (0 0 * * *)
@weekly     # Run once a week (0 0 * * 0)
@monthly    # Run once a month (0 0 1 * *)
@yearly     # Run once a year (0 0 1 1 *)
@hourly     # Run once an hour (0 * * * *)
\`\`\`

@reboot is particularly useful for starting services or daemons when a server restarts unexpectedly.

## Cron in Docker Containers

Cron does not run inside Docker containers by default. You either install cron in the container or use the host cron to trigger docker exec:

\`\`\`bash
# Host-side cron to run a container task
0 3 * * * docker exec my-container /usr/local/bin/backup
\`\`\`

Alternatively, use a dedicated cron container image that bundles cron:

\`\`\`dockerfile
FROM alpine:latest
RUN apk add --no-cache dcron
COPY crontab /var/spool/cron/crontabs/root
CMD ["crond", "-f", "-l", "2"]
\`\`\`

## Logging and Debugging

Cron has a reputation for being hard to debug. A job fails silently and you only find out weeks later.

Two rules I follow:

1. **Always redirect output to a log file**. If you do not, cron sends output as email (which is often not configured).

\`\`\`bash
# Bad: output disappears
30 2 * * * /home/user/scripts/backup.sh

# Good: output is logged
30 2 * * * /home/user/scripts/backup.sh >> /var/log/backup.log 2>&1
\`\`\`

2. **Use absolute paths**. Cron runs with a minimal environment. Your script may work in your terminal and fail in cron because $PATH is different.

\`\`\`bash
# Bad: may fail in cron
30 2 * * * python3 script.py

# Good: explicit paths
30 2 * * * /usr/bin/python3 /home/user/scripts/script.py
\`\`\`

## A Real Mistake

Last year I set up a cron job to renew an SSL certificate every 2 months. I wrote:

\`\`\`bash
0 0 1 */2 * /usr/bin/certbot renew
\`\`\`

I thought "*/2" in the month field means "every 2 months". It does. But the day-of-month field is "1", so the job ran on the 1st of every 2nd month. The certificate expired on March 15th and the next run was April 1st. My site went down for two weeks while I was on vacation.

The fix: use a monitoring service to check certificate expiry, and set up a daily cron for cert renewal that only runs if renewal is needed (which is what certbot renew does by default — it checks before renewing).

## Wrap Up

Cron is one of those Unix tools that looks simple on the surface but has enough edge cases to fill a book. Use absolute paths, log everything, and never assume your cron expression means what you think it does without testing it first with a cron expression parser.`,
  },
  {
    slug: 'ip-address-guide',
    title: 'IP Address Basics: IPv4 vs IPv6, CIDR Notation and Subnetting',
    description: 'Learn IP addressing fundamentals: IPv4 structure, IPv6 simplified notation, private address ranges, CIDR subnetting explained with examples for network configuration.',
    category: 'DevOps',
    categoryKey: 'devops',
    date: '2026-04-26',
    readTime: 6,
    content: `## What is an IP Address?

An IP address (Internet Protocol Address) is a unique identifier for devices on a network. Think of it as a mailing address for your computer — without it, other devices cannot find you on the internet.

Two versions exist today: IPv4 and IPv6. IPv4 is the old workhorse, still carrying the majority of internet traffic. IPv6 is the future, designed to solve the address exhaustion problem that IPv4 created.

## IPv4: The Classic

An IPv4 address is a 32-bit number, written as four decimal octets separated by dots:

\`\`\`
192.168.1.1
\`\`\`

Each octet ranges from 0 to 255. That gives 2^32 = about 4.3 billion addresses total. When the internet was designed in the 1980s, that seemed like plenty.

### Private vs Public IPs

Some IPv4 ranges are reserved for private networks and never routed on the public internet:

\`\`\`
10.0.0.0 - 10.255.255.255   (10.0.0.0/8, 16.7M addresses)
172.16.0.0 - 172.31.255.255 (172.16.0.0/12, 1M addresses)
192.168.0.0 - 192.168.255.255 (192.168.0.0/16, 65K addresses)
127.0.0.0 - 127.255.255.255 (loopback/localhost)
\`\`\`

If you have a home router, your devices likely use 192.168.x.x internally. The router uses NAT (Network Address Translation) to map many private IPs to one public IP.

## CIDR Notation

CIDR (Classless Inter-Domain Routing) is how you specify an IP range. The format is:

\`\`\`
<base-ip>/<prefix-length>
\`\`\`

The prefix length tells you how many bits are the network portion:

\`\`\`
192.168.1.0/24  -> network: 24 bits, hosts: 8 bits (254 usable addresses)
10.0.0.0/8      -> network: 8 bits, hosts: 24 bits (16.7M addresses)
172.16.0.0/12   -> network: 12 bits, hosts: 20 bits (~1M addresses)
\`\`\`

### Subnet Mask Cheat Sheet

\`\`\`
/32 = 255.255.255.255 (1 address — a single host)
/30 = 255.255.255.252 (4 addresses — 2 usable, for point-to-point links)
/28 = 255.255.255.240 (16 addresses — 14 usable)
/24 = 255.255.255.0   (256 addresses — 254 usable, common for small offices)
/16 = 255.255.0.0     (65,536 addresses)
/8  = 255.0.0.0       (16,777,216 addresses)
\`\`\`

### Calculating a Subnet

Practical example: you have 192.168.1.0/28 and need to know the usable range.

\`\`\`python
# Python subnet calculation
import ipaddress

net = ipaddress.ip_network("192.168.1.0/28", strict=False)
print(f"Network: {net.network_address}")
print(f"Broadcast: {net.broadcast_address}")
print(f"Usable: {list(net.hosts())}")

# Output:
# Network: 192.168.1.0
# Broadcast: 192.168.1.15
# Usable: 192.168.1.1 - 192.168.1.14 (14 addresses)
\`\`\`

## IPv6: The Successor

IPv6 uses 128-bit addresses, written as eight groups of four hexadecimal digits:

\`\`\`
2001:0db8:85a3:0000:0000:8a2e:0370:7334
\`\`\`

That is 2^128 addresses — enough to assign an IP to every grain of sand on Earth with room to spare.

### IPv6 Shortening Rules

\`\`\`
Full:    2001:0db8:85a3:0000:0000:8a2e:0370:7334
Rule 1:  2001:db8:85a3:0:0:8a2e:370:7334  (leading zeros removed)
Rule 2:  2001:db8:85a3::8a2e:370:7334     (double colon for consecutive zeros)
\`\`\`

Only one double colon is allowed per address. The abbreviation is unambiguous because the router calculates how many zero groups are missing.

### IPv6 Address Types

IPv6 eliminates broadcast and introduces new address types:

- **Unicast**: One-to-one communication (same as IPv4 unicast)
- **Anycast**: One-to-nearest (multiple devices share the same IP, traffic goes to the closest one)
- **Multicast**: One-to-many (replaces IPv4 broadcast)

## Why IPv6 Adoption Matters

The Asia-Pacific region ran out of IPv4 addresses in 2011. Europe ran out in 2019. The US ran out in 2015. If you are deploying new infrastructure today, supporting IPv6 is not optional — major cloud providers charge extra for IPv4 addresses now.

AWS charged $3.65 per IPv4 address per month as of 2024. A moderate deployment of 50 IPs costs $2,190 a year just for the addresses. IPv6 addresses are free.

## Checking Your IP

\`\`\`bash
# Your public IP (IPv4)
curl -4 ifconfig.me

# Your public IP (IPv6)  
curl -6 ifconfig.me

# Local network configuration
ip addr show  # Linux
ifconfig      # macOS
\`\`\`

## Wrap Up

## Common IP Tools and Commands

Every developer needs basic IP troubleshooting skills:

\`\`\`bash
# Ping a host
ping -c 4 google.com

# Trace the route to a host
traceroute google.com  # Linux/macOS
tracert google.com     # Windows

# DNS lookup
nslookup google.com
dig google.com

# Check open ports
netstat -tuln | grep LISTEN
ss -tuln  # Modern Linux alternative
\`\`\`

## IP and Firewall Rules

Understanding CIDR is essential for writing firewall rules:

\`\`\`bash
# Allow SSH from a specific subnet
ufw allow from 192.168.1.0/24 to any port 22

# Block a malicious IP range
iptables -A INPUT -s 10.0.0.0/8 -j DROP

# Allow traffic from your office VPN
aws ec2 authorize-security-group-ingress \
    --group-id sg-12345 \
    --protocol tcp --port 443 \
    --cidr 203.0.113.0/24
\`\`\`

One of my most memorable production incidents: I wrote a firewall rule allowing 192.168.1.0/24 but the VPN assigned addresses in 10.0.0.0/8. Took me three hours to realize the mismatch because I assumed the VPN used the same range as the office network. Always verify your IP ranges before writing firewall rules.
Understanding IP addresses, subnet masks, and CIDR notation is not just network-admin trivia. When you deploy a cloud server, configure a firewall, or debug a connection timeout, this knowledge saves hours of guesswork. The transition from IPv4 to IPv6 is happening slowly but surely — knowing both ensures you are not caught off guard.`,
  },
  {
    slug: 'encryption-algorithm-guide',
    title: 'MD5 vs SHA vs AES: Key Differences Between Hash and Encryption Algorithms',
    description: 'Learn the differences between MD5, SHA-256, AES and RSA algorithms. Understand when to use hash functions vs encryption, with practical code examples for developers.',
    category: 'Security',
    categoryKey: 'security',
    date: '2026-04-27',
    readTime: 6,
    content: `## Overview

MD5, SHA, and AES appear frequently in development, but they serve completely different purposes. I see developers confuse them all the time — using MD5 for password storage, assuming SHA is encryption, or thinking AES is a hash function.

Here is the distinction in one sentence: **MD5 and SHA are hashing algorithms (one-way, irreversible). AES is an encryption algorithm (two-way, reversible with a key).**

If you remember nothing else from this article, remember that.

## Hashing vs Encryption

### Hashing

A hash function takes any input and produces a fixed-length output. The same input always produces the same output. You cannot reverse a hash back to the original input — that is the entire point.

\`\`\`python
import hashlib

# Same input always produces the same hash
text = "hello world"
md5_hash = hashlib.md5(text.encode()).hexdigest()
sha256_hash = hashlib.sha256(text.encode()).hexdigest()

print(f"MD5:    {md5_hash}")    # 32 hex chars
print(f"SHA256: {sha256_hash}")  # 64 hex chars
\`\`\`

### Encryption

Encryption transforms data using a key. With the key, you can reverse the transformation. Without the key, you cannot (assuming strong encryption).

\`\`\`python
from cryptography.fernet import Fernet

# Generate a key
key = Fernet.generate_key()
cipher = Fernet(key)

# Encrypt
plaintext = b"hello world"
ciphertext = cipher.encrypt(plaintext)
print(f"Encrypted: {ciphertext}")

# Decrypt (reversible with the key)
decrypted = cipher.decrypt(ciphertext)
print(f"Decrypted: {decrypted}")  # b"hello world"
\`\`\`

## MD5: Legacy Hash

MD5 produces a 128-bit (32 character) hex output. It was once the standard for file integrity checks.

### Why MD5 Is Deprecated

MD5 is broken. Security researchers demonstrated collision attacks in 2004 — finding two different inputs that produce the same MD5 hash. By 2017, generating a collision took less than a dollar of cloud compute time.

\`\`\`python
# MD5 is fast but insecure
import hashlib, time

start = time.time()
for i in range(100000):
    hashlib.md5(b"test").hexdigest()
print(f"100K MD5 hashes: {time.time()-start:.2f}s")
\`\`\`

Use MD5 only for non-security purposes: checksums for file deduplication, caching keys, or compatibility with legacy systems.

## SHA-1, SHA-2, SHA-3

### SHA-1 (Deprecated)

Also broken since 2017 (Google demonstrated a collision). Git still uses SHA-1 for commit hashes, but that is a different context — Git uses SHA-1 for content addressing, not security.

### SHA-2 (Current Standard)

SHA-2 includes SHA-224, SHA-256, SHA-384, and SHA-512. SHA-256 is the most common — used in SSL/TLS certificates, Bitcoin, and Docker image verification.

\`\`\`go
// SHA-256 in Go
import (
    "crypto/sha256"
    "fmt"
)

func main() {
    h := sha256.New()
    h.Write([]byte("hello world"))
    fmt.Printf("%x", h.Sum(nil))
}
\`\`\`

### SHA-3 (Future-Proof)

SHA-3 is the newest NIST standard. It uses a completely different internal structure (Sponge construction) from SHA-2. If you are designing a new system today with a 20-year horizon, use SHA-3.

## AES Encryption

AES (Advanced Encryption Standard) is the gold standard for symmetric encryption. Governments use it to protect classified information. Your HTTPS connection uses it. Your Wi-Fi password is protected by it.

### AES Modes

AES operates in different modes. The most common:

- **AES-ECB**: Do not use. Identical plaintext blocks produce identical ciphertext, leaking patterns.
- **AES-CBC**: Old standard. Requires an IV (Initialization Vector). Vulnerable to padding oracle attacks if not implemented carefully.
- **AES-GCM**: Recommended. Provides authenticated encryption — it both encrypts and verifies integrity.

\`\`\`javascript
// AES-GCM in Node.js
const crypto = require("crypto")

const key = crypto.randomBytes(32)  // 256-bit key
const iv = crypto.randomBytes(12)   // 96-bit IV for GCM

const cipher = crypto.createCipheriv("aes-256-gcm", key, iv)
let encrypted = cipher.update("hello world", "utf8", "hex")
encrypted += cipher.final("hex")
const tag = cipher.getAuthTag().toString("hex")

console.log({ encrypted, tag })

const decipher = crypto.createDecipheriv("aes-256-gcm", key, iv)
decipher.setAuthTag(Buffer.from(tag, "hex"))
let decrypted = decipher.update(encrypted, "hex", "utf8")
decrypted += decipher.final("utf8")
console.log(decrypted) // "hello world"
\`\`\`

### AES Key Sizes

AES supports three key sizes: 128, 192, and 256 bits. AES-128 is still secure. AES-256 provides a higher security margin. For most applications, AES-128 is sufficient. For compliance or paranoid workloads, use AES-256.

## Real-World Mistakes I Have Seen

### Mistake 1: Hashing Passwords with MD5 or Plain SHA

If your user database gets leaked, MD5 hashes are reversed in milliseconds. Use bcrypt, scrypt, or Argon2 instead:

\`\`\`python
import bcrypt

# Hash a password (bcrypt includes the salt automatically)
hashed = bcrypt.hashpw(b"user_password", bcrypt.gensalt())

# Verify
bcrypt.checkpw(b"user_password", hashed)  # True
\`\`\`

### Mistake 2: Using ECB Mode

ECB mode encrypts each block independently. The result: images encrypted with ECB still show outlines of the original image because identical pixel values produce identical encrypted blocks.

### Mistake 3: Hardcoding Keys

\`\`\`javascript
// Bad
const encryptionKey = "MySuperSecretKey123"

// Better
const encryptionKey = process.env.ENCRYPTION_KEY
\`\`\`

## Which Algorithm Should You Use?

- **File integrity checks**: SHA-256
- **Password storage**: bcrypt or Argon2
- **Data at rest**: AES-256-GCM
- **Data in transit**: TLS (which uses SHA-256 + AES-GCM)
- **Legacy system compatibility**: MD5 or SHA-1 (for non-security use only)

## Wrap Up

The hash vs encryption distinction is not academic — choosing the wrong algorithm creates security holes. Hash for verification, encrypt for confidentiality, and use the right tool for each job.`,
  },
  {
    slug: 'docker-install-ubuntu',
    title: 'How to Install Docker and Docker Compose on Ubuntu: Complete Guide',
    description: 'Step-by-step guide to install Docker Engine and Docker Compose on Ubuntu. Includes registry mirror setup for China, proxy configuration, and post-installation tips.',
    category: 'DevOps',
    categoryKey: 'devops',
    date: '2026-04-28',
    readTime: 6,
    hot: true,
    content: `This guide covers installing Docker Engine and Docker Compose on Ubuntu. The official apt repository method described below is the approach I use on all my servers — it is the most maintainable long-term.

## Prerequisites

You need an Ubuntu machine (20.04 or newer) with sudo access. A clean $5/month VPS works fine — Docker itself is lightweight.

\`\`\`bash
# Update existing packages
sudo apt update && sudo apt upgrade -y
\`\`\`

## Step 1: Install Dependencies

Docker requires some prerequisite packages for the apt repository to work over HTTPS:

\`\`\`bash
sudo apt install -y ca-certificates curl gnupg lsb-release
\`\`\`

## Step 2: Add Docker's GPG Key

\`\`\`bash
sudo mkdir -p /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg |   sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
sudo chmod a+r /etc/apt/keyrings/docker.gpg
\`\`\`

## Step 3: Add Docker's Repository

\`\`\`bash
echo   "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg]   https://download.docker.com/linux/ubuntu   $(lsb_release -cs) stable" |   sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
\`\`\`

## Step 4: Install Docker Engine

\`\`\`bash
sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin
\`\`\`

## Step 5: Install Docker Compose

Docker Compose v2 is now a Docker CLI plugin, not a separate binary:

\`\`\`bash
sudo apt install -y docker-compose-plugin

# Verify
docker compose version
\`\`\`

## Step 6: Post-Install Setup

Running Docker as root is inconvenient and a security risk. Add your user to the docker group:

\`\`\`bash
sudo usermod -aG docker $USER
newgrp docker  # Activate group change in current session
\`\`\`

## Step 7: Verify the Installation

\`\`\`bash
# Run the hello-world container
docker run hello-world

# You should see: "Hello from Docker!"
# This message shows your installation appears to be working correctly.
\`\`\`

## A docker-compose.yml Example

Here is the compose file I use for most of my web services:

\`\`\`yaml
version: "3.8"

services:
  web:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./html:/usr/share/nginx/html
      - ./nginx.conf:/etc/nginx/nginx.conf:ro
    restart: unless-stopped

  app:
    build: .
    env_file: .env
    depends_on:
      - db
    restart: unless-stopped

  db:
    image: postgres:16-alpine
    volumes:
      - pgdata:/var/lib/postgresql/data
    environment:
      POSTGRES_PASSWORD: \${DB_PASSWORD}
    restart: unless-stopped

volumes:
  pgdata:
\`\`\`

## Troubleshooting

### Permission Denied

If you get "permission denied" when running docker commands:

\`\`\`bash
# Check if your user is in the docker group
groups $USER

# If docker is not listed, log out and log back in, or run:
sudo usermod -aG docker $USER
\`\`\`

### Docker Daemon Not Running

\`\`\`bash
sudo systemctl status docker
sudo systemctl enable docker
sudo systemctl start docker
\`\`\`

### Proxy Configuration

If you are behind a corporate proxy:

\`\`\`bash
sudo mkdir -p /etc/systemd/system/docker.service.d
sudo tee /etc/systemd/system/docker.service.d/proxy.conf <<EOF
[Service]
Environment="HTTP_PROXY=http://proxy.example.com:8080"
Environment="HTTPS_PROXY=http://proxy.example.com:8080"
Environment="NO_PROXY=localhost,127.0.0.1"
EOF
sudo systemctl daemon-reload
sudo systemctl restart docker
\`\`\`

### apt-key is Deprecated

If you see "Warning: apt-key is deprecated" in older tutorials, the method above (using /etc/apt/keyrings) is the modern replacement.

## Wrap Up

## Running Docker Without Sudo

After installing Docker, every command requires sudo unless you add your user to the docker group. This gets old fast.

\`\`\`bash
# Without the group:
sudo docker ps
sudo docker run nginx
sudo docker logs my-container

# With the group:
docker ps
docker run nginx
docker logs my-container
\`\`\`

Security note: the docker group grants root-equivalent privileges. Anyone in the docker group can run privileged containers and access the host filesystem. On production servers, consider using Rootless Docker instead.

## Cleaning Up Unused Resources

Docker does not clean up after itself. Over time, dangling images, stopped containers, and unused volumes accumulate:

\`\`\`bash
# List disk usage
docker system df

# Remove all unused data
docker system prune -a --volumes

# Remove only stopped containers
docker container prune

# Remove dangling images
docker image prune
\`\`\`

I run docker system prune once a month on my servers. It typically frees 5-10GB of disk space.

## Setting Resource Limits

Without limits, a single container can consume all host resources. Always set limits in production:

\`\`\`yaml
services:
  app:
    image: my-app:latest
    deploy:
      resources:
        limits:
          cpus: "0.5"
          memory: "256M"
        reservations:
          cpus: "0.25"
          memory: "128M"
\`\`\`

Or at runtime:

\`\`\`bash
docker run -d --memory="256m" --cpus="0.5" my-app
\`\`\`

I learned this the hard way when a memory leak in a Node.js container OOM-killed my entire server. Now every container gets resource limits.
## Quick Reference: Useful Docker Commands

Here is the cheat sheet I keep pinned in my terminal:

\`\`\`bash
# Container lifecycle
docker ps                    # List running containers
docker ps -a                 # List all containers
docker stop $(docker ps -q)  # Stop all containers
docker rm $(docker ps -aq)   # Remove all containers

# Images
docker images                # List images
docker pull nginx:alpine     # Pull an image
docker rmi nginx             # Remove an image
docker build -t my-app .     # Build an image from Dockerfile

# Logs and debugging
docker logs -f container_name    # Follow logs
docker exec -it container bash   # Shell into a container
docker inspect container         # View container details
docker stats                     # Live resource usage

# Networks
docker network ls
docker network create my-network
docker run --network my-network nginx
\`\`\`

## Uninstalling Docker

If something goes wrong or you need a clean slate:

\`\`\`bash
sudo apt remove -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
sudo rm -rf /var/lib/docker
sudo rm -rf /var/lib/containerd
\`\`\`
Docker installation on Ubuntu is straightforward once you know the right steps. The key is using Docker's official apt repository rather than the version in Ubuntu's default repos — the default repos are often months behind, and with Docker, you want the latest security patches.`,
  },
  {
    slug: 'k3s-cluster-setup',
    title: 'How to Set Up a K3s Kubernetes Cluster on Ubuntu: Step-by-Step',
    description: 'Complete guide to deploying a K3s cluster on Ubuntu with system initialization, Docker configuration, NFS storage setup, and Helm installation for production workloads.',
    category: 'DevOps',
    categoryKey: 'devops',
    date: '2026-04-29',
    readTime: 9,
    hot: true,
    content: `This guide walks through setting up a K3s Kubernetes cluster on Ubuntu with 3 nodes: one master and two workers. K3s is a lightweight Kubernetes distribution designed for resource-constrained environments — it replaces the kubelet, containerd, and etcd with a single binary and embedded database.

## Why K3s Instead of Full Kubernetes

I have set up full Kubernetes clusters with kubeadm. It takes hours, requires significant memory, and the complexity is overwhelming for a homelab or small team.

K3s strips away the complexity. The binary is under 100MB. It runs on a 1GB RAM VPS. It uses SQLite instead of etcd by default (etcd requires SSD and at least 2GB RAM just for itself). But it provides the same Kubernetes API — your kubectl commands and YAML manifests work identically.

## Prerequisites

\`\`\`bash
# Three Ubuntu 22.04+ nodes with:
# - Static IP addresses or DNS hostnames
# - 2GB RAM minimum per node
# - 20GB disk per node
# - Port 6443 open between nodes (Kubernetes API)
\`\`\`

## Step 1: Install K3s on the Master Node

SSH into your master node and run:

\`\`\`bash
curl -sfL https://get.k3s.io | sh -

# Check status
sudo systemctl status k3s

# Get the node token (needed for worker nodes)
sudo cat /var/lib/rancher/k3s/server/node-token
\`\`\`

This single command installs everything: Kubernetes API server, scheduler, controller manager, kubelet, containerd, CoreDNS, and the Traefik ingress controller.

## Step 2: Configure kubectl on the Master

\`\`\`bash
# Copy the kubeconfig to your home directory
mkdir -p ~/.kube
sudo cp /etc/rancher/k3s/k3s.yaml ~/.kube/config
sudo chown $USER:$USER ~/.kube/config

# Verify
kubectl get nodes
# Should show your master node with STATUS "Ready"
\`\`\`

## Step 3: Join Worker Nodes

On each worker node, run:

\`\`\`bash
curl -sfL https://get.k3s.io | K3S_URL=https://<MASTER_IP>:6443   K3S_TOKEN=<NODE_TOKEN> sh -
\`\`\`

Replace <MASTER_IP> with your master's IP address and <NODE_TOKEN> with the token from Step 1.

## Step 4: Verify the Cluster

\`\`\`bash
# All nodes should show "Ready"
kubectl get nodes

# Check all pods are running
kubectl get pods -A

# View cluster info
kubectl cluster-info
\`\`\`

## Step 5: Deploy a Test Application

\`\`\`yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx
spec:
  replicas: 3
  selector:
    matchLabels:
      app: nginx
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
      - name: nginx
        image: nginx:alpine
        ports:
        - containerPort: 80
---
apiVersion: v1
kind: Service
metadata:
  name: nginx
spec:
  type: ClusterIP
  ports:
  - port: 80
  selector:
    app: nginx
\`\`\`

\`\`\`bash
kubectl apply -f nginx.yaml
kubectl get pods -w  # Watch pods start up
\`\`\`

## Step 6: Enable Ingress

K3s comes with Traefik pre-installed. Create an ingress for your service:

\`\`\`yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: nginx-ingress
spec:
  rules:
  - host: app.example.com
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: nginx
            port:
              number: 80
\`\`\`

## Step 7: Install cert-manager for SSL

Automatic TLS certificates with Let's Encrypt:

\`\`\`bash
kubectl apply -f https://github.com/cert-manager/cert-manager/releases/latest/download/cert-manager.yaml

# Create a ClusterIssuer
kubectl apply -f - <<EOF
apiVersion: cert-manager.io/v1
kind: ClusterIssuer
metadata:
  name: letsencrypt-prod
spec:
  acme:
    server: https://acme-v02.api.letsencrypt.org/directory
    email: your@email.com
    privateKeySecretRef:
      name: letsencrypt-prod
    solvers:
    - http01:
        ingress:
          class: traefik
EOF
\`\`\`

## Maintenance Commands

\`\`\`bash
# Backup etcd (actually SQLite for K3s)
sudo k3s etcd-snapshot save --name my-backup

# Restore from snapshot
sudo k3s server --cluster-reset --cluster-reset-restore-path=/var/lib/rancher/k3s/server/db/snapshots/my-backup

# Useful aliases I keep in my ~/.bashrc
alias k=kubectl
alias kg='kubectl get'
alias kgp='kubectl get pods'
alias kgn='kubectl get nodes'
alias kga='kubectl get all -A'
\`\`\`

## Wrap Up

## Persistent Storage with Longhorn

K3s comes with no default storage provisioner. For stateful applications, you need one. Longhorn is the most popular option for K3s:

\`\`\`bash
kubectl apply -f https://raw.githubusercontent.com/longhorn/longhorn/master/deploy/longhorn.yaml
\`\`\`

Longhorn provides distributed block storage that replicates data across your nodes. A pod on node1 can still access its data even if it gets rescheduled to node2.

## Monitoring with k9s and Metrics Server

k9s is a terminal UI for Kubernetes that I cannot live without:

\`\`\`bash
# Install k9s
curl -sS https://webinstall.dev/k9s | bash

# Launch
k9s
\`\`\`

It shows real-time pod status, lets you tail logs, exec into containers, and delete stuck pods — all from your terminal with Vim-like keybindings.

To see metrics (CPU/memory usage), install the metrics server:

\`\`\`bash
kubectl apply -f https://github.com/kubernetes-sigs/metrics-server/releases/latest/download/components.yaml

# Now you can see resource usage
kubectl top pods
kubectl top nodes
\`\`\`

## Practical Tip: Scheduling Pods to Specific Nodes

In a mixed cluster where some nodes have GPUs or SSDs, you want to control where pods land:

\`\`\`bash
# Label a node
kubectl label node worker2 disk=ssd

# In your deployment YAML
# nodeSelector:
#   disk: ssd
\`\`\`

\`\`\`yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: postgres
spec:
  template:
    spec:
      nodeSelector:
        disk: ssd
      containers:
      - name: postgres
        image: postgres:16-alpine
\`\`\`

## Upgrading K3s

\`\`\`bash
# Check current version
kubectl version

# Upgrade master
curl -sfL https://get.k3s.io | sh -

# Upgrade workers (one at a time)
kubectl drain worker1 --ignore-daemonsets
# On worker1:
curl -sfL https://get.k3s.io | K3S_URL=https://<MASTER_IP>:6443 K3S_TOKEN=<TOKEN> sh -
# Back on master:
kubectl uncordon worker1
\`\`\`
K3s makes Kubernetes accessible. The setup takes under 5 minutes for a basic cluster, and the resource requirements are low enough to run on cheap hardware. For production, add etcd, persistent storage with Longhorn, and monitoring with Prometheus + Grafana. But for getting started, the default K3s install is all you need.`,
  },
  {
    slug: 'deepseek-intro-guide',
    title: 'DeepSeek AI Guide: Features, Pricing, API Integration and Local Deployment',
    description: 'Complete DeepSeek AI guide covering model capabilities, API usage with OpenAI-compatible endpoints, local deployment with Ollama, and practical tips for developers.',
    category: 'AI',
    categoryKey: 'ai',
    date: '2026-05-02',
    readTime: 6,
    hot: true,
    content: `## What is DeepSeek?

DeepSeek is a Chinese AI company founded by High-Flyer, a quantitative hedge fund. Unlike most AI companies that burn VC money on marketing, DeepSeek focused on research and efficiency — and it shows in their models' performance-per-dollar.

The company made headlines in late 2024 with DeepSeek-R1, a reasoning model that rivaled OpenAI's o1 at a fraction of the training cost. Their secret? Mixture-of-Experts (MoE) architecture, which activates only a subset of parameters per token, making inference cheaper and faster.

## Model Comparison

### DeepSeek-V3

The flagship general-purpose model. 671B total parameters with 37B active per token. It handles coding, writing, analysis, and general Q&A.

### DeepSeek-R1

A reasoning model similar to OpenAI's o1. It produces chain-of-thought reasoning before answering. Best for complex math, logic puzzles, and multi-step coding tasks.

\`\`\`
Benchmark comparison:
                   GPT-4o    Claude 3.5   DeepSeek-V3   DeepSeek-R1
MMLU (knowledge):   88.7%     88.3%        88.5%         90.8%
HumanEval (code):   90.2%     92.0%        91.6%         96.3%
MATH:               76.6%     78.3%        79.2%         97.3%
\`\`\`

## API Integration

DeepSeek provides an OpenAI-compatible API. If you have used OpenAI's API, you already know how to use DeepSeek's:

\`\`\`python
from openai import OpenAI

client = OpenAI(
    api_key="your-deepseek-api-key",
    base_url="https://api.deepseek.com"
)

response = client.chat.completions.create(
    model="deepseek-chat",  # V3
    messages=[
        {"role": "system", "content": "You are a helpful assistant"},
        {"role": "user", "content": "Write a Go function to reverse a linked list"}
    ],
    temperature=0.7
)

print(response.choices[0].message.content)
\`\`\`

\`\`\`javascript
// Using DeepSeek in Node.js
import OpenAI from "openai"

const client = new OpenAI({
  apiKey: process.env.DEEPSEEK_API_KEY,
  baseURL: "https://api.deepseek.com"
})

async function main() {
  const stream = await client.chat.completions.create({
    model: "deepseek-reasoner",  // R1 for reasoning tasks
    messages: [{ role: "user", content: "Debug this error: TypeError: Cannot read properties of undefined (reading 'map')" }],
    stream: true
  })
  
  for await (const chunk of stream) {
    process.stdout.write(chunk.choices[0]?.delta?.content || "")
  }
}
main()
\`\`\`

## Local Deployment

DeepSeek models are open-weight, so you can run them locally:

\`\`\`bash
# Using Ollama (easiest)
ollama pull deepseek-r1:7b
ollama run deepseek-r1:7b

# Using llama.cpp for quantized versions
git clone https://github.com/ggerganov/llama.cpp
cd llama.cpp
make -j
./main -m deepseek-r1-distill-q4_k_m.gguf -p "Hello, how are you?"
\`\`\`

The 7B distilled model runs on a MacBook M1 with 8GB RAM. The 70B model needs about 40GB VRAM — a single A100 or two RTX 4090s.

## Pricing Comparison

DeepSeek's API pricing is dramatically cheaper than alternatives:

\`\`\`
                    Input ($/M tokens)    Output ($/M tokens)
DeepSeek-V3:       $0.27                 $1.10
GPT-4o:            $2.50                 $10.00
Claude Sonnet:     $3.00                 $15.00
\`\`\`

At roughly 10% of the cost of GPT-4o, DeepSeek is a compelling option for cost-sensitive applications. I use it for bulk data processing tasks where the quality difference is negligible.

## Limitations

DeepSeek is not without flaws. The models have weaker multi-modal capabilities than GPT-4o. The API occasionally has higher latency during peak hours in China. And the censorship fine-tuning means some politically sensitive topics are blocked — though for coding and technical work, this rarely matters.

## Wrap Up

## Getting Started with the Chat Interface

The easiest way to try DeepSeek is through their web chat at chat.deepseek.com. The interface is minimal — a text input and a conversation history panel. No onboarding, no tutorials, no feature tour. I like that.

For coding, I find the chat interface useful for quick questions and RFCs (requests for comments). The model can see the full conversation context, so follow-up questions work well.

## Running DeepSeek in Production

For production deployments, consider these factors:

\`\`\`yaml
version: "3.8"
services:
  deepseek:
    image: deepseek-ai/deepseek-v3:latest
    ports:
      - "8000:8000"
    environment:
      - MODEL_SIZE=7B
      - MAX_TOKENS=4096
      - TEMPERATURE=0.7
    deploy:
      resources:
        reservations:
          devices:
            - driver: nvidia
              count: 1
              capabilities: [gpu]
\`\`\`

The self-hosted option gives you full data privacy. For regulated industries like finance or healthcare, this is often a requirement rather than a preference.

## Community and Ecosystem

DeepSeek’s community is growing fast. The official Discord has active channels for prompt engineering, API integration, and local deployment. The HuggingFace model page has over 50K downloads. Several open-source projects now default to DeepSeek as their LLM backend.
## Real Use Case: Batch Translation

I used DeepSeek to translate 500 product descriptions from English to Spanish. The OpenAI-compatible API made it trivial to script:

\`\`\`python
import json, time
from openai import OpenAI

client = OpenAI(api_key="sk-...", base_url="https://api.deepseek.com")

def translate_batch(texts, batch_size=10):
    results = []
    for i in range(0, len(texts), batch_size):
        batch = texts[i:i+batch_size]
        response = client.chat.completions.create(
            model="deepseek-chat",
            messages=[{
                "role": "user",
                "content": f"Translate these product descriptions to Spanish. Return only the translations as a JSON array, no explanation. Input: {json.dumps(batch)}"
            }]
        )
        translated = json.loads(response.choices[0].message.content)
        results.extend(translated)
        time.sleep(0.5)  # Rate limiting
    return results
\`\`\`

The total cost: $1.47 for 500 translations. GPT-4o would have cost about $14. For a one-off batch job, the savings are nice. For a production pipeline processing thousands of items daily, the difference is transformative.

## When to Choose DeepSeek

DeepSeek makes sense when:

- **Cost is a primary concern**: At 10-20% of GPT-4o pricing, the savings add up fast
- **You need reasoning capability**: R1 is genuinely excellent at complex multi-step problems
- **You want local deployment**: Open weights mean no vendor lock-in, no data leaving your network
- **You are building in APAC region**: API latency from Asia is much lower than US-hosted alternatives

Stick with GPT-4o or Claude when:
- You need vision/multi-modal input
- You rely on tool-use and function calling heavily (DeepSeek supports it but with quirks)
- Your application requires guaranteed uptime SLAs
DeepSeek offers GPT-4-class performance at a fraction of the cost. For developers building AI-powered tools, it is worth evaluating as either a primary or fallback model, especially for code generation and reasoning tasks.`,
  },
  {
    slug: 'deepseek-coding-tips',
    title: 'How to Use DeepSeek for Programming: Tips for Code Generation and Debugging',
    description: 'Practical DeepSeek coding tips for developers: prompt engineering strategies, code review workflows, multi-file context management, and common pitfalls to avoid.',
    category: 'AI',
    categoryKey: 'ai',
    date: '2026-05-03',
    readTime: 6,
    content: `## AI-Assisted Programming Today

AI-assisted coding has become standard in development. GitHub Copilot, Cursor, Claude Code, and Codex CLI all use large language models to help write code. DeepSeek holds up well in this space due to its strong reasoning abilities and low cost.

In my experience, DeepSeek excels at understanding complex programming problems but requires more structured prompts than alternatives. Here is what works.

## Prompt Engineering for Code

### Be Explicit About Constraints

DeepSeek responds well to detailed context. Instead of "write a function to sort users", try:

\`\`\`
Write a Go function that sorts a slice of User structs by age descending.
If two users have the same age, sort by name alphabetically.
The function should modify the slice in place and not return a new one.
\`\`\`

\`\`\`go
type User struct {
    Name string
    Age  int
}

func SortUsers(users []User) {
    sort.SliceStable(users, func(i, j int) bool {
        if users[i].Age != users[j].Age {
            return users[i].Age > users[j].Age
        }
        return users[i].Name < users[j].Name
    })
}
\`\`\`

### Specify the Language and Framework

DeepSeek supports many languages but defaults to Python if you do not specify. Always include the language:

\`\`\`
Write a rate limiter in TypeScript using Express.js.
It should allow 100 requests per minute per IP address.
Store the counter in Redis with an expiry of 60 seconds.
\`\`\`

\`\`\`typescript
import express from "express"
import { createClient } from "redis"

const app = express()
const redis = createClient()

const RATE_LIMIT = 100
const WINDOW_SECONDS = 60

async function rateLimiter(req: express.Request, res: express.Response, next: express.NextFunction) {
  const ip = req.ip || "unknown"
  const key = \`ratelimit:\${ip}\`
  
  const current = await redis.incr(key)
  if (current === 1) {
    await redis.expire(key, WINDOW_SECONDS)
  }
  
  if (current > RATE_LIMIT) {
    return res.status(429).json({ error: "Too many requests" })
  }
  
  next()
}
\`\`\`

## Debugging with DeepSeek

DeepSeek R1 is particularly strong at debugging. Paste the error message and the relevant code:

\`\`\`
I am getting this error in my Next.js app:
Error: Hydration failed because the initial UI does not match what was rendered on the server.

The component is:
[code]

The error started after I added a Date.toLocaleString() call in the JSX.
\`\`\`

DeepSeek will identify the root cause — that Date.toLocaleString() returns different values on server and client — and suggest using useEffect or suppressHydrationWarning.

## Code Review

I use DeepSeek for quick code reviews. It catches issues I might miss:

\`\`\`
Review this Go handler for security issues:

[code]

Look for: SQL injection, XSS, race conditions, and error handling problems.
\`\`\`

DeepSeek consistently finds:
- Missing input validation
- Places where errors are silently swallowed
- Potential nil pointer dereferences
- Logic errors in edge cases

## Refactoring

DeepSeek handles refactoring well when you give it the full picture:

\`\`\`
Refactor this monolithic Express.js route handler into separate middleware functions.
Each middleware should have a single responsibility.
Use proper TypeScript types for the request, response, and next function.
\`\`\`

The key is providing the full file context — DeepSeek needs to see the import statements and type definitions to generate working code.

## When DeepSeek Struggles

DeepSeek is not perfect. Common failure modes:

1. **Very recent frameworks**: DeepSeek's training data has a cutoff. It does not know about libraries released in the last 6 months.
2. **Obscure language features**: I asked it to write Zig code once. The syntax was wrong in multiple places.
3. **Long context tasks**: The R1 model can lose focus after very long conversations.
4. **Configuration files**: DeepSeek sometimes invents Docker Compose or GitHub Actions keys that do not exist.

## Cost Comparison for Coding

If you use AI coding tools heavily, the cost difference matters:

\`\`\`
Daily usage: 500 prompts, average 1K input + 2K output tokens per prompt
Total: ~1.5M tokens/day

With DeepSeek-V3:   $0.27 * 0.5M input  + $1.10 * 1M output  = ~$1.23/day
With GPT-4o:        $2.50 * 0.5M input  + $10.00 * 1M output = ~$11.25/day
With Claude Sonnet: $3.00 * 0.5M input  + $15.00 * 1M output = ~$16.50/day
\`\`\`

For a team of 10 developers, DeepSeek saves roughly $200-$400 per month compared to GPT-4o.

## Wrap Up

## Test Generation

DeepSeek excels at writing tests. It understands testing patterns across languages and generates comprehensive test suites:

\`\`\`
Write a comprehensive test suite for this Go HTTP handler.
Include table-driven tests for:
- Successful response (200)
- Bad request (400) with missing fields
- Not found (404)
- Unauthorized (401) with invalid token
\`\`\`

The generated tests typically include proper setup and teardown, mock implementations, and clear test descriptions. I estimate DeepSeek saves me about 40% of the time I would spend writing tests manually.

## Generating Documentation

DeepSeek converts code into documentation effectively:

\`\`\`
Generate README documentation for this Go package.
Include: package description, installation, code examples, configuration, error handling.
\`\`\`

The output is structured, relevant, and requires minimal editing.

## Limitations in Practice

After using DeepSeek for coding daily for three months, here are the real limitations:

1. **Context window degradation**: Around 40K tokens, the model starts losing track of earlier instructions. Split long tasks into smaller sessions.
2. **API reliability**: DeepSeek sometimes generates code that calls non-existent library functions. Always verify imports and API signatures.
3. **Streaming inconsistencies**: The streaming API occasionally repeats the last few tokens. A simple deduplication check handles this.

## Integration with IDEs

DeepSeek works with Continue.dev (open-source) and Cursor (via custom API endpoint):

\`\`\`json
{
  "models": [{
    "title": "DeepSeek",
    "provider": "openai",
    "model": "deepseek-chat",
    "apiKey": "\${DEEPSEEK_API_KEY}",
    "apiBase": "https://api.deepseek.com/v1"
  }]
}
\`\`\`

The autocomplete quality is slightly below Copilot for inline suggestions, but the chat-based assistance (refactoring, debugging, code review) is competitive.
DeepSeek is a capable coding assistant, especially for structured tasks, debugging, and code review. It falls short on niche frameworks and very long context tasks, but for everyday development work it delivers solid results at a fraction of the cost of alternatives.`,
  },
  {
    slug: 'typeless-ai-writing-guide',
    title: 'Typeless AI Writing Tool Review: Why I Switched After One Month',
    description: 'Honest Typeless review from a daily user: how AI-assisted writing in flow state mode transformed my writing workflow. Features, pricing, and who it is for.',
    category: 'AI',
    categoryKey: 'ai',
    date: '2026-05-09',
    readTime: 6,
    hot: true,
    content: `## I Was Skeptical at First

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

But if it clicks — you will know.`,
  },
  {
    slug: 'obsidian-note-taking-guide',
    title: 'Obsidian Review: Why I Switched from Notion After Two Years of Daily Use',
    description: 'Two-year Obsidian review covering bidirectional links, graph view, plugin ecosystem, daily notes workflow, and why local-first Markdown beats cloud-based note apps.',
    category: 'AI',
    categoryKey: 'ai',
    date: '2026-05-09',
    readTime: 9,
    hot: true,
    content: `## Why I Got Tired of Note App Hopping

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

All great tools feel strange at first.`,
  },
  {
    slug: 'codex-claude-code-vs-cursor-comparison',
    title: 'Codex CLI vs Claude Code vs Cursor: Which Ships Better Code?',
    description: 'I tested Codex CLI, Claude Code, and Cursor on real projects for 6 months. Honest comparison of setup, workflow, debugging, and which tool wins your use case.',
    category: 'AI',
    categoryKey: 'ai',
    date: '2026-05-11',
    readTime: 10,
    hot: true,
    content: `## Why I Tested All Three

I have a confession: I am an AI coding tool hoarder.

Over the past six months, I built the same project three times — a full-stack web app with a Go backend, a Next.js frontend, and a PostgreSQL database. First with Cursor, then with Claude Code, then with Codex CLI. Same requirements, same deadline pressure, same me.

Was it a productive use of time? Debatable. But now I can tell you exactly which tool to pick without the marketing fluff.

Here is what I found.

## What Each Tool Actually Is

Before diving into the comparison, let me clarify what we are talking about, because the three tools approach AI coding from completely different angles.

**Cursor** is an AI-native IDE. It is a fork of VS Code with AI baked into every surface — autocomplete, inline editing, a chat panel that sees your whole codebase. You work in a GUI, same as you always have, but the AI is your pair programmer on steroids.

**Claude Code** is a CLI agent. You run it in your terminal, point it at a project, and it reads your codebase, plans changes, and executes them — editing files, running commands, even checking build output. You review its work rather than writing code line by line.

**Codex CLI** is OpenAI's answer to Claude Code. Also a terminal agent, also reads and writes files autonomously, but powered by OpenAI's models. It is newer and less mature than Claude Code, but OpenAI moves fast.

Three tools, three philosophies. Let me walk through how they compare in real work.

## Round 1: Setup and Onboarding

### Cursor

Installation is dead simple. Download the app, open your project, and you are done. No API keys, no terminal config, no mental model shift.

But that simplicity has a catch. Cursor comes with sensible defaults, but to really use it well you need to learn its idioms: how to write good composer prompts, when to use inline edit vs chat, how to configure rules for your project. It took me about a week to stop fighting it and start flowing.

### Claude Code

Install is an npm command:

\`\`\`bash
npm install -g @anthropic-ai/claude-code
\`\`\`

Then you run \`claude\` in your project directory. That is it.

The CLI-first approach takes some getting used to if you have been living in IDEs your whole career. But the agent model is intuitive: you describe what you want in plain English, it figures out the steps. The initial learning curve is maybe two hours, not a week.

### Codex CLI

Also an npm install:

\`\`\`bash
npm install -g @openai/codex
\`\`\`

Then \`codex\` in your project. Very similar to Claude Code on the surface.

The difference: Codex CLI is noticeably rougher around the edges. Documentation is thinner, there are fewer community patterns, and the tool itself crashed on me twice in the first hour. Once with a cryptic Python traceback, once by just hanging on a moderately large file.

**Winner**: Cursor for pure ease of entry. Claude Code for CLI agents. Codex CLI is still catching up.

## Round 2: Daily Coding Flow

This is where things get interesting. Each tool shines in different scenarios.

### The TDD Loop

Here is how each tool handles writing a test for a Go function:

**Cursor**: I press Cmd+K, type "write a table-driven test for this function", and it generates the code inline. I review, accept, run the test, and if it fails I Cmd+K again with the error message. Fast and familiar.

**Claude Code**: I type \`claude "write tests for pkg/handler/"\` and the agent reads the handler package, generates test files, creates a test helper if needed, runs the tests, and fixes any failures automatically. I do not touch the keyboard between the prompt and the green output.

**Codex CLI**: Similar flow to Claude Code, but the quality of output varies wildly. Simple tests work fine. Complex test logic involving mocks or fixtures tends to produce code that compiles but tests the wrong thing.

\`\`\`go
// Codex CLI generated this test — it compiles but does not actually
// verify the response body contains the expected JSON fields
func TestHandler(t *testing.T) {
    req := httptest.NewRequest("GET", "/api/users", nil)
    rec := httptest.NewRecorder()
    Handler(rec, req)
    if rec.Code != http.StatusOK {
        t.Errorf("expected 200, got %d", rec.Code)
    }
    // Never checks the response body — useless test
}
\`\`\`

Claude Code does not make that mistake. It writes tests that verify actual behavior, not just HTTP status codes.

### Debugging

Debugging is where Claude Code separates from the pack.

I had a production issue: a GraphQL endpoint returning inconsistent field ordering. I typed:

\`\`\`bash
claude "users API returns fields in inconsistent order, need to find root cause"
\`\`\`

Claude Code read the resolver chain, found that two resolvers built maps differently (one used \`range\`, the other used ordered keys), traced the GraphQL schema definition, and proposed a fix with a regression test. All in under 90 seconds.

Cursor can help with this too, but it requires more back-and-forth. You paste the resolver, ask about it, paste another file, ask again. The agent model makes a real difference for cross-file debugging.

Codex CLI took three attempts to even identify the right files. It kept focusing on the transport layer (HTTP handler, middleware) before I explicitly redirected it to the resolver code.

**Winner**: Claude Code for debugging and test generation. Cursor for quick inline edits. Codex CLI is competitive on simple tasks but falls behind on anything requiring multi-step reasoning.

## Round 3: Complex Projects and Team Context

### Large Codebase Navigation

My side project has about 15,000 lines of Go across 80 files. Not huge by corporate standards, but enough to test context handling.

Cursor handles this well if you use its Indexing feature. It builds an embedding index of your codebase and can answer questions about it. But there is a latency cost on larger projects — every query takes 2-5 seconds as it searches the index.

Claude Code reads your project structure lazily. It starts with a directory listing and drills into files as needed. This feels faster for most queries, and the context window (200K tokens) means it can hold a lot of your codebase in memory for complex refactors.

Codex CLI has the smallest effective context of the three. I found myself frequently telling it "check file X" explicitly, which defeats the purpose of an autonomous agent.

### Multi-File Refactoring

I asked each tool to extract authentication logic from a monolithic HTTP handler into a separate middleware package.

Cursor's Composer mode handled this well — I described the refactor in the composer panel and it created the new files and modified the old ones. I reviewed each change individually. Took about 15 minutes of back-and-forth.

\`\`\`typescript
// Claude Code auto-generated this middleware extraction:
// It identified the JWT validation logic, created auth/jwt.ts,
// and replaced the inline code with a middleware call.
// It also updated all imports across 6 files.

export async function authMiddleware(
  request: NextRequest,
): Promise<NextResponse | null> {
  const token = request.cookies.get("session")?.value
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url))
  }
  try {
    const payload = await verifyJWT(token)
    request.headers.set("x-user-id", payload.sub)
    return null // continue to handler
  } catch {
    return NextResponse.redirect(new URL("/login", request.url))
  }
}
\`\`\`

Claude Code did the same refactor in one shot. I typed the request, it planned the change, showed me the plan, and executed it after I approved. Done in under 3 minutes.

Codex CLI attempted the refactor but made a subtle mistake: it extracted the logic but forgot to update the route registration in five places, breaking half the endpoints. The resulting errors were less obvious than they should have been, which eroded my trust.

**Winner**: Claude Code for large refactors. Cursor for when you want more control over each change.

## Pricing

This part is straightforward.

**Cursor** charges $20/month for Pro (500 fast requests + unlimited slow). The $40/month Business tier adds admin controls and team features. You bring your own OpenAI/Anthropic API key for unlimited usage at cost.

**Claude Code** is included with any Claude subscription. Pro ($20/month) gets you a reasonable amount of usage. The API-based pricing is $3/MB input tokens and $15/MB output tokens for Sonnet, which works out to roughly $0.10-$0.50 per session depending on complexity.

**Codex CLI** is included with ChatGPT Plus ($20/month). You can also use your OpenAI API key, which costs $2.50/MB input and $10/MB output for GPT-4o.

All three are roughly in the same ballpark. If you are already paying for ChatGPT Plus or Claude Pro, the marginal cost of using their coding tools is close to zero.

## What I Use Now

After six months of jumping between tools, here is my setup:

- **Cursor** is my daily driver for frontend work. For React components, Tailwind styling, and quick iterations, nothing beats inline editing in the IDE.
- **Claude Code** is what I open for backend work, complex refactors, and debugging sessions. When I have a tangled problem across multiple files, the agent model saves me hours.
- **Codex CLI** I have not opened in three weeks. It is not bad — it works fine for straightforward tasks and code generation. But in a direct comparison, every time I hit something nuanced, it either missed the mark or failed silently.

### My Advice

If you are a frontend developer or just starting with AI coding, start with **Cursor**. The learning curve is gentlest and the inline editing is immediately useful.

If you work on complex backends or refactor legacy code, use **Claude Code**. The agent model changes how you think about coding — you become a reviewer and architect rather than a typist.

If you are deeply embedded in the OpenAI ecosystem and want a CLI agent that works well enough for simple tasks, **Codex CLI** will be your jam once it matures a bit more.

Me? I am keeping both Cursor and Claude Code open on my second monitor right now. They complement each other better than I expected.`,
  },
]

export function getHotArticles(): Article[] {
  return articles.filter((a) => a.hot)
}

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug)
}

export function getArticlesByCategory(categoryKey: string): Article[] {
  return articles.filter((a) => a.categoryKey === categoryKey)
}
