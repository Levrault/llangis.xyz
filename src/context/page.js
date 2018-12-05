import React from 'react';

const PageContext = React.createContext({
  toggleBodyOverflow: () => {console.log('call empty'); }
});

export default PageContext;
