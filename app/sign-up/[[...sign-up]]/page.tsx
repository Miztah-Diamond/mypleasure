import { SignUp } from '@clerk/nextjs'

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-cream py-12">
      <SignUp
        appearance={{
          elements: {
            rootBox: 'mx-auto',
            card: 'shadow-xl border border-taupe/10',
            headerTitle: 'text-chocolate font-serif',
            headerSubtitle: 'text-chocolate/60',
            formButtonPrimary: 'bg-gold hover:bg-gold/90 text-white',
            footerActionLink: 'text-gold hover:text-gold/80',
          },
        }}
      />
    </div>
  )
}
