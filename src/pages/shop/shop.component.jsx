import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import CollectionsOverview from '../../components/collections-overview/collections-overview.component';
import CollectionPage from '../collection/collection.component';
import { updateCollections } from '../../redux/shop/shop.actions';
import { WithSpinner } from '../../components/with-spinner/with-spinner.component';

import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils';


const CollectionOverviewWithWithSpinner = WithSpinner(CollectionsOverview);
const CollectionPageWithWithSpinner = WithSpinner(CollectionPage);

class ShopPage extends Component {
  state = {
     loading: true
   }
  unsubscribeFromSnapshot = null;

  componentDidMount() {
    const { updateCollections } = this.props;
    const collectionRef = firestore.collection('collections');
    collectionRef.onSnapshot(async snapshot => {
      const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
      updateCollections(collectionsMap);
      this.setState({loading: false})
      
    })
    
  }
  
 
  render() { 
    const { match } = this.props;
    const { loading } = this.state;
    return (  
      <div className='shop-page'>
      <Route exact path={`${match.path}`} render={(props)=><CollectionOverviewWithWithSpinner isLoading={loading} {...props} />} />
        <Route path={`${match.path}/:collectionId`} render={(props) => <CollectionPageWithWithSpinner isLoading={loading} {...props} />} />
    </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  updateCollections: collectionsMap =>dispatch(updateCollections(collectionsMap))
})
 
export default connect(null, mapDispatchToProps)(ShopPage);