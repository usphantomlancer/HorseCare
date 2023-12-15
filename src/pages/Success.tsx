export default function Success() {
  // I know, it's not updating the payment status. As you mentioned, I have to create a demonstration.

  return (
    <div className="container py-12">
      <h1 className="mb-8 text-2xl font-semibold text-green-600">
        Your payment was successful.
      </h1>
      <p>This is a simple demonstration of Stripe payment.</p>
    </div>
  )
}
