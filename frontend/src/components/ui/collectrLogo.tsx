import * as React from 'react';
import { cn } from '@/lib/utils';
import { FiTarget } from 'react-icons/fi';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const CollectrLogo = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <div
        className={cn(
          'flex text-2xl font-bold items-center p-6 py-4',
          className
        )}>
        <FiTarget className='mr-2' />

        <p className={cn(className)}>Collectr</p>
      </div>
    );
  }
);
CollectrLogo.displayName = 'CollectrLogo';

export { CollectrLogo };
