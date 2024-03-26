import React, { useContext } from 'react';
import { Good } from '../../types/Good';
import { GoodsControlContext } from '../GoodsContex/GoodsContex';

type Props = {
  good: Good;
};

export const GoodItem: React.FC<Props> = ({ good }) => {
  const { removeGood } = useContext(GoodsControlContext);

  console.log('GoodItem: ', good.id);

  return (
    <article key={good.id} className="GoodCard">
      <p
        className="GoodCard__title"
        style={{ color: good.color?.name || 'black' }}
      >
        <button type="button" onClick={() => removeGood(good.id)}>
          x
        </button>
        {good.name}
      </p>
    </article>
  );
};
