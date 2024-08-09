import  { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import axios from 'axios';
import "../css/detail.css"
import BeatLoader from 'react-spinners/BeatLoader';
import { BACKEND_URL } from '../api/api';


Chart.register(CategoryScale);

const PriceChart = () => {
    const [loading,setLoading]=useState(false);
    const [chartData, setChartData] = useState({
        labels: ['Red', 'Orange', 'Blue'],
        datasets: [
            {
              label: 'Popularity of colours',
              data: [55, 23, 96],
              backgroundColor: [
                'rgba(255, 25, 200, 0.6)',
                'rgba(255, 230, 10, 0.6)',
                'rgba(255, 105, 2, 0.6)'
              ],
              borderWidth: 5,
              borderColor:'red'
            }
        ]
});

    useEffect(() => {
        setLoading(true)
        axios.get(`${BACKEND_URL}/api/completed_orders`)
            .then(response => {
                const prices = response.data?.map(order => Number(order.price));
                const times = response?.data?.map(order => new Date(order.created_at).toLocaleTimeString());
                setChartData({
                    labels: times,
                    datasets: [
                        {
                            label: 'Price over Time',
                            data: prices,
                            backgroundColor: [
                             "rgba(75,192,192,1)",
                                "#ecf0f1",
                                "#50AF95",
                                "#f3ba2f",
                                "#2a71d0"
                                ],
                                borderColor: "black",
                                borderWidth: 2
                        }
                    ]
                });
                setLoading(false)
            })
            .catch(error => alert('Error fetching chart data:', error));
    }, []);
    return (
        <div className='priceChart'>
            <h2>Price Chart</h2>
            {loading?<BeatLoader/>:<Line data={chartData} />}
            
        </div>
    );
};

export default PriceChart;
