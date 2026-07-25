import {
  Box,
  Button,
  CloseButton,
  Dialog,
  Heading,
  HStack,
  IconButton,
  Image,
  Input,
  Portal,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { useColorModeValue } from "./ui/color-mode";
import { useProductStore } from "@/store/product";
import { toaster } from "@/components/ui/toaster";
import { useState } from "react";

const ProductCard = ({ product }) => {
  const [updatedProduct, setUpdatedProduct] = useState(product);
  const { deleteProduct, updateProduct } = useProductStore();
  const { open, onOpen, onClose } = useDisclosure();

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
  const handleUpdate = async (id, updatedProduct) => {
    const { success, message } = await updateProduct(id, updatedProduct);
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

      <Dialog.Root open={open} onOpenChange={(e) => !e.open && onClose()}>
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content>
              <Dialog.Header>
                <Dialog.Title>Update Product</Dialog.Title>
              </Dialog.Header>

              <Dialog.CloseTrigger asChild>
                <CloseButton
                  size={"sm"}
                  position={"absolute"}
                  top={2}
                  insetEnd={2}
                />
              </Dialog.CloseTrigger>

              <Dialog.Body>
                <VStack gap={4}>
                  <Input
                    placeholder="Product Name"
                    name="name"
                    onChange={(e) =>
                      setUpdatedProduct({
                        ...updateProduct,
                        name: e.target.value,
                      })
                    }
                    value={updatedProduct.name}
                  />
                  <Input
                    placeholder="Price"
                    name="price"
                    type="number"
                    onChange={(e) =>
                      setUpdatedProduct({
                        ...updateProduct,
                        price: e.target.value,
                      })
                    }
                    value={updatedProduct.price}
                  />
                  <Input
                    placeholder="Image URL"
                    name="image"
                    onChange={(e) =>
                      setUpdatedProduct({
                        ...updateProduct,
                        image: e.target.value,
                      })
                    }
                    value={updatedProduct.image}
                  />
                </VStack>
              </Dialog.Body>

              <Dialog.Footer>
                <Button variant={"outline"} mr={3} onClick={onClose}>
                  Cancel
                </Button>
                <Button
                  colorPalette={"blue"}
                  onClick={() => handleUpdate(product._id, updatedProduct)}
                >
                  Update
                </Button>
              </Dialog.Footer>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </Box>
  );
};

export default ProductCard;
