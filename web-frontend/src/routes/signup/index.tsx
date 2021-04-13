import {Fragment, FunctionComponent, h} from 'preact';
import {useState} from 'preact/hooks';
import {route} from 'preact-router';
import ProgressiveImage from '../../components/progressive-image';
import {encodePass} from '../../util/crypto';
import style from './style.css';

const SignUp: FunctionComponent = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitFailed, setSubmitFailed] = useState(false);

  const handleSubmit = (): void => {
    const {hash, salt} = encodePass(password);
    fetch(`https://focused-dijkstra-8ebf87.netlify.app/.netlify/functions/sign_up?email=${encodeURIComponent(email)}&hash=${encodeURIComponent(hash)}&salt=${encodeURIComponent(salt)}`)
      .then((response) => {
        if (response.ok) {
          route('/signup/confirm');
        } else {
          setSubmitFailed(true);
        }
      });
  }

  return (
    <Fragment>
      <ProgressiveImage
        src="/assets/images/home-background.jpg"
        tinyDataUri="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAIBAQEBAQIBAQECAgICAgQDAgICAgUEBAMEBgUGBgYFBgYGBwkIBgcJBwYGCAsICQoKCgoKBggLDAsKDAkKCgr/2wBDAQICAgICAgUDAwUKBwYHCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgr/wgARCAAeABQDAREAAhEBAxEB/8QAGgAAAgIDAAAAAAAAAAAAAAAAAQUCBgMECf/EABkBAAIDAQAAAAAAAAAAAAAAAAEDAAIEBf/aAAwDAQACEAMQAAAA7Z9DICEzFuVsmCBFLV7tbV56anpzmTDK/wD/xAArEAACAgEEAQIDCQAAAAAAAAABAgMEEQAFEiFBBjETYWIHIlFSgZGhweH/2gAIAQEAAT8Ap7VQqwRQLXwsfQUKMee8Ejo/LVylXNuPaIq5KS1nk5hCrdFFOQR9Wj6Cr11WvAp4xRqg5jJPEYz0Plp7U6b9VppaZYBV++jLkFuYHfX5Q2tysQ0Fk3hNueeWCtIOKsO05rkeBk8V8ZyB497dvhMVsSwqwHtIe9Ud2tXb5bcZ4pXhrqFzHwJyxyPfB9j1gfrq9dr2XhjU5X4oy4kIDKDnBwcMDxx3rfKW27/uL7pYrZ+IBwMlsr0MjoDOB/ut09YW6UQt03ZGMWAWGfJx1kfjr0j9om7b/NYnuCMJDGoAjjKnk2fqPhf51Z9WyQStCqP0zH92Zv71/8QAHREBAAIDAQADAAAAAAAAAAAAAQACAxESIRMiUf/aAAgBAgEBPwDp2sHxZ8yzk4WUF+u4H5OQr5KiDMfVK6JTEPjMmClDRDFP/8QAHBEBAAIDAAMAAAAAAAAAAAAAAQACAxEhEhMx/9oACAEDAQE/ACoE0PJ6Zt8wjzsXTCyvYoy1a3dscifJizWvuOTTP//Z"
        className={style.backgroundImg}
      />
      <div class={style.signup}>
        <h2 class={style.heading}>Sign Up</h2>
        <h4 class={style.subheading}>Start getting news today</h4>
        <div class={style.form}>
          {submitFailed
            ? <p class={style.error}>Something went wrong signing up.</p>
            : ''
          }
          <div class={style.field}>
            <label for="email">Email</label>
            <input type="email" name="email" value={email} onInput={(event): void => {
              setEmail((event.target as HTMLInputElement).value);
            }} />
          </div>
          <div class={style.field}>
            <label for="password">Password</label>
            <input type="password" name="password" value={password} onInput={(event): void => {
              setPassword((event.target as HTMLInputElement).value);
            }} />
          </div>
          <button type="button" class={style.submitBtn} onClick={handleSubmit}>Sign Up</button>
        </div>
      </div>
    </Fragment>
  );
}

export default SignUp;
