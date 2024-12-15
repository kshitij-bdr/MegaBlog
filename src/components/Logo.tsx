import React from 'react';

function Logo({ width = '100px' }: { width: string }) {
  return <div className={width}>Logo</div>;
}

export default Logo;
