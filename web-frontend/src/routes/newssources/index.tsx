import {Fragment, FunctionComponent, h} from 'preact';
import {useState} from 'preact/hooks';
import ProgressiveImage from '../../components/progressive-image';
import style from './style.css';

interface Source {
  finalized: boolean;
  uri: string;
}

const NewsSources: FunctionComponent = () => {
  const [sources, setSources] = useState([] as Source[]);

  const addSource = (): void => {
    const source = {finalized: false, uri: ''};
    setSources(sources.concat(source));
  };

  const editSource = (id: number, uri: string): void => {
    setSources(sources.slice(0, id)
      .concat(Object.assign({}, sources[id], {uri}))
      .concat(sources.slice(id + 1)));
  };

  const finalizeSource = (id: number): void => {
    setSources(sources.slice(0, id)
      .concat(Object.assign({}, sources[id], {finalized: true}))
      .concat(sources.slice(id + 1)));
  };

  const unfinalizeSource = (id: number): void => {
    setSources(sources.slice(0, id)
      .concat(Object.assign({}, sources[id], {finalized: false}))
      .concat(sources.slice(id + 1)));
  };

  const removeSource = (id: number): void => {
    setSources(sources.slice(0, id)
      .concat(sources.slice(id + 1)));
  };

  return (
    <Fragment>
      <ProgressiveImage
        src="/assets/images/home-background.jpg"
        tinyDataUri="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAIBAQEBAQIBAQECAgICAgQDAgICAgUEBAMEBgUGBgYFBgYGBwkIBgcJBwYGCAsICQoKCgoKBggLDAsKDAkKCgr/2wBDAQICAgICAgUDAwUKBwYHCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgr/wgARCAAeABQDAREAAhEBAxEB/8QAGgAAAgIDAAAAAAAAAAAAAAAAAQUCBgMECf/EABkBAAIDAQAAAAAAAAAAAAAAAAEDAAIEBf/aAAwDAQACEAMQAAAA7Z9DICEzFuVsmCBFLV7tbV56anpzmTDK/wD/xAArEAACAgEEAQIDCQAAAAAAAAABAgMEEQAFEiFBBjETYWIHIlFSgZGhweH/2gAIAQEAAT8Ap7VQqwRQLXwsfQUKMee8Ejo/LVylXNuPaIq5KS1nk5hCrdFFOQR9Wj6Cr11WvAp4xRqg5jJPEYz0Plp7U6b9VppaZYBV++jLkFuYHfX5Q2tysQ0Fk3hNueeWCtIOKsO05rkeBk8V8ZyB497dvhMVsSwqwHtIe9Ud2tXb5bcZ4pXhrqFzHwJyxyPfB9j1gfrq9dr2XhjU5X4oy4kIDKDnBwcMDxx3rfKW27/uL7pYrZ+IBwMlsr0MjoDOB/ut09YW6UQt03ZGMWAWGfJx1kfjr0j9om7b/NYnuCMJDGoAjjKnk2fqPhf51Z9WyQStCqP0zH92Zv71/8QAHREBAAIDAQADAAAAAAAAAAAAAQACAxESIRMiUf/aAAgBAgEBPwDp2sHxZ8yzk4WUF+u4H5OQr5KiDMfVK6JTEPjMmClDRDFP/8QAHBEBAAIDAAMAAAAAAAAAAAAAAQACAxEhEhMx/9oACAEDAQE/ACoE0PJ6Zt8wjzsXTCyvYoy1a3dscifJizWvuOTTP//Z"
        className={style.backgroundImg}
      />
      <h1 class={style.heading}>Your News Sources</h1>
      <div class={style.sources}>
        {sources.map((source, i) => (
          <div class={style.source}>
            {source.finalized
              ? (
                <Fragment>
                  <p>{source.uri}</p>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class={style.iconEdit} type="button" onClick={(): void => unfinalizeSource(i)}>
                    <path class={style.primary} d="M4 14a1 1 0 0 1 .3-.7l11-11a1 1 0 0 1 1.4 0l3 3a1 1 0 0 1 0 1.4l-11 11a1 1 0 0 1-.7.3H5a1 1 0 0 1-1-1v-3z" />
                    <rect width="20" height="2" x="2" y="20" class={style.secondary} rx="1" />
                  </svg>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="5 5 13 13" class={style.iconClose} type="button" onClick={(): void => removeSource(i)}>
                    <path class={style.primary} fill-rule="evenodd" d="M15.78 14.36a1 1 0 0 1-1.42 1.42l-2.82-2.83-2.83 2.83a1 1 0 1 1-1.42-1.42l2.83-2.82L7.3 8.7a1 1 0 0 1 1.42-1.42l2.83 2.83 2.82-2.83a1 1 0 0 1 1.42 1.42l-2.83 2.83 2.83 2.82z" />
                  </svg>
                </Fragment>
              )
              : (
                <Fragment>
                  <input type="text" value={source.uri} onInput={(event): void => {
                    editSource(i, (event.target as HTMLInputElement).value);
                  }} />
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="5 5 15 15" class={style.iconCheck} type="button" onClick={(): void => finalizeSource(i)}>
                    <path class={style.primary} d="M10 14.59l6.3-6.3a1 1 0 0 1 1.4 1.42l-7 7a1 1 0 0 1-1.4 0l-3-3a1 1 0 0 1 1.4-1.42l2.3 2.3z" />
                  </svg>
                </Fragment>
              )
            }
          </div>
        ))}
        <div type="button" class={style.addSource} onClick={addSource}>
          <span>Add a News Source</span>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="5 5 13 13" class={style.iconAdd}>
            <path class={style.primary} fill-rule="evenodd" d="M17 11a1 1 0 0 1 0 2h-4v4a1 1 0 0 1-2 0v-4H7a1 1 0 0 1 0-2h4V7a1 1 0 0 1 2 0v4h4z" />
          </svg>
        </div>
      </div>
    </Fragment>
  );
}

export default NewsSources;
