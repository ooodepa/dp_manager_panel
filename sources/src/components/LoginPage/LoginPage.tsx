import { useNavigate } from 'react-router-dom';
import { ChangeEvent, SyntheticEvent, useState } from 'react';

import styles from './LoginPage.module.css';
import AppModal from '../AppModal/AppModal';
import FetchUsers from '../../utils/FetchBackend/rest/api/users';
import FetchSessions from './../../utils/FetchBackend/rest/api/sessions';
import { AsyncAlertExceptionHelper } from '../../utils/AlertExceptionHelper';

export default function LoginPage() {
  const navigate = useNavigate();
  const [modal, setModal] = useState(<></>);
  const [data, setData] = useState({
    dp_login: '',
    dp_password: '',
  });

  function handleOnChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setData(prev => ({ ...prev, [name]: value }));
  }

  function handleOnSubmit(event: SyntheticEvent) {
    event.preventDefault();

    if (!data.dp_login.length) {
      setModal(
        <AppModal title="Вход" message="Логин не указан">
          <button onClick={() => setModal(<></>)}>Исправить</button>
        </AppModal>,
      );
      return;
    }

    if (!data.dp_password.length) {
      setModal(
        <AppModal title="Вход" message="Пароль не указан">
          <button onClick={() => setModal(<></>)}>Исправить</button>
        </AppModal>,
      );
      return;
    }

    (async function () {
      try {
        const isLogin = await FetchSessions.create(
          setModal,
          data.dp_login,
          data.dp_password,
        );

        if (!isLogin) {
          return;
        }

        await FetchUsers.isManager();

        navigate('/');
      } catch (exception) {
        await AsyncAlertExceptionHelper(exception, navigate);
      }
    })();
  }

  return (
    <div className={styles.wrapper}>
      {modal}
      <form className={styles.form} onSubmit={handleOnSubmit}>
        <input
          name="dp_login"
          className={styles.form__input}
          type="text"
          placeholder="Логин или email"
          onChange={handleOnChange}
        />
        <input
          name="dp_password"
          className={styles.form__input}
          type="password"
          placeholder="Пароль"
          onChange={handleOnChange}
        />
        <button className={styles.form__button}>Войти</button>
      </form>
    </div>
  );
}
