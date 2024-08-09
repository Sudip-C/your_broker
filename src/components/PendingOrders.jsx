import  { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/pendingOrder.css'
import BeatLoader from 'react-spinners/BeatLoader';
import { BACKEND_URL } from '../api/api';


const PendingOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading,setLoading]=useState(false)

    useEffect(() => {
        setLoading(true)
        axios.get(`${BACKEND_URL}/api/pending_orders`)
            .then(response => {setOrders(response.data);
                setLoading(false)
            })
            .catch(error =>{alert("Error Fetching Orders")
                 console.error('Error fetching pending orders:', error)});
    }, []);

    return (
        <div className='pending_orders'>
            <h2>Pending Orders</h2>
            {loading?<BeatLoader/>:
                <table className='table'>
                <thead>
                    <tr>
                        <th>Buyer Qty</th>
                        <th>Buyer Price</th>
                        <th>Seller Price</th>
                        <th>Seller Qty</th>
                    </tr>
                </thead>
                <tbody>
                    {orders?.map((order,index) => (
                        <tr key={index}>
                            <td className='buy'>{order.buyer_qty}</td>
                            <td className='buy'>{order.buyer_price}</td>
                            <td className='sell'>{order.seller_price}</td>
                            <td className='sell'>{order.seller_qty}</td>
                        </tr>
                    ))}
                </tbody>
            </table>}
        </div>
    );
};

export default PendingOrders;
