import React, { useState } from 'react';
import { createUser, signInUser } from '../api/auth'; // Import Firebase functions
import Cookies from 'js-cookie'; // Import js-cookie
import './../css/styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoopFooter from './LoopFooter';
import LoopFavicon from './LoopFavicon';
import LoopHeader from './LoopHeader';