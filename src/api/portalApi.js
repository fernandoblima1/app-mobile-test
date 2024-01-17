import axios from 'axios';
import {PORTAL_URL} from '../utils/portal-url-utils';

const portalAPI = axios.create({
  baseURL: PORTAL_URL,
});

export default portalAPI;
