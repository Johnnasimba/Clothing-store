import React from 'react'

import './collection-item.styles.scss';

const CollectionItem = ({ id, name, price, imageUrl }) => {
    return ( 
        <div className="collection-item">
            <div className="image" style={{
                backgroundImage: `url(${imageUrl})`
            }}></div>
            <div className="Collection-footer">
                <span className="name"></span>
            </div>
        </div> 
     );
}
 
export default CollectionItem;