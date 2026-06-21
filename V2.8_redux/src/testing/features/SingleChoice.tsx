import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setSelection } from './quizSlice';
import { RootState } from '../../store';

interface ComponentProps {
  index: number;
  options: string[];
}

function SingleChoice({ index, options }: ComponentProps) {
  const dispatch = useDispatch();
  const selected = useSelector((state: RootState) => state.lists.selections[index] ?? '');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSelection({ index, value: event.target.value }));
  };

  return (
    <FormControl sx={{ ml: 2 }}>
      <RadioGroup value={selected} onChange={handleChange}>
        {options.map((option) => (
          <FormControlLabel
            key={option}
            value={option}
            control={<Radio />}
            label={option}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
}

export default SingleChoice;