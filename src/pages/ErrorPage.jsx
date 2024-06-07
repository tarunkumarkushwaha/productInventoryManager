import { Box, Heading, Text, Button } from "@chakra-ui/react";

function ErrorPage() {
  return (
    <Box 
      minH="100vh" 
      bg="blue.100" 
      display="flex" 
      flexDirection="column" 
      justifyContent="center" 
      alignItems="center"
    >
      <Heading as="h1" size="2xl" fontWeight="bold" mb={4}>
        Oops! Something went wrong.
      </Heading>
      <Text fontSize="lg" mb={8}>
        The page you're looking for doesn't exist..
      </Text>
      <Button 
        onClick={() => window.history.back()} 
        bg="white" 
        _hover={{ bg: "blue.600" }} 
        color="black" 
        fontWeight="bold" 
        py={2} 
        px={4} 
        rounded="md" 
        focus={{ outline: "none", shadow: "outline" }}
      >
        Go Back
      </Button>
    </Box>
  );
}

export default ErrorPage;
