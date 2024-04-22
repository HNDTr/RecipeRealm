// import styled from "styled-components"
import { styled } from "@mui/material/styles";
// import { useState } from "react"
// import { Link } from "react-router-dom";

const Container = styled("divs")(({ theme: styledTheme }) => ({
  background: "#b2d1ff",
  marginTop: styledTheme.spacing(0),
  paddingTop: styledTheme.spacing(0),
}));

const Wrapper = styled("div")(({ theme: styledTheme }) => ({
  display: "flex",
  flex: "1",
  alignItems: "center", // Align elements to flex-start
  justifyContent: "flex-end",
  marginTop: styledTheme.spacing(5),
  flexDirection: "column",
  paddingTop: styledTheme.spacing(0),
}));

const Form = styled("form")(() => ({
  display: "flex",
  flexDirection: "column",
}));
const Title = styled("h1")(() => ({
  fontSize: "24px",
  fontWeight: "300",
}));
const Input = styled("input")(() => ({
  flex: "1",
  minWidth: "50%",
  margin: "10px 0",
  padding: "10px",
}));
const Button = styled("button")(() => ({
  width: "100%",
  border: "none",
  padding: "15px 20px",
  backgroundColor: "teal",
  color: "white",
  cursor: "pointer",
  marginBottom: "10px",
  "&:disabled": {
    // Corrected syntax
    color: "green", // Wrap color value in quotes
    cursor: "not-allowed", // Wrap cursor value in quotes
  },
}));

// const Error = styled.span`
//   color: red;
// `

const StyledLink = styled("a")(() => ({
  margin: "5px 0px",
  fontSize: "12px",
  textDecoration: "underline",
  cursor: "pointer",
}));

function LoginForm() {
  // const [username, setUsername] = useState('')
  // const [password, setPassword] = useState('')
  // const {isFetching, error} = useSelector((state) => state.user)

  // const handleLogin = (e) =>{
  //   e.preventDefault()
  //   login(dispatch, {username, password}) // Call the login function with username and password
  // }

  return (
    <Container>
      <Wrapper>
        <Title>SIGN IN</Title>
        <Form>
          <Input placeholder="username" />
          <Input placeholder="password" type="password" />{" "}
          {/* Added type="password" */}
          <Button>LOGIN</Button> {/* Bound handleLogin to onClick event */}
          {/* {error && <Error>Something went wrong...</Error>} */}
          <StyledLink to="/forgot-password">FORGOT PASSWORD?</StyledLink>{" "}
          {/* Changed from <StyledLink> to <Link> */}
          <StyledLink to="/register">CREATE A NEW ACCOUNT</StyledLink>{" "}
          {/* Changed from <StyledLink> to <Link> */}
        </Form>
      </Wrapper>
    </Container>
  );
}

export default LoginForm;
