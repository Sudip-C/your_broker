import  { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/completeOrder.css'
import BeatLoader from 'react-spinners/BeatLoader';
import { BACKEND_URL } from '../api/api';

const CompletedOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading,setLoading]=useState(false)
    useEffect(() => {
        setLoading(true)
        axios.get(`${BACKEND_URL}/api/completed_orders`)
            .then(response =>{ setOrders(response.data);
                setLoading(false)
            })
            .catch(error => alert('Error fetching completed orders:', error));
    }, []);

    return (
        <div className='complete_orders'>
            <h2>Completed Orders</h2>
            {loading?<BeatLoader/>:
                <table className='table'>
                <thead>
                    <tr>
                        <th>Price</th>
                        <th>Qty</th>
                        <th>Time</th>
                    </tr>
                </thead>
                <tbody>
                    {orders?.map((order,i) => (
                        <tr key={i}>
                            <td>{order.price}</td>
                            <td>{order.qty}</td>
                            <td>{new Date(order.created_at).toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>}
        </div>
    );
};

export default CompletedOrders;
