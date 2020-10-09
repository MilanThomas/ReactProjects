import React from 'react';
import { motion } from 'framer-motion';

import styles from './Chips.module.css';

const Chips = ({ chips, gridArea }) => (
    <div className={styles.chips} style={{ gridArea: gridArea }}>
        {chips
            .sort((a, b) => b.value - a.value)
            .map((chipType, chipTypeIndex) => {
                return (
                    <div key={chipType.value + '-' + chipTypeIndex + '-' + gridArea} className={styles['chip-stack']}>
                        {chipType.ids.map(chipId => (
                            <motion.div key={chipId} layoutId={chipId} className={styles['chip-' + chipType.value]}>
                                {chipType.value}
                            </motion.div>
                        ))}
                    </div>
                );
            })}
    </div>
);

export default Chips;
