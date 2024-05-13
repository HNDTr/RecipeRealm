import LogoutIcon from "@mui/icons-material/Logout";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { styled } from "@mui/material/styles";
import React from "react";

function ProfilePage() {
  const router = useRouter();
  const { data: session } = useSession();

  const handleSignOut = async () => {
    await signOut();
    router.push("/Home"); // Redirect to home page after sign-out
  };

  const Container = styled("div")(({ theme: styledTheme }) => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "center", // Center items horizontally
    justifyContent: "center", // Center items vertically
    marginTop: styledTheme.spacing(0),
    paddingTop: styledTheme.spacing(0),
  }));

  return (
    <Container>
      {session && (
        <div style={{ fontSize: "4em" }}>
          Welcome <b style={{ color: "purple" }}> {session.user.name} </b>!{" "}
          <LogoutIcon
            onClick={handleSignOut}
            style={{ cursor: "pointer", fontSize: "0.7em" }}
          />
        </div>
      )}
      {/* <div onClick={handleSignOut}>
            <LogoutIcon />
          </div> */}
    </Container>
  );
}

export default ProfilePage;
