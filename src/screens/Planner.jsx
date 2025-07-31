import { lazy, Suspense } from 'react';

const Pitch = lazy(() => import('../components/Pitch'));
const Players = lazy(() => import('../components/Players'));

const Planner = () => {
  return (
    <div className="main">
      <Suspense fallback={<div>Loading Pitch...</div>}>
        <Pitch />
      </Suspense>

      <Suspense fallback={<div>Loading Players...</div>}>
        <Players />
      </Suspense>
    </div>
  );
};

export default Planner;
