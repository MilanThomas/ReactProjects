import React from 'react';
import { AnimateSharedLayout } from 'framer-motion';
import 'typeface-roboto';

import Replayer from './Replayer';
import data from './data';

import styles from './App.module.css';

const App = () => {
    return (
        <AnimateSharedLayout>
            <div className={styles.container}>
                <Replayer replayer={data} />
            </div>
        </AnimateSharedLayout>
    );
};

export default App;
