import React, { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CountUp from 'react-countup';
import Chips from '../Chips';

import styles from './Amount.module.css';

const Amount = ({ chips, amount, player, steps, currentStep }) => {
    const amountPosition = useMemo(() => {
        if (amount > 0) {
            return 'a' + player.seat;
        }

        if (currentStep > 0 && steps[currentStep].type === 'street' && steps[currentStep].name !== 'PRE-FLOP' && steps[currentStep - 1].amount > 0) {
            return 'po';
        }
        return chips ? 'c' + player.seat : 'p' + player.seat;
    }, [amount, chips, currentStep, player.seat, steps]);

    return (
        <>
            {chips && <Chips chips={chips} gridArea={'a' + player.seat} />}
            <motion.div layoutId={'amount-' + player.seat} className={styles.amount} style={{ gridArea: amountPosition, marginBottom: chips ? '2vw' : '0vw' }}>
                <AnimatePresence>
                    {amount > 0 && (
                        <CountUp end={amount} preserveValue delay={0} duration={0.5}>
                            {({ countUpRef }) => (
                                <motion.div
                                    initial={{ scale: 0, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    exit={{ scale: 0, opacity: 0 }}
                                    ref={countUpRef}
                                />
                            )}
                        </CountUp>
                    )}
                </AnimatePresence>
            </motion.div>
        </>
    );
};

export default Amount;
