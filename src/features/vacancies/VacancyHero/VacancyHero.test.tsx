import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MantineProvider } from '@mantine/core';
import { VacancyHero } from './VacancyHero';
import { theme } from '../../../theme';
import { describe, expect, it, vi } from 'vitest';
import type { ReactNode } from 'react';

function renderWithMantine(ui: ReactNode) {
  return render(<MantineProvider theme={theme}>{ui}</MantineProvider>);
}

describe('VacancyHero', () => {
  it('вызывает onSearchChange при вводе', async () => {
    const user = userEvent.setup();
    const onSearchChange = vi.fn();
    const onSearchSubmit = vi.fn();

    renderWithMantine(
      <VacancyHero
        search=""
        onSearchChange={onSearchChange}
        onSearchSubmit={onSearchSubmit}
      />,
    );

    const input = screen.getByPlaceholderText(
      'Должность или название компании',
    );
    await user.type(input, 'React');

    expect(onSearchChange).toHaveBeenCalled();
    expect(onSearchSubmit).not.toHaveBeenCalled();
  });

  it('вызывает onSearchSubmit по Enter и по кнопке', async () => {
    const user = userEvent.setup();
    const onSearchChange = vi.fn();
    const onSearchSubmit = vi.fn();

    renderWithMantine(
      <VacancyHero
        search="React"
        onSearchChange={onSearchChange}
        onSearchSubmit={onSearchSubmit}
      />,
    );

    const input = screen.getByPlaceholderText(
      'Должность или название компании',
    );
    await user.type(input, '{Enter}');
    await user.click(screen.getByRole('button', { name: 'Найти' }));

    expect(onSearchSubmit).toHaveBeenCalledTimes(2);
  });
});
