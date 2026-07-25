import {
  Box,
  Heading,
  HStack,
  IconButton,
  Image,
  Text,
} from "@chakra-ui/react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { useColorModeValue } from "./ui/color-mode";
import { useProductStore } from "@/store/product";
import { toaster } from "@/components/ui/toaster";

const ProductCard = ({ product }) => {
  const { deleteProduct } = useProductStore();

  const onOpen = () => {};
  const handleDelete = async (id) => {
    const { success, message } = await deleteProduct(id);
    if (success) {
      toaster.create({
        title: message,
        type: "success",
      });
    } else {
      toaster.create({
        title: message,
        type: "error",
      });
    }
  };
  return (
    <Box
      shadow={"lg"}
      rounded={"lg"}
      overflow={"hidden"}
      transition={"all 0.3s"}
      bg={useColorModeValue("white", "gray.800")}
      _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
    >
      <Image
        src={product.image}
        alt={product.name}
        h={48}
        w={"full"}
        objectFit={"cover"}
      />
      <Box p={4}>
        <Heading as={"h3"} size={"md"} mb={2}>
          {product.name}
        </Heading>
        <Text
          fontWeight={"bold"}
          fontSize={"xl"}
          mb={4}
          color={useColorModeValue("gray.600", "gray.200")}
        >
          ${product.price}
        </Text>
        <HStack gap={2}>
          <IconButton onClick={onOpen} colorPalette={"blue"}>
            <FiEdit />
          </IconButton>
          <IconButton
            onClick={() => handleDelete(product._id)}
            colorPalette={"red"}
          >
            <FiTrash2 />
          </IconButton>
        </HStack>
      </Box>
    </Box>
  );
};

export default ProductCard;
