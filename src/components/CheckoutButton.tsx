import { loadStripe } from '@stripe/stripe-js'
import toast from 'react-hot-toast'

import { useUserStore } from '~/hooks/use-user'
import { supabase } from '~/lib/supabase'
import { formatMoney } from '~/lib/utils'
import { Button } from './ui/Button'

export function CheckoutButton({
  price,
  serviceId,
}: {
  price: number
  serviceId: string
}) {
  const { user } = useUserStore()

  const handleClick = async () => {
    const stripe = await loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY)

    if (!stripe) {
      toast.error('Error loading Stripe.')
      return
    }

    const { error: bookingError } = await supabase.from('bookings').insert({
      service_id: serviceId,
      customer_id: user?.id ?? null,
      payment_status: 'pending',
      paid_amount: price,
    })

    if (bookingError) {
      toast.error('Something went wrong.')
      return
    }

    const { error } = await stripe.redirectToCheckout({
      lineItems: [
        {
          price: import.meta.env.VITE_STRIPE_PRICE_ID, // Dummy price id to demonstrate the purchase
          quantity: 1,
        },
      ],
      mode: 'payment',
      successUrl: `${import.meta.env.VITE_AUTH_REDIRECT_URL}/success`,
      cancelUrl: `${import.meta.env.VITE_AUTH_REDIRECT_URL}/cancel`,
    })

    if (error) {
      toast.error(error.message ?? 'Something went wrong.')
      return
    }
  }

  return (
    <Button onClick={handleClick}>Purchase for {formatMoney(price)}</Button>
  )
}
