export interface ParseError {
  message: string
  position: number
}

export function validateJSON(input: string): { valid: boolean; error?: ParseError } {
  try {
    JSON.parse(input)
    return { valid: true }
  } catch (e: any) {
    const match = e.message?.match(/position\s+(\d+)/)
    const position = match ? parseInt(match[1]) : 0
    return { valid: false, error: { message: e.message || 'Invalid JSON', position } }
  }
}

export function formatJSON(input: string): string {
  const obj = JSON.parse(input)
  return JSON.stringify(obj, null, 2)
}

export function compressJSON(input: string): string {
  const obj = JSON.parse(input)
  return JSON.stringify(obj)
}

export function extractField(input: string, path: string): string {
  const obj = JSON.parse(input)
  const keys = path.split('.').filter(Boolean)
  let current: any = obj
  for (const key of keys) {
    if (current == null || typeof current !== 'object') {
      throw new Error(`Cannot resolve path: ${path}`)
    }
    if (Array.isArray(current) && !isNaN(Number(key))) {
      current = current[Number(key)]
    } else {
      current = current[key]
    }
  }
  return JSON.stringify(current, null, 2)
}

// ─── Supported languages ──────────────────────────────────────

export type TargetLang = 'go' | 'typescript' | 'rust' | 'python' | 'java' | 'csharp' | 'cpp' | 'ruby' | 'dart'
export type StructInputLang = TargetLang | 'simple'

export const ALL_LANGS: { key: TargetLang; label: string }[] = [
  { key: 'go', label: 'Go' },
  { key: 'typescript', label: 'TypeScript' },
  { key: 'rust', label: 'Rust' },
  { key: 'python', label: 'Python' },
  { key: 'java', label: 'Java' },
  { key: 'csharp', label: 'C#' },
  { key: 'cpp', label: 'C++' },
  { key: 'ruby', label: 'Ruby' },
  { key: 'dart', label: 'Dart' },
]

export const STRUCT_INPUT_LANGS: { key: StructInputLang; label: string }[] = [
  { key: 'simple', label: 'Simple' },
  ...ALL_LANGS,
]

// ─── Simple format (key: type) ───────────────────────────────

function generateSampleValue(type: string): any {
  const t = type.trim().toLowerCase()
  if (t === 'string' || t === 'str') return 'example'
  if (t === 'number' || t === 'float64' || t === 'float' || t === 'int' || t === 'integer' || t === 'int64') return 0
  if (t === 'boolean' || t === 'bool') return true
  if (t.endsWith('[]') || t.startsWith('[]')) return ['example']
  if (t === 'any' || t === 'object' || t === '{}') return {}
  return 'value'
}

export function parseSimpleStruct(input: string): string {
  const lines = input.split('\n')
  const result: Record<string, any> = {}
  const stack: { indent: number; obj: Record<string, any> }[] = [{ indent: -1, obj: result }]

  for (const raw of lines) {
    const line = raw.trimEnd()
    if (!line.trim() || line.trim().startsWith('//') || line.trim().startsWith('#')) continue

    const indent = raw.search(/\S/)
    const match = line.trim().match(/^([a-zA-Z_$][a-zA-Z0-9_$]*)\s*:\s*(.*)$/)
    if (!match) continue

    const key = match[1]
    const type = match[2].trim()

    while (stack.length > 0 && stack[stack.length - 1].indent >= indent) {
      stack.pop()
    }

    const current = stack[stack.length - 1]?.obj
    if (!current) continue

    if (!type || type === 'object' || type === '{}') {
      const child: Record<string, any> = {}
      current[key] = child
      stack.push({ indent, obj: child })
      continue
    }

    if (type.endsWith('[]')) {
      current[key] = [generateSampleValue(type.slice(0, -2))]
      continue
    }

    current[key] = generateSampleValue(type)
  }

  return JSON.stringify(result, null, 2)
}

// ─── Language-specific struct parsers (struct → sample JSON) ──

interface ParsedField {
  jsonName: string
  value: any
}

// Normalize language type to sample value
function sampleFromLangType(type: string): any {
  const t = type.toLowerCase()
  if (['string', 'str', 'string?', 'char', 'wchar_t'].includes(t)) return 'example'
  if (['int', 'int32', 'int64', 'uint', 'uint32', 'uint64', 'int8', 'int16', 'uint8', 'uint16',
       'float', 'float32', 'float64', 'double', 'long', 'short', 'byte', 'number', 'i32', 'i64',
       'u32', 'u64', 'f32', 'f64', 'usize', 'isize', 'size_t', 'int_', 'uint_',
       'integer', 'bigint', 'decimal'].includes(t)) return 0
  if (['bool', 'boolean', 'boolean?'].includes(t)) return true
  if (['list', 'array', 'vector', 'list<dynamic>', 'list<string>', 't[]', 'string[]',
       'int[]', 'number[]', 'bool[]', 'float[]', 'double[]'].includes(t)) return ['example']
  if (['any', 'object', 'dynamic', 'mixed', 'void', 'null'].includes(t)) return {}
  if (t.startsWith('list<') || t.startsWith('vector<') || t.startsWith('array<')) return ['example']
  if (t.startsWith('map<') || t.startsWith('dictionary<') || t.endsWith('[]') ||
      t.startsWith('[]') || t.startsWith('array')) return ['example']
  // Assume it's a nested struct/class
  return {}
}

function camelCase(name: string): string {
  return name.charAt(0).toLowerCase() + name.slice(1)
}

function stripComments(line: string): string {
  return line.replace(/\/\/.*$/, '').replace(/#.*$/, '').trim()
}

// Generic extractor: "Type name" pattern (Java, C#, C++, Dart)
function extractTypeNameFields(input: string, opts: {
  jsonAttr?: RegExp          // e.g. /\[JsonProperty\s*\(\s*"([^"]+)"\s*\)\]/
  className?: RegExp         // e.g. /(?:public\s+)?(?:class|struct|record)\s+(\w+)/
  skipAnnotations?: boolean  // skip lines starting with @
}): ParsedField[] {
  const lines = input.split('\n')
  const fields: ParsedField[] = []
  let pendingJsonName: string | null = null
  let inBlock = false

  for (const raw of lines) {
    const trimmed = raw.trim()
    if (!trimmed || trimmed.startsWith('//') || trimmed.startsWith('#')) continue

    // C# property attribute
    if (opts.jsonAttr) {
      const attrMatch = trimmed.match(opts.jsonAttr)
      if (attrMatch) {
        pendingJsonName = attrMatch[1]
        continue
      }
    }

    // Java/Dart annotations
    if (opts.skipAnnotations && trimmed.startsWith('@')) {
      const jm = trimmed.match(/@(?:JsonProperty|SerializedName|SerialName)\s*\(\s*"([^"]+)"\s*\)/)
      if (jm) pendingJsonName = jm[1]
      continue
    }

    // Skip class/struct/interface declarations
    if (opts.className && opts.className.test(trimmed)) { inBlock = true; continue }
    if (/^(public\s+|private\s+|protected\s+)?(class|struct|interface|record|sealed|static)\s/i.test(trimmed)) { inBlock = true; continue }
    if (trimmed === '{') continue
    if (trimmed === '}' || trimmed === '};') { inBlock = false; continue }

    if (!inBlock) continue

    // Clean the line: remove C# { get; set; }, C++ = default, trailing junk
    let clean = trimmed
      .replace(/\s*\{[^}]*\}\s*/g, ' ')  // { get; set; }
      .replace(/\s*=\s*[^,;]+/g, '')      // = default
      .replace(/[;,]$/, '')                // trailing ; or ,
      .replace(/^const\s+/, '')            // const
      .replace(/^late\s+/, '')             // late (Dart)
      .replace(/^final\s+/, '')            // final (Dart/Java)
      .replace(/^(public|private|protected|static|virtual|override|abstract|sealed|readonly|unsafe)\s+/g, '')
      .trim()

    if (!clean || clean.startsWith('{') || clean.startsWith('}')) continue

    // Handle C++ std::, boost:: types
    clean = clean.replace(/\b(std::|boost::|System::|UnityEngine::)/g, '')

    // Match: Type name  or  Type? name (Dart)  or  Type* name (C++)  or  Type& name (C++)
    const match = clean.match(/^(\w[\w<>\[\]\s]*(?:\?\s*)?(?:\s*\*)?(?:\s*&)?)\s+(\w+)\s*$/)
    if (!match) continue

    let type = match[1].trim().replace(/\s+/g, ' ')
    const name = match[2].trim()
    const jsonName = pendingJsonName || camelCase(name)
    pendingJsonName = null

    // Check for array (T[] in C#/Java, List<T>)
    const isArray = type.endsWith('[]') || type.startsWith('List<') || type.startsWith('list<') || type.startsWith('IList<') || type.startsWith('ICollection<') || type.startsWith('HashSet<') || type.startsWith('Set<')

    if (type.endsWith('[]')) {
      type = type.slice(0, -2)
    } else if (type.startsWith('List<') || type.startsWith('list<') || type.startsWith('IList<') || type.startsWith('ICollection<') || type.startsWith('HashSet<') || type.startsWith('Set<')) {
      const inner = type.match(/<(\w+)>/)
      type = inner ? inner[1] : 'string'
    }

    if (isArray) {
      fields.push({ jsonName, value: [sampleFromLangType(type)] })
    } else {
      fields.push({ jsonName, value: sampleFromLangType(type) })
    }
  }

  return fields
}

// Generic extractor: "name: Type" pattern (TypeScript, Python, Rust)
function extractNameTypeFields(input: string, opts: {
  typeIsPascal?: boolean   // Rust: name: Type (Type is PascalCase)
  allowOptional?: boolean  // TS: name?: Type
  defaultValue?: boolean   // Python: name: Type = value
}): ParsedField[] {
  const lines = input.split('\n')
  const fields: ParsedField[] = []
  let inBlock = false

  for (const raw of lines) {
    const trimmed = raw.trim()
    if (!trimmed || trimmed.startsWith('//') || trimmed.startsWith('#')) continue

    // Skip struct/interface/class declarations
    if (/^(export\s+)?(type|interface|struct|class|abstract\s+class)\s/i.test(trimmed)) { inBlock = true; continue }
    if (trimmed.startsWith('@')) continue  // decorators
    if (trimmed === '{' || trimmed === '(') continue
    if (trimmed === '}' || trimmed === ')' || trimmed === '];') { inBlock = false; continue }

    if (!inBlock) continue

    let clean = trimmed
      .replace(/[;,]$/, '')  // trailing ; or ,
      .trim()

    if (!clean || clean === '{' || clean === '}') continue

    // Match: name?: Type  or  name: Type  or  name: Type = default
    const optional = opts.allowOptional ? '?' : ''
    const defaultVal = opts.defaultValue ? '(?:\\s*=\\s*[^,]+)?' : ''
    const pattern = new RegExp(`^(\\w+)${optional}\\s*:\\s*(.+?)${defaultVal}$`)
    const match = clean.match(pattern)
    if (!match) continue

    const name = match[1].trim()
    let type = match[2].trim()

    // Python: remove quotes from type annotations like "SomeType"
    type = type.replace(/^['"]|['"]$/g, '')

    // Handle Optional[Type] (Python)
    const optionalMatch = type.match(/^Optional\[(.+)\]$/)
    if (optionalMatch) type = optionalMatch[1]

    // Handle List[Type] (Python)
    const listMatch = type.match(/^(?:list|List|List\[(.+)\]|list\[(.+)\]|typing\.List\[(.+)\]|Sequence\[(.+)\]|MutableSequence\[(.+)\]|Array<(.+)>)$/)
    if (listMatch) {
      const innerType = listMatch[1] || listMatch[2] || listMatch[3] || listMatch[4] || listMatch[5] || listMatch[6] || 'string'
      fields.push({ jsonName: name, value: [sampleFromLangType(innerType)] })
      continue
    }

    const isArray = type.endsWith('[]') || /^(Array|map|Map|Record|Partial|Pick|Omit)</.test(type)
    if (isArray) {
      const inner = type.match(/<(\w+)>/)
      fields.push({ jsonName: name, value: [sampleFromLangType(inner ? inner[1] : 'string')] })
    } else {
      fields.push({ jsonName: name, value: sampleFromLangType(type) })
    }
  }

  return fields
}

// Ruby extractor
function extractRubyFields(input: string): ParsedField[] {
  const lines = input.split('\n')
  const fields: ParsedField[] = []
  let inClass = false

  for (const raw of lines) {
    const trimmed = raw.trim()
    if (!trimmed || trimmed.startsWith('#')) continue

    if (/^class\s+\w+/i.test(trimmed)) { inClass = true; continue }
    if (trimmed === 'end' || trimmed === 'end;') { inClass = false; continue }
    if (!inClass) continue

    // attr_accessor :name, :age
    const attrMatch = trimmed.match(/attr_(?:accessor|reader|writer)\s+(.+)/)
    if (attrMatch) {
      const attrs = attrMatch[1].split(',').map(a => a.trim().replace(/^:/, ''))
      for (const attr of attrs) {
        fields.push({ jsonName: attr, value: 'example' })
      }
      continue
    }

    // def name  /  def name=
    const defMatch = trimmed.match(/^def\s+(\w+)/)
    if (defMatch) {
      const name = defMatch[1].replace(/=$/, '')
      fields.push({ jsonName: name, value: 'example' })
    }
  }

  return fields
}

// ─── Dispatcher: struct → JSON ───────────────────────────────

export function parseStructToJSON(input: string, lang: StructInputLang): string {
  switch (lang) {
    case 'go':
      return parseGoStructToJSON(input)
    case 'java':
    case 'csharp':
    case 'cpp':
    case 'dart': {
      const configs: Record<string, { jsonAttr?: RegExp; className?: RegExp; skipAnnotations?: boolean }> = {
        java: { className: /(?:public\s+)?(?:class|record)\s+(\w+)/, skipAnnotations: true },
        csharp: { jsonAttr: /\[JsonProperty\s*\(\s*"([^"]+)"\s*\)\]/, className: /(?:public\s+)?(?:class|struct|record)\s+(\w+)/ },
        cpp: { className: /(?:struct|class)\s+\w+/ },
        dart: { className: /(?:class)\s+\w+/, skipAnnotations: true },
      }
      const fields = extractTypeNameFields(input, configs[lang] || {})
      return buildJSONFromFields(fields)
    }
    case 'typescript': {
      const fields = extractNameTypeFields(input, { allowOptional: true })
      return buildJSONFromFields(fields)
    }
    case 'rust': {
      const fields = extractNameTypeFields(input, { typeIsPascal: true })
      return buildJSONFromFields(fields)
    }
    case 'python': {
      const fields = extractNameTypeFields(input, { allowOptional: false, defaultValue: true })
      return buildJSONFromFields(fields)
    }
    case 'ruby': {
      const fields = extractRubyFields(input)
      return buildJSONFromFields(fields)
    }
    case 'simple':
    default:
      return parseSimpleStruct(input)
  }
}

function buildJSONFromFields(fields: ParsedField[]): string {
  const obj: Record<string, any> = {}
  for (const f of fields) {
    obj[f.jsonName] = f.value
  }
  return JSON.stringify(obj, null, 2)
}

// ─── Go struct parser (existing) ─────────────────────────────

interface StructDef {
  name: string
  fields: StructField[]
}

interface StructField {
  jsonName: string
  goType: string
  isArray: boolean
  isStruct: boolean
}

function parseGoStructs(input: string): Map<string, StructDef> {
  const structs = new Map<string, StructDef>()
  const lines = input.split('\n')
  let current: StructDef | null = null

  for (const raw of lines) {
    const trimmed = raw.trim()
    if (!trimmed || trimmed.startsWith('//')) continue

    const header = trimmed.match(/^type\s+(\w+)\s+struct\s*\{$/)
    if (header) {
      current = { name: header[1], fields: [] }
      continue
    }

    if (trimmed === '}' && current) {
      structs.set(current.name, current)
      current = null
      continue
    }

    if (!current) continue

    const fieldMatch = trimmed.match(
      /^(\w+)\s+(.+?)(?:\s*`[^`]*json:"([^"]+)"[^`]*`)?\s*$/
    )
    if (!fieldMatch) continue

    const goName = fieldMatch[1]
    const goType = fieldMatch[2].trim()
    const jsonName = fieldMatch[3] || goName.charAt(0).toLowerCase() + goName.slice(1)
    const baseType = goType.replace(/^\[\]/, '').replace(/^\*/, '')
    const isArray = goType.startsWith('[]')
    const isStruct = !isArray && !baseType.startsWith('map') && !baseType.startsWith('func') &&
      (structs.has(baseType) || baseType === goName)

    current.fields.push({ jsonName, goType, isArray, isStruct })
  }

  return structs
}

function goTypeToSample(structs: Map<string, StructDef>, typeName: string): any {
  const baseType = typeName.replace(/^\[\]/, '').replace(/^\*/, '')
  const lower = baseType.toLowerCase()

  if (lower === 'string') return 'example'
  if (['int', 'int64', 'int32', 'float64', 'float32', 'byte', 'uint', 'uint64', 'int16', 'uint16', 'uint8', 'int8'].includes(lower)) return 0
  if (lower === 'bool' || lower === 'boolean') return true
  if (lower === 'time.time' || lower === 'time') return '2025-01-01T00:00:00Z'

  const structDef = structs.get(baseType)
  if (structDef) return buildGoJSON(structs, structDef)
  if (lower === 'any' || lower === 'interface{}' || lower === 'interface {}') return {}
  if (lower.startsWith('map')) return { key: 'value' }

  return 'value'
}

function buildGoJSON(structs: Map<string, StructDef>, def: StructDef): Record<string, any> {
  const obj: Record<string, any> = {}
  for (const field of def.fields) {
    if (field.isArray) {
      const baseType = field.goType.slice(2)
      obj[field.jsonName] = [goTypeToSample(structs, baseType)]
    } else if (field.isStruct) {
      obj[field.jsonName] = goTypeToSample(structs, field.goType)
    } else {
      obj[field.jsonName] = goTypeToSample(structs, field.goType)
    }
  }
  return obj
}

export function parseGoStructToJSON(input: string): string {
  const structs = parseGoStructs(input)
  if (structs.size === 0) throw new Error('No Go struct definitions found')
  const last = Array.from(structs.values()).pop()!
  return JSON.stringify(buildGoJSON(structs, last), null, 2)
}

// ─── JSON → Struct generators ────────────────────────────────

interface JSONValue {
  [key: string]: any
}

function capitalize(name: string): string {
  return name.charAt(0).toUpperCase() + name.slice(1)
}

function inferType(value: any, lang: TargetLang, depth: number): string {
  if (value === null) return 'null'
  if (Array.isArray(value)) {
    if (value.length === 0) return inferType('any', lang, depth) + '[]'
    const itemType = inferType(value[0], lang, depth)
    if (lang === 'python') return `list[${itemType}]`
    if (lang === 'go') return `[]${itemType}`
    if (lang === 'java') return `List<${itemType}>`
    if (lang === 'csharp') return `List<${itemType}>`
    if (lang === 'cpp') return `std::vector<${itemType}>`
    if (lang === 'dart') return `List<${itemType}>`
    if (lang === 'ruby') return `Array<${itemType}>`
    return `${itemType}[]`
  }
  switch (typeof value) {
    case 'string':
      if (lang === 'go') return 'string'
      if (lang === 'python') return 'str'
      if (lang === 'rust') return 'String'
      if (lang === 'cpp') return 'std::string'
      if (lang === 'dart') return 'String'
      return 'string'
    case 'number':
      if (lang === 'go') return 'float64'
      if (lang === 'rust') return 'f64'
      if (lang === 'dart') return 'double'
      if (lang === 'cpp') return 'double'
      return value === Math.floor(value) ? (lang === 'python' ? 'int' : 'number') : (lang === 'python' ? 'float' : 'number')
    case 'boolean':
      if (lang === 'go') return 'bool'
      if (lang === 'python') return 'bool'
      if (lang === 'dart') return 'bool'
      return 'boolean'
    case 'object':
      return generateStructInner(value, lang, depth + 1)
    default:
      return 'any'
  }
}

function generateStructInner(obj: JSONValue, lang: TargetLang, depth: number): string {
  const indent = '  '.repeat(depth)
  const indentInner = '  '.repeat(depth + 1)
  const entries = Object.entries(obj)
  let result = ''

  switch (lang) {
    case 'go': {
      result += 'struct {\n'
      for (const [key, val] of entries) {
        const type = inferType(val, lang, depth)
        const fieldName = capitalize(key)
        result += `${indentInner}${fieldName} ${type} \`json:"${key}"\`\n`
      }
      result += `${indent}}`
      break
    }
    case 'typescript': {
      result += '{\n'
      for (const [key, val] of entries) {
        const type = inferType(val, lang, depth)
        result += `${indentInner}${key}: ${type};\n`
      }
      result += `${indent}}`
      break
    }
    case 'rust': {
      result += '{\n'
      for (const [key, val] of entries) {
        const type = inferType(val, lang, depth)
        const fieldName = key.replace(/([A-Z])/g, '_$1').toLowerCase()
        result += `${indentInner}#[serde(rename = "${key}")]\n`
        result += `${indentInner}pub ${fieldName}: ${type},\n`
      }
      result += `${indent}}`
      break
    }
    case 'python': {
      result += ':\n'
      for (const [key, val] of entries) {
        const type = inferType(val, lang, depth)
        result += `${indentInner}${key}: ${type}\n`
      }
      break
    }
    case 'java': {
      result += '{\n'
      for (const [key, val] of entries) {
        const type = inferType(val, lang, depth)
        const fieldName = key
        result += `${indentInner}private ${type} ${fieldName};\n`
      }
      result += `${indent}}`
      break
    }
    case 'csharp': {
      result += '{\n'
      for (const [key, val] of entries) {
        const type = inferType(val, lang, depth)
        const fieldName = capitalize(key)
        result += `${indentInner}[JsonProperty("${key}")]\n`
        result += `${indentInner}public ${type} ${fieldName} { get; set; }\n`
      }
      result += `${indent}}`
      break
    }
    case 'cpp': {
      result += '{\n'
      for (const [key, val] of entries) {
        const type = inferType(val, lang, depth)
        result += `${indentInner}${type} ${key};\n`
      }
      result += `${indent}}`
      break
    }
    case 'ruby': {
      result += '\n'
      const keys = entries.map(([k]) => k)
      result += `${indentInner}attr_accessor :${keys.join(', :')}\n`
      break
    }
    case 'dart': {
      result += '{\n'
      for (const [key, val] of entries) {
        const type = inferType(val, lang, depth)
        result += `${indentInner}${type} ${key};\n`
      }
      result += `${indent}}`
      break
    }
  }
  return result
}

export function generateStruct(input: string, lang: TargetLang): string {
  const obj = JSON.parse(input)
  if (typeof obj !== 'object' || obj === null || Array.isArray(obj)) {
    throw new Error('Input must be a JSON object')
  }
  const name = 'AutoGenerated'
  const body = generateStructInner(obj, lang, 0)

  switch (lang) {
    case 'go':
      return `type ${name} ${body}`
    case 'typescript':
      return `interface ${name} ${body}`
    case 'rust':
      return `#[derive(Debug, Serialize, Deserialize)]\nstruct ${name} ${body}`
    case 'python':
      return `@dataclass\nclass ${name}${body}`
    case 'java':
      return `public class ${name} ${body}`
    case 'csharp':
      return `public class ${name} ${body}`
    case 'cpp':
      return `struct ${name} ${body};`
    case 'ruby':
      return `class ${name}${body}end`
    case 'dart':
      return `class ${name} ${body}`
  }
}
