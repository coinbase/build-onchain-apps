/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render } from '@testing-library/react';
import NotConnected from './NotConnected';

describe('NotConnected', () => {
  it('should render', () => {
    // Render the NotConnected component
    render(<NotConnected />);
  });
});
