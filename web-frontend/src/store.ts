import {createContext} from 'preact';
import {StateUpdater} from 'preact/hooks';

interface StoreVal {
  email: string;
  token: string;
  setEmail: StateUpdater<string>;
  setToken: StateUpdater<string>;
}

export default createContext({
  email: '',
  setEmail: () => undefined,
  token: '',
  setToken: () => undefined
} as StoreVal);
