import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <>
      <SignIn afterSignInUrl="/dashboard" />
      <span className="thisPageIsClerkSignInOrSignUp" />
    </>
  );
}
