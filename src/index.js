// @ts-check

import 'core-js/stable';
import 'regenerator-runtime/runtime';

import '../assets/application.scss';
import '../assets/favicon.ico';

// @ts-ignore
import gon from 'gon';

import run from './app';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

run(gon);
