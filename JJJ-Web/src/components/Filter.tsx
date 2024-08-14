import { Box, Button } from '@mui/material';
import { theme } from '../styles/theme';
import { useFilterStore } from '../stores/Filter.store';
import { CategoryAgeType } from '../types/TempMockdata';
import styles from '../styles/components/Filter.module.css';
interface AgeOption {
  value: CategoryAgeType;
  label: string;
}

export default function Filter() {
  const age: AgeOption[] = [
    { value: '모두 보기', label: '모두 보기' },
    { value: '0-6', label: '0-6개월' },
    { value: '7-12', label: '7-12개월' },
    { value: '12-18', label: '12-18개월' },
    { value: '19-24', label: '19-24개월' },
    { value: '2-3', label: '2-3세' },
    { value: 'over3', label: '3세 이상' },
  ];

  const sorting: string[] = [
    '최신순',
    '가격높은순',
    '가격낮은순',
    '별점순',
    '리뷰많은순',
  ];

  const { activeAge, activeSorting, setActiveAge, setActiveSorting } =
    useFilterStore();

  const handleAgeClick = (age: CategoryAgeType) => {
    setActiveAge(age === activeAge ? '모두 보기' : age);
  };
  const handleFilterClick = (filter: string) => {
    setActiveSorting(activeSorting === filter ? null : filter);
  };

  return (
    <div className={styles.filter__container}>
      <div className={styles.age__container}>
        {age.map((item) => (
          <Button
            key={item.value}
            className={item.value === activeAge ? 'active' : ''}
            onClick={() => handleAgeClick(item.value)}
            sx={{
              marginRight: '20px',
            }}
          >
            {item.label}
          </Button>
        ))}
      </div>
      <div className={styles.sorting__container}>
        {sorting.map((item) => (
          <Button
            key={item}
            className={item === activeSorting ? 'active' : ''}
            onClick={() => handleFilterClick(item)}
            sx={{
              marginRight: '20px',
            }}
          >
            {item}
          </Button>
        ))}
      </div>
    </div>
  );
}
