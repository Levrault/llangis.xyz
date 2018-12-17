import React from 'react';

const PageContext = React.createContext({
  toggleScrollbar: () => {console.warn('toggleScrollbar function has not been set'); }
});

export default PageContext;
