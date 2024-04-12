import Stripe from 'stripe';
import config from "config";

// const stripe = new Stripe(config.get("STRIPE.TEST"), {
//   apiVersion: "2022-11-15"
// });
const stripe = require('stripe')(config.get("STRIPE.TEST"));
export class StripeUtilities {

  public static createCustomer = async (email: any, name: any) => {
    try {
      const params: Stripe.CustomerCreateParams = {
        email,
        name
      };
      const customer: Stripe.Customer = await stripe.customers.create(params);

      return {
        status: true,
        id: customer.id
      };
    } catch (error) {
      return {
        status: false,
        message: error
      }
    }

  };

  public static retrivePlans = async () => {
      const res = stripe.plans.list();
      return res;
  }

  public static retrivePlanById = async (planId: any) => {
    const res = stripe.plans.retrieve(planId);
    return res;
  }

  public static attachCardToCustomer = async(customerId: any, cardToken: any) => {
    let customer: any = await stripe.customers.createSource(customerId,{
      source: cardToken
    });
    return customer;

  }

  public static attachPaymentMethodToCustomer = async(customerId: any, paymentMethod: any) => {
    let customer: any = await stripe.paymentMethods.attach(
      paymentMethod,
      {
        customer: customerId
      }
    )

    return customer;
  }


  public static subscribePlanToCustomer = async (planId: any, customerId: any, cardId: any, coupon: any = '') => {
    if(coupon){
      const res = await stripe.subscriptions.create({
        customer: customerId,
        default_payment_method: cardId,
        coupon: coupon,
        items: [
          {
            price: planId
          }
        ]
      });
  
      return res;
    }
    else{
       



      const res = await stripe.subscriptions.create({
        customer: customerId,
        default_payment_method: cardId,
        items: [
          {
            price: planId
          }
        ]
      });
  
      return res;
    }
  }

  public static isCustomerExists = async (email: any) => {
    const customer = await stripe.customers.list({
      email
    });

    return customer;
  }

  public static cancelSubscriptionToCustomer =  async (subscriptionId: any) => {
    return await stripe.subscriptions.del(subscriptionId);
  }

  public static retrieveCoupon = async (couponId: any) => {
    try {
      const coupon = await stripe.coupons.retrieve(couponId);
      console.log(coupon);
      return {
        coupon,
        status: true
      }
    } catch (error) {
      console.log('error in coupon retriving', error);
      return {
        status: false
      };
    }
  }

  public static reteriveSubscriptionItem = async (subscriptionId: any) =>{
    const res: any = await stripe.subscriptions.retrieve(subscriptionId);

    if(res.items.data.length > 0){
      return res.items.data[0].id;
    }

    return '';
  }

  public static increaseQuantitySubscribedCustomer = async (subscriptionId: any, quantity: any) => {

    let subscriptionItemId = await StripeUtilities.reteriveSubscriptionItem(subscriptionId);

    if(subscriptionItemId){
      const res = await stripe.subscriptionItems.update(
        subscriptionItemId,
        {quantity: quantity}
      );
      return res;
    }
   
    return '';
  }

  public static reteriveSubscriptionDetail = async (subscriptionId: any) => {
    const res: any = await stripe.subscriptions.retrieve(subscriptionId);
    return res;
  }

  public static changePaymentMethod = async(subscriptionId: any, cardId: any, coupon: any) => {
    if(coupon){
      const subscription = await stripe.subscriptions.update(
        subscriptionId,
        {
          default_payment_method: cardId, 
          coupon
        }
      );
  
      return subscription;
    }
    else{
      const subscription = await stripe.subscriptions.update(
        subscriptionId,
        {
          default_payment_method: cardId
        }
      );
  
      return subscription;
    }

  }
  
}


