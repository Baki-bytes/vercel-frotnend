import { io } from 'socket.io-client';
import API_CONFIG from './config/api';

const socket = io(API_CONFIG.SOCKET_URL);

export default socket;
