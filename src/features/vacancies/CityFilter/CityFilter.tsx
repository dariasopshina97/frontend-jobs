import { useState } from 'react';
import { Select } from '@mantine/core';
import { IconMapPin } from '@tabler/icons-react';
import styles from './CityFilter.module.css';

export function CityFilter() {
  const [city, setCity] = useState('');

  return (
    <Select
      placeholder="Все города"
      value={city}
      onChange={(value) => setCity(value || '')}
      data={[
        { value: '', label: 'Все города' },
        { value: '1', label: 'Москва' },
        { value: '2', label: 'Санкт-Петербург' },
      ]}
      leftSection={<IconMapPin size={12} />}
      classNames={{ input: styles.input }}
    />
  );
}
