import { SignUp } from '@clerk/nextjs'

export default function Page() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="max-w-md w-full p-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Create Account</h1>
          <p className="mt-2 text-gray-600">Join our community of engineering students</p>
        </div>
        <div className="bg-white p-6">
          <SignUp 
            appearance={{
              elements: {
                rootBox: "mx-auto",
                card: "shadow-none border-none",
                headerTitle: "text-orange-500",
                headerSubtitle: "text-gray-600",
                socialButtonsBlockButton: "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50",
                socialButtonsBlockButtonText: "text-gray-700",
                formButtonPrimary: "bg-orange-500 hover:bg-orange-600",
                footerActionLink: "text-orange-500 hover:text-orange-600",
              }
            }}
          />
        </div>
      </div>
    </div>
  )
}