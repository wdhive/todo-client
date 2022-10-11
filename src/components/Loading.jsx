import css from './Loading.module.scss';
import Logo from '@ass/logo/moderate-1.svg?component';
import { useEffect } from 'react';
let initial = true;

const Loading = () => {
  useEffect(() => {
    initial = false;
  }, []);

  return (
    <div className={css.loading}>
      {initial && <Logo />}

      <span className={css.loader}></span>
    </div>
  );
};

export default Loading;
