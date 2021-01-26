import React from 'react'
import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({ price }) => {
    const priceForStripe = price * 100;
    const publishableKey = 'pk_test_51IDv9hKmIId7Q183tsap7ddYc44otDgKHmyBU9zyWvGCS8NNvvmzSj4oFRUpU1l6GgSEzhx1crswT2QND553369500CoilLhgd';

    const onToken = token => {
        console.log(token);
        alert('Payment Successful');
    }
    return ( 
        <StripeCheckout
            label='pay Now'
            name='Clothing store Ltd.'
            billingAddress
            shippingAddress
            description={`Your total is $${price}`}
            amount={priceForStripe}
            panelLabel="Pay Now"
            token={onToken}
            stripeKey={publishableKey}
        
        />
     );
}
 
export default StripeCheckoutButton;