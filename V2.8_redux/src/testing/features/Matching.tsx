import { Grid, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import { tTask } from '../quizData';
import SortableList from './SortableList';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addList } from './quizSlice';

interface ComponentProps {
  index: number,
  tasks: tTask[];
}

function Matching({ index, tasks }: ComponentProps) {
  // Получаем массив ответов
  const dispatch = useDispatch();
  const answers = tasks.map((item) => String(item.answer));

  // Перемешиваем ответы
  const [shuffledAnswers] = useState(() =>
    [...answers].sort(() => Math.random() - 0.5)
  );

  useEffect(() => {
    dispatch(addList({ index, items: shuffledAnswers }));
  }, []);

  return (
    <Grid container spacing={2}>
      <Grid size={6}>
        <List>
          {tasks.map((item, index) => (
            <ListItem key={index}>
              <ListItemButton
                sx={{
                  border: '1px solid gray',
                  borderRadius: '5px',
                  textAlign: 'right',
                }}
              >
                <ListItemText primary={item.question} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Grid>

      <Grid size={6}>
        <SortableList index={index} answers={shuffledAnswers} />
      </Grid>
    </Grid>
  );
}

export default Matching;