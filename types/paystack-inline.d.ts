declare module '@paystack/inline-js' {
  interface PaystackTransactionOptions {
    key: string
    email: string
    amount: number
    currency?: string
    ref?: string
    channels?: string[]
    metadata?: Record<string, unknown>
    onSuccess?: (transaction: { reference: string; [key: string]: unknown }) => void
    onCancel?: () => void
    onError?: (error: Error) => void
  }

  class PaystackPop {
    newTransaction(options: PaystackTransactionOptions): void
  }

  export default PaystackPop
}
