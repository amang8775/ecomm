import React, {useContext, useEffect} from 'react'
import { AuthContext } from "../../../context/AuthContext";
import {Link} from 'react-router-dom'
import axios from 'axios'
import './history.css'

function OrderHistory() {
  
    const state = useContext(AuthContext)
    const [history, setHistory] = state.userApi.history
    const [token] = state.token
    

    useEffect(() => {
        if(token){
            const getHistory = async() =>{
                
                    const res = await axios.get('/api/payment/getPayment' ,{
                        headers: {Authorization: token}
                    })
                    setHistory(res.data)
                
            }
            getHistory()
        }
    },[token, setHistory])

    return (
        <div className="history-page">
            <h2>History</h2>

            <h4>You have {history.length} ordered</h4>

            <table>
                <thead>
                    <tr>
                        <th>Payment ID</th>
                        <th>Date of Purchased</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        history.map(items => (
                            <tr key={items._id}>
                                <td>{items.paymentID}</td>
                                <td>{new Date(items.createdAt).toLocaleDateString()}</td>
                                <td><Link to={`/history/${items._id}`}>View</Link></td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default OrderHistory