
import ReactDOM from 'react-dom/client';
import { io } from 'socket.io-client';
import init from './init.jsx';
import './index.css';

const app = async () => {
  const root = ReactDOM.createRoot(document.querySelector('#root'));
  const socket = io();

  root.render(await init(socket));
};

app();
