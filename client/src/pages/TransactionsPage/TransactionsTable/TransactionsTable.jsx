import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { format } from 'date-fns';
import { getTransactions } from '../../../store/slices/transactionsSlice';
import Spinner from '../../../components/Spinner/Spinner';
import { bindActionCreators } from 'redux';

function TransactionsTable () {
  // ! In app must be unified code style
  const { isFetching, error, transactions } = useSelector(
    ({ transactionsList }) => transactionsList
  );

  const dispatch = useDispatch();
  const { get } = bindActionCreators({ get: getTransactions }, dispatch);

  useEffect(() => {
    get();
  }, []);

  return (
    <>
      {error && <div>ERROR</div>}
      {isFetching && <Spinner />}
      {!isFetching && !error && !transactions.length && (
        <div>Transactions are missing</div>
      )}
      {!isFetching && !error && transactions.length && (
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
              <td key={1}>
                {transactions.reduce((accum, t) => accum + Number(t.amount), 0)}
              </td>
              <td key={2}></td>
              <td key={3}></td>
            </tr>
          </tfoot>
        </table>
      )}
    </>
  );
}

export default TransactionsTable;
