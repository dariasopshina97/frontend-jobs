import reducer, { loadVacancies, setCurrentPage, setSearch } from './slice';
import { fetchVacancies } from './api';
import type { VacancyResponse } from './types';
import { describe, expect, it, vi, beforeEach } from 'vitest';

vi.mock('./api', () => ({
  fetchVacancies: vi.fn(),
}));

const mockedFetchVacancies = vi.mocked(fetchVacancies);

describe('vacancies slice', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('setCurrentPage обновляет страницу', () => {
    const state = reducer(undefined, setCurrentPage(3));
    expect(state.currentPage).toBe(3);
  });

  it('setSearch обновляет строку поиска', () => {
    const state = reducer(undefined, setSearch('react'));
    expect(state.search).toBe('react');
  });

  it('loadVacancies.fulfilled мапит данные и форматирует зарплату', async () => {
    const response: VacancyResponse = {
      items: [
        {
          id: '1',
          name: 'Frontend Developer',
          alternate_url: 'https://example.com/v/1',
          salary: { currency: 'RUR', from: 150000, to: 250000, gross: true },
          employer: { name: 'Acme' },
          experience: { name: 'От 1 года до 3 лет' },
          area: { name: 'Москва' },
          schedule: { name: 'Удаленно' },
        },
      ],
      found: 1,
      pages: 5,
      page: 0,
      per_page: 10,
    };

    mockedFetchVacancies.mockResolvedValueOnce(response);

    const action = await loadVacancies({ page: 1, search: 'frontend' })(
      vi.fn(),
      vi.fn(),
      undefined,
    );

    expect(mockedFetchVacancies).toHaveBeenCalledWith({
      page: 1,
      skills: [],
      search: 'frontend',
      city: 'moscow',
      searchField: 'name',
    });

    const state = reducer(undefined, action);
    expect(state.isLoading).toBe(false);
    expect(state.totalPages).toBe(5);
    expect(state.items[0]).toMatchObject({
      title: 'Frontend Developer',
      salary: 'от 150000 до 250000 ₽',
      company: 'Acme',
      city: 'Москва',
      format: 'Удаленно',
    });
  });

  it('loadVacancies.rejected ставит ошибку и очищает список', async () => {
    mockedFetchVacancies.mockRejectedValueOnce(new Error('network'));

    const action = await loadVacancies({ page: 1, search: '' })(
      vi.fn(),
      vi.fn(),
      undefined,
    );

    const state = reducer(undefined, action);
    expect(state.error).toBe('Ошибка при загрузке вакансий');
    expect(state.items).toEqual([]);
    expect(state.totalPages).toBe(1);
    expect(state.isLoading).toBe(false);
  });

  it('pending включает состояние загрузки', () => {
    const action = { type: loadVacancies.pending.type };
    const state = reducer(undefined, action);
    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });
});
