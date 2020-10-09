import React from 'react';
import Card from '../Card';

import styles from './Board.module.css';

const Board = ({ cards }) => {
    return <div className={styles.board}>{cards && cards.map((card, index) => <Card key={card} variation={`board-card-${index + 1}`} card={card} />)}</div>;
};

export default Board;
