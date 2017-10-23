import expect from 'expect'
import React from 'react'
import {render, unmountComponentAtNode} from 'react-dom'

import CoinHiveClient, { Shortlink } from 'src/index'

const SECRET = '';

describe('Component', () => {
  let node

  beforeEach(() => {
    node = document.createElement('div')
  })

  afterEach(() => {
    unmountComponentAtNode(node)
  })

  it('displays a welcome message', () => {
    render(<CoinHiveClient/>, node, () => {
      expect(node.innerHTML).toContain('Welcome to React components')
    })
  })
})

describe('Shortlink', () => {
    it('returns a link', () => {
        const linker = new Shortlink(SECRET, true);
        linker('http://mcordes.me/')
            .then(res => expect(JSON.stringify(res)).toContain("success"))
            .catch(err => expect(false).toBe(true));
    });
});