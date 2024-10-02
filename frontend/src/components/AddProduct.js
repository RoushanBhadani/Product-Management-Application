import React, { useState } from 'react'

const AddProduct = () => {
    const [name,setName] = useState('');
    const [price,setPrice] = useState('');
    const [category,setCategory] = useState('');
    const [brand,setBrand] = useState('');
    const [error,setError] = useState(false);

    const addProduct = async () => {


        if(!name || !price || !category || !brand){
            setError(true);
            return false;
        }


        // console.log(name,price,category,brand)
        const userId = JSON.parse(localStorage.getItem('user'))._id;
        // console.log(userId)
        let result =await fetch("http://localhost:5000/add-product",{
            method:"POST",
            body:JSON.stringify({name, price, category, brand, userId}),
            headers:{
                "Content-Type":"application/json",
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });

        result = await result.json();
        // console.log(result);
        if(result){
            alert("Product Added Successfully");
            setName('');
            setPrice('');
            setCategory('');
            setBrand('');
            setError(false);
        }
    }
    
    return (
        <div className='addproduct-container'>
            <h1>Add Product</h1>
            <input type='text' onChange={(e)=>{setName(e.target.value)}} value={name} placeholder='Enter product name' /> 
            {error && !name && <span className='invalid-input'>Enter valid name</span>}
            <input type='text' onChange={(e)=>{setPrice(e.target.value)}} value={price} placeholder='Enter product price' />
            {error && !price && <span className='invalid-input'>Enter valid price</span>}
            <input type='text' onChange={(e)=>{setCategory(e.target.value)}} value={category} placeholder='Enter product category' />
            {error && !category && <span className='invalid-input'>Enter valid category</span>}
            <input type='text' onChange={(e)=>{setBrand(e.target.value)}} value={brand} placeholder='Enter product brand' />
            {error && !brand && <span className='invalid-input'>Enter valid brand</span>}
            <button onClick={addProduct}>Add Product</button>
        </div>
    )
}

export default AddProduct;