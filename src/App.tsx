import { useEffect } from 'react';
import {
  Container,
  Stack,
  Flex,
  Paper,
  Center,
  Pagination,
} from '@mantine/core';
import { Header } from './components/Header/Header';
import { SkillsFilter } from './features/vacancies/SkillsFilter/SkillsFilter';
import { CityFilter } from './features/vacancies/CityFilter/CityFilter';
import { VacancyList } from './features/vacancies/VacancyList';
import { VacancyHero } from './features/vacancies/VacancyHero/VacancyHero';
import './App.css';

import { useAppDispatch, useAppSelector } from './app/hooks';
import {
  loadVacancies,
  setCurrentPage,
  setSearch,
} from './features/vacancies/slice';

export default function App() {
  const dispatch = useAppDispatch();
  const { currentPage, totalPages, items, isLoading, search } = useAppSelector(
    (state) => state.vacancies,
  );

  useEffect(() => {
    dispatch(loadVacancies({ page: currentPage, search }));
  }, [dispatch, currentPage, search]);

  return (
    <>
      <Header />

      <main>
        <Container size="lg" py="xl">
          <Stack gap="xl">
            <VacancyHero
              search={search}
              onSearchChange={(value) => dispatch(setSearch(value))}
              onSearchSubmit={() => {
                dispatch(setCurrentPage(1));
                dispatch(loadVacancies({ page: 1, search }));
              }}
            />
            <Flex className="contentLayout" gap="xl" align="flex-start">
              <Stack className="filtersColumn" gap="md">
                <Paper withBorder radius="md" p="lg">
                  <SkillsFilter />
                </Paper>

                <Paper withBorder radius="md" p="lg">
                  <CityFilter />
                </Paper>
              </Stack>

              <Stack className="resultsColumn" gap="lg">
                {isLoading ? (
                  <Center style={{ height: 200 }}>
                    <p>Загрузка вакансий...</p>
                  </Center>
                ) : (
                  <VacancyList vacancies={items} />
                )}

                <Center>
                  <Pagination
                    value={currentPage}
                    onChange={(page) => dispatch(setCurrentPage(page))}
                    total={totalPages}
                    classNames={{
                      control: 'paginationItem',
                      dots: 'paginationDots',
                    }}
                  />
                </Center>
              </Stack>
            </Flex>
          </Stack>
        </Container>
      </main>
    </>
  );
}
