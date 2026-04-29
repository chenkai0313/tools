'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useState, useCallback, useMemo, useEffect } from 'react'
import { getDictionary, type Locale } from '@/i18n'
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
      <p className="mb-6 text-sm text-dark-300">
        {lang === 'zh' ? 'JSON 格式化、压缩、树形查看、结构体生成与示例生成' : 'Format, compress, tree view, struct generation, and sample JSON generator.'}
      </p>

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
    </div>
  )
}
