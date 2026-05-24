import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MscSmokeTest } from './index';

describe('MscSmokeTest', () => {
  it('renders with msc- namespace class', () => {
    render(<MscSmokeTest />);
    expect(document.querySelector('.msc-smoke-test')).toBeTruthy();
  });

  it('renders children', () => {
    render(<MscSmokeTest>Child content</MscSmokeTest>);
    expect(screen.getByText('Child content')).toBeDefined();
  });
});
