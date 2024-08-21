import React from 'react';
import { CollectrLogo } from '../ui/collectrLogo';

type Props = {
  className?: string;
};

const LoadingCollectr: React.FC<Props> = ({ className }) => {
  return (
    <div className='w-full h-5/6 flex justify-center items-center'>
      <CollectrLogo className='text-4xl' />
    </div>
  );
};

export default LoadingCollectr;
