import '@webcomponents/webcomponentsjs/webcomponents-bundle';
import "core-js/es6/symbol";

import from from 'core-js/fn/array/from'
import find from 'core-js/fn/array/find'
import isArray from 'core-js/fn/array/is-array'

Array.find = Array.find || find;
Array.from = Array.from || from;
Array.isArray = Array.isArray || isArray;