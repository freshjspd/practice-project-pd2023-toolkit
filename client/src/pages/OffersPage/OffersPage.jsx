import React, { useEffect } from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { connect } from 'react-redux';
import { getOffers } from '../../store/slices/offersSlice';
import Spinner from '../../components/Spinner/Spinner';

function OffersPage ({ isFetching, error, offers, getOffers }) {
  useEffect(() => {
    getOffers();
  }, []);
  // TODO Handle Error
  return (
    <>
      <Header />
      <div>
        {isFetching && <Spinner />}
        {error && <div>ERROR!!!</div>}
        {!isFetching && !error && <div>{JSON.stringify(offers)}</div>}
      </div>
      <Footer />
    </>
  );
}

const mapStateToProps = state => state.offersList;

const mapDispathToProps = dispatch => ({
  getOffers: () => dispatch(getOffers()),
});

export default connect(mapStateToProps, mapDispathToProps)(OffersPage);
