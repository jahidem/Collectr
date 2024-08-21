import { Loader } from 'lucide-react';
import React from 'react';

type Props = {
  className?: string;
};

const Spinner: React.FC<Props> = ({ className }) => {
  return <Loader className={`animate-spin size-6 text-primary ${className}`} />;
};

export default Spinner;
