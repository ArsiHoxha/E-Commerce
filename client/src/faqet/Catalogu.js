import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import 'bootstrap/dist/css/bootstrap.min.css';
import ThemeProvider from 'react-bootstrap/ThemeProvider';
import Card from 'react-bootstrap/Card';
import './Catalogu.css'
import { HiShoppingBag } from "react-icons/hi2";

function Catalogu() {
  const [adminPosts, setAdminPosts] = useState([]);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("");

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }
  
  const getAdminPosts = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.get("http://localhost:8080/adminPosts", {
        headers: {
          Authorization: token,
        },
      });
      const posts = res.data;
      
      // Categorize posts by typeTxt
      const categorizedPosts = posts.reduce((acc, post) => {
        const type = post.typeTxt
        if (!acc[type]) {
          acc[type] = [];
        }
        acc[type].push(post);
        return acc;
      }, {});
      
      console.log(categorizedPosts);
      setAdminPosts(categorizedPosts);
    } catch (err) {
      console.log(err);
    }
  };
  const nextPage = async (product) => {
    console.log(product.id)
    try{
      const res = await axios.post("http://localhost:8080/detailedPageStore",{productId: product.id})
      console.log(res.data)
      localStorage.setItem("responseDataStore", JSON.stringify(res.data));
      navigate('/detailStore')

    }catch (err) {
      console.log('There was an error going to detailed page of product',err)
    }
  }
    useEffect(() => {
    getAdminPosts();
  }, []);

  const handleSearch = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem("token");

    try {
      const res = await axios.get(`http://localhost:8080/searchPosts?query=${searchTerm}`, {
        headers: { Authorization: token },
      });
      const posts = res.data;

      // Categorize posts by typeTxt
      const categorizedPosts = posts.reduce((acc, post) => {
        const type = post.typeTxt;
        if (!acc[type]) acc[type] = [];
        acc[type].push(post);
        return acc;
      }, {});

      setAdminPosts(categorizedPosts);
      navigate(`/search-results?query=${encodeURIComponent(searchTerm)}`);

    } catch (err) {
      console.error("Error searching posts:", err);
    }
  };
  

  const addToCard = async (productId) => {
    try {
      console.log('Product added to card:', productId);
  
      const res = await axios.post("http://localhost:8080/detailedPageStore", { productId: productId });
      console.log('Response data:', res.data);
  
      // Retrieve existing data from local storage
      let cardData = localStorage.getItem("cardData");
  
      // Parse the data or initialize as an empty array if parsing fails
      cardData = cardData ? JSON.parse(cardData) : [];
  
      // Check if cardData is actually an array
      if (!Array.isArray(cardData)) {
        cardData = [];
      }
  
      // Add the new product data to the array
      cardData.push(res.data);
      console.log('Updated card data array:', cardData);
  
      // Store the updated array back in local storage
      localStorage.setItem("cardData", JSON.stringify(cardData));
    } catch (error) {
      console.error('Error adding product to card:', error);
    }
  };
    return (
    <div  data-bs-theme="white">
      <ThemeProvider>
          <Navbar expand="lg" className="bg-body-tertiary"     
>
      <Container fluid>
        <Navbar.Brand href="#" style={{fontSize:'2.5rem',fontWeight:'bold'}}>Fashion</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px',fontSize:'1.2rem'}}
            navbarScroll
          >
            <Nav.Link href="/store">Home</Nav.Link>
            <Nav.Link href="/man">Man</Nav.Link>
            <Nav.Link href="/female">Woman</Nav.Link>
            <Nav.Link href="/kids">Kids</Nav.Link>
            
            <Nav.Link href="/cartPage"><HiShoppingBag size={'3vh'} style={{justifyContent:'center',alignItems:'center',marginTop:'3px'}} />
            </Nav.Link>

           
          </Nav>
          <Form className="d-flex" onSubmit={handleSearch}>
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
            <Button variant="outline-success">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </ThemeProvider>

    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-black">Fashion</h2>

        <div className="grid-container w-full p-4">
  {Object.keys(adminPosts).map((type) => (
    <div key={type} className="mb-8">
      <h2 className="typi text-black">{type}</h2>
      <div className="grid gap-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {adminPosts[type].map((product) => (
          <div key={product.id} className="grid-item border border-gray-300 rounded-lg overflow-hidden">
            <img
              src={`http://localhost:8080/uploads/${product.productImg}`}
              alt={product.imageAlt}
              className="w-full h-auto"
            />
            <div className="text-content bg-white p-4">
              <h3 className="product-name text-black">
                <a href={product.href} className="text-black hover:underline">
                  {product.productNameTxt}
                </a>
              </h3>
              <p className="color text-black">{product.color}</p>
              <p className="price text-black">${product.priceTxt}</p>
              <div className="buyButton text-blue-500 cursor-pointer mt-2" onClick={() => nextPage(product)}>Buy</div>
              <div className="add-toCard text-blue-500 cursor-pointer mt-2" onClick={(e) => addToCard(product.id)}>Add to Card</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  ))}
  
</div>


      </div>

    </div>
</div>
  )

}

export default Catalogu;

