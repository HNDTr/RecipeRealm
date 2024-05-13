import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { Button } from "@mui/material";

const buttonStyle = {
  backgroundColor: "#18453B",
  color: "white",
  textTransform: "none",
  fontSize: "1em",
};

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
          <p>
            <Button type="button" style={buttonStyle} onClick={handleSignOut}>
              Sign out
            </Button>
          </p>
        </div>
      ) : (
        <div>
          <Button
            type="Button"
            onClick={handleSignInAndRedirect}
            style={buttonStyle}
          >
            Sign in
          </Button>
        </div>
      )}
    </div>
  );
}
