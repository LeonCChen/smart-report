import {Fragment, FunctionComponent, h} from 'preact';
import {useContext, useState} from 'preact/hooks';
import {route} from 'preact-router';
import ProgressiveImage from '../../components/progressive-image';
import {encodePass} from '../../util/crypto';
import Store from '../../store';
import style from './style.css';

const Login: FunctionComponent = () => {
  const [localEmail, setLocalEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitFailed, setSubmitFailed] = useState(false);
  const {setEmail, setToken} = useContext(Store);

  const handleSubmit = async (): Promise<void> => {
    // get the user's salt
    const saltResponse = await fetch(`https://focused-dijkstra-8ebf87.netlify.app/.netlify/functions/get_salt?email=${encodeURIComponent(localEmail)}`)
    if (!saltResponse.ok) {
      setSubmitFailed(true);
      return;
    }
    const salt = await saltResponse.text();

    // now hash their password and verify it with the API
    const {hash} = encodePass(password, salt);
    const loginResponse = await fetch(`https://focused-dijkstra-8ebf87.netlify.app/.netlify/functions/get_token?email=${encodeURIComponent(localEmail)}&hash=${encodeURIComponent(hash)}`);
    if (!loginResponse.ok) {
      setSubmitFailed(true);
    }

    // login succeeded -> we have an authentication token to
    // send with API requests for verification
    const token = await loginResponse.text();
    setToken(token);
    setEmail(localEmail);

    // go to the news sources page on login
    route('/news-sources');
  }

  return (
    <Fragment>
      <ProgressiveImage
        src="/assets/images/home-background.jpg"
        tinyDataUri="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAIBAQEBAQIBAQECAgICAgQDAgICAgUEBAMEBgUGBgYFBgYGBwkIBgcJBwYGCAsICQoKCgoKBggLDAsKDAkKCgr/2wBDAQICAgICAgUDAwUKBwYHCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgr/wgARCAAeABQDAREAAhEBAxEB/8QAGgAAAgIDAAAAAAAAAAAAAAAAAQUCBgMECf/EABkBAAIDAQAAAAAAAAAAAAAAAAEDAAIEBf/aAAwDAQACEAMQAAAA7Z9DICEzFuVsmCBFLV7tbV56anpzmTDK/wD/xAArEAACAgEEAQIDCQAAAAAAAAABAgMEEQAFEiFBBjETYWIHIlFSgZGhweH/2gAIAQEAAT8Ap7VQqwRQLXwsfQUKMee8Ejo/LVylXNuPaIq5KS1nk5hCrdFFOQR9Wj6Cr11WvAp4xRqg5jJPEYz0Plp7U6b9VppaZYBV++jLkFuYHfX5Q2tysQ0Fk3hNueeWCtIOKsO05rkeBk8V8ZyB497dvhMVsSwqwHtIe9Ud2tXb5bcZ4pXhrqFzHwJyxyPfB9j1gfrq9dr2XhjU5X4oy4kIDKDnBwcMDxx3rfKW27/uL7pYrZ+IBwMlsr0MjoDOB/ut09YW6UQt03ZGMWAWGfJx1kfjr0j9om7b/NYnuCMJDGoAjjKnk2fqPhf51Z9WyQStCqP0zH92Zv71/8QAHREBAAIDAQADAAAAAAAAAAAAAQACAxESIRMiUf/aAAgBAgEBPwDp2sHxZ8yzk4WUF+u4H5OQr5KiDMfVK6JTEPjMmClDRDFP/8QAHBEBAAIDAAMAAAAAAAAAAAAAAQACAxEhEhMx/9oACAEDAQE/ACoE0PJ6Zt8wjzsXTCyvYoy1a3dscifJizWvuOTTP//Z"
        className={style.backgroundImg}
      />
      <div class={style.login}>
        <h2 class={style.heading}>Log In</h2>
        <h4 class={style.subheading}>It's good to see you again</h4>
        <div class={style.form}>
          {submitFailed
            ? <p class={style.error}>Wrong email or password.</p>
            : ''
          }
          <div class={style.field}>
            <label for="email">Email</label>
            <input type="email" name="email" value={localEmail} onInput={(event): void => {
              setLocalEmail((event.target as HTMLInputElement).value);
            }} />
          </div>
          <div class={style.field}>
            <label for="password">Password</label>
            <input type="password" name="password" value={password} onInput={(event): void => {
              setPassword((event.target as HTMLInputElement).value);
            }} />
          </div>
          <button type="button" class={style.submitBtn} onClick={handleSubmit}>
            Log In
          </button>
        </div>
      </div>
    </Fragment>
  );
}

export default Login;
