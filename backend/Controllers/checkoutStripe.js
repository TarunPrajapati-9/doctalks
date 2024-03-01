
import Stripe from 'stripe';
const stripe = new Stripe('sk_test_51OpF1tSJp58rRrD9b1URm0cDPsSZ2hfoLHE7x5Re1Wm6zqqnPUBJoiWZEhpLBgDWkC0eZiYenVUlnkiWsWypWCjT002k52owYu');
const checkout = async (req, res) => {

  
    const { title, doctor_name, price, duration } = req.body;

    try {
        const session = await stripe.checkout.sessions.create({
            // this item send to stripe for check out ui  (that is  not handle by us)...
            line_items: [
                {
                    price_data: {
                        currency: 'inr',
                        product_data: {
                            name: title,
                            description: duration
                        },
                        unit_amount: price,
                    },
                    quantity: 1,
                }
            ],
            mode: 'payment',
            success_url: `https://www.npmjs.com/package/stripe`,
            cancel_url: `https://www.npmjs.com/package/stripe`,
        });

        console.log("done");
        res.json({ "url": session.url });
    } catch (error) {
        console.log(error);
    }
}
9
export { checkout };
