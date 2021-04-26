import {createContext} from 'preact';
import {StateUpdater} from 'preact/hooks';

interface StoreVal {
  email: string;
  token: string;
  verifyCode: string;
  setEmail: StateUpdater<string>;
  setToken: StateUpdater<string>;
  setVerifyCode: StateUpdater<string>;
}

export default createContext({
  email: '',
  setEmail: () => undefined,
  token: '',
  setToken: () => undefined,
  verifyCode: '',
  setVerifyCode: () => undefined
} as StoreVal);
