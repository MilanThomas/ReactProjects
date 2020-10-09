import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CountUp from 'react-countup';
import Card from '../Card';

import styles from './Player.module.css';

const Player = ({ player, hero, action, active, showing, stack, next }) => {
    const [leftCard, rightCard] = player.cards;
    const [showInactive, setShowInactive] = useState(false);

    useEffect(() => {
        if (active) {
            setShowInactive(false);
        }
    }, [action, active]);

    return (
        <motion.div className={styles['player-' + player.seat]}>
            {(active || showInactive) && (
                <>
                    <Card key={leftCard} variation="player-card-left" card={(hero || showing || showInactive) && player.cards.length > 0 && leftCard} />
                    <Card key={rightCard} variation="player-card-right" card={(hero || showing || showInactive) && player.cards.length > 0 && rightCard} />
                </>
            )}
            <AnimatePresence>
                {!active && !action && (
                    <motion.div
                        className={styles.show}
                        initial={{ opacity: 0, scale: 3 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0 }}
                        onClick={() => setShowInactive(!showInactive)}
                    >
                        {showInactive ? 'Hide Cards' : 'Show cards'}
                    </motion.div>
                )}
            </AnimatePresence>
            <motion.div
                className={styles.bg}
                animate={{
                    boxShadow: next ? '0 0vw 4vw 0 rgba(255, 255, 255, 0.75)' : '0 0vw 0vw 0 rgba(255, 255, 255, 0)',
                }}
            />
            <div className={styles.name}>{player.account.name}</div>
            <CountUp end={stack} preserveValue delay={0} duration={0.5}>
                {({ countUpRef }) => <div className={styles.stack} ref={countUpRef} />}
            </CountUp>
            <AnimatePresence>
                {action && (
                    <motion.div className={styles.action} initial={{ opacity: 0, scale: 3 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0 }}>
                        {action}
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default Player;
