import { CircularProgress } from '@mui/material';
import React, { Suspense } from 'react';
import './withLoader.scss';

const withLoader = <P extends object>(Component: React.ComponentType<P>) => React.forwardRef<any, P>((props, ref) => {
    return (
        <Suspense fallback={
            <div className='loading-page'>
                <CircularProgress />
            </div>
        }>
            <Component {...props} ref={ref} />
        </Suspense>
    );
});

export default withLoader;
