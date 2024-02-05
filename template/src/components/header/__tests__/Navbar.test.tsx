/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react';
import Navbar from '../Navbar';

describe('Navbar', () => {
  it('mounts', () => {
    render(<Navbar />);
    expect(screen.getByText('Get Started')).toBeInTheDocument();
  });
});
