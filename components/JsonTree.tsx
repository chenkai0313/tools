'use client'

import { useState } from 'react'

interface TreeNodeProps {
  label?: string
  value: unknown
  depth: number
  defaultOpen?: boolean
}

function TypeBadge({ type }: { type: string }) {
  const colors: Record<string, string> = {
    string: 'text-green-400',
    number: 'text-blue-400',
    boolean: 'text-yellow-400',
    null: 'text-red-400',
    array: 'text-purple-400',
    object: 'text-indigo-400',
  }
  return <span className={`text-[10px] opacity-70 ${colors[type] || ''}`}>{type}</span>
}

function TreeNode({ label, value, depth, defaultOpen = true }: TreeNodeProps) {
  const [open, setOpen] = useState(defaultOpen || depth < 2)
  const isObject = value !== null && typeof value === 'object'
  const isArray = Array.isArray(value)
  const isExpandable = isObject || isArray

  const entries = isExpandable
    ? isArray
      ? (value as unknown[]).map((v, i) => ({ key: String(i), value: v }))
      : Object.entries(value as Record<string, unknown>).map(([k, v]) => ({ key: k, value: v }))
    : []

  const isEmpty = isExpandable && entries.length === 0
  const type = value === null ? 'null' : isArray ? 'array' : typeof value

  const renderValue = () => {
    if (value === null) return <span className="text-red-400">null</span>
    if (typeof value === 'string') return <span className="text-green-400">"{value}"</span>
    if (typeof value === 'number') return <span className="text-blue-400">{value}</span>
    if (typeof value === 'boolean') return <span className="text-yellow-400">{String(value)}</span>
    return null
  }

  const bracket = isArray ? ['[', ']'] : ['{', '}']

  return (
    <div className="font-mono text-xs leading-relaxed select-none">
      <div
        className={`flex items-start gap-1.5 ${isExpandable ? 'cursor-pointer hover:bg-white/[0.04] rounded px-0.5' : 'px-0.5'}`}
        onClick={() => isExpandable && setOpen(!open)}
        style={{ paddingLeft: depth * 16 }}
      >
        {isExpandable && (
          <span className="text-dark-400 shrink-0 mt-0.5">{open ? '▼' : '▶'}</span>
        )}
        {label !== undefined && (
          <>
            <span className="text-indigo-300 shrink-0">"{label}"</span>
            <span className="text-dark-400">:</span>
          </>
        )}
        {isEmpty ? (
          <span className="text-dark-400">{bracket[0]}{bracket[1]}</span>
        ) : isExpandable ? (
          <span className="text-dark-400">
            {open ? bracket[0] : `${bracket[0]} ${entries.length} items ${bracket[1]}`}
          </span>
        ) : (
          renderValue()
        )}
        {!isExpandable && label !== undefined && <TypeBadge type={type} />}
      </div>
      {open && isExpandable && !isEmpty && (
        <>
          {entries.map((entry) => (
            <TreeNode
              key={entry.key}
              label={isArray ? undefined : entry.key}
              value={entry.value}
              depth={depth + 1}
              defaultOpen={depth < 2}
            />
          ))}
          <div
            className="text-dark-400 cursor-pointer hover:bg-white/[0.04] rounded px-0.5"
            style={{ paddingLeft: depth * 16 }}
          >
            {bracket[1]}
          </div>
        </>
      )}
    </div>
  )
}

interface JsonTreeProps {
  data: unknown
  className?: string
}

export default function JsonTree({ data, className = '' }: JsonTreeProps) {
  return (
    <div className={`overflow-auto ${className}`}>
      <TreeNode value={data} depth={0} />
    </div>
  )
}
