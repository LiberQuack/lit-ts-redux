import '@webcomponents/webcomponentsjs/webcomponents-bundle';

import from from 'core-js/fn/array/from'
import find from 'core-js/fn/array/find'

Array.find = Array.find || find;
Array.from = Array.from || from;