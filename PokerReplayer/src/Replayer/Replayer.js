import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFastBackward, faStepBackward, faStepForward, faFastForward, faUndo, faCog, faPlay, faPause } from '@fortawesome/free-solid-svg-icons';
import { ThemeContext, themes } from '../ThemeContext';

import Board from '../Board';
import Pot from '../Pot';
import Seat from '../Seat';

import styles from './Replayer.module.css';

const chipTypes = [
    {
        value: 5000,
        ratio: 0.6,
        max: 10,
    },
    {
        value: 1000,
        ratio: 0.7,
        max: 15,
    },
    {
        value: 500,
        ratio: 0.8,
        max: 15,
    },
    {
        value: 100,
        ratio: 0.9,
        max: 20,
    },
    {
        value: 25,
        ratio: 1,
        max: 25,
    },
];

const Replayer = ({ replayer: { steps, players, hero, dealer } }) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [playing, setPlaying] = useState(false);
    const [theme, setTheme] = useState(themes.classic);

    useEffect(() => {
        if (!playing) return;
        if (currentStep === steps.length - 1) {
            setPlaying(false);
            return;
        }
        const interval = setInterval(() => {
            setCurrentStep(currentStep + 1);
        }, 1200);

        return () => clearInterval(interval);
    }, [currentStep, playing, steps.length]);

    const handlePrevStreet = () => {
        if (currentStep > 0) {
            setPlaying(false);
            const prevSteps = steps.slice(0, currentStep);
            const prevStreetIndex = prevSteps.map(step => step.type).lastIndexOf('street');
            setCurrentStep(prevStreetIndex);
        }
    };

    const handlePrev = () => {
        if (currentStep > 0) {
            setPlaying(false);
            setCurrentStep(currentStep - 1);
        }
    };

    const handleNext = () => {
        if (currentStep < steps.length - 1) {
            setPlaying(false);
            setCurrentStep(currentStep + 1);
        }
    };

    const handleNextStreet = () => {
        if (currentStep < steps.length - 1) {
            setPlaying(false);
            const nextSteps = steps.slice(currentStep + 1);
            const nextStreet = nextSteps.find(step => step.type === 'street').name;
            const nextStreetIndex = steps.findIndex(step => step.name === nextStreet);
            setCurrentStep(nextStreetIndex);
        }
    };

    const handleSelect = index => {
        setPlaying(false);
        setCurrentStep(index);
    };

    const handleReset = () => {
        setPlaying(false);
        setCurrentStep(0);
    };

    const handlePlay = () => {
        setPlaying(!playing);
    };

    const handleTheme = () => {
        setTheme(theme === themes.minimalist ? themes.classic : themes.minimalist);
    };

    // Compute Starting Chips based on players stacks
    const startingChips = useMemo(() => {
        if (theme.chips) {
            const chips = players.map(player => {
                let playerStack = player.stack;
                const playerChips = chipTypes.map(chipType => {
                    const countingStack = playerStack * chipType.ratio;
                    let chipCount = Math.floor(countingStack / chipType.value);
                    const remainingChips = countingStack - chipCount * chipType.value;
                    playerStack = playerStack - countingStack + remainingChips;
                    return {
                        value: chipType.value,
                        ids: Array.from(Array(chipCount), (d, i) => chipType.value + '-' + player.seat + '-' + i),
                    };
                });
                if (playerStack > 0) {
                    console.log('error', playerStack);
                }
                return [
                    { type: 'player', seat: player.seat, chips: playerChips },
                    { type: 'amount', seat: player.seat, chips: [] },
                ];
            });

            return [...chips.flat(), ...[{ type: 'pot', chips: [] }]];
        }
    }, [players, theme.chips]);
    
    // Recompute Chips at each step -> should optimize by recomputing from last step instead of the beginning
    const updatedChips = useMemo(() => {
        if (theme.chips) {
            const newChips = JSON.parse(JSON.stringify(startingChips));
            const activeSteps = steps.slice(0, currentStep + 1);
            activeSteps.forEach(step => {
                const player = step.player;
                const newPlayerChips = newChips.find(item => item.type === 'player' && item.seat === player);
                const newAmountChips = newChips.find(item => item.type === 'amount' && item.seat === player);
                const newPotChips = newChips.find(item => item.type === 'pot');
                if (step.type === 'street' && step.name !== 'PRE-FLOP') {
                    const amounts = newChips.filter(item => item.type === 'amount');
                    amounts.forEach(amount => {
                        const amountChips = amount.chips;
                        amount.chips = [];
                        amountChips.forEach(chipType => {
                            let found = newPotChips.chips.find(item => item.value === chipType.value);
                            if (found) {
                                found.ids = [...found.ids, ...chipType.ids];
                            } else {
                                newPotChips.chips.push({ value: chipType.value, ids: chipType.ids });
                            }
                        });
                    });
                } else {
                    let amount = step.amount;
                    if (step.name === 'collected') {
                        const potChips = newPotChips.chips;
                        newPotChips.chips = [];
                        potChips.forEach(chipType => {
                            let found = newPlayerChips.chips.find(item => item.value === chipType.value);
                            if (found) {
                                found.ids = [...found.ids, ...chipType.ids];
                            } else {
                                newPlayerChips.chips.push({ value: chipType.value, ids: chipType.ids });
                            }
                        });
                    } else {
                        chipTypes
                            .map(chipType => chipType.value)
                            .forEach(chipValue => {
                                if (chipValue <= amount) {
                                    const playerChips = newPlayerChips.chips.find(chipType => chipType.value === chipValue).ids;
                                    let totalChips = Math.floor(amount / chipValue);
                                    let availableChips = playerChips.length;

                                    if (totalChips > availableChips) {
                                        totalChips = availableChips;
                                    }

                                    const tmp = [];
                                    for (let i = 0; i < totalChips; i++) {
                                        const popped = playerChips.pop();
                                        tmp.push(popped);
                                    }

                                    let found = newAmountChips.chips.find(item => item.value === chipValue);
                                    if (found) {
                                        found.ids = [...found.ids, ...tmp];
                                    } else {
                                        newAmountChips.chips.push({ value: chipValue, ids: tmp });
                                    }
                                    amount = amount - totalChips * chipValue;
                                }
                            });
                    }
                }
            });
            return newChips;
        }
    }, [currentStep, startingChips, steps, theme.chips]);

    return (
        <ThemeContext.Provider value={theme}>
            <div className={styles.container}>
                <div className={styles.table}>
                    <AnimatePresence>
                        {steps[currentStep].type === 'street' && (
                            <motion.div
                                className={styles['street-name']}
                                initial={{ scale: 0, opacity: 0, transition: { duration: 0.2 } }}
                                animate={{ scale: 1, opacity: 1, transition: { duration: 0.2 } }}
                                exit={{ scale: 0, opacity: 0, transition: { duration: 0.2 } }}
                            >
                                {steps[currentStep].name}
                            </motion.div>
                        )}
                    </AnimatePresence>
                    <Pot potChips={theme.chips && updatedChips.find(item => item.type === 'pot').chips} steps={steps} currentStep={currentStep} />
                    <Board
                        cards={
                            steps
                                .slice(0, currentStep + 1)
                                .filter(step => step.type === 'street' && step.cards)
                                .slice(-1)[0].cards
                        }
                    />
                    {players.map(player => {
                        return (
                            <Seat
                                key={`seat-${player.seat}`}
                                player={player}
                                playerChips={theme.chips && updatedChips.find(item => item.type === 'player' && item.seat === player.seat).chips}
                                amountChips={theme.chips && updatedChips.find(item => item.type === 'amount' && item.seat === player.seat).chips}
                                steps={steps}
                                currentStep={currentStep}
                                hero={hero === player.account.name}
                                dealer={dealer === player.seat}
                            />
                        );
                    })}
                </div>
                <div className={styles.controls}>
                    <div className={styles.steps}>
                        {steps.map((step, index) => (
                            <div
                                key={`step-${index}`}
                                title={step.type === 'street' ? step.name : ''}
                                className={currentStep >= index ? styles[step.type + '-active'] : styles[step.type]}
                                onClick={() => handleSelect(index)}
                            />
                        ))}
                    </div>
                    <div className={styles.buttons}>
                        <div onClick={handleReset} className={styles.button} title="Reset">
                            <FontAwesomeIcon icon={faUndo} />
                        </div>
                        <div onClick={handlePrevStreet} title="Previous street" className={currentStep === 0 ? styles['button-disabled'] : styles.button}>
                            <FontAwesomeIcon icon={faFastBackward} />
                        </div>
                        <div onClick={handlePrev} title="Previous" className={currentStep === 0 ? styles['button-disabled'] : styles.button}>
                            <FontAwesomeIcon icon={faStepBackward} />
                        </div>
                        <div onClick={handlePlay} title="Autoplay" className={currentStep === steps.length - 1 ? styles['button-disabled'] : styles.button}>
                            <FontAwesomeIcon icon={playing ? faPause : faPlay} />
                        </div>
                        <div onClick={handleNext} title="Next" className={currentStep === steps.length - 1 ? styles['button-disabled'] : styles.button}>
                            <FontAwesomeIcon icon={faStepForward} />
                        </div>
                        <div
                            onClick={handleNextStreet}
                            title="Next street"
                            className={currentStep === steps.length - 1 ? styles['button-disabled'] : styles.button}
                        >
                            <FontAwesomeIcon icon={faFastForward} />
                        </div>
                        <div onClick={handleTheme} title="Change theme" className={theme === themes.minimalist ? styles['button-active'] : styles.button}>
                            <FontAwesomeIcon icon={faCog} />
                        </div>
                    </div>
                </div>
            </div>
        </ThemeContext.Provider>
    );
};

export default Replayer;
