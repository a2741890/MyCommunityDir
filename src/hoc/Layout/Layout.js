import React from 'react';

const layout = (props) => {
  return(
    <React.Fragment>
      <main>
        {props.children}
      </main>
    </React.Fragment>
  )
}

export default layout;