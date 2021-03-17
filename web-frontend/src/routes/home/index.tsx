import {Fragment, FunctionalComponent, h} from 'preact';
import {route} from 'preact-router';
import ProgressiveImage from '../../components/progressive-image';
import style from './style.css';

const Home: FunctionalComponent = () => {
  return (
    <Fragment>
      <ProgressiveImage
        src="/assets/images/home-background.jpg"
        tinyDataUri="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAIBAQEBAQIBAQECAgICAgQDAgICAgUEBAMEBgUGBgYFBgYGBwkIBgcJBwYGCAsICQoKCgoKBggLDAsKDAkKCgr/2wBDAQICAgICAgUDAwUKBwYHCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgr/wgARCAAeABQDAREAAhEBAxEB/8QAGgAAAgIDAAAAAAAAAAAAAAAAAQUCBgMECf/EABkBAAIDAQAAAAAAAAAAAAAAAAEDAAIEBf/aAAwDAQACEAMQAAAA7Z9DICEzFuVsmCBFLV7tbV56anpzmTDK/wD/xAArEAACAgEEAQIDCQAAAAAAAAABAgMEEQAFEiFBBjETYWIHIlFSgZGhweH/2gAIAQEAAT8Ap7VQqwRQLXwsfQUKMee8Ejo/LVylXNuPaIq5KS1nk5hCrdFFOQR9Wj6Cr11WvAp4xRqg5jJPEYz0Plp7U6b9VppaZYBV++jLkFuYHfX5Q2tysQ0Fk3hNueeWCtIOKsO05rkeBk8V8ZyB497dvhMVsSwqwHtIe9Ud2tXb5bcZ4pXhrqFzHwJyxyPfB9j1gfrq9dr2XhjU5X4oy4kIDKDnBwcMDxx3rfKW27/uL7pYrZ+IBwMlsr0MjoDOB/ut09YW6UQt03ZGMWAWGfJx1kfjr0j9om7b/NYnuCMJDGoAjjKnk2fqPhf51Z9WyQStCqP0zH92Zv71/8QAHREBAAIDAQADAAAAAAAAAAAAAQACAxESIRMiUf/aAAgBAgEBPwDp2sHxZ8yzk4WUF+u4H5OQr5KiDMfVK6JTEPjMmClDRDFP/8QAHBEBAAIDAAMAAAAAAAAAAAAAAQACAxEhEhMx/9oACAEDAQE/ACoE0PJ6Zt8wjzsXTCyvYoy1a3dscifJizWvuOTTP//Z"
        className={style.backgroundImg}
      />
      <div class={style.home}>
        <div class={style.logo}>
          <span class={style.S}>S</span>
          <span class={style.bar}>|</span>
          <span class={style.R}>R</span>
        </div>
        <div class={style.content}>
          <p class={style.text1}>THE SMART REPORT combines all
          your favorite news sources in one digestible email
              newsletter.</p>
          <p class={style.text2}>Give us your RSS feeds, how
          often you want your newsletter, and whether you
          want it to personalize based on the stories you
          read. We'll take care of the rest.</p>
          <button
            class={`${style.button} ${style.signUp}`}
            onClick={(): void => {
              route('/signup')
            }}
          >
            Sign Up
        </button>
          <button class={`${style.button} ${style.logIn}`}>
            Log In
        </button>
        </div>
      </div >
    </Fragment>
  );
};

export default Home;
