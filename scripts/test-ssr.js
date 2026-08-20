import React from 'react';
import { renderToString } from 'react-dom/server';

console.log('Testing renderToString in Node environment');
try {
  const html = renderToString(React.createElement('div', { className: 'test' }, 'Hello World'));
  console.log('renderToString basic test success:', html);
} catch (err) {
  console.error('renderToString error:', err);
}
