import {Fragment, FunctionComponent, h} from 'preact';
import {useContext, useState} from 'preact/hooks';
import {route} from 'preact-router';
import ProgressiveImage from '../../components/progressive-image';
import Store from '../../store';
import style from './style.css';

const EmailCode: FunctionComponent = () => {
  const [confirmCode, setConfirmCode] = useState('');
  const [wrongCode, setWrongCode] = useState(false);
  const {verifyCode, setVerifyCode} = useContext(Store);

  // verification codes are stored locally for now
  const verify = (): void => {
    if (confirmCode === verifyCode) {
      setVerifyCode('');
      route('/');
    } else {
      console.log('wrong code');
      setWrongCode(true);
    }
  };

  return (
    <Fragment>
      <ProgressiveImage
        src="/assets/images/home-background.jpg"
        tinyDataUri="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAIBAQEBAQIBAQECAgICAgQDAgICAgUEBAMEBgUGBgYFBgYGBwkIBgcJBwYGCAsICQoKCgoKBggLDAsKDAkKCgr/2wBDAQICAgICAgUDAwUKBwYHCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgr/wgARCAAeABQDAREAAhEBAxEB/8QAGgAAAgIDAAAAAAAAAAAAAAAAAQUCBgMECf/EABkBAAIDAQAAAAAAAAAAAAAAAAEDAAIEBf/aAAwDAQACEAMQAAAA7Z9DICEzFuVsmCBFLV7tbV56anpzmTDK/wD/xAArEAACAgEEAQIDCQAAAAAAAAABAgMEEQAFEiFBBjETYWIHIlFSgZGhweH/2gAIAQEAAT8Ap7VQqwRQLXwsfQUKMee8Ejo/LVylXNuPaIq5KS1nk5hCrdFFOQR9Wj6Cr11WvAp4xRqg5jJPEYz0Plp7U6b9VppaZYBV++jLkFuYHfX5Q2tysQ0Fk3hNueeWCtIOKsO05rkeBk8V8ZyB497dvhMVsSwqwHtIe9Ud2tXb5bcZ4pXhrqFzHwJyxyPfB9j1gfrq9dr2XhjU5X4oy4kIDKDnBwcMDxx3rfKW27/uL7pYrZ+IBwMlsr0MjoDOB/ut09YW6UQt03ZGMWAWGfJx1kfjr0j9om7b/NYnuCMJDGoAjjKnk2fqPhf51Z9WyQStCqP0zH92Zv71/8QAHREBAAIDAQADAAAAAAAAAAAAAQACAxESIRMiUf/aAAgBAgEBPwDp2sHxZ8yzk4WUF+u4H5OQr5KiDMfVK6JTEPjMmClDRDFP/8QAHBEBAAIDAAMAAAAAAAAAAAAAAQACAxEhEhMx/9oACAEDAQE/ACoE0PJ6Zt8wjzsXTCyvYoy1a3dscifJizWvuOTTP//Z"
        className={style.backgroundImg}
      />
      <div class={style.emailCode}>
        <h2 class={style.heading}>You're Almost Done!</h2>
        <div class={style.form}>
          <p>We're sending you an email with a confirmation code. Please enter that code in the text box below.</p>
          <input type="text" name="confirmation-code" class={wrongCode ? style.invalid : ''} value={confirmCode} onInput={(event): void => {
            setConfirmCode((event.target as HTMLInputElement).value);
          }} />
          <button type="button" class={style.submitBtn} onClick={verify}>
            Submit
          </button>
        </div>
      </div>
    </Fragment>
  );
}

export default EmailCode;
