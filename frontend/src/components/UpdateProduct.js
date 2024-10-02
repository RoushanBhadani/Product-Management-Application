import React, { useEffect, useState } from 'react';
import {useParams , useNavigate} from 'react-router-dom';

const UpdateProduct = () => {
    const [name,setName] = useState('');
    const [price,setPrice] = useState('');
    const [category,setCategory] = useState('');
    const [brand,setBrand] = useState('');
    const params = useParams();
    const navigate = useNavigate();

    useEffect(()=>{
        // console.log(params)
        getProductDetails()
    },[])
    
    const getProductDetails = async ()=>{
        let result = await fetch(`http://localhost:5000/product/${params.id}`,{
            headers:{
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = await result.json();
        setName(result.name)
        setPrice(result.price)
        setCategory(result.category)
        setBrand(result.brand)
    }

    const updateProduct = async ()=>{
        // console.log(name,price,category,brand)
        let result = await fetch(`http://localhost:5000/product/${params.id}`,{
            method: 'Put',
            body: JSON.stringify({name,price,category,brand}),
            headers: {
                'Content-Type': 'application/json',
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = await result.json();
        console.log(result);
        navigate('/');
    }
    
    return (
        <div className='addproduct-container'>
            <h1>Update Product</h1>
            <input type='text' onChange={(e)=>{setName(e.target.value)}} value={name} placeholder='Enter product name' /> 
            <input type='text' onChange={(e)=>{setPrice(e.target.value)}} value={price} placeholder='Enter product price' />
            <input type='text' onChange={(e)=>{setCategory(e.target.value)}} value={category} placeholder='Enter product category' />
            <input type='text' onChange={(e)=>{setBrand(e.target.value)}} value={brand} placeholder='Enter product brand' />
            <button onClick={updateProduct}>Update Product</button>
        </div>
    )
}

export default UpdateProduct;