import React, { useEffect } from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { getTransactions } from '../../api/rest/restController';

function TransactionsPage () {
  useEffect(() => {
    getTransactions();
  }, []);

  return (
    <>
      <Header />
      <div>TransactionsPage</div>
      <Footer />
    </>
  );
}

export default TransactionsPage;
