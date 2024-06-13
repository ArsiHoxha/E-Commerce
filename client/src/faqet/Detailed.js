import React, { useEffect, useState } from 'react';
import './Detail.css'; // Import CSS file
import Zoom from 'react-medium-image-zoom'
import { StarIcon } from '@heroicons/react/20/solid'
import { RadioGroup } from '@headlessui/react'

function Detail() {
  const [images, setImages] = useState([]);
 const [data,setData] = useState([])
  useEffect(() => {

    const responseData = localStorage.getItem("responseData");
    console.log('Data',responseData)

    if (responseData) {
      const parsedData = JSON.parse(responseData);
      console.log("Response Data from Local Storage:", parsedData);

        setData(parsedData);
      if (parsedData && parsedData.images) {
        setImages(parsedData.images);
      }
      
    }
  }, []);
  const words = data && data.detail ? data.detail.split(',') : [];
  const sizet = data && data.sizes ? data.sizes.split(',') : [];


  const product = {
    name: 'Basic Tee 6-Pack',
    price: '$192',
    href: '#',
    breadcrumbs: [
      { id: 1, name: 'Men', href: '#' },
      { id: 2, name: 'Clothing', href: '#' },
    ],
    images: [
      {
        src: 'https://cdn.britannica.com/94/193794-050-0FB7060D/Adidas-logo.jpg',
        alt: 'Two each of gray, white, and black shirts laying flat.',
      },
      {
        src: 'https://i.pinimg.com/236x/e6/6b/c6/e66bc656c9277131fdc56d97f973d9fd.jpg',
        alt: 'Model wearing plain black basic tee.',
      },
      {
        src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZH4nfz-Px3T7ozrMkj9n4o0r5pikxyJlDqAiin2VB_g&s',
        alt: 'Model wearing plain gray basic tee.',
      },
      {
        src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-featured-product-shot.jpg',
        alt: 'Model wearing plain white basic tee.',
      },
    ],
    colors: [
      { name: 'White', class: 'bg-white', selectedClass: 'ring-gray-400' },
      { name: 'Gray', class: 'bg-gray-200', selectedClass: 'ring-gray-400' },
      { name: 'Black', class: 'bg-gray-900', selectedClass: 'ring-gray-900' },
    ],
    sizes: [
      { name: 'XXS', inStock: false },
      { name: 'XS', inStock: true },
      { name: 'S', inStock: true },
      { name: 'M', inStock: true },
      { name: 'L', inStock: true },
      { name: 'XL', inStock: true },
      { name: '2XL', inStock: true },
      { name: '3XL', inStock: true },
    ],
    description:
      'The Basic Tee 6-Pack allows you to fully express your vibrant personality with three grayscale options. Feeling adventurous? Put on a heather gray tee. Want to be a trendsetter? Try our exclusive colorway: "Black". Need to add an extra pop of color to your outfit? Our white tee has you covered.',
    highlights: [
      'Hand cut and sewn locally',
      'Dyed with our proprietary colors',
      'Pre-washed & pre-shrunk',
      'Ultra-soft 100% cotton',
    ],
    details:
      'The 6-Pack includes two black, two white, and two heather gray Basic Tees. Sign up for our subscription service and be the first to get new, exciting colors, like our upcoming "Charcoal Gray" limited release.',
  }
  const reviews = { href: '#', average: 4, totalCount: 117 }
  
  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }
  
console.log(data.priceTxt)
const [selectedColor, setSelectedColor] = useState(product.colors[0])
const [selectedSize, setSelectedSize] = useState(product.sizes[2])

  return (
      <div className="bg-dark">
        <div className="pt-6">
          <nav aria-label="Breadcrumb">
            <ol role="list" className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
              {product.breadcrumbs.map((breadcrumb) => (
                <li key={breadcrumb.id}>
                  <div className="flex items-center">
                    <a href={breadcrumb.href} className="mr-2 text-sm font-medium text-white">
                      {breadcrumb.name}
                    </a>
                    <svg
                      width={16}
                      height={20}
                      viewBox="0 0 16 20"
                      fill="currentColor"
                      aria-hidden="true"
                      className="h-5 w-4 text-white"
                    >
                      <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                    </svg>
                  </div>
                </li>
              ))}
              <li className="text-sm">
                <a href={product.href} aria-current="page" className="font-medium text-white hover:text-white">
                  {product.name}
                </a>
              </li>
            </ol>
          </nav>
  
          {/* Image gallery */}
          <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
      {/* First image */}
      <div className="aspect-h-4 aspect-w-3 overflow-hidden rounded-lg lg:block">
        {data.images && data.images[0] ? (
          <img
            src={`http://localhost:8080/uploads/${data.images[0].filename}`}
            alt={data.images[0].alt}
            className="h-full w-full object-cover object-center"
          />
        ) : (
          <img
            src="https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/9787c8203356470a82703f5c02056b43_9366/Samba_OG_Shoes_Grey_IG6173_01_standard.jpg" // Add your default image source
            alt="Default Image"
            className="h-full w-full object-cover object-center"
          />
        )}
      </div>

      {/* Second and third images */}
      <div className="lg:grid lg:grid-cols-1 lg:gap-y-8">
        {data.images && data.images[1] && (
          <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
            <img
              src={`http://localhost:8080/uploads/${data.images[1].filename}`}
              alt={data.images[1].alt}
              className="h-full w-full object-cover object-center"
            />
          </div>
        )}

        {data.images && data.images[2] && (
          <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
            <img
              src={`http://localhost:8080/uploads/${data.images[2].filename}`}
              alt={data.images[2].alt}
              className="h-full w-full object-cover object-center"
            />
          </div>
        )}
      </div>

      {/* Fourth image */}
      <div className="aspect-h-5 aspect-w-4 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg">
        {data.images && data.images[3] ? (
          <img
            src={`http://localhost:8080/uploads/${data.images[3].filename}`}
            alt={data.images[3].alt}
            className="h-full w-full object-cover object-center"
          />
        ) : (
          <img
            src="https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/9787c8203356470a82703f5c02056b43_9366/Samba_OG_Shoes_Grey_IG6173_01_standard.jpg" // Add your default image source
            alt="Default Image"
            className="h-full w-full object-cover object-center"
          />
        )}
      </div>
    </div>

  
          {/* Product info */}
          <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
            <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
              <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">{data.productNameTxt}</h1>
            </div>
  
            {/* Options */}
            <div className="mt-4 lg:row-span-3 lg:mt-0">
              <h2 className="sr-only">Product information</h2>
              <p className="text-3xl tracking-tight text-white">${data.priceTxt}</p>
  
              {/* Reviews */}
              <div className="mt-6">
                <h3 className="sr-only">Reviews</h3>
                <div className="flex items-center">
                  <div className="flex items-center">
                    {[0, 1, 2, 3, 4].map((rating) => (
                      <StarIcon
                        key={rating}
                        className={classNames(
                          reviews.average > rating ? 'text-white' : 'text-white',
                          'h-5 w-5 flex-shrink-0'
                        )}
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                  <p className="sr-only">{reviews.average} out of 5 stars</p>
                  <a href={reviews.href} className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500">
                    {reviews.totalCount} reviews
                  </a>
                </div>
              </div>
  
              <form className="mt-10">
                {/* Colors */}
                <div>
                  <h3 className="text-sm font-medium text-white">Color</h3>
  
                  <RadioGroup value={selectedColor} onChange={setSelectedColor} className="mt-4">
                    <RadioGroup.Label className="sr-only">Choose a color</RadioGroup.Label>
                    <div className="flex items-center space-x-3">
                      {product.colors.map((color) => (
                        <RadioGroup.Option
                          key={color.name}
                          value={color}
                          className={({ active, checked }) =>
                            classNames(
                              color.selectedClass,
                              active && checked ? 'ring ring-offset-1' : '',
                              !active && checked ? 'ring-2' : '',
                              'relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none'
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
                              'h-8 w-8 rounded-full border border-black border-opacity-10'
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
                    <h3 className="text-sm font-medium text-white">Size</h3>
                    <a href="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                      Size guide
                    </a>
                  </div>
  
                  <RadioGroup value={selectedSize} onChange={setSelectedSize} className="mt-4">
                    <RadioGroup.Label className="sr-only">Choose a size</RadioGroup.Label>
                    <div className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4">
                      {sizet.map((size) => (
                        <RadioGroup.Option
                          key={size.name}
                          value={size}
                          className={({ active }) =>
                            classNames(
                              size
                                ? 'cursor-pointer bg-black text-white shadow-sm'
                                : 'cursor-not-allowed bg-gray-50 text-white',
                              active ? 'ring-2 ring-indigo-500' : '',
                              'group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6'
                            )
                          }
                        >
                          {({ active, checked }) => (
                            <>
                              <RadioGroup.Label as="span">{size}</RadioGroup.Label>
                              
                                <span
                                  className={classNames(
                                    active ? 'border' : 'border-2',
                                    checked ? 'border-indigo-500' : 'border-transparent',
                                    'pointer-events-none absolute -inset-px rounded-md'
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
  
              </form>
            </div>
  
            <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
              {/* Description and details */}
              <div>
                <h3 className="sr-only">Description</h3>
  
                <div className="space-y-6">
                  <p className="text-base text-white">{data.descriptionTxt}</p>
                </div>
              </div>
  
              <div className="mt-10">
                <h3 className="text-sm font-medium text-white">Highlights</h3>
  
                <div className="mt-4">
                        {words.length > 0 ? (
                          <ul class="max-w-md space-y-1 text-white list-disc list-inside dark:text-white">
          {/* Map through the words array and render each word */}
          {words.map((word, index) => (
            <li key={index} className="text-white">
              <span className="text-white">{word.trim()}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p>No words available</p>
      )}
    </div>

              </div>
  
              <div className="mt-10">
                <h2 className="text-sm font-medium text-white">Details</h2>
  
                <div className="mt-4 space-y-6">
                  <p className="text-sm text-white">{data.care}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    
  
  );
}

export default Detail;
