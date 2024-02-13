'use client';

import { PropsWithChildren, useEffect, useState } from 'react';

export function DisableSSR({ children }: PropsWithChildren) {
  const [render, setRender] = useState(false);

  useEffect(() => {
    setRender(true);
  }, []);

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return render ? <>{children}</> : null;
}
