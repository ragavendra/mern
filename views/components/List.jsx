import React, { useState, useEffect } from 'react';
import {Link} from "react-router-dom";
import ListLoader from "../loader/ListLoader.jsx";
import toast from "react-hot-toast";
import {FaRegTrashAlt} from "react-icons/fa";
import Cookies from 'js-cookie';

const List = () => {

    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    // const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXIiLCJ1c2VyX2lkIjoicGFzc3dkIiwiaWF0IjoxNzE1OTA0OTIzLCJleHAiOjE3MTg0OTY5MjN9.BB4rdtIjrTn3Qo_jPoyluqNyKDh3Yw43PXT1aRZr_5Q';
    // const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXIiLCJ1c2VyX2lkIjoicGFzc3dkIiwiaWF0IjoxNzE1OTExNDEwLCJleHAiOjE3MTg1MDM0MTB9.zhmi9mTRmYpdFKP32aGxjdBeF83vKlowUBB676DE5_4';
    const token = Cookies.get("user_token");

    useEffect(() => {
        (async ()=>{
           await showItem()
        })()
    }, []);

    const showItem = async () =>{
        const response = await fetch('/api/show', { headers: { 'token': token }});
        const data = await response.json();
        setItems(data.result);
        setLoading(false);
    }

    const deleteItem = async (id) => {
        setLoading(true);
        let res=await fetch(`/api/destroy/${id}`,{ method: 'DELETE', headers:  { 'token': token }
    });
        let resJson=await res.json()
        toast.success(resJson.message)
        await showItem()
    }

    if (loading) {
        return <ListLoader/>
    }
    else {
        return (
            <section>
                <div className="container p-20 m-auto">
                    <div className="grid grid-cols-4 gap-6 md:grid-cols-8 lg:grid-cols-12">
                        <div className="col-span-4 md:col-span-8 lg:col-span-12">
                            <div className="w-full overflow-x-auto">
                                <table className="w-full text-left border border-separate rounded border-slate-200" cellSpacing="0">
                                    <thead>
                                    <tr>
                                        <th scope="col" className="t-head">Names</th>
                                        <th scope="col" className="t-head">Description</th>
                                        <th scope="col" className="t-head">Delete</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {items.length>0?(items.map((item, index) => (
                                        <tr key={index} className={index % 2 === 0 ? "odd:bg-slate-50" : ""}>
                                            <td className="t-td">{item.name}</td>
                                            <td className="t-td">{item.description}</td>
                                            <td className="t-td">
                                                <button onClick={async ()=>{await deleteItem(item._id)}} className="btn-primary">
                                                    <FaRegTrashAlt size={18}  />
                                                </button>
                                            </td>
                                        </tr>
                                    ))):null}
                                    </tbody>
                                </table>
                                <Link to="/create" className="btn-primary  my-6">Create Item</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
};
export default List;
