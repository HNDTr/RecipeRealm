import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import Image from "next/image";
import { useRouter } from "next/router";
import sushiImage from "../material/images/sushi-png.webp";

const Container = styled("divs")(({ theme: styledTheme }) => ({
  marginTop: styledTheme.spacing(0),
  paddingTop: styledTheme.spacing(10), // This adds space at the top
  paddingBottom: styledTheme.spacing(10), // Add padding at the bottom to increase height
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));

const Wrapper = styled("div")(({ theme: styledTheme }) => ({
  padding: "10px 20px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  marginTop: styledTheme.spacing(1),
  width: "100%",
}));

const Intro = styled("h1")(({ theme: styledTheme }) => ({
  fontSize: "2.5em",
  marginTop: styledTheme.spacing(1),
}));

const Para = styled("h4")(({ theme: styledTheme }) => ({
  font: styledTheme.palette,
  marginTop: styledTheme.spacing(1),
}));

const Right = styled("div")(({ theme: styledTheme }) => ({
  display: "flex",
  flex: "1",
  alignItems: "flex-start", // Align elements to flex-start
  justifyContent: "flex-end",
  marginTop: styledTheme.spacing(1),
  flexDirection: "column",
}));

const Left = styled("div")(({ theme: styledTheme }) => ({
  display: "flex",
  flex: "1", // Make the Left div take equal space
  alignItems: "center",
  marginTop: styledTheme.spacing(1),
}));

function HomePage() {
  const router = useRouter();
  const onClick = () => {
    router.push(`/create`);
  };

  return (
    <Container>
      <Wrapper>
        <Right>
          <Intro>
            Discover a World of{" "}
            <span style={{ color: "#eeab12" }}>Delicious</span> and{" "}
            <span style={{ color: "#eeab12" }}>Nutritious </span>Recipe
          </Intro>
          <Para>
            Welcome to RecipeRealm, your one-stop destination for wholesome and
            delectable culinary inspirations.
          </Para>
          <Button
            onClick={onClick}
            style={{
              backgroundColor: "#18453B",
              color: "white",
              textTransform: "none",
              fontSize: "1em",
              width: "200px",
            }}
          >
            Get started
          </Button>
        </Right>
        <Left>
          <Image
            src={sushiImage}
            width={600}
            height={400}
            sizes="60em"
            alt="Sushi"
          />
        </Left>
      </Wrapper>
    </Container>
  );
}

export default HomePage;