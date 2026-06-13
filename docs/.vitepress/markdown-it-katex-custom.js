// 轻量级 markdown-it KaTeX 插件，使用项目根目录的 katex
import katex from 'katex'

function isValidDelim(state, pos) {
  const max = state.posMax
  let can_open = true
  let can_close = true
  const prevChar = pos > 0 ? state.src.charCodeAt(pos - 1) : -1
  const nextChar = pos + 1 <= max ? state.src.charCodeAt(pos + 1) : -1

  if (prevChar === 0x20 || prevChar === 0x09 ||
      (nextChar >= 0x30 && nextChar <= 0x39)) {
    can_close = false
  }
  if (nextChar === 0x20 || nextChar === 0x09) {
    can_open = false
  }
  return { can_open, can_close }
}

function math_inline(state, silent) {
  if (state.src[state.pos] !== '$') return false
  const res = isValidDelim(state, state.pos)
  if (!res.can_open) {
    if (!silent) state.pending += '$'
    state.pos += 1
    return true
  }

  let start = state.pos + 1
  let match = start
  while ((match = state.src.indexOf('$', match)) !== -1) {
    let pos = match - 1
    while (state.src[pos] === '\\') pos -= 1
    if (((match - pos) % 2) == 1) break
    match += 1
  }

  if (match === -1) {
    if (!silent) state.pending += '$'
    state.pos = start
    return true
  }
  if (match - start === 0) {
    if (!silent) state.pending += '$$'
    state.pos = start + 1
    return true
  }
  const res2 = isValidDelim(state, match)
  if (!res2.can_close) {
    if (!silent) state.pending += '$'
    state.pos = start
    return true
  }

  if (!silent) {
    const token = state.push('math_inline', 'math', 0)
    token.markup = '$'
    token.content = state.src.slice(start, match)
  }
  state.pos = match + 1
  return true
}

function math_block(state, start, end, silent) {
  let pos = state.bMarks[start] + state.tShift[start]
  const max = state.eMarks[start]
  if (pos + 2 > max) return false
  if (state.src.slice(pos, pos + 2) !== '$$') return false

  pos += 2
  let firstLine = state.src.slice(pos, max)
  if (silent) return true

  let found = false
  if (firstLine.trim().slice(-2) === '$$') {
    firstLine = firstLine.trim().slice(0, -2)
    found = true
  }

  let next = start
  while (!found) {
    next++
    if (next >= end) break
    pos = state.bMarks[next] + state.tShift[next]
    const m = state.eMarks[next]
    if (pos < m && state.tShift[next] < state.blkIndent) break
    if (state.src.slice(pos, m).trim().slice(-2) === '$$') {
      const lastPos = state.src.slice(0, m).lastIndexOf('$$')
      const lastLine = state.src.slice(pos, lastPos)
      found = true
    }
  }

  state.line = next + 1
  const token = state.push('math_block', 'math', 0)
  token.block = true
  token.content = (firstLine && firstLine.trim() ? firstLine + '\n' : '')
    + state.getLines(start + 1, next, state.tShift[start], true)
  token.map = [start, state.line]
  token.markup = '$$'
  return true
}

export default function math_plugin(md, options = {}) {
  const katexOptions = { ...options, throwOnError: false }

  md.inline.ruler.after('escape', 'math_inline', math_inline)
  md.block.ruler.after('blockquote', 'math_block', math_block, {
    alt: ['paragraph', 'reference', 'blockquote', 'list']
  })

  md.renderer.rules.math_inline = (tokens, idx) => {
    try {
      return katex.renderToString(tokens[idx].content, { ...katexOptions, displayMode: false })
    } catch (e) {
      return tokens[idx].content
    }
  }

  md.renderer.rules.math_block = (tokens, idx) => {
    try {
      return '<p>' + katex.renderToString(tokens[idx].content, { ...katexOptions, displayMode: true }) + '</p>'
    } catch (e) {
      return tokens[idx].content
    }
  }
}
