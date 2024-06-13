import React, { useEffect, useState } from "react";
import "./Detail.css"; // Import CSS file
import Zoom from "react-medium-image-zoom";
import { StarIcon } from "@heroicons/react/20/solid";
import { RadioGroup } from "@headlessui/react";
import { Rating } from "@material-tailwind/react";

import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import axios from "axios";
import ReactStars from "react-rating-stars-component";
import ModalPopUP from "./compontet/chakra/ModalPopUP";
import { ChakraProvider, Button } from "@chakra-ui/react";

function DetailedStore() {
  const [images, setImages] = useState([]);
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = React.useState(false);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const GoToCategory = () => {
    console.log("Category clicked!");
    localStorage.setItem("goToCategory", data.typeTxt);
  };

  const slideImages =
    data.images && data.images.length > 0
      ? [
          {
            url:
              data.images[0] && data.images[0].filename
                ? `http://localhost:8080/uploads/${data.images[0].filename}`
                : "",
          },
          {
            url:
              data.images[1] && data.images[1].filename
                ? `http://localhost:8080/uploads/${data.images[1].filename}`
                : "",
          },
          {
            url:
              data.images[2] && data.images[2].filename
                ? `http://localhost:8080/uploads/${data.images[3].filename}`
                : "",
          },
        ]
      : [];
  useEffect(() => {
    const responseData = localStorage.getItem("responseDataStore");

    if (responseData) {
      const parsedData = JSON.parse(responseData);
      console.log("Response Data from Local Storage:", parsedData);

      setData(parsedData);
      if (parsedData && parsedData.images) {
        setImages(parsedData.images);
      }
    }
  }, []);


  const words = data && data.detail ? data.detail.split(",") : [];
  const sizet = data && data.sizes ? data.sizes.split(",") : [];

  const product = {
    name: data.productNameTxt,
    price: "$192",
    href: "#",
    breadcrumbs: [
      { id: 1, name: data.gender, href: "/MoreCategories" },
      { id: 2, name: data.typeTxt, href: "/MoreCategories" },
    ],

    colors: [
      { name: "White", class: "bg-white", selectedClass: "ring-gray-400" },
      { name: "Gray", class: "bg-gray-200", selectedClass: "ring-gray-400" },
      { name: "Black", class: "bg-gray-900", selectedClass: "ring-gray-900" },
    ],
    sizes: [
      { name: "XXS", inStock: false },
      { name: "XS", inStock: true },
      { name: "S", inStock: true },
      { name: "M", inStock: true },
      { name: "L", inStock: true },
      { name: "XL", inStock: true },
      { name: "2XL", inStock: true },
      { name: "3XL", inStock: true },
    ],
    description:
      'The Basic Tee 6-Pack allows you to fully express your vibrant personality with three grayscale options. Feeling adventurous? Put on a heather gray tee. Want to be a trendsetter? Try our exclusive colorway: "Black". Need to add an extra pop of color to your outfit? Our white tee has you covered.',
    highlights: [
      "Hand cut and sewn locally",
      "Dyed with our proprietary colors",
      "Pre-washed & pre-shrunk",
      "Ultra-soft 100% cotton",
    ],
    details:
      'The 6-Pack includes two black, two white, and two heather gray Basic Tees. Sign up for our subscription service and be the first to get new, exciting colors, like our upcoming "Charcoal Gray" limited release.',
  };
  const products = [
    {
      id: 1,
      name: "Basic Tee",
      href: "#",
      imageSrc:
        "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
      imageAlt: "Front of men's Basic Tee in black.",
      price: "$35",
      color: "Black",
    },
    {
      id: 1,
      name: "Basic Tee",
      href: "#",
      imageSrc:
        "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
      imageAlt: "Front of men's Basic Tee in black.",
      price: "$35",
      color: "Black",
    },
    {
      id: 1,
      name: "Basic Tee",
      href: "#",
      imageSrc:
        "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
      imageAlt: "Front of men's Basic Tee in black.",
      price: "$35",
      color: "Black",
    },
    {
      id: 1,
      name: "Basic Tee",
      href: "#",
      imageSrc:
        "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
      imageAlt: "Front of men's Basic Tee in black.",
      price: "$35",
      color: "Black",
    },
    // More products...
  ];
  const reviews = { href: "#", average: 4, totalCount: 117 };

  const reviewsA = [
    {
      id: 1,
      name: "John Doe",
      rating: 5,
      comment: "Great product! Highly recommend it.",
    },
    {
      id: 2,
      name: "Jane Smith",
      rating: 4,
      comment: "Good value for the price.",
    },
    {
      id: 3,
      name: "Alice Johnson",
      rating: 3,
      comment: "It’s okay, but I expected more features.",
    },
  ];
  const addReviewForProduct = async (e) => {
    console.log("Add review for product clicked!");
    const token = localStorage.getItem("token");
    console.log(token);
    if (!token) {
      return(
        <>
        <ModalPopUP></ModalPopUP>
        </>
      )
  }else{
    setShowModal(true);

  }

  };
  
  
  const sendReviewForProduct = async (e,review,rating) => {
    e.preventDefault(); // Prevent default form submission behavior if this is an event handler

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        return(
          <ChakraProvider>
          <ModalPopUP  >
          </ModalPopUP>
        </ChakraProvider>
        
        )
      }
  
      console.log('Token:', token);
  
      // Assuming review and rating are state variables in your component
      console.log('Review before appending:', review);
      console.log('Rating before appending:', rating);
  
      // Ensure review and rating are not empty
      if (!review || !rating) {
        return(
          <>
          <ModalPopUP></ModalPopUP>
          </>
        )
        return;
      }
  
      const formData = new FormData();
      formData.append("review", "A");
      formData.append("rating", rating);
  
      // Log the FormData key-value pairs
      for (let [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`);
      }
  
          const response = await axios.post(
        `http://localhost:8080/products`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: token,
          },
        }
      );
      console.log(response);
    } catch (error) {
        console.log("tHERE WAS AN ERROR", error);
        return(
          <>
          <ModalPopUP></ModalPopUP>
          </>
        )

    }
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
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };



    const ratingChanged = (newRating) => {
    setRating(newRating);
  };
  const handleReviewChange = (event) => {
    setReview(event.target.value);
  };

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  console.log(data.priceTxt);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizes[2]);

  return (
    <div className="bg-white">
      <div className="pt-6">
        <nav aria-label="Breadcrumb">
          <ol
            role="list"
            className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8"
          >
            {product.breadcrumbs.map((breadcrumb) => (
              <li key={breadcrumb.id}>
                <div className="flex items-center">
                  <a
                    href={breadcrumb.href}
                    className="mr-2 text-sm font-medium text-gray-900"
                    onClick={GoToCategory}
                  >
                    {breadcrumb.name}
                  </a>
                  <svg
                    width={16}
                    height={20}
                    viewBox="0 0 16 20"
                    fill="currentColor"
                    aria-hidden="true"
                    className="h-5 w-4 text-gray-300"
                  >
                    <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                  </svg>
                </div>
              </li>
            ))}
            <li className="text-sm">
              <a
                href={product.href}
                aria-current="page"
                className="font-medium text-gray-500 hover:text-gray-600"
              >
                {product.name}
              </a>
            </li>
          </ol>
        </nav>

        {/* Image gallery */}
        <Slide>
          {slideImages.map((slideImage, index) => (
            <div key={index} className="image-container">
              {slideImage.url && (
                <div
                  className="backg-DetaileStore"
                  style={{ backgroundImage: `url(${slideImage.url})` }}
                ></div>
              )}
            </div>
          ))}{" "}
        </Slide>

        {/* Product info */}
        <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
          <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              {data.productNameTxt}
            </h1>
          </div>

          {/* Options */}
          <div className="mt-4 lg:row-span-3 lg:mt-0">
            <h2 className="sr-only">Product information</h2>
            <p className="text-3xl tracking-tight text-gray-900">
              ${data.priceTxt}
            </p>

            {/* Reviews */}
            <div className="mt-6">
              <h3 className="sr-only">Reviews</h3>
              <div className="flex items-center">
                <div className="flex items-center">
                  {[0, 1, 2, 3, 4].map((rating) => (
                    <StarIcon
                      key={rating}
                      className={classNames(
                        reviews.average > rating
                          ? "text-gray-900"
                          : "text-gray-200",
                        "h-5 w-5 flex-shrink-0"
                      )}
                      aria-hidden="true"
                    />
                  ))}
                </div>
                <p className="sr-only">{reviews.average} out of 5 stars</p>
                <a
                  href={reviews.href}
                  className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500"
                >
                  {reviews.totalCount} reviews
                </a>
              </div>
            </div>

            <form className="mt-10">
              {/* Colors */}
              <div>
                <h3 className="text-sm font-medium text-gray-900">Color</h3>

                <RadioGroup
                  value={selectedColor}
                  onChange={setSelectedColor}
                  className="mt-4"
                >
                  <RadioGroup.Label className="sr-only">
                    Choose a color
                  </RadioGroup.Label>
                  <div className="flex items-center space-x-3">
                    {product.colors.map((color) => (
                      <RadioGroup.Option
                        key={color.name}
                        value={color}
                        className={({ active, checked }) =>
                          classNames(
                            color.selectedClass,
                            active && checked ? "ring ring-offset-1" : "",
                            !active && checked ? "ring-2" : "",
                            "relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none"
                          )
                        }
                      >
                        <RadioGroup.Label as="span" className="sr-only">
                          {color.name}
                        </RadioGroup.Label>
                        <span
                          aria-hidden="true"
                          className={classNames(
                            color.class,
                            "h-8 w-8 rounded-full border border-black border-opacity-10"
                          )}
                        />
                      </RadioGroup.Option>
                    ))}
                  </div>
                </RadioGroup>
              </div>

              {/* Sizes */}
              <div className="mt-10">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-gray-900">Size</h3>
                  <a
                    href="#"
                    className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    Size guide
                  </a>
                </div>

                <RadioGroup
                  value={selectedSize}
                  onChange={setSelectedSize}
                  className="mt-4"
                >
                  <RadioGroup.Label className="sr-only">
                    Choose a size
                  </RadioGroup.Label>
                  <div className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4">
                    {sizet.map((size) => (
                      <RadioGroup.Option
                        key={size.name}
                        value={size}
                        className={({ active }) =>
                          classNames(
                            size
                              ? "cursor-pointer bg-white text-gray-900 shadow-sm"
                              : "cursor-not-allowed bg-gray-50 text-gray-200",
                            active ? "ring-2 ring-indigo-500" : "",
                            "group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6"
                          )
                        }
                      >
                        {({ active, checked }) => (
                          <>
                            <RadioGroup.Label as="span">
                              {size}
                            </RadioGroup.Label>

                            <span
                              className={classNames(
                                active ? "border" : "border-2",
                                checked
                                  ? "border-indigo-500"
                                  : "border-transparent",
                                "pointer-events-none absolute -inset-px rounded-md"
                              )}
                              aria-hidden="true"
                            />
                          </>
                        )}
                      </RadioGroup.Option>
                    ))}
                  </div>
                </RadioGroup>
              </div>

              <button
                type="submit"
                className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-red-600 px-8 py-3 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Buy Now
              </button>
            </form>
          </div>

          <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
            {/* Description and details */}
            <div>
              <h3 className="sr-only">Description</h3>

              <div className="space-y-6">
                <p className="text-base text-gray-900">{data.descriptionTxt}</p>
              </div>
            </div>

            <div className="mt-10">
              <h3 className="text-sm font-medium text-gray-900">Highlights</h3>

              <div className="mt-4">
                {words.length > 0 ? (
                  <ul class="max-w-md space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400">
                    {/* Map through the words array and render each word */}
                    {words.map((word, index) => (
                      <li key={index} className="text-gray-400">
                        <span className="text-gray-600">{word.trim()}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No words available</p>
                )}
              </div>
            </div>

            <div className="mt-2">
              <h2 className="text-sm font-medium text-gray-900">Details</h2>

              <div className="mt-4 space-y-6">
                <p className="text-sm text-gray-600">{data.care}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white">
        <div className="mx-auto  max-w-2xl px-4 py-6 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            Customers also purchased
          </h2>

          <div className="mt-0 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {products.map((product) => (
              <div key={product.id} className="group relative">
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                  <img
                    src={product.imageSrc}
                    alt={product.imageAlt}
                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                  />
                </div>
                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-sm text-gray-700">
                      <a href={product.href}>
                        <span aria-hidden="true" className="absolute inset-0" />
                        {product.name}
                      </a>
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      {product.color}
                    </p>
                  </div>
                  <p className="text-sm font-medium text-gray-900">
                    {product.price}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className=" p-6 rounded-lg shadow-lg max-w-100% mx-auto my-10">
        <div className="flex w-full justify-around items-center mb-6">
          <h2 className="text-2xl font-bold text-center">Customer Reviews</h2>
          <button
            type="submit"
            className="flex items-center justify-center rounded-md border border-transparent bg-red-600 px-8 py-3 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            onClick={addReviewForProduct}
          >
            Add Review for Product
          </button>
          {showModal ? (
            <>
              <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div
                  className="relative w-full my-6 mx-auto"
                  style={{ maxWidth: "90%" }}
                >
                  <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                    <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                      <h3 className="text-3xl font-semibold">Add a Review</h3>
                      <button
                        className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                        onClick={() => setShowModal(false)}
                      >
                        <span className="bg-transparent text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                          ×
                        </span>
                      </button>
                    </div>
                    <div className="relative p-6 flex-auto">
                      <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                        Please rate this product:
                      </p>
                      <ReactStars
                        count={5}
                        onChange={ratingChanged}
                        size={24}
                        activeColor="#ffd700"
                      />
                      <p className="mt-4">Your Rating: {rating} stars</p>
                      <textarea
                        className="w-full p-2 border border-gray-300 rounded mt-4"
                        rows="4"
                        placeholder="Write your review here..."
                        value={review}
                        onChange={handleReviewChange}
                      />
                    </div>
                    <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                      <button
                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => setShowModal(false)}
                      >
                        Close
                      </button>
                      <button
                        className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={(e) => {
                          sendReviewForProduct(e,review,rating);

                          setShowModal(false);
                        }}
                      >
                        Save Changes
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
            </>
          ) : null}
        </div>
        {reviewsA.map((review) => (
          <div key={review.id} className="bg-white p-4 rounded-lg shadow mb-4">
            <h3 className="text-xl font-semibold">{review.name}</h3>
            <p className="text-yellow-500">
              {"★".repeat(review.rating)}
              {"☆".repeat(5 - review.rating)}
            </p>
            <p className="text-gray-700">{review.comment}</p>
          </div>
        ))}
      </div>

    </div>
  );
}

export default DetailedStore;
