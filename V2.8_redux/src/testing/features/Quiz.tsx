import { useState } from 'react';
import { Box, Button, Container, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { quiz } from '../quizData';
import Matching from './Matching';
import SingleChoice from './SingleChoice';
import Ordering from './Ordering';
import { resetLists } from './quizSlice';
import { RootState } from '../../store';

type ResultItem = {
  correct: number;
  total: number;
};

function Quiz() {
  const dispatch = useDispatch();
  const lists = useSelector((state: RootState) => state.lists.lists);
  const selections = useSelector((state: RootState) => state.lists.selections);

  const [results, setResults] = useState<ResultItem[] | null>(null);
  const [resetKey, setResetKey] = useState(0);

  // Индексы для M/O типов (они используют lists)
  // Индексы для S типов (они используют selections)
  // Нам нужно маппить глобальный индекс вопроса → индекс в соответствующем массиве
  // Проще всего: считать отдельные счётчики при проверке

  const handleCheck = () => {
    let listIndex = 0;
    let selectionIndex = 0;

    const nextResults = quiz.map((item) => {
      if (item.type === 'M') {
        const userList = lists[listIndex] ?? [];
        const correct = item.tasks.reduce((sum, task, taskIndex) => {
          return sum + (userList[taskIndex] === task.answer ? 1 : 0);
        }, 0);
        listIndex++;
        return { correct, total: item.tasks.length };
      }

      if (item.type === 'S') {
        const userAnswer = selections[selectionIndex] ?? '';
        const correctAnswer = item.tasks.find(t => t.answer === true)?.question ?? '';
        const correct = userAnswer === correctAnswer ? 1 : 0;
        selectionIndex++;
        return { correct, total: 1 };
      }

      if (item.type === 'O') {
        const userList = lists[listIndex] ?? [];
        const correctOrder = [...item.tasks]
          .sort((a, b) => Number(a.answer) - Number(b.answer))
          .map((t) => t.question);

        const correct = correctOrder.reduce((sum, name, i) => {
          return sum + (userList[i] === name ? 1 : 0);
        }, 0);
        listIndex++;
        return { correct, total: item.tasks.length };
      }

      return { correct: 0, total: 0 };
    });

    setResults(nextResults);
  };

  const handleReset = () => {
    dispatch(resetLists());
    setResults(null);
    setResetKey((v) => v + 1);
  };

  const allCorrect =
    results && results.every((r) => r.correct === r.total);

  // Счётчики для рендера (отдельно от проверки)
  let renderListIndex = 0;
  let renderSelectionIndex = 0;

  return (
    <Container maxWidth="md">
      {quiz.map((item, index) => {
        let component: React.ReactNode;

        if (item.type === 'M') {
          const idx = renderListIndex++;
          component = (
            <Matching
              key={`${item.id}-${resetKey}`}
              index={idx}
              tasks={item.tasks}
            />
          );
        } else if (item.type === 'S') {
          const idx = renderSelectionIndex++;
          component = (
            <SingleChoice
              key={`${item.id}-${resetKey}`}
              index={idx}
              options={item.tasks.map(t => t.question)}
            />
          );
        } else if (item.type === 'O') {
          const idx = renderListIndex++;
          component = (
            <Ordering
              key={`${item.id}-${resetKey}`}
              index={idx}
              tasks={item.tasks}
            />
          );
        }

        return (
          <Box key={item.id} component="section" sx={{ m: 2, p: 2 }}>
            <Typography variant="h5" gutterBottom>
              {index + 1}. {item.title}
            </Typography>
            {component}
          </Box>
        );
      })}

      <Box sx={{ display: 'flex', justifyContent: 'space-around', mt: 2 }}>
        <Button variant="contained" onClick={handleCheck}>
          Проверить
        </Button>
        <Button variant="contained" onClick={handleReset}>
          Начать снова
        </Button>
      </Box>

      {results && (
        <Box sx={{ mt: 3, p: 2, border: '1px solid #ddd', borderRadius: 2 }}>
          <Typography variant="h6" gutterBottom>
            Результаты тестирования
          </Typography>

          {allCorrect && (
            <Typography
              variant="h5"
              color="success.main"
              sx={{ mb: 2, fontWeight: 'bold' }}
            >
              Все верно!
            </Typography>
          )}

          {results.map((result, i) => (
            <Typography key={quiz[i].id}>
              Задание {i + 1}: верно {result.correct} из {result.total}
            </Typography>
          ))}
        </Box>
      )}
    </Container>
  );
}

export default Quiz;