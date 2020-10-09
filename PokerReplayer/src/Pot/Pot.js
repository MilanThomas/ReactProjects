import React, { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CountUp from 'react-countup';
import Chips from '../Chips';

import styles from './Pot.module.css';

const Pot = ({ potChips, steps, currentStep }) => {
    const pot = useMemo(() => {
        const isSummary = steps.slice(0, currentStep + 1).find(step => step.name === 'SHOW DOWN');
        const computePot = end => {
            const actions = steps.slice(0, end + 1).filter(step => step.type === 'action');
            return actions.reduce((acc, action) => {
                if (action.name === 'collected') {
                    return acc - action.amount;
                }

                return acc + action.amount;
            }, 0);
        };
        if (isSummary) {
            return computePot(currentStep);
        } else {
            const activeSteps = steps.slice(0, currentStep + 1).filter(step => step.name !== 'PRE-FLOP');
            const prevStreetIndex = activeSteps.map(step => step.type).lastIndexOf('street');
            return computePot(prevStreetIndex);
        }
    }, [currentStep, steps]);

    return (
        <>
            {potChips && <Chips chips={potChips} gridArea="cp" />}
            <AnimatePresence>
                {pot > 0 && (
                    <CountUp end={pot} preserveValue delay={0} duration={0.5} prefix="POT : ">
                        {({ countUpRef }) => (
                            <motion.div className={styles.pot} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} ref={countUpRef} />
                        )}
                    </CountUp>
                )}
            </AnimatePresence>
        </>
    );
};

export default Pot;
