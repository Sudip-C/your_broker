import './css/app.css'
import AddOrder from './components/AddOrder'
import CompletedOrders from './components/CompletedOrders'
import PendingOrders from './components/PendingOrders'
import PriceChart from './components/PriceChart'

function App() {

  return (
    <div className='App'>
         <header>
                <h1>Order Matching</h1>
            </header>
            <main>
                <AddOrder/>
                <CompletedOrders/>
                <PendingOrders/>
                <PriceChart/>
            </main>
    </div>
  )
}

export default App
