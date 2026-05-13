import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MantineProvider } from '@mantine/core';
import { SkillsFilter } from './SkillsFilter';
import { theme } from '../../../theme';
import { describe, expect, it } from 'vitest';
import type { ReactNode } from 'react';

function renderWithMantine(ui: ReactNode) {
  return render(<MantineProvider theme={theme}>{ui}</MantineProvider>);
}

describe('SkillsFilter', () => {
  it('добавляет новый навык через Enter', async () => {
    const user = userEvent.setup();
    renderWithMantine(<SkillsFilter />);

    const input = screen.getByPlaceholderText('Навык');
    await user.type(input, 'TypeScript{Enter}');

    expect(screen.getByText('TypeScript')).toBeInTheDocument();
  });

  it('не добавляет дубликат навыка', async () => {
    const user = userEvent.setup();
    renderWithMantine(<SkillsFilter />);

    const input = screen.getByPlaceholderText('Навык');
    await user.type(input, 'React{Enter}');

    const reactPills = screen.getAllByText('React');
    expect(reactPills).toHaveLength(1);
  });
});
