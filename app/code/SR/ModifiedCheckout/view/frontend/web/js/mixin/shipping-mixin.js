define([
    'jquery',
    'SR_ModifiedCheckout/js/model/address-validator',
    'Magento_Checkout/js/action/set-shipping-information',
    'Magento_Checkout/js/model/step-navigator',
    'Magento_Checkout/js/checkout-data',
    'uiRegistry'
], function(
    $,
    addressValidator,
    setShippingInformationAction,
    stepNavigator,
    checkoutData,
    registry
) {
    'use strict';

    return function (target) {
        return target.extend({
            defaults: {
                template: 'SR_ModifiedCheckout/address'
            },

            /**
             * @inheritDoc
             */
            setShippingInformation: function () {
                if (
                    this.validateShippingInformation()
                    &&
                    addressValidator.validateBillingInformation(this.isFormInline, this.source)
                ) {
                    registry.async('checkoutProvider')(function (checkoutProvider) {
                        var shippingAddressData = checkoutData.getShippingAddressFromData();

                        if (shippingAddressData) {
                            checkoutProvider.set(
                                'shippingAddress',
                                $.extend(true, {}, checkoutProvider.get('shippingAddress'), shippingAddressData)
                            );
                        }
                    });

                    setShippingInformationAction().done(
                        function () {
                            stepNavigator.next();
                        }
                    );
                }
            }
        });
    }
});
