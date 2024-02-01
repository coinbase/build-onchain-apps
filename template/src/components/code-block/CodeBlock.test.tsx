/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react';
import CodeBlock from './CodeBlock';

describe('CodeBlock', () => {
  it('should render code snippet', async () => {
    // reference: https://github.com/testing-library/react-testing-library/issues/1209#issuecomment-1544407773
    render(await CodeBlock({ code: "import React from 'react';" }));

    expect(screen.getByText("import React from 'react';")).toBeInTheDocument();
  });
});
