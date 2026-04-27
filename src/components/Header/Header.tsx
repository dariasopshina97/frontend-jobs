import { Box, Container, Group, Text } from '@mantine/core';
import styles from './Header.module.css';

export function Header() {
  return (
    <Box component="header" className={styles.header}>
      <Container size="lg" py="md">
        <Group align="center" className={styles.headerContent}>
          <Group gap="sm" align="center">
            <Box className={styles.logoCircle}>hh</Box>
            <Text className={styles.brand}>.FrontEnd</Text>
          </Group>

          <Group gap="xl" align="center" className={styles.nav}>
            <Text component="a" href="#" className={styles.activeLink}>
              Вакансии FE
            </Text>

            <Text component="a" href="#" className={styles.link}>
              Обо мне
            </Text>
          </Group>
        </Group>
      </Container>
    </Box>
  );
}
