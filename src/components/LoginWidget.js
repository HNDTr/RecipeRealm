import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { Button } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

export default function LoginWidget() {
  const router = useRouter();
  const { data: session } = useSession();

  const handleSignInAndRedirect = async () => {
    await signIn("google", { callbackUrl: "/GlobalRecipe" });
  };

  const handleProfile = async () => {
    router.push("/userProfile");
  };

  return (
    <div>
      {session ? (
        <div>
          <p>
            <div onClick={handleProfile}>
              <AccountCircleIcon style={{ fontSize: "2.5em" }} />
            </div>
            {/* Signed in as {session.user.email}{" "}
            <button type="button" onClick={handleSignOut}>
              Sign out
            </button> */}
          </p>
        </div>
      ) : (
        <div>
          <Button
            type="Button"
            onClick={handleSignInAndRedirect}
            style={{
              backgroundColor: "#18453B",
              color: "white",
              textTransform: "none",
              fontSize: "1em",
            }}
          >
            Sign in
          </Button>
        </div>
      )}
    </div>
  );
}
