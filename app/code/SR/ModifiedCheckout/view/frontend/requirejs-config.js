var config = {
    config: {
        mixins: {
            'Magento_Checkout/js/view/shipping': {
                'SR_ModifiedCheckout/js/mixin/shipping-mixin': true
            },
            'Amazon_Payment/js/view/shipping': {
                'SR_ModifiedCheckout/js/mixin/shipping-amazon-mixin': true
            }
        }
    }
};
