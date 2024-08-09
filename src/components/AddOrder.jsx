import { useState } from 'react';
import axios from 'axios';
import '../css/addOrder.css'
import BeatLoader from 'react-spinners/BeatLoader'
const AddOrder = () => {
    const [isBuyer, setIsBuyer] = useState(true);
    const [qty, setQty] = useState('');
    const [price, setPrice] = useState('');
    const [loading, setLoading]=useState(false)

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true)
        const newOrder = {
            buyerQty: isBuyer ? qty : 0,
            buyerPrice: isBuyer ? price : 0,
            sellerPrice: !isBuyer ? price : 0,
            sellerQty: !isBuyer ? qty : 0,
            isBuyer
        };

        axios.post('https://backend-db-z6hm.onrender.com/api/orders', newOrder)
           
            .then(() => {
                alert('Order placed successfully!');
                setQty('');
                setPrice('');
                setLoading(false)
            })
            .catch(error => console.error('Error placing order:', error));
            setTimeout(function() {
                window.location.reload();
            }, 2000);
    };

    return (
        <div className='addOrder'>
            <h2>Add Order</h2>
            <form  onSubmit={handleSubmit}>
                <label>
                    Order Type:
                    <select value={isBuyer} onChange={e => setIsBuyer(e.target.value === 'true')}>
                        <option value="true">Buyer</option>
                        <option value="false">Seller</option>
                    </select>
                </label>
                <br />
                <label>
                    Quantity:
                    <input type="number" value={qty} onChange={e => setQty(e.target.value)} required />
                </label>
                <br />
                <label>
                    Price:
                    <input type="number" value={price} onChange={e => setPrice(e.target.value)} required />
                </label>
                <br />
                <button type="submit">{loading?<BeatLoader/>:"Place Order"}</button>
            </form>
        </div>
    );
};

export default AddOrder;
