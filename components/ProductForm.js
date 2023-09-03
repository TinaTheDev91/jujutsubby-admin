import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

export default function ProductForm({
    _id,
    title: currentTitle,
    description: currentDescription,
    price: currentPrice
    }) {
    const [title,setTitle] = useState(currentTitle || '');
    const [description,setDescription] = useState(currentDescription || '');
    const [price,setPrice] = useState(currentPrice || '');
    const [goToProducts,setGoToProducts] = useState(false);
    const router = useRouter();
    // console.log({_id});
    
    async function saveProduct(ev) {
        ev.preventDefault();
        const data = {title,description,price};
        if (_id) {
            //update
            await axios.put('/api/products', {...data,_id});
        } else {
            // create
            await axios.post('/api/products', data);
        }
        setGoToProducts(true);

        
    }
    // console.log(currentTitle)

    if (goToProducts) {
        router.push('/products');
    }
    return (
        <form onSubmit={saveProduct}>
        
        <label>Product Name</label>
        <input 
            type ="text" 
            placeholder="Product Name" 
            value={title} 
            onChange={ev => setTitle(ev.target.value)}/>

        <label>Description</label>
        <textarea
            placeholder="Description"
            value={description}
            onChange={ev => setDescription(ev.target.value)}/>
        
        <label>Price (in USD)</label>
        <input 
            type="number" 
            placeholder="Price"
            value={price}
            onChange={ev=> setPrice(ev.target.value)}/>

        <button
        type="submit" className="btn-primary">Save</button>

        </form>
    )      
    }