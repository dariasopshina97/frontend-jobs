import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from '@reduxjs/toolkit';
import { fetchVacancies } from './api';
import type { VacancyCardData, VacancySalary } from './types';

type VacanciesState = {
  currentPage: number;
  totalPages: number;
  isLoading: boolean;
  error: string | null;
  items: VacancyCardData[];
  search: string;
};

const initialState: VacanciesState = {
  currentPage: 1,
  totalPages: 1,
  isLoading: false,
  error: null,
  items: [],
  search: '',
};

function formatSalary(salary: VacancySalary | null): string {
  if (!salary) {
    return 'Зарплата не указана';
  }

  const currency = salary.currency === 'RUR' ? '₽' : salary.currency;

  if (salary.from !== null && salary.to !== null) {
    return `от ${salary.from} до ${salary.to} ${currency}`;
  }

  if (salary.from !== null) {
    return `от ${salary.from} ${currency}`;
  }

  if (salary.to !== null) {
    return `до ${salary.to} ${currency}`;
  }

  return 'Зарплата не указана';
}

export const loadVacancies = createAsyncThunk(
  'vacancies/load',
  async ({ page, search }: { page: number; search: string }) => {
    const response = await fetchVacancies({
      page,
      skills: [],
      search,
      city: 'moscow',
      searchField: 'name',
    });

    return {
      totalPages: Math.max(1, response.pages),
      items: response.items.map((item) => ({
        id: item.id,
        title: item.name,
        salary: formatSalary(item.salary),
        experience: item.experience?.name ?? 'Опыт не указан',
        format: item.schedule?.name ?? 'Формат не указан',
        company: item.employer.name,
        city: item.area.name,
        vacancyUrl: item.alternate_url,
      })),
    };
  },
);

const vacanciesSlice = createSlice({
  name: 'vacancies',
  initialState,
  reducers: {
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setSearch(state, action: PayloadAction<string>) {
      state.search = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(loadVacancies.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(loadVacancies.fulfilled, (state, action) => {
      state.isLoading = false;
      state.totalPages = action.payload.totalPages;
      state.items = action.payload.items;
    });
    builder.addCase(loadVacancies.rejected, (state) => {
      state.isLoading = false;
      state.error = 'Ошибка при загрузке вакансий';
      state.items = [];
      state.totalPages = 1;
    });
  },
});

export const { setCurrentPage, setSearch } = vacanciesSlice.actions;
export default vacanciesSlice.reducer;
