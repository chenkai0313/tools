'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useState, useCallback, useMemo, useEffect } from 'react'
import { getDictionary, type Locale } from '@/i18n'
import { toolContent } from '@/components/ToolContent'
import { formatJSON, compressJSON, validateJSON, generateStruct, parseStructToJSON, ALL_LANGS, STRUCT_INPUT_LANGS, type TargetLang, type StructInputLang } from '@/lib/json'
import JsonTree from '@/components/JsonTree'

type InputMode = 'json' | 'struct'
type OutputTab = 'formatted' | 'compressed' | 'tree' | 'struct' | 'sample'

export default function JsonToolPage() {
  const { lang } = useParams() as { lang: Locale }
  const dict = getDictionary(lang)

  const [inputMode, setInputMode] = useState<InputMode>('json')
  const [outputTab, setOutputTab] = useState<OutputTab>('formatted')
  const [targetLang, setTargetLang] = useState<TargetLang>('go')
  const [structInputLang, setStructInputLang] = useState<StructInputLang>('simple')
  const [input, setInput] = useState('')
  const [copied, setCopied] = useState(false)
  const [flash, setFlash] = useState(false)
  const [error, setError] = useState('')

  const handleCopy = useCallback(async (text: string) => {
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setFlash(true)
    setTimeout(() => setCopied(false), 1500)
    setTimeout(() => setFlash(false), 400)
  }, [])

  // Parse JSON once
  const parsed = useMemo(() => {
    if (!input.trim()) return null
    try {
      return JSON.parse(input)
    } catch { return null }
  }, [input])

  // Compute output + error without side effects
  const outputResult = useMemo((): { content: string; isJson: boolean } | { error: string } | null => {
    if (!input.trim()) return null

    if (inputMode === 'struct') {
      try {
        return { content: parseStructToJSON(input, structInputLang), isJson: true }
      } catch (e: any) {
        return { error: e.message }
      }
    }

    // JSON mode
    try {
      switch (outputTab) {
        case 'formatted':
          return { content: formatJSON(input), isJson: true }
        case 'compressed':
          return { content: compressJSON(input), isJson: false }
        case 'tree':
          return { content: '', isJson: true }
        case 'struct':
          return { content: generateStruct(input, targetLang), isJson: false }
        default:
          return { content: formatJSON(input), isJson: true }
      }
    } catch (e: any) {
      return { error: e.message || 'Invalid JSON' }
    }
  }, [input, inputMode, outputTab, targetLang, structInputLang])

  // Sync error state from outputResult
  useEffect(() => {
    if (outputResult && 'error' in outputResult) {
      setError(outputResult.error)
    } else {
      setError('')
    }
  }, [outputResult])

  const outputContent = outputResult && 'content' in outputResult ? outputResult : null

  const showTree = outputTab === 'tree' && parsed
  const showStructLangSelector = outputTab === 'struct'

  // FAQ data
  const faqData = (lang === 'zh'
    ? [
        { q: 'JSON 和 JavaScript 对象字面量有什么区别？', a: 'JSON 是一种跨语言的数据交换格式，而 JavaScript 对象字面量是 JS 语言特有的数据类型。JSON 语法更严格：键名必须用双引号，字符串必须用双引号，undefined、函数、Symbol 等 JS 特有类型不能使用，且末尾不能有逗号。JSON 可以被任意语言解析，对象字面量则只能在 JS 中使用。' },
        { q: 'JSON 支持注释吗？', a: '标准 JSON 不支持注释。这是 JSON 创始人 Douglas Crockford 有意为之——去掉可选功能让解析器更简单。VSCode 等编辑器支持 JSONC（带注释的 JSON），但这不是标准。如果需要注释，建议使用 YAML 格式。' },
        { q: '如何判断一个字符串是否为合法 JSON？', a: '最可靠的方法是使用 JSON.parse() 尝试解析。如果抛出异常则说明不是合法 JSON。常见的非法情况包括：键名未用双引号、使用了单引号、末尾有多余逗号、存在注释等。本站的 JSON 工具会实时校验输入，并自动标记错误位置。' },
        { q: 'JSON 中的大数字会丢失精度吗？', a: 'JSON 规范不限制数字范围，但 JavaScript 的 Number 类型是 64 位双精度浮点数，安全整数范围是 -2^53 到 2^53（约 9 千万亿）。超出此范围的整数会丢失精度。解决方案是用字符串表示大整数，例如 JSON 中写成 "id": "9007199254740993"。' },
        { q: 'JSON 和 XML 有什么区别？', a: 'JSON 和 XML 都是数据交换格式。JSON 更简洁：没有结束标签，解析更快，数据体积更小。XML 的优势在于支持属性、命名空间和 Schema 校验。目前 REST API 几乎全部使用 JSON，SOAP 等旧协议仍使用 XML。' },
      ]
    : [
        { q: 'What\'s the difference between JSON and a JavaScript object literal?', a: 'JSON is a cross-language data interchange format, while a JavaScript object literal is JS-specific. JSON has stricter syntax: keys must be double-quoted, JavaScript types like undefined/functions/Symbols are not allowed, and trailing commas are forbidden. JSON can be parsed by any language, object literals only work in JavaScript.' },
        { q: 'Does JSON support comments?', a: 'Standard JSON does not support comments. This is an intentional design choice by JSON\'s creator Douglas Crockford. Editors like VS Code support JSONC (JSON with Comments), but it\'s not part of the standard. For configurations that need comments, consider YAML.' },
        { q: 'How do I know if a string is valid JSON?', a: 'The most reliable way is to try JSON.parse() — if it throws an exception, it\'s invalid. Common issues include: unquoted keys, single quotes, trailing commas, and comments. This tool validates your input in real-time and highlights errors.' },
        { q: 'Can JSON numbers lose precision?', a: 'JSON itself doesn\'t limit number range, but JavaScript\'s Number type is a 64-bit double-precision float. Safe integer range is -2^53 to 2^53 (~9 quadrillion). Numbers beyond this lose precision. Solution: use string representation for large integers, e.g. "id": "9007199254740993".' },
        { q: 'What\'s the difference between JSON and XML?', a: 'Both are data interchange formats. JSON is more concise: no closing tags, faster parsing, smaller payload. XML supports attributes, namespaces, and Schema validation. Today, nearly all REST APIs use JSON, while SOAP and legacy systems still use XML.' },
      ]) as { q: string; a: string }[]

  // Usage examples
  const examples = (lang === 'zh'
    ? [
        { title: '用户信息', desc: '一个包含字符串、数字、布尔值、数组和嵌套对象的用户信息 JSON。', code: '{\n  "name": "张三",\n  "age": 28,\n  "email": "zhangsan@example.com",\n  "active": true,\n  "tags": ["developer", "backend"],\n  "address": {\n    "city": "北京",\n    "district": "海淀",\n    "zip": "100000"\n  }\n}' },
        { title: 'API 响应', desc: '常见的分页 API 响应格式，包含数据列表和分页信息。', code: '{\n  "code": 200,\n  "message": "success",\n  "data": {\n    "items": [\n      { "id": 1, "title": "文章一", "views": 1234 },\n      { "id": 2, "title": "文章二", "views": 892 },\n      { "id": 3, "title": "文章三", "views": 567 }\n    ],\n    "pagination": {\n      "page": 1,\n      "pageSize": 10,\n      "total": 56\n    }\n  }\n}' },
        { title: '配置文件', desc: '应用程序的 JSON 配置文件，展示多级嵌套的实际用法。', code: '{\n  "app": {\n    "name": "MyApp",\n    "version": "2.1.0",\n    "debug": false\n  },\n  "database": {\n    "host": "localhost",\n    "port": 5432,\n    "pool": {\n      "min": 2,\n      "max": 10\n    }\n  },\n  "logging": {\n    "level": "info",\n    "format": "json"\n  }\n}' },
      ]
    : [
        { title: 'User Profile', desc: 'A user profile showing strings, numbers, booleans, arrays, and nested objects.', code: '{\n  "name": "John Doe",\n  "age": 28,\n  "email": "john@example.com",\n  "active": true,\n  "tags": ["developer", "backend"],\n  "address": {\n    "city": "Beijing",\n    "district": "Haidian",\n    "zip": "100000"\n  }\n}' },
        { title: 'API Response', desc: 'A paginated API response with data list and pagination info.', code: '{\n  "code": 200,\n  "message": "success",\n  "data": {\n    "items": [\n      { "id": 1, "title": "Article One", "views": 1234 },\n      { "id": 2, "title": "Article Two", "views": 892 },\n      { "id": 3, "title": "Article Three", "views": 567 }\n    ],\n    "pagination": {\n      "page": 1,\n      "pageSize": 10,\n      "total": 56\n    }\n  }\n}' },
        { title: 'Config File', desc: 'An application configuration file with deeply nested JSON structure.', code: '{\n  "app": {\n    "name": "MyApp",\n    "version": "2.1.0",\n    "debug": false\n  },\n  "database": {\n    "host": "localhost",\n    "port": 5432,\n    "pool": {\n      "min": 2,\n      "max": 10\n    }\n  },\n  "logging": {\n    "level": "info",\n    "format": "json"\n  }\n}' },
      ]) as { title: string; desc: string; code: string }[]

  const relatedTools = [
    { href: `/${lang}/tools/base64`, name: 'Base64', desc: lang === 'zh' ? 'Base64 与图片互转' : 'Base64 & Image Converter' },
    { href: `/${lang}/tools/config`, name: dict.nav.config, desc: lang === 'zh' ? 'YAML/TOML/JSON 格式互转' : 'YAML / TOML / JSON Converter' },
    { href: `/${lang}/tools/regex`, name: dict.nav.regex, desc: lang === 'zh' ? '正则表达式在线测试' : 'Online Regex Tester' },
    { href: `/${lang}/tools/encoding`, name: dict.nav.encoding, desc: lang === 'zh' ? 'Unicode / URL 编码转换' : 'Unicode / URL Encoding' },
    { href: `/${lang}/tools/hash`, name: dict.nav.hash, desc: lang === 'zh' ? 'MD5 / SHA 哈希计算' : 'MD5 / SHA Hash Calculator' },
  ]

  const tabs: { key: OutputTab; label: string }[] = inputMode === 'json'
    ? [
        { key: 'formatted', label: lang === 'zh' ? '格式化' : 'Formatted' },
        { key: 'compressed', label: lang === 'zh' ? '压缩' : 'Compressed' },
        { key: 'tree', label: lang === 'zh' ? '树形' : 'Tree' },
        { key: 'struct', label: lang === 'zh' ? '结构体' : 'Struct' },
      ]
    : [
        { key: 'sample', label: lang === 'zh' ? '示例 JSON' : 'Sample JSON' },
      ]

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <nav className="mb-6 text-sm text-dark-400">
        <Link href={`/${lang}`} className="hover:text-dark-200 transition-colors">{dict.common.breadcrumb.home}</Link>
        <span className="mx-2">›</span>
        <span className="text-dark-200">{dict.nav.tools}</span>
        <span className="mx-2">›</span>
        <span className="text-dark-200">{dict.nav.json}</span>
      </nav>

      <h1 className="mb-2 text-2xl font-bold text-dark-50">{dict.nav.json}</h1>
      <div className="mb-8 space-y-3 text-sm text-dark-200 leading-relaxed">
        <p>
          {lang === 'zh'
            ? 'JSON（JavaScript Object Notation）是 Web 开发中最核心的数据交换格式——它轻量、可读、跨语言，是现代 API、配置文件、数据库 NoSQL 文档的事实标准。无论你是在调试 REST API 返回的响应、编写前端和后端之间的数据契约、还是编辑 VS Code 的配置文件，你都在和 JSON 打交道。这个工具集成了 JSON 格式化、压缩、校验、树形查看、代码结构体生成和示例数据生成六个功能，一站式解决 JSON 相关的工作流。'
            : 'JSON (JavaScript Object Notation) is the backbone of data exchange on the web — lightweight, human-readable, and cross-language. It\'s the de facto standard for REST APIs, configuration files, and NoSQL documents. Whether you\'re debugging an API response, defining data contracts between frontend and backend, or editing VS Code settings, you work with JSON constantly. This tool bundles formatting, compression, validation, tree view, code generation, and sample data — six functions in one place for your JSON workflow.'}
        </p>
        <p>
          {lang === 'zh'
            ? '支持将 JSON 转换为 Go、TypeScript、Rust、Python、Java、Kotlin、Swift 等 10 种语言的类型定义（结构体/接口），也支持从 Go struct 或 TypeScript interface 反向生成示例 JSON。所有处理在浏览器本地完成，粘贴的 JSON 数据不会上传到任何服务器。'
            : 'Generate type definitions (structs/interfaces) for Go, TypeScript, Rust, Python, Java, Kotlin, Swift, and more — or reverse-generate sample JSON from Go structs and TypeScript interfaces. All processing happens locally in your browser; your JSON data is never uploaded anywhere.'}
        </p>
      </div>

      {/* Input Mode */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex gap-1 rounded-lg border border-white/[0.06] p-0.5">
          <button
            onClick={() => { setInputMode('json'); setOutputTab('formatted') }}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
              inputMode === 'json' ? 'bg-indigo-500/20 text-indigo-300' : 'text-dark-300 hover:text-dark-100'
            }`}
          >
            JSON
          </button>
          <button
            onClick={() => { setInputMode('struct'); setOutputTab('sample') }}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
              inputMode === 'struct' ? 'bg-indigo-500/20 text-indigo-300' : 'text-dark-300 hover:text-dark-100'
            }`}
          >
            {lang === 'zh' ? '结构体' : 'Struct'}
          </button>
        </div>
      </div>

      {/* Split Pane */}
      <div className="grid gap-4 lg:grid-cols-2">
        {/* Left: Input */}
        <div className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-4 flex flex-col">
          <div className="mb-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-dark-400">
                {inputMode === 'json' ? (lang === 'zh' ? '输入 JSON' : 'JSON Input') : (lang === 'zh' ? '输入结构体定义' : 'Struct Definition')}
              </span>
              {inputMode === 'struct' && (
                <select
                  value={structInputLang}
                  onChange={(e) => setStructInputLang(e.target.value as StructInputLang)}
                  className="bg-dark-800 border border-white/[0.06] rounded text-[10px] px-2 py-1 text-dark-200 outline-none cursor-pointer"
                >
                  {STRUCT_INPUT_LANGS.map(l => (
                    <option key={l.key} value={l.key}>{l.label}</option>
                  ))}
                </select>
              )}
            </div>
            <div className="flex gap-2">
              <button onClick={() => {
                if (inputMode === 'struct') {
                  const samples: Record<string, string> = {
                    simple: 'name: string\nage: number\nactive: boolean\ntags: string[]\naddress:\n  street: string\n  city: string',
                    go: 'type Response struct {\n    Code    int64  `json:"code"`\n    Message string `json:"message"`\n    Data    Data   `json:"data"`\n}\n\ntype Data struct {\n    CaptchaID   string `json:"captcha_id"`\n    ImageBase64 string `json:"image_base64"`\n}',
                    typescript: 'interface User {\n  name: string;\n  age: number;\n  active: boolean;\n  tags: string[];\n  address: {\n    street: string;\n    city: string;\n  };\n}',
                    rust: '#[derive(Serialize, Deserialize)]\nstruct User {\n    name: String,\n    age: i32,\n    active: bool,\n}',
                    python: '@dataclass\nclass User:\n    name: str\n    age: int\n    active: bool\n    tags: list[str]\n    address: Address\n\n@dataclass\nclass Address:\n    street: str\n    city: str',
                    java: 'public class User {\n    private String name;\n    private int age;\n    private boolean active;\n    private String[] tags;\n    private Address address;\n}',
                    csharp: 'public class User {\n    public string Name { get; set; }\n    public int Age { get; set; }\n    [JsonProperty("is_active")]\n    public bool IsActive { get; set; }\n}',
                    cpp: 'struct User {\n    std::string name;\n    int age;\n    bool active;\n};',
                    ruby: 'class User\n  attr_accessor :name, :age, :active\nend',
                    dart: 'class User {\n  String name;\n  int age;\n  bool active;\n}',
                  }
                  setInput(samples[structInputLang] || samples.simple)
                } else {
                  setInput('{\n  "name": "hello",\n  "age": 25,\n  "active": true\n}')
                }
                setError('')
              }} className="text-[10px] text-dark-400 hover:text-dark-200 transition-colors">
                {lang === 'zh' ? '示例' : 'Sample'}
              </button>
              <button onClick={() => { setInput(''); setError('') }} className="text-[10px] text-dark-400 hover:text-dark-200 transition-colors">
                {dict.tool.clear}
              </button>
            </div>
          </div>
          {inputMode === 'struct' && (
            <div className="mb-2 rounded-lg bg-indigo-500/5 border border-indigo-500/20 px-3 py-2">
              <p className="text-[10px] text-indigo-300/70 leading-relaxed">
                {structInputLang === 'simple'
                  ? (lang === 'zh'
                    ? '每行一个字段: 字段名: 类型。支持 string, number, boolean, string[] 等。缩进表示嵌套。'
                    : 'One field per line: name: type. Supports string, number, boolean, string[], etc. Indent for nesting.')
                  : structInputLang === 'go'
                    ? (lang === 'zh' ? '粘贴 Go struct，支持嵌套和 json tag。' : 'Paste Go struct. Supports nesting and json tags.')
                    : structInputLang === 'typescript'
                      ? (lang === 'zh' ? '粘贴 TypeScript interface 或 type。' : 'Paste TypeScript interface or type.')
                      : structInputLang === 'rust'
                        ? (lang === 'zh' ? '粘贴 Rust struct，支持 serde rename。' : 'Paste Rust struct. Supports serde rename.')
                        : structInputLang === 'python'
                          ? (lang === 'zh' ? '粘贴 Python dataclass 或 pydantic 类。' : 'Paste Python dataclass or pydantic class.')
                          : structInputLang === 'java'
                            ? (lang === 'zh' ? '粘贴 Java class，支持 @JsonProperty。' : 'Paste Java class. Supports @JsonProperty.')
                            : structInputLang === 'csharp'
                              ? (lang === 'zh' ? '粘贴 C# class，支持 [JsonProperty]。' : 'Paste C# class. Supports [JsonProperty].')
                              : structInputLang === 'cpp'
                                ? (lang === 'zh' ? '粘贴 C++ struct 或 class。' : 'Paste C++ struct or class.')
                                : structInputLang === 'ruby'
                                  ? (lang === 'zh' ? '粘贴 Ruby class（支持 attr_accessor）。' : 'Paste Ruby class (supports attr_accessor).')
                                  : structInputLang === 'dart'
                                    ? (lang === 'zh' ? '粘贴 Dart class，支持 @JsonKey。' : 'Paste Dart class. Supports @JsonKey.')
                                    : ''
                }
              </p>
            </div>
          )}
          <textarea
            value={input}
            onChange={(e) => {
              const val = e.target.value
              setInput(val)
              // Auto-detect Go struct syntax
              if (inputMode === 'struct' && /^type\s+\w+\s+struct/i.test(val.trim())) {
                setStructInputLang('go')
              }
            }}
            placeholder={
              inputMode === 'json'
                ? '{"name": "hello", "age": 25}'
                : structInputLang === 'simple'
                  ? 'name: string\nage: number\nactive: boolean\ntags: string[]\naddress:\n  street: string\n  city: string'
                  : structInputLang === 'go'
                    ? 'type Response struct {\n    Code    int64  `json:"code"`\n    Message string `json:"message"`\n    Data    Data   `json:"data"`\n}'
                    : structInputLang === 'typescript'
                      ? 'interface User {\n  name: string;\n  age: number;\n  active: boolean;\n}'
                      : structInputLang === 'rust'
                        ? '#[derive(Serialize)]\nstruct User {\n    name: String,\n    age: i32,\n    active: bool,\n}'
                        : structInputLang === 'python'
                          ? '@dataclass\nclass User:\n    name: str\n    age: int\n    active: bool'
                          : structInputLang === 'java'
                            ? 'public class User {\n    private String name;\n    private int age;\n    private boolean active;\n}'
                            : structInputLang === 'csharp'
                              ? 'public class User {\n    public string Name { get; set; }\n    public int Age { get; set; }\n    public bool IsActive { get; set; }\n}'
                              : structInputLang === 'cpp'
                                ? 'struct User {\n    std::string name;\n    int age;\n    bool active;\n};'
                                : structInputLang === 'ruby'
                                  ? 'class User\n  attr_accessor :name, :age, :active\nend'
                                  : structInputLang === 'dart'
                                    ? 'class User {\n  String name;\n  int age;\n  bool active;\n}'
                                    : ''
            }
            rows={16}
            className="flex-1 w-full rounded-lg border border-white/[0.06] bg-dark-800 px-4 py-3 text-sm font-mono text-dark-100 placeholder-dark-500 outline-none resize-y focus:border-indigo-500/40 transition-all min-h-[300px]"
          />
          {/* Quick actions */}
          {inputMode === 'json' && input.trim() && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              <button onClick={() => { try { setInput(formatJSON(input)); setError('') } catch (e: any) { setError(e.message) } }}
                className="px-2.5 py-1 rounded-md text-[10px] font-medium bg-white/[0.04] text-dark-300 border border-white/[0.06] hover:bg-white/[0.06] transition-all">
                ↕ {lang === 'zh' ? '格式化输入' : 'Format Input'}
              </button>
              <button onClick={() => { try { setInput(compressJSON(input)); setError('') } catch (e: any) { setError(e.message) } }}
                className="px-2.5 py-1 rounded-md text-[10px] font-medium bg-white/[0.04] text-dark-300 border border-white/[0.06] hover:bg-white/[0.06] transition-all">
                ≣ {lang === 'zh' ? '压缩输入' : 'Compress Input'}
              </button>
            </div>
          )}
        </div>

        {/* Right: Output */}
        <div className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-4 flex flex-col group">
          {/* Output tabs */}
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex gap-1">
                {tabs.map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setOutputTab(tab.key)}
                    className={`px-2.5 py-1.5 rounded-md text-[10px] font-medium transition-all ${
                      outputTab === tab.key
                        ? 'bg-indigo-500/20 text-indigo-300'
                        : 'text-dark-400 hover:text-dark-200'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
              {showStructLangSelector && (
                <select
                  value={targetLang}
                  onChange={(e) => setTargetLang(e.target.value as TargetLang)}
                  className="bg-dark-800 border border-white/[0.06] rounded text-[10px] px-2 py-1 text-dark-200 outline-none cursor-pointer"
                >
                  {ALL_LANGS.map(l => (
                    <option key={l.key} value={l.key}>{l.label}</option>
                  ))}
                </select>
              )}
            </div>
            {outputContent?.content && !showTree && (
              <span className="text-[10px] text-dark-500 opacity-0 group-hover:opacity-100 transition-opacity">
                {lang === 'zh' ? '双击复制' : 'Double-click to copy'}
              </span>
            )}
          </div>

          {/* Output content */}
          <div className="flex-1 min-h-[300px]">
            {error && (
              <div className="rounded-lg border border-red-500/20 bg-red-500/5 px-4 py-3">
                <p className="text-xs text-red-300 font-mono">{error}</p>
              </div>
            )}

            {!input.trim() && !error && (
              <div className="flex flex-col items-center justify-center h-[300px] text-dark-500">
                <span className="text-3xl mb-3">📋</span>
                <p className="text-sm text-center">
                  {lang === 'zh'
                    ? inputMode === 'json'
                      ? '在左侧输入 JSON 开始使用'
                      : '在左侧输入结构体定义生成示例 JSON'
                    : inputMode === 'json'
                      ? 'Enter JSON on the left to get started'
                      : 'Enter struct definitions on the left to generate sample JSON'}
                </p>
              </div>
            )}

            {showTree && parsed && (
              <div className="rounded-lg border border-white/[0.06] bg-dark-800 px-4 py-3 overflow-auto max-h-[500px]">
                <JsonTree data={parsed} />
              </div>
            )}

            {outputContent?.content && !showTree && (
              <pre
                onDoubleClick={() => handleCopy(outputContent.content)}
                className={`w-full min-h-[300px] rounded-lg border px-4 py-3 text-sm font-mono overflow-auto whitespace-pre-wrap cursor-pointer select-none transition-all ${
                  flash
                    ? 'border-indigo-500/40 bg-indigo-500/10 shadow-[0_0_12px_rgba(99,102,241,0.15)] text-indigo-100'
                    : 'border-white/[0.06] bg-dark-800 text-dark-100 hover:border-white/[0.1]'
                }`}>
                {outputContent.content}
                {copied && (
                  <span className="block mt-2 text-xs font-medium text-indigo-300 animate-pulse">{lang === 'zh' ? '✓ 已复制' : '✓ Copied'}</span>
                )}
              </pre>
            )}

            {showStructLangSelector && !outputContent && !error && input.trim() && (
              <div className="rounded-lg border border-red-500/20 bg-red-500/5 px-4 py-3">
                <p className="text-xs text-red-300">
                  {lang === 'zh' ? '请输入有效的 JSON 以生成结构体' : 'Enter valid JSON to generate struct'}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {toolContent.json[lang as 'zh' | 'en']}

      {/* FAQ */}
      <section className="mt-12 border-t border-white/[0.06] pt-10">
        <h2 className="text-lg font-bold text-dark-50 flex items-center gap-2 mb-6">
          <svg className="w-5 h-5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
          </svg>
          {lang === 'zh' ? '常见问题（FAQ）' : 'Frequently Asked Questions'}
        </h2>
        <div className="space-y-3">
          {faqData.map((faq, i) => (
            <details key={i} className="group rounded-xl border border-white/[0.06] bg-white/[0.03] overflow-hidden">
              <summary className="flex items-center justify-between px-5 py-3.5 text-sm font-medium text-dark-100 cursor-pointer hover:text-indigo-300 transition-colors list-none">
                <span>{faq.q}</span>
                <svg className="w-4 h-4 text-dark-400 shrink-0 ml-4 transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="px-5 pb-4 text-sm text-dark-300 leading-relaxed border-t border-white/[0.06] pt-3 mt-0">
                {faq.a}
              </div>
            </details>
          ))}
        </div>
      </section>

      {/* Usage Examples */}
      <section className="mt-12 border-t border-white/[0.06] pt-10">
        <h2 className="text-lg font-bold text-dark-50 flex items-center gap-2 mb-6">
          <svg className="w-5 h-5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
          </svg>
          {lang === 'zh' ? '使用示例' : 'Usage Examples'}
        </h2>
        <div className="grid gap-4 md:grid-cols-3">
          {examples.map((ex, i) => (
            <div key={i} className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-5 flex flex-col">
              <h3 className="text-sm font-semibold text-dark-100 mb-1">{ex.title}</h3>
              <p className="text-xs text-dark-400 mb-3">{ex.desc}</p>
              <pre className="flex-1 rounded-lg bg-dark-950/50 px-3 py-2.5 text-xs font-mono text-dark-200 overflow-x-auto leading-relaxed whitespace-pre">{ex.code}</pre>
            </div>
          ))}
        </div>
      </section>

      {/* Related Tools */}
      <section className="mt-12 border-t border-white/[0.06] pt-10">
        <h2 className="text-lg font-bold text-dark-50 flex items-center gap-2 mb-6">
          <svg className="w-5 h-5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
          </svg>
          {lang === 'zh' ? '相关工具推荐' : 'Related Tools'}
        </h2>
        <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
          {relatedTools.map((tool, i) => (
            <Link
              key={i}
              href={tool.href}
              className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-4 hover:bg-white/[0.06] hover:border-indigo-500/20 transition-all group"
            >
              <h3 className="text-sm font-semibold text-dark-50 mb-1 group-hover:text-indigo-300 transition-colors">{tool.name}</h3>
              <p className="text-xs text-dark-400">{tool.desc}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
