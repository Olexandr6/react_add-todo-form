/* eslint-disable prettier/prettier */
/* eslint-disable no-console */
import React, { useContext, useEffect, useState } from 'react';
import { Good } from '../../types/Good';
import { getColorById, getColors } from '../../api';
import classNames from 'classnames';
import { GoodsControlContext } from '../GoodsContext';
import { Color } from '../../types/Color';

type Props = {};

export const GoodForm: React.FC<Props> = () => {
  const [colors, setColors] = useState<Color[]>([]);

  useEffect(() => {
    // getColors().then(data => setColors(data));
    getColors().then(setColors);

    
    const timerId = setInterval(() => {
      getColors().then(setColors);
    }, 3000);

    return () => {
      clearInterval(timerId);
    };
  }, []);

  console.log("🚀 ~ colors:", colors);
  

  const [newGoodName, setNewGoodName] = useState('');
  const [goodNameError, setGoodNameError] = useState('');

  const [selectedColorId, setSelectedColorId] = useState(0);
  const [colorIdError, setColorIdError] = useState('');

  const { addGood } = useContext(GoodsControlContext);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    if (!newGoodName) {
      setGoodNameError('Please enter a good name!');
    }

    if (!selectedColorId) {
      setColorIdError('Please select a color!');
    }

    if (!newGoodName || !selectedColorId) {
      return;
    }

    const color = await getColorById(selectedColorId);

    const newGood: Good = {
      id: 0, // temporary id
      name: newGoodName,
      colorId: selectedColorId,
      color,
    };

    addGood(newGood);
    setNewGoodName('');
    setSelectedColorId(0);
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="field">
        <input
          name="goodName"
          type="text"
          className={classNames({
            'with-error': goodNameError,
          })}
          value={newGoodName}
          onChange={event => {
            setNewGoodName(event.target.value);
            setGoodNameError('');
          }}
        />

        {goodNameError && <span className="error">{goodNameError}</span>}
      </div>

      <div className="field">
        <select
          className={classNames({
            'with-error': colorIdError,
          })}
          value={selectedColorId}
          onChange={event => {
            setSelectedColorId(Number(event.target.value));
            setColorIdError('');
          }}
        >
          <option value="0">Choose a color</option>

          {colors.map(color => (
            <option key={color.id} value={color.id}>
              {color.name}
            </option>
          ))}
        </select>

        {colorIdError && <span className="error">{colorIdError}</span>}
      </div>

      <button type="submit">Add</button>
    </form>
  );
};
