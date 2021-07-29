import * as React from 'react';

export const App = (props: {message?: string}) => (<button onClick={() => console.log('clicked')}>Hello World! {props.message}</button>);
