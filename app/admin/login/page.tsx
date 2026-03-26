'use client'

import { SignIn } from '@clerk/nextjs'

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen bg-cream flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* MP Branding */}
        <div className="text-center mb-8">
          <span className="font-[family-name:var(--font-playfair)] text-4xl font-bold text-wine">MP</span>
          <p className="text-[11px] uppercase tracking-[3px] text-warm-gray mt-1">Admin Portal</p>
        </div>

        {/* Clerk SignIn Component */}
        <SignIn
          forceRedirectUrl="/admin"
          appearance={{
            elements: {
              rootBox: 'mx-auto',
              card: 'bg-white rounded-2xl border border-beige/50 shadow-sm',
              headerTitle: 'hidden',
              headerSubtitle: 'hidden',
              formButtonPrimary:
                'bg-wine hover:bg-wine/90 text-cream rounded-lg h-10 font-medium',
              formFieldInput:
                'bg-cream/50 border border-beige rounded-lg h-10 text-chocolate placeholder:text-warm-gray/50',
              formFieldLabel: 'text-sm font-medium text-chocolate',
              formFieldInputShowPasswordButton: 'text-warm-gray',
              footerActionLink: 'text-wine hover:text-wine/80 font-medium',
              dividerLine: 'bg-beige/30',
              dividerText: 'text-warm-gray/60 text-xs',
              socialButtonsBlockButton:
                'border border-beige/50 hover:bg-cream/50 rounded-lg h-10',
              socialButtonsBlockButtonText: 'text-chocolate text-sm font-medium',
              identifierInputField: 'bg-cream/50 border border-beige rounded-lg h-10',
            },
            variables: {
              colorPrimary: '#8B3A3A', // wine
              colorText: '#3D2817', // chocolate
              colorTextSecondary: '#A39B8B', // warm-gray
              colorBackground: '#F5F1E8', // cream
              colorInputBackground: '#F5F1E8',
              colorInputText: '#3D2817',
              colorSuccess: '#B8860B', // gold
              colorWarning: '#E74C3C', // error
              colorDanger: '#E74C3C',
            },
          }}
        />
      </div>
    </div>
  )
}
