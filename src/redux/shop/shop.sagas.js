import { takeEvery } from 'redux-saga/effects';

import ShopActionType from './shop.types'

export function* fetchCollectionsAsync() {
    
      yield  console.log('I am fired');
}

export function* fetchCollectionStart() {
    yield takeEvery(ShopActionType.FETCH_COLLECTIONS_START,
        fetchCollectionsAsync    
    )
}