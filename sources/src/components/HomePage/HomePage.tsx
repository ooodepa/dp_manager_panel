import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import FetchUsers from '../../utils/FetchBackend/rest/api/users';
import { AsyncAlertExceptionHelper } from '../../utils/AlertExceptionHelper';

export default function HomePage() {
  const navigate = useNavigate();

  useEffect(() => {
    (async function () {
      try {
        await FetchUsers.isManager();
      } catch (exception) {
        await AsyncAlertExceptionHelper(exception, navigate);
      }
    })();
  });

  return <div>Home page</div>;
}
