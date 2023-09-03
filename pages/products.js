import Layout from "@/components/Layout";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Products() {
    const [products,setProducts] = useState([]);
    useEffect(() => {
        axios.get('/api/products').then(response => {
            // console.log(response.data)
            setProducts(response.data);
        });
    }, [])
    return (
        <Layout>
            <Link className="bg-blue-900 text-white rounded-md py-1 px-2 " href={'/products/new'}>Add New Product</Link>
            <table className="basic mt-2">
                <thead>
                    <tr>
                        <td>Product Name</td>
                        <td></td>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => (
                        <tr>
                            <td>{product.title}</td>
                            <td>
                                <Link href={'/products/edit/'+product._id}>
                                <svg xmlns="http://www.w3.org/2000/svg" 
                                    x="0px" y="0px" 
                                    width="100" height="100" 
                                    viewBox="0 0 64 64"
                                    className="w-4 h-4">
                                    <linearGradient id="zLNDYKC~wmLHBQLHuIXMta_56347_gr1" x1="31.994" x2="31.994" y1="7.125" y2="57.081" gradientUnits="userSpaceOnUse" spreadMethod="reflect"><stop offset="0" stop-color="#1a6dff"></stop><stop offset="1" stop-color="#c822ff"></stop></linearGradient><path fill="url(#zLNDYKC~wmLHBQLHuIXMta_56347_gr1)" d="M55.982,13.567l-5.549-5.549c-1.3-1.299-3.566-1.299-4.865,0L42,11.586l-0.567-0.567 c-1.3-1.299-3.566-1.299-4.865,0l-0.614,0.614c-1.324-0.891-3.233-0.767-4.385,0.385l-0.551,0.55 c-1.192,1.194-1.317,3.049-0.388,4.389L10.703,36.884c-1.061,1.061-1.763,2.462-1.978,3.945L7.054,52.358 c-0.005,0.035-0.008,0.07-0.009,0.105C7.018,52.64,7,52.817,7,53c0,2.206,1.794,4,4,4c0.154,0,0.304-0.016,0.469-0.038 c0.042-0.001,0.083-0.004,0.125-0.011l11.576-1.676c1.485-0.215,2.887-0.918,3.946-1.979l19.926-19.925 c0.572,0.398,1.247,0.617,1.958,0.617c0.919,0,1.783-0.358,2.432-1.007l0.551-0.55c1.192-1.194,1.318-3.048,0.388-4.389l0.612-0.611 c1.34-1.342,1.34-3.523,0-4.865L52.414,22l3.568-3.567C57.323,17.091,57.323,14.909,55.982,13.567z M40.018,12.433l11.549,11.549 c0.562,0.562,0.562,1.476,0,2.037L51,26.586L37.414,13l0.568-0.568C38.525,11.888,39.474,11.888,40.018,12.433z M11.394,54.96 c-0.043,0.001-0.086,0.005-0.128,0.011C11.178,54.983,11.091,55,11,55c-1.103,0-2-0.897-2-2c0-0.112,0.018-0.221,0.036-0.328 c0.008-0.045,0.012-0.091,0.013-0.137l0.261-1.802c1.742,0.799,3.157,2.214,3.956,3.955L11.394,54.96z M22.884,53.297l-7.581,1.097 c-1.013-2.598-3.098-4.683-5.697-5.697l1.099-7.581c0.022-0.15,0.066-0.296,0.102-0.443c6.058,1.68,10.843,6.465,12.521,12.522 C23.179,53.231,23.034,53.275,22.884,53.297z M25.702,51.883c-0.165,0.166-0.347,0.314-0.534,0.454 c-1.913-6.473-7.032-11.592-13.505-13.505c0.14-0.187,0.288-0.368,0.453-0.534L32,18.414L45.586,32L25.702,51.883z M50.568,31.018 l-0.551,0.55c-0.543,0.545-1.492,0.545-2.036,0L32.433,16.019c-0.562-0.562-0.562-1.476-0.001-2.036l0.55-0.549 c0-0.001,0-0.001,0-0.001c0.272-0.272,0.634-0.422,1.018-0.422s0.746,0.149,1.018,0.422l15.549,15.549 C51.129,29.543,51.129,30.457,50.568,31.018z M16.707,27.707l-1.414-1.414l11-11l1.414,1.414L16.707,27.707z M35.531,31.46 l-2.991-2.99c-0.301-0.302-0.7-0.468-1.125-0.468c0,0,0,0-0.001,0c-0.425,0-0.825,0.166-1.125,0.467l-5.819,5.819 c-0.301,0.301-0.467,0.7-0.467,1.126c0,0.425,0.166,0.824,0.466,1.126l2.991,2.99c0.3,0.302,0.7,0.468,1.125,0.468c0,0,0,0,0.001,0 c0.425,0,0.825-0.166,1.125-0.467l5.819-5.819c0.301-0.301,0.467-0.7,0.467-1.126C35.998,32.161,35.832,31.762,35.531,31.46z M28.586,37.828l-2.415-2.414l1.914-1.914l2.414,2.414L28.586,37.828z M31.914,34.5L29.5,32.086l1.914-1.914l2.415,2.414 L31.914,34.5z"></path><linearGradient id="zLNDYKC~wmLHBQLHuIXMtb_56347_gr2" x1="49.201" x2="49.201" y1="9.043" y2="20.604" gradientUnits="userSpaceOnUse" spreadMethod="reflect"><stop offset="0" stop-color="#6dc7ff"></stop><stop offset="1" stop-color="#e6abff"></stop></linearGradient><path fill="url(#zLNDYKC~wmLHBQLHuIXMtb_56347_gr2)" d="M54.568,17.019L51,20.586L43.414,13l3.568-3.567c0.543-0.545,1.492-0.545,2.036,0l5.549,5.549 C55.129,15.543,55.129,16.457,54.568,17.019z"></path>
                                </svg>
                                    Edit
                                </Link>
                                
                                <Link href={'/products/delete/'+product._id}>
                                <svg xmlns="http://www.w3.org/2000/svg" 
                                    x="0px" y="0px" 
                                    width="100" height="100" 
                                    viewBox="0 0 64 64"
                                    className="w-4 h-4">
                                    <linearGradient id="KIydtmijnLONgt4FArE1ha_52538_gr1" x1="32" x2="32" y1="21.5" y2="24.51" gradientUnits="userSpaceOnUse" spreadMethod="reflect"><stop offset="0" stop-color="#6dc7ff"></stop><stop offset="1" stop-color="#e6abff"></stop></linearGradient><path fill="url(#KIydtmijnLONgt4FArE1ha_52538_gr1)" d="M14 22H50V24H14z"></path><linearGradient id="KIydtmijnLONgt4FArE1hb_52538_gr2" x1="33" x2="33" y1="5.75" y2="16.125" gradientUnits="userSpaceOnUse" spreadMethod="reflect"><stop offset="0" stop-color="#6dc7ff"></stop><stop offset="1" stop-color="#e6abff"></stop></linearGradient><path fill="url(#KIydtmijnLONgt4FArE1hb_52538_gr2)" d="M40.438,7.203C39.869,6.438,38.98,6,38,6s-1.869,0.438-2.438,1.203L33,10.641l-2.562-3.438 C29.869,6.438,28.98,6,28,6s-1.869,0.438-2.438,1.203L19.008,16h27.984L40.438,7.203z M22.992,14l4.173-5.602 c0.377-0.506,1.293-0.506,1.67,0L33.008,14H22.992z M35.502,14l-1.255-1.685l2.918-3.917c0.377-0.506,1.293-0.506,1.67,0L43.008,14 H35.502z"></path><linearGradient id="KIydtmijnLONgt4FArE1hc_52538_gr3" x1="32" x2="32" y1="17.75" y2="58.283" gradientUnits="userSpaceOnUse" spreadMethod="reflect"><stop offset="0" stop-color="#1a6dff"></stop><stop offset="1" stop-color="#c822ff"></stop></linearGradient><path fill="url(#KIydtmijnLONgt4FArE1hc_52538_gr3)" d="M52,18H12c-1.654,0-3,1.346-3,3v4c0,1.654,1.346,3,3,3h1.124l3.422,25.661 C16.875,56.135,19.006,58,21.502,58h20.996c2.496,0,4.627-1.865,4.956-4.339L50.876,28H52c1.654,0,3-1.346,3-3v-4 C55,19.346,53.654,18,52,18z M45.472,53.397C45.274,54.881,43.995,56,42.498,56H21.502c-1.497,0-2.776-1.119-2.974-2.603L15.143,28 h33.715L45.472,53.397z M53,25c0,0.552-0.448,1-1,1h-0.857H12.857H12c-0.552,0-1-0.448-1-1v-4c0-0.552,0.448-1,1-1h40 c0.552,0,1,0.448,1,1V25z"></path><linearGradient id="KIydtmijnLONgt4FArE1hd_52538_gr4" x1="32" x2="32" y1="17.75" y2="58.283" gradientUnits="userSpaceOnUse" spreadMethod="reflect"><stop offset="0" stop-color="#1a6dff"></stop><stop offset="1" stop-color="#c822ff"></stop></linearGradient><path fill="url(#KIydtmijnLONgt4FArE1hd_52538_gr4)" d="M20.891,52.269C21.025,53.256,21.878,54,22.874,54h18.252c0.996,0,1.849-0.744,1.983-1.731 L46.146,30H17.854L20.891,52.269z M31,49v3h-4v-3H31z M27,47v-4h4v4H27z M33,49h4v3h-4V49z M33,47v-4h4v4H33z M39,43h3.354l-0.545,4 H39V43z M39,41v-4h4.173l-0.545,4H39z M37,41h-4v-4h4V41z M33,35v-3h4v3H33z M31,35h-4v-3h4V35z M31,37v4h-4v-4H31z M25,41h-3.627 l-0.545-4H25V41z M25,43v4h-2.809l-0.545-4H25z M22.873,52l-0.409-3H25v3H22.873z M39,52v-3h2.536l-0.409,3H39z M43.445,35H39v-3 h4.854L43.445,35z M25,32v3h-4.445l-0.409-3H25z"></path>
                                </svg>
                                    Delete
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Layout>
    );
}