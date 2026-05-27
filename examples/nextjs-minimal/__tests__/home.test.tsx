import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Home from '../app/page';

describe('Home Page', () => {
  it('renders the success heading', () => {
    render(<Home />);
    expect(screen.getByText(/Vader Engine v2 Works!/i)).toBeDefined();
  });

  it('renders the test button', () => {
    render(<Home />);
    expect(screen.getByText(/Test MCP Connection/i)).toBeDefined();
  });

  it('renders the MSC footer', () => {
    render(<Home />);
    expect(screen.getByText(/Powered by the MSC Media Engine/i)).toBeDefined();
  });
});
