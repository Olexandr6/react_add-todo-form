/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { FC, ReactNode, useMemo, useState } from 'react';
import { Good } from '../../types/Good';
import { getColorById, getGoods } from '../../api';

export const GoodsContext = React.createContext([] as Good[]);

export const GoodsControlContext = React.createContext({
  addGood: (good: Good) => {},
  removeGood: (goodId: number) => {},
});

const initialGoods: Good[] = getGoods().map(good => ({
  ...good,
  color: getColorById(good.colorId),
}));

function getMaxGoodId(goods: Good[]) {
  const ids = goods.map(good => good.id);

  return Math.max(...ids, 0);
}

interface Props {
  children: React.ReactNode;
}

export const GoodsProvider: React.FC<Props> = ({ children }) => {
  const [goods, setGoods] = useState<Good[]>(initialGoods);

  const removeGood = (goodId: number) => {
    setGoods(prevGoods => prevGoods.filter(good => good.id !== goodId));
  };

  function addGood(good: Good) {
    setGoods(prevGoods => [
      ...prevGoods,
      {
        ...good,
        id: getMaxGoodId(prevGoods) + 1,
      },
    ]);
  }

  const methods = useMemo(() => ({
    removeGood,
    addGood,
  }), []);

  return (
    <GoodsControlContext.Provider value={methods}>
      <GoodsContext.Provider value={goods}>
        {children}
      </GoodsContext.Provider>
    </GoodsControlContext.Provider>
  );
};
