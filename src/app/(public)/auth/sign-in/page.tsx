import { LoginForm } from "@/components/features/auth/components/login-form";
import Image from "next/image";

export default function SignInPage() {
  return (
    <main className="min-h-screen h-full w-full grid-cols-12 max-w-screen-lg mx-auto grid">
      <div className="col-span-6 h-full w-full">
        <div className="h-full flex items-center w-full">
          <div className="w-full flex flex-col items-center">
            <h1 className="text-2xl font-semibold mb-6">Welcome 👋</h1>
            <LoginForm />
          </div>
        </div>
      </div>
      <div className="p-4 col-span-6 h-full w-full flex items-center justify-center">
        <Image
          src={"/6184159_3094350.svg"}
          alt="Illustration"
          width={360}
          height={360}
        />
      </div>
    </main>
  );
}
