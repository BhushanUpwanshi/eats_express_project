import React, { useEffect, useState } from 'react'
import { Table } from "flowbite-react";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ManageCategory = () => {
    // const navigate = useNavigate();
    const [allProducts, setAllProducts] = useState([]);

    const [category, setCategory] = useState("")

    const fetchCategory = async () => {
        try {
            const res = await axios.get("http://localhost:8080/category")
            console.log(res.data);
            if (res.data) {
                setAllProducts(res.data);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const addCategory = async () => {
        if(!category){
            alert("Please enter category name to add.")
            return;
        }
        try {
            const res = await axios.post("http://localhost:8080/category", {
                categoryId: null,
                categoryName: category
            })
            console.log(res.data)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchCategory()
    }, [category]);

    const deleteCategory = async (categoryId) => {
        try {
            const res = await axios.delete(`http://localhost:8080/category/${categoryId}`)
            console.log(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="w-full mt-16 ml-52">
            <div className='w-full flex justify-between mb-8 py-4 px-6'>
                <h2 className="text-3xl font-bold">Manage your categories</h2>
                <div className='flex gap-2'>
                    <input type='text' placeholder='Enter category name' className='rounded-md px-2 border border-gray-400 ring-slate-500 focus:border-green-500 focus:border-2 focus:outline-none focus:ring-0' onChange={(e) => setCategory(e.target.value)} />
                    <button className='px-2 bg-green-500 rounded-md text-white' onClick={() => addCategory()}>Add Category</button>
                </div>
            </div>
            <Table hoverable className='w-full float-right'>
                <Table.Head>
                    <Table.HeadCell>Category ID</Table.HeadCell>
                    <Table.HeadCell>Category Name</Table.HeadCell>
                    <Table.HeadCell>
                        <span>Action</span>
                    </Table.HeadCell>
                </Table.Head>
                {
                    Array.isArray(allProducts) && allProducts.length > 0 ? (
                        allProducts.map((category) => (
                            <Table.Body key={category.categoryId} className="w-full divide-y hover:bg-slate-100 text-center">
                                <Table.Row className="w-full bg-white hover:bg-slate-100">
                                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900">
                                        {category.categoryId}
                                    </Table.Cell>
                                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900">{category.categoryName}</Table.Cell>
                                    <Table.Cell>
                                        {/* <Link to={`/admin/dashboard/edit/${category.productId}`} className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                                            Edit
                                        </Link> */}
                                        <button onClick={() => deleteCategory(category.categoryId)} className='bg-red-600 py-1 font-semibold text-white rounded-lg px-4 ml-5'>Delete</button>
                                    </Table.Cell>
                                </Table.Row>
                            </Table.Body>
                        ))
                    ) : (
                        <Table.Body className="divide-y hover:bg-slate-100">
                            <Table.Row>
                                <Table.Cell mt-5 colSpan={6} className="text-center">No category available</Table.Cell>
                            </Table.Row>
                        </Table.Body>
                    )
                }
            </Table>
        </div>
    );
}

export default ManageCategory;
