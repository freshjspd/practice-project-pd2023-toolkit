import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { format, differenceInDays } from 'date-fns';
import { getTransactions } from '../../../store/slices/transactionsSlice';
import Spinner from '../../../components/Spinner/Spinner';
import { bindActionCreators } from 'redux';
import CONSTANTS from '../../../constants';

function TransactionsTable () {
  // ! In app must be unified code style

  const {
    transactionsList: { isFetching, error, transactions },
    userStore: {
      data: { firstName, lastName, role },
    },
  } = useSelector(({ transactionsList, userStore }) => ({
    transactionsList,
    userStore,
  }));

  const dispatch = useDispatch();
  const { get } = bindActionCreators({ get: getTransactions }, dispatch);

  useEffect(() => {
    get();
  }, []);

  const totalSum = transactions.reduce(
    (accum, t) => accum + Number(t.amount),
    0
  );

  const difDaysFromLastContest = differenceInDays(
    new Date(),
    new Date(transactions[transactions.length - 1]?.createdAt)
  );

  const isSpecOfferAct =
    role === CONSTANTS.CUSTOMER &&
    totalSum >= 300 &&
    difDaysFromLastContest < 3;

  return (
    <>
      {error && <div>ERROR</div>}
      {isFetching && <Spinner />}
      {!isFetching && !error && !transactions.length && (
        <div>Transactions are missing</div>
      )}
      {!isFetching && !error && transactions.length && (
        <>
          <table>
            <caption>Transactions Table</caption>
            <thead>
              <tr>
                <th key={1}>Amount</th>
                <th key={2}>Operation Type</th>
                <th key={3}>Data</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map(t => (
                <tr key={t.id}>
                  <td key={1}>{t.amount}</td>
                  <td key={2}>{t.operationType}</td>
                  <td key={3}>{format(new Date(t.createdAt), 'd MMM yyyy')}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td key={1}>{totalSum}</td>
                <td key={2}></td>
                <td key={3}></td>
              </tr>
            </tfoot>
          </table>
          <div>
            {isSpecOfferAct &&
              `${firstName} ${lastName}, congratulations, create the next contest
            within 3 days with a 5% discount`}
          </div>
        </>
      )}
    </>
  );
}

export default TransactionsTable;
