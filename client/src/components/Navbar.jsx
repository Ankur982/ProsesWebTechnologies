import React from "react";
import { Box, Button, Image, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { logoutUser } from "../redux/user/action";

export const Navbar = () => {
  const dispatch = useDispatch();
  const { loggedUserName, loggedUser } = useSelector((store) => store.user);


  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <Box
      bg={"#8d1b47"}
      color="white"
      display={"flex"}
      justifyContent="space-around"
      alignItems={"center"}
      fontSize={25}
      boxShadow={"lg"}
      p="5"
    >
      <Link to="/">
        <Text display={"flex"} justifyContent={"center"} alignItems={"center"}>
          {" "}
          <Image
            w={"150px"}
            src="http://prosesindia.com/wp-content/uploads/2020/12/newlogo_light.png"
          />
        </Text>
      </Link>
      <Link to="/">
        <Text>Dashboard</Text>
      </Link>
      {loggedUser ? (
        <>
          {loggedUserName.isAdmin ? (
            <Button colorScheme="teal" variant="solid">
              <Link to="/add-course">ADD SUBSCRIPTION</Link>
            </Button>
          ) : null}
          <Button colorScheme="teal" variant="solid">
            {loggedUserName && loggedUserName.name}
          </Button>

          <Button
            colorScheme="teal"
            variant="solid"
            onClick={() => handleLogout()}
          >
            LOGOUT
          </Button>
        </>
      ) : (
        <>
          <Link to="/login">
            <Text>Login</Text>
          </Link>
          <Link to="/signup">
            <Text>Signup</Text>
          </Link>
        </>
      )}
    </Box>
  );
};
