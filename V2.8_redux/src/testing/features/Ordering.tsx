import { DndContext, closestCenter } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, arrayMove } from '@dnd-kit/sortable';
import List from '@mui/material/List';
import { SortableItem } from '../components/SortableItem';
import { useDispatch, useSelector } from 'react-redux';
import { addList, setDraggedItems } from './quizSlice';
import { RootState } from '../../store';
import { useEffect, useState } from 'react';
import { tTask } from '../quizData';

interface ComponentProps {
  index: number;
  tasks: tTask[];
}

function Ordering({ index, tasks }: ComponentProps) {
  const dispatch = useDispatch();
  const arr = useSelector((state: RootState) => state.lists.lists[index]);

  // Перемешиваем вопросы (названия сооружений) один раз
  const [shuffled] = useState(() =>
    [...tasks.map((t) => t.question)].sort(() => Math.random() - 0.5)
  );

  useEffect(() => {
    dispatch(addList({ index, items: shuffled }));
  }, []);

  const items = arr && arr.length > 0 ? arr : shuffled;

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = items.indexOf(active.id);
    const newIndex = items.indexOf(over.id);
    if (oldIndex === -1 || newIndex === -1) return;

    dispatch(setDraggedItems({ index, items: arrayMove(items, oldIndex, newIndex) }));
  };

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={items} strategy={verticalListSortingStrategy}>
        <List>
          {items.map((item, i) => (
            <SortableItem key={item} item={`${i + 1}. ${item}`} id={item} />
          ))}
        </List>
      </SortableContext>
    </DndContext>
  );
}

export default Ordering;