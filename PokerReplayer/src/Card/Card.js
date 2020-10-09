import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeContext } from '../ThemeContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChessKing, faChessQueen, faChessBishop } from '@fortawesome/free-solid-svg-icons';

import styles from './Card.module.css';

const suits = [
    {
        key: 's',
        name: 'spades',
        symbol: '♠︎',
        mainColor: 'black',
        altColor: 'black',
    },
    {
        key: 'h',
        name: 'hearts',
        symbol: '♥︎',
        mainColor: 'red',
        altColor: 'red',
    },
    {
        key: 'c',
        name: 'clubs',
        symbol: '♣︎',
        mainColor: 'black',
        altColor: 'green',
    },
    {
        key: 'd',
        name: 'diamonds',
        symbol: '♦︎',
        mainColor: 'red',
        altColor: 'blue',
    },
];

const ranks = [
    {
        key: 'A',
        name: 'ace',
        value: 'A',
        symbol: 'A',
        count: 1,
    },
    {
        key: '2',
        name: 'two',
        value: '2',
        symbol: '2',
        count: 2,
    },
    {
        key: '3',
        name: 'three',
        value: '3',
        symbol: '3',
        count: 3,
    },
    {
        key: '4',
        name: 'four',
        value: '4',
        symbol: '4',
        count: 4,
    },
    {
        key: '5',
        name: 'five',
        value: '5',
        symbol: '5',
        count: 5,
    },
    {
        key: '6',
        name: 'six',
        value: '6',
        symbol: '6',
        count: 6,
    },
    {
        key: '7',
        name: 'seven',
        value: '7',
        symbol: '7',
        count: 7,
    },
    {
        key: '8',
        name: 'eight',
        value: '8',
        symbol: '8',
        count: 8,
    },
    {
        key: '9',
        name: 'nine',
        value: '9',
        symbol: '9',
        count: 9,
    },
    {
        key: 'T',
        name: 'ten',
        value: '10',
        symbol: '10',
        count: 10,
    },
    {
        key: 'J',
        name: 'jack',
        value: 'J',
        symbol: <FontAwesomeIcon icon={faChessBishop} />,
        count: 1,
    },
    {
        key: 'Q',
        name: 'queen',
        value: 'Q',
        symbol: <FontAwesomeIcon icon={faChessQueen} />,
        count: 1,
    },
    {
        key: 'K',
        name: 'king',
        value: 'K',
        symbol: <FontAwesomeIcon icon={faChessKing} />,
        count: 1,
    },
];

const Card = ({ card, variation }) => {
    const splitCard = card && card.split('');
    const rank = card && ranks.find(rank => rank.key === splitCard[0]);
    const suit = card && suits.find(suit => suit.key === splitCard[1]);

    return (
        <ThemeContext.Consumer>
            {theme => (
                <AnimatePresence>
                    <motion.div
                        className={`${styles[variation]} ${!card ? styles.inactive : theme.colorBlind ? styles[suit.altColor] : styles[suit.mainColor]}`}
                        title={card ? rank.name + ' of ' + suit.name : ''}
                        initial={{ opacity: 0, boxShadow: '0vw 0vw 0.8vw 0vw rgba(0, 0, 0, 0.4)' }}
                        animate={{
                            opacity: 1,
                        }}
                        exit={{ opacity: 0 }}
                        whileTap={
                            card && {
                                y: variation.startsWith('player-card') ? '-3vw' : 0,
                                rotate: variation === 'player-card-left' ? -5 : 0,
                                scale: variation.startsWith('board-card') ? 1.2 : 1,
                                zIndex: 9998,
                                boxShadow: '0vw 0vw 8vw 0vw rgba(0, 0, 0, 0.8)',
                            }
                        }
                        whileHover={
                            card && {
                                y: variation.startsWith('player-card') ? '-3vw' : 0,
                                rotate: variation === 'player-card-left' ? -5 : 0,
                                scale: variation.startsWith('board-card') ? 1.2 : 1,
                                zIndex: 9998,
                                boxShadow: '0vw 0vw 8vw 0vw rgba(0, 0, 0, 0.8)',
                            }
                        }
                    >
                        {card && (
                            <>
                                <div className={styles['top-rank']}>{rank.value}</div>
                                <div className={styles['top-suit']}>{suit.symbol}</div>
                                {[...Array(rank.count)].map((count, index) => (
                                    <div key={rank.name + '-' + (index + 1)} className={styles[rank.name + '-' + (index + 1)]}>
                                        {['K', 'Q', 'J'].includes(rank.key) ? rank.symbol : suit.symbol}
                                    </div>
                                ))}
                                <div className={styles['bottom-suit']}>{suit.symbol}</div>
                                <div className={styles['bottom-rank']}>{rank.value}</div>
                            </>
                        )}
                    </motion.div>
                </AnimatePresence>
            )}
        </ThemeContext.Consumer>
    );
};

export default Card;
