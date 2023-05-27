import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import styles from './UpdateOrderPage.module.css';
import getTimeAgo from '../../package/getTimeAgo';
import getStringTime from '../../package/getStringTime';
import AppContainer from '../AppContainer/AppContainer';
import FetchItems from '../../utils/FetchBackend/rest/api/items';
import FetchUsers from '../../utils/FetchBackend/rest/api/users';
import FetchManager from '../../utils/FetchBackend/rest/api/manager';
import { AsyncAlertExceptionHelper } from '../../utils/AlertExceptionHelper';
import FetchOrderStatuses from '../../utils/FetchBackend/rest/api/order-statuses';

interface ItemAndOrderItemDto {
  dp_id: string;
  dp_name: string;
  dp_photoUrl: string;
  dp_model: string;
  dp_count: number;
  dp_cost: number;
}

export default function UpdateOrderPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState({
    dp_id: '',
    dp_date: '',
    dp_userId: 0,
    dp_isCancelled: false,
    dp_isCompleted: false,
    dp_orderItems: [
      {
        dp_id: 0,
        dp_orderId: '',
        dp_itemId: '',
        dp_count: 0,
        dp_cost: 0,
      },
    ],
  });
  const [orderItems, setOrderItems] = useState([
    {
      dp_id: '',
      dp_name: '',
      dp_photoUrl: '',
      dp_model: '',
      dp_count: 0,
      dp_cost: 0,
    },
  ]);
  const [user, setUser] = useState({
    dp_id: 0,
    dp_unp: '',
    dp_nameLegalEntity: '',
    dp_shortNameLegalEntity: '',
    dp_address: '',
    dp_email: '',
    dp_receptionPhone: '',
    dp_firstName: '',
    dp_lastName: '',
    dp_middleName: '',
  });
  const [status, setStatus] = useState('');
  const [statuses, setStatuses] = useState([
    {
      dp_id: 0,
      dp_date: '',
      dp_status: '',
      dp_orderId: '',
    },
  ]);

  useEffect(() => {
    if (!id) {
      return;
    }

    (async function () {
      try {
        await FetchUsers.isManager();

        const orderData = await FetchManager.getOrderById(id);
        setOrder(orderData);

        const ids: Set<string> = new Set();
        orderData.dp_orderItems.forEach(e => {
          ids.add(e.dp_itemId);
        });
        const arrayIds = Array.from(ids);
        const itemsData = await FetchItems.filterItemsByIds({ ids: arrayIds });

        const resultItems: ItemAndOrderItemDto[] = orderData.dp_orderItems.map(
          e => {
            for (let i = 0; i < itemsData.length; ++i) {
              if (e.dp_itemId === itemsData[i].dp_id) {
                const item = itemsData[i];
                return {
                  dp_id: e.dp_itemId,
                  dp_name: item.dp_name,
                  dp_photoUrl: item.dp_photoUrl,
                  dp_model: item.dp_model,
                  dp_count: e.dp_count,
                  dp_cost: e.dp_cost,
                };
              }
            }
            return {
              dp_id: e.dp_itemId,
              dp_name: '',
              dp_photoUrl: '',
              dp_model: '',
              dp_count: e.dp_count,
              dp_cost: e.dp_cost,
            };
          },
        );
        setOrderItems(resultItems);

        const userData = await FetchManager.getUserById(orderData.dp_userId);
        setUser(userData);

        const statusesData = await FetchOrderStatuses.get(orderData.dp_id);
        setStatuses(statusesData);
      } catch (exception) {
        await AsyncAlertExceptionHelper(exception, navigate);
      }
    })();
  }, [id, navigate]);

  async function addStatus() {
    try {
      await FetchManager.createOrderStatus({
        dp_orderId: order.dp_id,
        dp_status: status,
      });
      const statusesData = await FetchOrderStatuses.get(order.dp_id);
      setStatuses(statusesData);
    } catch (exception) {
      await AsyncAlertExceptionHelper(exception, navigate);
    }
  }

  async function deleteStatus(orderStatusId: number) {
    try {
      await FetchManager.removeOrderStatus(order.dp_id, orderStatusId);
      const statusesData = await FetchOrderStatuses.get(order.dp_id);
      setStatuses(statusesData);
    } catch (exception) {
      await AsyncAlertExceptionHelper(exception, navigate);
    }
  }

  let totalSum = 0;
  const date = new Date(order.dp_date);
  const stringTime = getStringTime(date);
  const timeAgo = getTimeAgo(date);
  return (
    <AppContainer>
      <table className={styles.table}>
        <caption>Таблица - Данные из заявки</caption>
        <tbody>
          <tr>
            <td colSpan={2} style={{ textAlign: 'center', fontWeight: 'bold' }}>
              Данные заявки
            </td>
          </tr>
          <tr>
            <td>Дата, время</td>
            <td>{stringTime}</td>
          </tr>
          <tr>
            <td>Сколько времени назад</td>
            <td>{timeAgo}</td>
          </tr>
          <tr>
            <td colSpan={2} style={{ textAlign: 'center', fontWeight: 'bold' }}>
              Данные пользователя
            </td>
          </tr>
          <tr>
            <td>УНП</td>
            <td>{user.dp_unp}</td>
          </tr>
          <tr>
            <td>Краткое наименование юр. лица</td>
            <td>{user.dp_shortNameLegalEntity}</td>
          </tr>
          <tr>
            <td>Полное наименование юр. лица</td>
            <td>{user.dp_nameLegalEntity}</td>
          </tr>
          <tr>
            <td>Электронная почта</td>
            <td>
              <a href={`mailto:${user.dp_email}`}>{user.dp_email}</a>
            </td>
          </tr>
          <tr>
            <td>Телефон приемное</td>
            <td>{user.dp_receptionPhone}</td>
          </tr>
          <tr>
            <td>Адрес</td>
            <td>{user.dp_address}</td>
          </tr>
          <tr>
            <td>Фамилия</td>
            <td>{user.dp_lastName}</td>
          </tr>
          <tr>
            <td>Имя</td>
            <td>{user.dp_firstName}</td>
          </tr>
          <tr>
            <td>Отчество</td>
            <td>{user.dp_middleName}</td>
          </tr>
        </tbody>
      </table>
      <table className={styles.table}>
        <caption>Таблица - Заказанныя номенклатура</caption>
        <thead>
          <tr>
            <th>Модель</th>
            <th>Картинка</th>
            <th>Наименование</th>
            <th>Количество</th>
            <th>Стоимость на момент заказа</th>
            <th>Стоимость с НДС</th>
            <th>Итого</th>
          </tr>
        </thead>
        <tbody>
          {orderItems.map(e => {
            const costNds = Number(e.dp_cost * 1.2).toFixed(2);
            const sum = Number(e.dp_count * Number(costNds)).toFixed(2);
            totalSum += Number(sum);
            return (
              <tr key={e.dp_id}>
                <td>{e.dp_model}</td>
                <td>
                  {e.dp_photoUrl === '' ? null : (
                    <img src={e.dp_photoUrl} alt="x" />
                  )}
                </td>
                <td>{e.dp_name}</td>
                <td style={{ textAlign: 'right' }}>{e.dp_count}</td>
                <td style={{ textAlign: 'right' }}>{e.dp_cost}</td>
                <td style={{ textAlign: 'right' }}>{costNds}</td>
                <td style={{ textAlign: 'right' }}>{sum}</td>
              </tr>
            );
          })}
          <tr>
            <td colSpan={6} style={{ textAlign: 'right' }}>
              Итого
            </td>
            <td>{Number(totalSum).toFixed(2)}</td>
          </tr>
        </tbody>
      </table>
      <div className={styles.form}>
        <input
          type="text"
          value={status}
          onChange={event => setStatus(event.target.value)}
          placeholder="статус"
        />
        <button onClick={addStatus}>Добавить статус</button>
      </div>
      {!statuses.length ? null : (
        <table className={styles.table}>
          <caption>Таблица - Статусы заказа</caption>
          <thead>
            <tr>
              <th>Дата, время</th>
              <th>Сколько времени назад</th>
              <th>Статус</th>
              <th>Удалить</th>
            </tr>
          </thead>
          <tbody>
            {statuses.map(e => {
              const date = new Date(e.dp_date);
              const timeString = getStringTime(date);
              const timeAgo = getTimeAgo(date);
              return (
                <tr key={e.dp_id}>
                  <td>{timeString}</td>
                  <td>{timeAgo}</td>
                  <td>{e.dp_status}</td>
                  <td style={{ textAlign: 'center' }}>
                    <button onClick={() => deleteStatus(e.dp_id)}>
                      Удалить
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </AppContainer>
  );
}
