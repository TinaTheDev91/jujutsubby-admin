import Layout from "@/components/Layout";
import { useEffect, useState } from "react";
import axios from "axios";
import { withSwal } from 'react-sweetalert2';

function Categories({swal}) {
    const [editedCategory,setEditedCategory] = useState(null);
    const [name,setName] = useState('');
    const [parentCategory,setParentCategory] = useState('');
    const [categories,setCategories] = useState([]);
    const [properties,setProperties] = useState([]);
    useEffect(() => {
        fetchCategories();
    }, []);

    function fetchCategories() {
        axios.get('/api/categories').then(result => {
            setCategories(result.data);
        })
    }
    async function saveCategory(ev){
        ev.preventDefault();
        const data = {name, parentCategory}
        if(editedCategory) {
            data._id = editedCategory._id;
            await axios.put('/api/categories', data);
            setEditedCategory(null);
        } else {
            await axios.post('/api/categories', data);
        }
        setName('');
        fetchCategories();
    }

    function editCategory(category){
        setEditedCategory(category);
        setName(category.name);
        setParentCategory(category.parent?._id);
    }

    function deleteCategory(category){
        swal.fire({
            title: 'Are you sure?',
            text: `Do you want to delete ${category.name}?`,
            showCancelButton: true,
            cancelButtonText: 'Cancel',
            confirmButtonText: 'Yes, delete!',
            confirmButtonColor: '#d55',
            reverseButtons: true,
        }).then(async result => {
            // console.log(({result}));
            if (result.isConfirmed) {
                const {_id} = category;
                await axios.delete('/api/categories?_id='+_id);
                fetchCategories();
            }
        })
    }
    function addProperty() {
        setProperties(prev => {
            return [...prev, {name:'',values:''}]
        })
    }

    function handlePropertyNameChange(index,property,newName) {
        setProperties(prev => {
            const properties = [...prev];
            properties[index].name = newName;
            return properties;
        })
        console.log({index, property, newName})
    }

    function handlePropertyValuesChange(index,property,newValues) {
        setProperties(prev => {
            const properties = [...prev];
            properties[index].values = newValues;
            return properties;
        })
        // console.log({index, property, newValues})
    }

    return (
        <Layout>
            <h1>Categories</h1>
            <label>
                {editedCategory 
                ? `Edit Category ${editedCategory.name}`
                : 'Create New Category'}
            </label>
            <form onSubmit={saveCategory}>
                <div className="flex gap-1">                    
                    <input
                        type="text" 
                        placeholder={'Category Name'}
                        onChange={ev => setName(ev.target.value)}
                        value={name} />
                    <select 
                        onChange={ev => setParentCategory(ev.target.value)}
                        value={parentCategory}>
                            <option value="">No Parent Category</option>
                                {categories.length > 0 && categories.map(category => (
                            <option value={category._id}>
                                {category.name}
                            </option>
                                ))}
                    </select>
                </div>     
                <div className="mb-2">
                    <label className="block">Properties</label>
                    <button 
                        onClick={addProperty}
                        type="button" 
                        className="btn-default text-sm mb-2">
                            Add New Property
                    </button>
                    {properties.length > 0 && properties.map((property,index) => (
                        <div className="flex gap-1 mb-2">
                            <input
                                type="text"
                                className="mb-0"
                                placeholder="Property Name (example: color)"
                                value={property.name}
                                onChange={ev => handlePropertyNameChange(
                                    index,
                                    property,
                                    ev.target.value
                                    )} 
                                />
                            <input
                                type="text"
                                className="mb-0"
                                placeholder="Values, comma separated"
                                value={property.value}
                                onChange={ev => handlePropertyValuesChange(
                                    index,
                                    property,
                                    ev.target.value
                                    )}
                                 />
                                 <button className="btn-default">Remove</button>
                        </div>
                    ))}
                </div>           
                <button type="submit" 
                        className="btn-primary">
                    Save
                </button>
            </form>
            <table className="basic mt-4">
            <thead>
                <tr>
                    <td>Category Name</td>
                    <td>Parent Category</td>
                    <td></td>
                </tr>
            </thead>
            <tbody>
                {categories.length > 0 && categories.map(category => (
                    <tr>
                        <td>{category.name}</td>
                        <td>{category?.parent?.name}</td>
                        <td>
                            <button 
                                onClick={() => editCategory(category)} 
                                className="btn-primary mr-1">
                                    Edit
                            </button>
                            <button 
                            onClick={() => deleteCategory(category)}
                            className="btn-primary">
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
            </table>
        </Layout>
    )
}

export default withSwal(({swal}, ref) => (
    <Categories swal={swal} />
))