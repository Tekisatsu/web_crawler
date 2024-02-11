const { test, expect } = require('@jest/globals')
const { normalizeURL } = require('./crawl.js')
test('normalizes https://wagslane.dev', () =>{
      expect(normalizeURL('https://wagslane.dev')).toBe('https://wagslane.dev')
})
test('normalizes https://wagslane.dev/', () =>{
      expect(normalizeURL('https://wagslane.dev/')).toBe('https://wagslane.dev')
})
test('normalizes https://blog.boot.dev/path', () =>{
      expect(normalizeURL('https://blog.boot.dev/path')).toBe('blog.boot.dev/path')
})
test('normalizes http://blog.boot.dev/path', () =>{
      expect(normalizeURL('http://blog.boot.dev/path')).toBe('blog.boot.dev/path')
})