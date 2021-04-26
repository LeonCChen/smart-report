import {Fragment, FunctionComponent, h} from 'preact';
import {useContext, useEffect, useState} from 'preact/hooks';
import {route} from 'preact-router';
import ProgressiveImage from '../../components/progressive-image';
import Store from '../../store';
import style from './style.css';

// 1 = daily, 7 = weekly
type Frequency = 1 | 7;

const Account: FunctionComponent = () => {
  const [frequency, setFrequency] = useState<Frequency>(7);
  const {email, token, setEmail, setToken} = useContext(Store);

  const updateFrequency = async (freq: Frequency): Promise<void> => {
    const response = await fetch(`https://focused-dijkstra-8ebf87.netlify.app/.netlify/functions/user_set_frequency?email=${encodeURIComponent(email)}&token=${encodeURIComponent(token)}&frequency=${freq}`);
    if (response.ok) {
      setFrequency(freq);
    }
  }

  const deleteUser = async (): Promise<void> => {
    const response = await fetch(`https://focused-dijkstra-8ebf87.netlify.app/.netlify/functions/user_delete?email=${encodeURIComponent(email)}&token=${encodeURIComponent(token)}`);
    if (response.ok) {
      setEmail('');
      setToken('');
      route('/');
    }
  }

  useEffect(() => {
    if (email && token) {
      fetch(`https://focused-dijkstra-8ebf87.netlify.app/.netlify/functions/user_get_frequency?email=${encodeURIComponent(email)}&token=${encodeURIComponent(token)}`)
        .then(response => response.text())
        .then(text => {
          const freq = Number(text);
          if (freq === 1 || freq === 7) {
            setFrequency(freq);
          }
        });
    }
  }, [email, token, setFrequency]);

  return (
    <Fragment>
      <ProgressiveImage
        src="/assets/images/home-background.jpg"
        tinyDataUri="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAIBAQEBAQIBAQECAgICAgQDAgICAgUEBAMEBgUGBgYFBgYGBwkIBgcJBwYGCAsICQoKCgoKBggLDAsKDAkKCgr/2wBDAQICAgICAgUDAwUKBwYHCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgr/wgARCAAeABQDAREAAhEBAxEB/8QAGgAAAgIDAAAAAAAAAAAAAAAAAQUCBgMECf/EABkBAAIDAQAAAAAAAAAAAAAAAAEDAAIEBf/aAAwDAQACEAMQAAAA7Z9DICEzFuVsmCBFLV7tbV56anpzmTDK/wD/xAArEAACAgEEAQIDCQAAAAAAAAABAgMEEQAFEiFBBjETYWIHIlFSgZGhweH/2gAIAQEAAT8Ap7VQqwRQLXwsfQUKMee8Ejo/LVylXNuPaIq5KS1nk5hCrdFFOQR9Wj6Cr11WvAp4xRqg5jJPEYz0Plp7U6b9VppaZYBV++jLkFuYHfX5Q2tysQ0Fk3hNueeWCtIOKsO05rkeBk8V8ZyB497dvhMVsSwqwHtIe9Ud2tXb5bcZ4pXhrqFzHwJyxyPfB9j1gfrq9dr2XhjU5X4oy4kIDKDnBwcMDxx3rfKW27/uL7pYrZ+IBwMlsr0MjoDOB/ut09YW6UQt03ZGMWAWGfJx1kfjr0j9om7b/NYnuCMJDGoAjjKnk2fqPhf51Z9WyQStCqP0zH92Zv71/8QAHREBAAIDAQADAAAAAAAAAAAAAQACAxESIRMiUf/aAAgBAgEBPwDp2sHxZ8yzk4WUF+u4H5OQr5KiDMfVK6JTEPjMmClDRDFP/8QAHBEBAAIDAAMAAAAAAAAAAAAAAQACAxEhEhMx/9oACAEDAQE/ACoE0PJ6Zt8wjzsXTCyvYoy1a3dscifJizWvuOTTP//Z"
        className={style.backgroundImg}
      />
      <div type="button" class={style.backButton} onClick={(): boolean => route('/news-sources')}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class={style.iconChevronLeft}>
          <path class={style.primary} d="M13.7 15.3a1 1 0 0 1-1.4 1.4l-4-4a1 1 0 0 1 0-1.4l4-4a1 1 0 0 1 1.4 1.4L10.42 12l3.3 3.3z" />
        </svg>
        <p>Back</p>
      </div>
      <h1 class={style.heading}>Account Settings</h1>
      <div class={style.settings}>
        <div class={style.frequencySetting}>
          <p>Newsletter frequency</p>
          <input type="radio" id="dailyFreq" name="frequency" checked={frequency === 1}
            onClick={(): Promise<void> => updateFrequency(1)} />
          <label for="dailyFreq">Daily</label>
          <input type="radio" id="weeklyFreq" name="frequency" checked={frequency === 7}
            onClick={(): Promise<void> => updateFrequency(7)} />
          <label for="weeklyFreq">Weekly</label>
        </div>
        <div type="button" class={style.deleteUser} onClick={deleteUser}>
          <span>Delete Account</span>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class={style.iconTrash}>
            <path class={style.primary} d="M5 5h14l-.89 15.12a2 2 0 0 1-2 1.88H7.9a2 2 0 0 1-2-1.88L5 5zm5 5a1 1 0 0 0-1 1v6a1 1 0 0 0 2 0v-6a1 1 0 0 0-1-1zm4 0a1 1 0 0 0-1 1v6a1 1 0 0 0 2 0v-6a1 1 0 0 0-1-1z" />
            <path class={style.secondary} d="M8.59 4l1.7-1.7A1 1 0 0 1 11 2h2a1 1 0 0 1 .7.3L15.42 4H19a1 1 0 0 1 0 2H5a1 1 0 1 1 0-2h3.59z" />
          </svg>
        </div>
      </div>
    </Fragment >
  );
}

export default Account;
