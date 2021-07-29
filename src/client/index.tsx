import * as React from 'react';
import {hydrate} from 'react-dom';
import {App} from './App';

hydrate((<App message='test message' />), document.getElementById('app'));
