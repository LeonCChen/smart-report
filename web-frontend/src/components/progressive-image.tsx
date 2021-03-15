import {FunctionalComponent, h} from 'preact';
import {useEffect, useState} from 'preact/hooks';

interface ProgressiveImageProps {
  className?: string;
  src: string;
  tinyDataUri: string;
}

const ProgressiveImage: FunctionalComponent<ProgressiveImageProps> = ({className, src, tinyDataUri}) => {
  const [currentSrc, setCurrentSrc] = useState(tinyDataUri);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(src).then((response) => response.blob())
      .then((blob) => {
        setCurrentSrc(URL.createObjectURL(blob));
        setLoading(false);
      });
  }, [setLoading, src]);

  return (
    <img
      class={className}
      src={currentSrc}
      style={{
        filter: loading ? 'blur(50px)' : '',
        transition: '0.5s filter linear',
      }}
    />
  );
};

export default ProgressiveImage;
