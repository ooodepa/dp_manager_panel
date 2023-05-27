import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import styles from './HomePage.module.css';
import getTimeAgo from '../../package/getTimeAgo';
import getStringTime from '../../package/getStringTime';
import AppContainer from '../AppContainer/AppContainer';
import getNumberSequence from '../../package/getNumberSequence';
import FetchUsers from '../../utils/FetchBackend/rest/api/users';
import FetchManager from '../../utils/FetchBackend/rest/api/manager';
import { AsyncAlertExceptionHelper } from '../../utils/AlertExceptionHelper';
import GetOrderWithIdDto from '../../utils/FetchBackend/rest/api/orders/dto/get-order-with.id.dto';

export default function HomePage() {
  const { pageParam } = useParams();
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [orders, setOrders] = useState<GetOrderWithIdDto[]>([]);

  useEffect(() => {
    const number = Number(pageParam);
    console.log(number);
    if (!number) {
      navigate('/page/1');
      return;
    }

    setPage(number);

    (async function () {
      try {
        await FetchUsers.isManager();

        const ordersData = await FetchManager.getOrders({
          take: 10,
          page: number,
        });
        setPage(ordersData.page);
        setTotalPages(ordersData.totalPages);
        setOrders(ordersData.data);
      } catch (exception) {
        await AsyncAlertExceptionHelper(exception, navigate);
        setTotalPages(0);
        setPage(0);
        setOrders([]);
      }
    })();
  }, [navigate, pageParam]);

  if (orders.length === 1 && orders[0].dp_id === '') {
    return (
      <p>Нет ни одного заказа. БД пуста, либо не удалось загрузить данные.</p>
    );
  }

  if (orders.length === 0 && page === 0) {
    return (
      <p>Нет ни одного заказа. БД пуста, либо не удалось загрузить данные.</p>
    );
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <AppContainer>
          <table className={styles.table}>
            <caption>
              Таблица - Заявки пользователей (страница {page} из {totalPages})
            </caption>
            <thead>
              <tr>
                <th>Сколько времени назад</th>
                <th>Дата</th>
                <th>Количество позиций</th>
                <th>Сумма, Br</th>
                <th>Состояние</th>
                <th>Просмотреть</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(e => {
                const date = new Date(e.dp_date);
                const stringTime = getStringTime(date);
                const timeAgo = getTimeAgo(date);

                let totalSum = 0;
                e.dp_orderItems.forEach(item => {
                  totalSum += item.dp_cost * item.dp_count;
                });
                const stringTotalSum = Number(totalSum).toFixed(2);

                const status = e.dp_canceledByClientOn
                  ? 'заказ отменён клиентом'
                  : e.dp_canceledByManagerOn
                  ? 'заказ отменён менеджером'
                  : e.dp_sentedByManagerOn
                  ? 'заказ отправлен менеджером'
                  : e.dp_receivedByClientOn
                  ? 'заказ получен менеджером'
                  : '';

                return (
                  <tr
                    key={e.dp_id}
                    data-is-completed={
                      e.dp_sentedByManagerOn || e.dp_receivedByClientOn
                        ? '1'
                        : '0'
                    }
                    data-is-close={
                      e.dp_canceledByManagerOn || e.dp_canceledByClientOn
                        ? '1'
                        : '0'
                    }
                  >
                    <td>{timeAgo}</td>
                    <td>{stringTime}</td>
                    <td>{e.dp_orderItems.length}</td>
                    <td style={{ textAlign: 'right' }}>{stringTotalSum}</td>
                    <td>{status}</td>
                    <td>
                      <button onClick={() => navigate(`/orders/${e.dp_id}`)}>
                        Просмотреть
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </AppContainer>
      </div>
      <div className={styles.footer}>
        <p style={{ textAlign: 'center' }}>
          {page}/{totalPages}
        </p>
        <ol className={styles.pages}>
          <li
            onClick={() => navigate(`/page/${page - 1 < 0 ? 1 : page - 1}`)}
            title={`Открыть страницу ${page - 1 < 0 ? 1 : page}`}
            data-is-text="1"
          >
            Предыдущая
          </li>
          {getNumberSequence(page, totalPages).map((e, index) => {
            return (
              <li
                key={index}
                data-is-current={e === page ? '1' : '0'}
                onClick={() => navigate(`/page/${e}`)}
                title={`Открыть страницу ${e}/${totalPages}`}
              >
                {e}
              </li>
            );
          })}
          <li
            onClick={() =>
              navigate(`/page/${page + 1 < totalPages ? page + 1 : totalPages}`)
            }
            title={`Открыть страницу ${page + 1}`}
            data-is-text="1"
          >
            Следующая
          </li>
        </ol>
      </div>
    </div>
  );
}
