import { render, screen } from '@testing-library/react';
import { MantineProvider } from '@mantine/core';
import { VacancyCard } from './VacancyCard';
import { theme } from '../../../theme';
import { describe, expect, it } from 'vitest';

function renderWithMantine(ui: React.ReactNode) {
  return render(<MantineProvider theme={theme}>{ui}</MantineProvider>);
}

describe('VacancyCard', () => {
  it('рендерит ключевые данные и ссылку отклика', () => {
    renderWithMantine(
      <VacancyCard
        title="Frontend Developer"
        salary="от 150000 ₽"
        experience="От 1 года до 3 лет"
        format="Удаленно"
        company="Acme"
        city="Москва"
        vacancyUrl="https://example.com/v/1"
      />,
    );

    expect(screen.getByText('Frontend Developer')).toBeInTheDocument();
    expect(screen.getByText('от 150000 ₽')).toBeInTheDocument();
    expect(screen.getByText('Acme')).toBeInTheDocument();

    const applyLink = screen.getByRole('link', { name: 'Откликнуться' });
    expect(applyLink).toHaveAttribute('href', 'https://example.com/v/1');
    expect(applyLink).toHaveAttribute('target', '_blank');
  });
});
