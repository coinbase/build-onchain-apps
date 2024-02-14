/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react';
import CodeBlock from './CodeBlock';

describe('CodeBlock', () => {
  it('should render loading state', () => {
    render(<CodeBlock code={"import React from 'react';"} />);
    expect(screen.getByText('...')).toBeInTheDocument();
  });

  it('should eventually render code snippet', async () => {
    render(<CodeBlock code={"import React from 'react';"} />);
    expect(await screen.findByText("import React from 'react';")).toBeInTheDocument();
  });
});
