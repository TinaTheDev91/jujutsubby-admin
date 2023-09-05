import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Spinner from "./Spinner";
import { ReactSortable } from "react-sortablejs";

export default function ProductForm({
    _id,
    title: currentTitle,
    description: currentDescription,
    price: currentPrice,
    images:currentImages,
    category:assignedCategory,
    }) {
    const [title,setTitle] = useState(currentTitle || '');
    const [description,setDescription] = useState(currentDescription || '');
    const [category,setCategory] = useState(assignedCategory || '');
    const [price,setPrice] = useState(currentPrice || '');
    const [images,setImages] = useState(currentImages || []);
    const [goToProducts,setGoToProducts] = useState(false);
    const [isUploading,setIsUploading] = useState(false);
    const [categories,setCategories] = useState([]);
    const router = useRouter();
    useEffect(() => {
        axios.get('/api/categories').then(result => {
            setCategories(result.data);
        })
    }, []);
    // console.log({_id});
    
    async function saveProduct(ev) {
        ev.preventDefault();
        const data = {title,description,price,images,category};
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
    async function uploadImages(ev) {
        const files = ev.target?.files;
        if (files?.length > 0) {
            setIsUploading(true);
            const data = new FormData();
            for (const file of files) {
                data.append('file', file);
            }
            const res = await axios.post('/api/upload', data);
            setImages(oldImages => {
                return [...oldImages, ...res.data.links];
            });
            setIsUploading(false);
        }
    }
    function updateImagesOrder(images) {
        setImages(images);
    }
    return (
        <form onSubmit={saveProduct}>
        
        <label>Product Name</label>
        <input 
            type ="text" 
            placeholder="Product Name" 
            value={title} 
            onChange={ev => setTitle(ev.target.value)}/>

        <label>Category</label>
        <select value={category} 
                onChange={ev => setCategory(ev.target.value)}>
            <option value="">Uncategorized</option>
            {categories.length > 0 && categories.map(c => (
            <option value={c._id}>{c.name}</option>
            ))}
        </select>

        <label>Photos</label>

        <div className="mb-2 flex flex-wrap gap-1">
            <ReactSortable 
                list={images} 
                className="flex flex-wrap gap-1"
                setList={updateImagesOrder}>
                {!!images?.length && images.map(link => (
                    <div key={link} className="h-24">
                        <img src={link} alt="" className="rounded-lg"/>
                    </div>
                ))}
            </ReactSortable>
            <label className="w-24 b-24 cursor-pointer text-center flex items-center justify-center gap-1 text-sm text-gray-500 rounded-lg bg-gray-200">
            <svg xmlns="http://www.w3.org/2000/svg" 
                x="0px" y="0px" 
                width="100" height="100" 
                viewBox="0 0 64 64"
                className="w-6 h-6">
                <linearGradient id="cSoj8~x1D~xBMV404HPyTa_43962_gr1" x1="32" x2="32" y1="8" y2="56.51" gradientUnits="userSpaceOnUse" spreadMethod="reflect"><stop offset="0" stop-color="#1a6dff"></stop><stop offset="1" stop-color="#c822ff"></stop></linearGradient><path fill="url(#cSoj8~x1D~xBMV404HPyTa_43962_gr1)" d="M38,55c-2.206,0-4-1.794-4-4V37h4.018l-5.21-7.58c-0.363-0.535-1.252-0.535-1.615,0 l-5.199,7.647L30,37v14c0,2.206-1.794,4-4,4s-4-1.794-4-4v-4h-9C7.486,47,3,42.514,3,37c0-5.043,3.752-9.226,8.611-9.904 C11.205,25.773,11,24.4,11,23c0-7.72,6.28-14,14-14c5.831,0,10.993,3.616,13.051,8.965C39.763,16.688,41.826,16,44,16 c5.514,0,10,4.486,10,10c0,1.072-0.17,2.119-0.506,3.127C57.744,29.844,61,33.56,61,38c0,4.963-4.037,9-9,9H42v4 C42,53.206,40.206,55,38,55z M36,39v12c0,1.103,0.897,2,2,2s2-0.897,2-2v-6h12c3.859,0,7-3.141,7-7c0-3.834-3.12-6.973-6.955-6.997 l-1.604-0.011l0.716-1.436C51.716,28.435,52,27.237,52,26c0-4.411-3.589-8-8-8c-2.168,0-4.199,0.857-5.721,2.414l-1.236,1.265 l-0.446-1.712C35.22,14.688,30.451,11,25,11c-6.617,0-12,5.383-12,12c0,1.596,0.311,3.148,0.923,4.614L14.501,29H13 c-4.411,0-8,3.589-8,8s3.589,8,8,8h11v6c0,1.103,0.897,2,2,2s2-0.897,2-2V39h-2.018c-0.739,0-1.411-0.402-1.755-1.051 c-0.338-0.639-0.296-1.407,0.111-2.006l5.199-7.648C30.09,27.484,31.01,27,32,27s1.91,0.484,2.462,1.295l5.199,7.647 c0.407,0.6,0.449,1.368,0.111,2.007C39.429,38.598,38.757,39,38.018,39H36z"></path><linearGradient id="cSoj8~x1D~xBMV404HPyTb_43962_gr2" x1="20" x2="20" y1="8" y2="56.51" gradientUnits="userSpaceOnUse" spreadMethod="reflect"><stop offset="0" stop-color="#1a6dff"></stop><stop offset="1" stop-color="#c822ff"></stop></linearGradient><path fill="url(#cSoj8~x1D~xBMV404HPyTb_43962_gr2)" d="M17,23h-2c0-5.514,4.486-10,10-10v2C20.589,15,17,18.589,17,23z"></path><linearGradient id="cSoj8~x1D~xBMV404HPyTc_43962_gr3" x1="22" x2="22" y1="8" y2="56.51" gradientUnits="userSpaceOnUse" spreadMethod="reflect"><stop offset="0" stop-color="#1a6dff"></stop><stop offset="1" stop-color="#c822ff"></stop></linearGradient><path fill="url(#cSoj8~x1D~xBMV404HPyTc_43962_gr3)" d="M21,23h-2c0-3.309,2.691-6,6-6v2C22.794,19,21,20.794,21,23z"></path><linearGradient id="cSoj8~x1D~xBMV404HPyTd_43962_gr4" x1="52" x2="52" y1="8" y2="56.51" gradientUnits="userSpaceOnUse" spreadMethod="reflect"><stop offset="0" stop-color="#1a6dff"></stop><stop offset="1" stop-color="#c822ff"></stop></linearGradient><path fill="url(#cSoj8~x1D~xBMV404HPyTd_43962_gr4)" d="M52,43c-2.757,0-5-2.243-5-5s2.243-5,5-5s5,2.243,5,5S54.757,43,52,43z M52,35 c-1.654,0-3,1.346-3,3s1.346,3,3,3s3-1.346,3-3S53.654,35,52,35z"></path><linearGradient id="cSoj8~x1D~xBMV404HPyTe_43962_gr5" x1="47" x2="47" y1="8" y2="56.51" gradientUnits="userSpaceOnUse" spreadMethod="reflect"><stop offset="0" stop-color="#1a6dff"></stop><stop offset="1" stop-color="#c822ff"></stop></linearGradient><path fill="url(#cSoj8~x1D~xBMV404HPyTe_43962_gr5)" d="M50,26h-2c0-2.206-1.794-4-4-4v-2C47.309,20,50,22.691,50,26z"></path><linearGradient id="cSoj8~x1D~xBMV404HPyTf_43962_gr6" x1="10" x2="10" y1="30.625" y2="43.635" gradientUnits="userSpaceOnUse" spreadMethod="reflect"><stop offset="0" stop-color="#6dc7ff"></stop><stop offset="1" stop-color="#e6abff"></stop></linearGradient><path fill="url(#cSoj8~x1D~xBMV404HPyTf_43962_gr6)" d="M13,43c-3.314,0-6-2.686-6-6s2.686-6,6-6V43z"></path>
            </svg>
            <div>
                Upload
            </div>
            <input type="file" onChange={uploadImages} className="hidden"></input>
            </label>          
           
        </div>

        {/* loading animation */}
            {isUploading && (
                <div className="h-15 p-1 flex items-center">
                    <Spinner />
                </div>
            )}

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