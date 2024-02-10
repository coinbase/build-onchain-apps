/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render, screen } from '@testing-library/react';
import ProgressBar from './ProgressBar';

const PERCENT = 20; // required prop to render the <ProgressBar />
const PROGRESS_BAR_TEST_ID = `progress-bar`;

describe('ProgressBar', () => {
  it('should accept `percent` prop to render the bar', () => {
    render(<ProgressBar percent={PERCENT} />);

    const barEl = screen.getByTestId(PROGRESS_BAR_TEST_ID);

    expect(barEl).toBeInTheDocument();
    expect(barEl.firstChild).toHaveStyle({ width: `${PERCENT}%` });
  });

  it('should apply backgroundClass to the ProgressBar', () => {
    const bgClass = `bg-gray-800`;

    render(<ProgressBar percent={PERCENT} backgroundClass={bgClass} />);
    expect(screen.getByTestId(PROGRESS_BAR_TEST_ID)).toHaveClass(bgClass);
  });

  it('should apply bar class to the ProgressBar', () => {
    const barClass = `bg-gradient-2`;

    render(<ProgressBar percent={PERCENT} barClass={barClass} />);
    expect(screen.getByTestId(PROGRESS_BAR_TEST_ID).firstChild).toHaveClass(barClass);
  });
});
