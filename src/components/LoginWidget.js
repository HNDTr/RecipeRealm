import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function LoginWidget() {
  const router = useRouter();
  const { data: session } = useSession();

  const handleSignInAndRedirect = async () => {
    await signIn("google", { callbackUrl: "/GlobalRecipe" });
  };

  const handleSignOut = async () => {
    await signOut();
    router.push("/"); // Redirect to home page after sign-out
  };

  return (
    <div>
      {session ? (
        <div>
          <p>Signed in as {session.user.email} <button type="button" onClick={handleSignOut}>Sign out</button></p>
        </div>
      ) : (
        <div>
          <button type="button" onClick={handleSignInAndRedirect}>Sign in with Google</button>
        </div>
      )}
    </div>
  );
}
