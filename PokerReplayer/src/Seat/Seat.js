import React, { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Player from '../Player';
import Amount from '../Amount';
import Chips from '../Chips';

import styles from './Seat.module.css';

const Seat = ({ playerChips, amountChips, player, dealer, hero, steps, currentStep }) => {
    // Current player id
    const current = useMemo(() => {
        return steps[currentStep] && steps[currentStep].type === 'action' && steps[currentStep].player;
    }, [currentStep, steps]);

    // Next player id
    const next = useMemo(() => {
        return (
            currentStep + 1 < steps.length &&
            steps[currentStep + 1].type !== 'street' &&
            steps.slice(currentStep + 1).find(step => step.type === 'action').player
        );
    }, [currentStep, steps]);

    // Is this player still active ?
    const active = useMemo(() => {
        return (
            steps
                .slice(0, currentStep + 1)
                .filter(step => step.type === 'action')
                .filter(action => action.player === player.id)
                .filter(action => action.name === 'folds').length === 0
        );
    }, [currentStep, player.id, steps]);

    // Does this player show his cards ?
    const showing = useMemo(() => {
        return (
            steps
                .slice(0, currentStep + 1)
                .filter(step => step.type === 'action')
                .filter(action => action.player === player.id)
                .filter(action => action.name === 'shows').length !== 0
        );
    }, [currentStep, player.id, steps]);

    // Is this player still active ?
    const allin = useMemo(() => {
        return (
            steps
                .slice(0, currentStep + 1)
                .filter(step => step.type === 'action')
                .filter(action => action.player === player.id)
                .filter(action => action.allin).length !== 0
        );
    }, [currentStep, player.id, steps]);

    // Compute player stack
    const stack = useMemo(() => {
        const activeSteps = steps.slice(0, currentStep + 1);
        const playerActions = activeSteps.filter(step => step.type === 'action').filter(action => action.player === player.id);

        const stack = playerActions.reduce((acc, action) => {
            if (action.name === 'collected') {
                return acc + action.amount;
            }

            return acc - action.amount;
        }, player.stack);

        return stack;
    }, [currentStep, player.id, player.stack, steps]);

    const amount = useMemo(() => {
        const activeSteps = steps.slice(0, currentStep + 1).filter(step => step.name !== 'PRE-FLOP');

        const prevStreet = activeSteps.reverse().find(step => step.type === 'street').name;
        const prevStreetIndex = steps.findIndex(step => step.name === prevStreet);

        const playerActions = steps
            .slice(prevStreetIndex, currentStep + 1)
            .filter(step => step.type === 'action')
            .filter(action => action.player === player.id);

        const amount = playerActions.reduce((acc, action) => {
            if (action.name === 'collected') {
                return acc - action.amount;
            }

            return acc + action.amount;
        }, 0);

        return amount;
    }, [currentStep, player.id, steps]);

    return (
        <>
            <Player
                player={player}
                hero={hero}
                action={current === player.id && steps[currentStep].name}
                next={next === player.id}
                active={active}
                showing={showing}
                stack={stack}
            />
            {playerChips && <Chips chips={playerChips} gridArea={'c' + player.seat} />}
            <Amount chips={amountChips} amount={amount} player={player} steps={steps} currentStep={currentStep} />
            {dealer && <div className={styles['dealer-' + player.seat]}>D</div>}
            <AnimatePresence>
                {allin && (
                    <motion.div
                        className={styles['allin-' + player.seat]}
                        initial={{ scale: 0, opacity: 0, transition: { duration: 0.2 } }}
                        animate={{ scale: 1, opacity: 1, transition: { duration: 0.2 } }}
                        exit={{ scale: 0, opacity: 0, transition: { duration: 0.2 } }}
                    />
                )}
            </AnimatePresence>
        </>
    );
};

export default Seat;
