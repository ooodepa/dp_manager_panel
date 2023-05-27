import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import AppModal from '../AppModal/AppModal';
import styles from './UpdateOrderPage.module.css';
import getTimeAgo from '../../package/getTimeAgo';
import getStringTime from '../../package/getStringTime';
import AppContainer from '../AppContainer/AppContainer';
import FetchItems from '../../utils/FetchBackend/rest/api/items';
import FetchUsers from '../../utils/FetchBackend/rest/api/users';
import FetchManager from '../../utils/FetchBackend/rest/api/manager';
import { AsyncAlertExceptionHelper } from '../../utils/AlertExceptionHelper';
import GetItemDto from '../../utils/FetchBackend/rest/api/items/dto/get-item.dto';
import GetOrderWithIdDto from '../../utils/FetchBackend/rest/api/orders/dto/get-order-with.id.dto';
import ManagerGetUserDto from '../../utils/FetchBackend/rest/api/manager/dto/manager-get-user.dto';

export default function UpdateOrderPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [modal, setModal] = useState(<></>);
  const [order, setOrder] = useState<GetOrderWithIdDto>({
    dp_id: '',
    dp_date: '',
    dp_userId: 0,
    dp_canceledByClientOn: null,
    dp_canceledByManagerOn: null,
    dp_sentedByManagerOn: null,
    dp_receivedByClientOn: null,
    dp_orderItems: [],
    dp_orderStatuses: [],
  });
  const [user, setUser] = useState<ManagerGetUserDto>({
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
  const [items, setItems] = useState<GetItemDto[]>([]);
  const [status, setStatus] = useState('');

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
        setItems(itemsData);

        const userData = await FetchManager.getUserById(orderData.dp_userId);
        setUser(userData);
      } catch (exception) {
        await AsyncAlertExceptionHelper(exception, navigate);
      }
    })();
  }, [id, navigate]);

  async function addStatus() {
    try {
      setModal(<></>);
      await FetchManager.createOrderStatus({
        dp_orderId: order.dp_id,
        dp_status: status,
      });
      const orderData = await FetchManager.getOrderById(`${id}`);
      setOrder(orderData);
      setStatus('');
    } catch (exception) {
      await AsyncAlertExceptionHelper(exception, navigate);
    }
  }

  function preAddStatus() {
    const message = [
      'Вы можете отправить сообщение клиенту, которое он увидет у себя в мобильном приложении.',
      'Для отправки сообщения жмите "Продолжить"',
      'Если вы не хотите отсылать сообщение, то жмите "Отмена"',
      'Дополнительная информация:',
      '- пока заявка без меток, то вы можете слать сообщения;',
      '- если вы отмените заявку [кнопка: Отменить заявку], то вы не можете слать сообщения пользователю;',
      '- если вы отправите заказ [кнопка: Заказ отправлен], то вы можете продолжать отправлять сообщения;',
      '- когда клиент в мобильном приложении пометит, что заказ получен, то вы уже не сможете отправить сообщение.',
    ].join('\n');
    setModal(
      <AppModal title="Отправка статуса заявки клиенту" message={message}>
        <button onClick={addStatus}>Продолжить</button>
        <button onClick={() => setModal(<></>)}>Отмена</button>
      </AppModal>,
    );
  }

  async function deleteStatus(statusId: number) {
    try {
      setModal(<></>);
      await FetchManager.removeOrderStatus(statusId, order.dp_id);
      const orderData = await FetchManager.getOrderById(`${id}`);
      setOrder(orderData);
    } catch (exception) {
      await AsyncAlertExceptionHelper(exception, navigate);
    }
  }

  function preDeleteStatus(statusId: number) {
    const message = [
      'Вы хотите удалить статус?',
      'Если вы хотите, чтобы этот статус по каким-то причинам пропал у пользователя в мобильном приложении, то жмите "Продолжить"',
      'Если вы не хотели удалять статус, то жмите "Отмена"',
    ].join('\n');
    setModal(
      <AppModal title="Удаление статус" message={message}>
        <button onClick={() => deleteStatus(statusId)}>Продолжить</button>
        <button onClick={() => setModal(<></>)}>Отмена</button>
      </AppModal>,
    );
  }

  async function orderIsCanceledByManager() {
    try {
      setModal(<></>);
      await FetchManager.patchOrderIsCanceledByManager(order.dp_id);
      const orderData = await FetchManager.getOrderById(`${id}`);
      setOrder(orderData);
    } catch (exception) {
      await AsyncAlertExceptionHelper(exception, navigate);
    }
  }

  async function orderIsSentedByManager() {
    try {
      setModal(<></>);
      await FetchManager.patchOrderIsSentedByManager(order.dp_id);
      const orderData = await FetchManager.getOrderById(`${id}`);
      setOrder(orderData);
    } catch (exception) {
      await AsyncAlertExceptionHelper(exception, navigate);
    }
  }

  function preOrderIsCanceledByManager() {
    const message = [
      'Если вы поставите эту метку, то вы не сможете её изменить.',
      'Вы также не отметите, что заказ отправлен клиенту [кнопка: Заказ отправлен].',
      'Вы уверены, что ходите закрыть эту заявку?',
      'Если вы этого не хотите, то жмите "Отмена".',
      'Если эту заявку все таки надо отменить по каким-то причинам, то жмите "Продолжить" (не рекомендуется).',
    ].join('\n');
    setModal(
      <AppModal title="Отмена заказа (не рекомендуется)" message={message}>
        <button onClick={orderIsCanceledByManager}>
          Продолжить (не рекомендуется)
        </button>
        <button onClick={() => setModal(<></>)}>Отмена</button>
      </AppModal>,
    );
  }

  function preOrderIsSentedByManager() {
    const message = [
      'Если вы поставите эту метку, то вы не сможете её изменить.',
      'Ваш товар уже отправлен клиенту?',
      'Если товар отправлен, то жмите "Продолжить".',
      'Если товар не отправлен, то жмите "Отмена"',
    ].join('\n');
    setModal(
      <AppModal title="Заказ отправлен клиенту" message={message}>
        <button onClick={orderIsSentedByManager}>Продолжить</button>
        <button onClick={() => setModal(<></>)}>Отмена</button>
      </AppModal>,
    );
  }

  let totalSum = 0;
  const date = new Date(order.dp_date);
  const stringTime = getStringTime(date);
  const timeAgo = getTimeAgo(date);
  return (
    <AppContainer>
      {modal}

      {order.dp_id === '' ? null : (
        <table
          className={styles.table}
          data-is-success={
            order.dp_sentedByManagerOn || order.dp_receivedByClientOn
              ? '1'
              : '0'
          }
          data-is-danger={
            order.dp_canceledByClientOn || order.dp_canceledByManagerOn
              ? '1'
              : '0'
          }
        >
          <caption>Таблица - Данные из заявки</caption>
          <thead>
            <tr>
              <td style={{ width: '300px' }}>Ключ</td>
              <td>Значение</td>
              <td style={{ width: '180px' }}>Кнопка</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>ID</td>
              <td>{order.dp_id}</td>
              <td style={{ textAlign: 'center' }}>x</td>
            </tr>
            <tr>
              <td>Дата, время</td>
              <td>
                {stringTime} ({timeAgo})
              </td>
              <td style={{ textAlign: 'center' }}>x</td>
            </tr>
            <tr>
              <td>1. Отменен клиентом</td>
              <td>
                {order.dp_canceledByClientOn
                  ? `${getStringTime(
                      new Date(order.dp_canceledByClientOn),
                    )} - Да. Заказ отменен клиентом`
                  : 'нет'}
              </td>
              <td style={{ textAlign: 'center' }}>x</td>
            </tr>
            <tr>
              <td>1. Отменен менеджером</td>
              <td>
                {order.dp_canceledByManagerOn}
                {order.dp_canceledByManagerOn
                  ? `${getStringTime(
                      new Date(order.dp_canceledByManagerOn),
                    )} - Да. Заказ отменен менеджером`
                  : 'нет'}
              </td>
              <td>
                <button
                  onClick={preOrderIsCanceledByManager}
                  data-is-danger="1"
                >
                  Отменить заявку
                </button>
              </td>
            </tr>
            <tr>
              <td>1. Отправлен менеджером</td>
              <td>
                {order.dp_sentedByManagerOn
                  ? `${getStringTime(
                      new Date(order.dp_sentedByManagerOn),
                    )} - Да. Заказ отправлен менеджером`
                  : 'нет'}
              </td>
              <td>
                <button onClick={preOrderIsSentedByManager} data-is-success="1">
                  Заказ отправлен
                </button>
              </td>
            </tr>
            <tr>
              <td>2. Получен покупателем</td>
              <td>
                {order.dp_receivedByClientOn
                  ? `${getStringTime(
                      new Date(order.dp_receivedByClientOn),
                    )} - Да. Заказ отправлен менеджером`
                  : 'нет'}
              </td>
              <td style={{ textAlign: 'center' }}>x</td>
            </tr>
          </tbody>
        </table>
      )}

      {user.dp_id === 0 ? null : (
        <table className={styles.table}>
          <caption>Таблица - Данные пользователя</caption>
          <thead>
            <tr>
              <th style={{ width: '300px' }}>Ключ</th>
              <th>Значение</th>
            </tr>
          </thead>
          <tbody>
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
              <td>Телефон приемной</td>
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
      )}
      {order.dp_id === '' ? null : (
        <table className={styles.table}>
          <caption>Таблица - Заказанная номенклатура</caption>
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
            {order.dp_orderItems.map(e => {
              let item: GetItemDto = {
                dp_id: '',
                dp_cost: 0,
                dp_itemCategoryId: 0,
                dp_itemCharacteristics: [],
                dp_itemGalery: [],
                dp_model: '',
                dp_name: '',
                dp_photoUrl: '',
                dp_seoDescription: '',
                dp_seoKeywords: '',
              };

              for (let i = 0; i < items.length; ++i) {
                if (items[i].dp_id === e.dp_itemId) {
                  item = items[i];
                  break;
                }
              }

              const costNds = Number(e.dp_cost * 1.2).toFixed(2);
              const sum = Number(e.dp_count * Number(costNds)).toFixed(2);
              totalSum += Number(sum);

              return (
                <tr key={e.dp_id}>
                  <td>{item.dp_model}</td>
                  <td>
                    {item.dp_photoUrl === '' ? null : (
                      <img src={item.dp_photoUrl} alt="x" />
                    )}
                  </td>
                  <td>{item.dp_name}</td>
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
      )}
      {order.dp_id === '' ? null : (
        <div className={styles.form}>
          <input
            type="text"
            value={status}
            onChange={event => setStatus(event.target.value)}
            placeholder="Статус заявки, который увидет пользователь"
          />
          <button onClick={preAddStatus}>Добавить статус</button>
        </div>
      )}
      {!order.dp_orderStatuses?.length ? null : (
        <table className={styles.table}>
          <caption>Таблица - Статусы заказа</caption>
          <thead>
            <tr>
              <th style={{ width: '130px' }}>Дата, время</th>
              <th style={{ width: '200px' }}>Сколько времени назад</th>
              <th>Статус</th>
              <th style={{ width: '100px' }}>Удалить</th>
            </tr>
          </thead>
          <tbody>
            {order.dp_orderStatuses.map(status => {
              const date = new Date(status.dp_date);
              const timeString = getStringTime(date);
              const timeAgo = getTimeAgo(date);

              return (
                <tr key={status.dp_id}>
                  <td>{timeString}</td>
                  <td>{timeAgo}</td>
                  <td>{status.dp_status}</td>
                  <td style={{ textAlign: 'center' }}>
                    <button
                      onClick={() => preDeleteStatus(status.dp_id)}
                      data-is-danger="1"
                    >
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
