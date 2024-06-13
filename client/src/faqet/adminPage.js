import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  ButtonGroup,
  Button,
  Stack,
  Text,
  Image,
  Heading,
  StackDivider,
  Box,
  Input,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Flex,
} from "@chakra-ui/react";
import { ChakraProvider } from "@chakra-ui/react";
import FocusLock from "react-focus-lock";
import { useDisclosure } from "@chakra-ui/react";
function Admin() {
  const navigate = useNavigate();
  const [imageProfile, setImageProfile] = useState(null);
  const [priceTxt, setPriceTxt] = useState(null);
  const [nameProduct, setNameProduct] = useState(null);
  const [descriptionProduct, setDescriptionProduct] = useState(null);
  const [gender, setGender] = useState(null);
  const [type, setType] = useState(null);

  const [detailInfo, setDetailInfo] = useState(null);
  const [sizes, setSizes] = useState(null);
  const [color, setColor] = useState(null);
  const [quantity, setQuantity] = useState(null);
  const [care, setCare] = useState(null);
  const [adminPosts, setAdminPosts] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [images, setImages] = useState([]);
  const [productIda, setProductId] = useState(null);
  
  const btnRef = React.useRef();

  const handleImageProductChange = (event) => {
    setImageProfile(event.target.files[0]);
  };
  const handleImageChange = (event) => {
    const files = Array.from(event.target.files); // Convert FileList to array
    setImages(files); // Assuming setImage accepts an array of files
    console.log(files);
  };

  const handlePostProduct = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("tokenAdmin");

      const formData = new FormData();
      formData.append("file", imageProfile);
      formData.append("textPrice", priceTxt);
      formData.append("productName", nameProduct);
      formData.append("gender", gender);
      formData.append("typeTxt", type.toUpperCase());


      const response = await axios.post(
        "http://localhost:8080/uploadProduct",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: token,
          },
        }
      );
    } catch (error) {
      console.error(
        "Error uploading image:",
        error.response ? error.response.data : error.message
      );
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("tokenAdmin");
      const formData = new FormData();
  
      // Append productId to the formData
      formData.append("productId", productIda);
      formData.append("description",descriptionProduct);
      formData.append("detail", detailInfo);
      formData.append("sizes", sizes);
      formData.append("colors", color);
      formData.append("care", care);

      images.forEach((element) => {
        console.log(element)
        formData.append("file", element);
      });
  
      const response = await axios.post(
        "http://localhost:8080/uploadPosts",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: token,
          },
        }
      );
      console.log('Uploaded',response.data)
      localStorage.setItem("responseData", JSON.stringify(response.data.user));
      navigate('/detail')
    } catch (error) {
      console.error(
        "Error uploading image:",
        error.response ? error.response.data : error.message
      );
    }
  };
  
  const getAdminPosts = async () => {
    const token = localStorage.getItem("tokenAdmin");
    await axios
      .get("http://localhost:8080/adminPosts", {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        setAdminPosts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDeleteProduct = async (productId) => {
    try {
      console.log("Deleting product with ID:", productId); // Log the product ID
      const token = localStorage.getItem("tokenAdmin");
      await axios.post(
        `http://localhost:8080/deleteProduct`,
        { productId: productId },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      getAdminPosts();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("tokenAdmin");
        if (!token) {
          console.log("Token not found");
          return;
        }
        console.log(token);
        const response = await axios.get("http://localhost:8080/admin", {
          headers: {
            Authorization: token,
          },
        });

        console.log(response);
      } catch (error) {
        console.error("Error fetching data:", error);
        if (error.message === "Request failed with status code 401") {
          navigate("/");
        }
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <ChakraProvider>
        <Flex direction="column" align="center" p="4" >
          <Heading size="lg" textAlign="center" mt="4">
            Admin Panel
          </Heading>
          <Box w="100%" maxW="xl" mt="4">
            <Card>
              <CardHeader>
                <Heading size="md">Products Upload</Heading>
              </CardHeader>
              <CardBody>
                <Stack
                  spacing="4"
                  divider={<StackDivider borderColor="gray.200" />}
                >
                  <Input
                    variant="filled"
                    placeholder="Product Name"
                    value={nameProduct}
                    onChange={(e) => setNameProduct(e.target.value)}
                  />
                  <Input
                    type="file"
                    variant="filled"
                    onChange={handleImageProductChange}
                  />
                  <Input
                    variant="filled"
                    placeholder="Price"
                    value={priceTxt}
                    onChange={(e) => setPriceTxt(e.target.value)}
                  />
                  <Input
                    variant="filled"
                    placeholder="Male/Female"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                  />
                  <Input
                    variant="filled"
                    placeholder="ENTER TYPE"
                    onChange={(e) => setType(e.target.value)}
                  />

                  <Button
                    colorScheme="teal"
                    variant="solid"
                    onClick={handlePostProduct}
                  >
                    Create Product
                  </Button>
                  <Button
                    colorScheme="blue"
                    variant="solid"
                    onClick={getAdminPosts}
                  >
                    Show Products
                  </Button>
                </Stack>
              </CardBody>
            </Card>
          </Box>
          <Flex
            direction={{ base: "column", md: "row" }}
            w="100%"
            maxW="l"
            mt="5"
            p="0"
            flexWrap="wrap"
          >
            {adminPosts.map((product, index) => (
              <Card
                key={index}
                maxW="100%"
                w={{ base: "100%", md: "25%", lg: "25%" }}
                mt={5}
              >
                <CardBody>
                  <Image
                    src={`http://localhost:8080/uploads/${product.productImg}`}
                    alt={product.productNameTxt}
                    borderRadius="lg"
                  />
                  <Stack mt="4" spacing="2">
                    <Heading size="md">{product.productNameTxt}</Heading>
                    <Text>{product.descriptionTxt}</Text>
                    <Text color="black.200" fontSize="2xl">
                      ${product.priceTxt}
                    </Text>
                  </Stack>
                </CardBody>
                <Divider />
                <CardFooter>
                  <ButtonGroup>
                    <Button
                      colorScheme="red"
                      variant="solid"
                      onClick={() => handleDeleteProduct(product.id)}
                    >
                      Delete
                    </Button>

                    <Button
                      ref={btnRef}
                      colorScheme="teal"
                      onClick={() => {
                        console.log("Product ID:", setProductId(product.id));
                        onOpen();
                      }}
                    >
                      Add more information
                    </Button>

                    <Drawer
                      isOpen={isOpen}
                      placement="rog"
                      onClose={onClose}
                      finalFocusRef={btnRef}
                      overlayOpacity={5}
                    >
                      <DrawerOverlay
                        sx={{
                          bg: "rgba(0, 0, 0, 0.1)", // Adjust the opacity value as needed
                        }}
                      />
                      <DrawerContent>
                        <DrawerCloseButton />
                        <DrawerHeader>Add more information or edit the information </DrawerHeader>

                        <DrawerBody>
                          <Stack
                            spacing="4"
                            divider={<StackDivider borderColor="gray.200" />}
                          >
                            <Input
                              variant="filled"
                              placeholder="Description information"
                              onChange={(e)=>{
                                setDescriptionProduct(e.target.value)
                              }}
                            />
                            <Input
                              placeholder="Detail information"
                              variant="filled"
                              onChange={(e)=>{
                                setDetailInfo(e.target.value)
                              }}
                            />
                            <Input variant="filled" placeholder="Sizes"  
                            
                            onChange={(e)=>{
                              setSizes(e.target.value)
                            }}/>
                            <Input
                              variant="filled"
                              placeholder="Colors"
                              value={color}
                              onChange={(e)=>{
                                setColor(e.target.value)
                              }}
                              
                            />

                            <Input
                              variant="filled"
                              placeholder="Care"
                              value={care}
                             onChange={(e)=>{
                              setCare(e.target.value)
 
                             }}
                            />
                            <form
                              action="http://localhost:8080/uploadPosts"
                              method="post"
                              encType="multipart/form-data"
                            >
                              <div className="input-buton-popup">
                                <input
                                  type="file"
                                  name="file"
                                  accept="image/*"
                                  multiple
                                  onChange={handleImageChange}
                                />

                              </div>
                            </form>
                            <Button
                              colorScheme="teal"
                              variant="solid"
                              onClick={handlePostProduct}
                            >
                              Add information to the product
                            </Button>
                          </Stack>
                        </DrawerBody>

                        <DrawerFooter>
                          <Button
                            variant="outline"
                            colorScheme="red"
                            mr={3}
                            onClick={onClose}
                          >
                            Cancel
                          </Button>
                          <Button colorScheme="blue" onClick={handleSubmit}>Save</Button>
                        </DrawerFooter>
                      </DrawerContent>
                    </Drawer>
                  </ButtonGroup>
                </CardFooter>
              </Card>
            ))}
          </Flex>
        </Flex>
      </ChakraProvider>
    </div>
  );
}

export default Admin;
