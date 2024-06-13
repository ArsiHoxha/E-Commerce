import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Type() {
    const [data, setData] = useState([]);
    const navigate = useNavigate();

    const sendType = async () => {
        try {
            const type = localStorage.getItem('goToCategory');
            console.log(type);
            const response = await axios.post('http://localhost:8080/postType', { type });
            console.log("Produkti 1 ", response.data);
            setData(response.data);
        } catch (error) {
            console.log('There was an error sending the type', error);
        }
    };

    const nextPage = async (product) => {
        console.log(product.id);
        try {
            const res = await axios.post("http://localhost:8080/detailedPageStore", { productId: product.id });
            localStorage.setItem("responseDataStore", JSON.stringify(res.data));
            navigate('/detailStore');
        } catch (err) {
            console.log('There was an error going to detailed page of product', err);
        }
    };

    useEffect(() => {
        sendType();
    }, []); // Empty dependency array means this effect runs once after the initial render

    const addToCard = async (productId) => {
        try {
            console.log('Product added to card:', productId);
            const res = await axios.post("http://localhost:8080/detailedPageStore", { productId });
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
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
   {data.length > 0 && (
                <h2 className="text-2xl font-bold tracking-tight text-black">{data[0].typeTxt}</h2>
            )}
            <div className="grid-container">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

                {data.map((product) => (
                    <div key={product.id} className="grid-item" style={{border: '1px solid gray', borderRadius: '0px'}}>
                        <img
                            src={`http://localhost:8080/uploads/${product.productImg}`}
                            alt={product.imageAlt}
                            style={{width: '500px', height: '500px'}}
                        />
                        <div className="text-content bg-white">
                            <h3 className="product-name" style={{color: 'black'}}>
                                <a href={product.href} className="product-name" style={{color: 'black'}}>
                                    {product.productNameTxt}
                                </a>
                            </h3>
                            <p className="color" style={{color: 'black'}}>{product.color}</p>
                            <p className="price" style={{color: 'black'}}>${product.priceTxt}</p>
                            <div className="buyButton" onClick={() => nextPage(product)}>Buy</div>
                            <div className="add-toCard" onClick={() => addToCard(product.id)}>Add to Card</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
        </div>
    );
}

export default Type;
