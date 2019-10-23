import React, { useEffect, useState } from 'react';

import './orders.css';
import api from '../../services/api';

function Orders() {

    //Variables
    const [orders, setOrders] = useState([]);

    //Action Functions
    async function getOrders() {
        try {
            const { data } = await api.get('/orders');
            if (data) {
                setOrders(data);
            }
        } catch (error) {
            console.log("Ops ..", error);
        }
    }

    //Lifecycle Functions 
    useEffect(() => {
        getOrders();
    }, [])

    return (
        <div className="container">
            <ul>
                {orders.map(o => (
                    <li className="order_card" key={o._id}>
                        <div className="order_card_product">
                            <span className="order_card_title">Produtos</span>
                            {o.products.map(p => <h4 key={p.name}> - {p.name}</h4>)}
                        </div>
                        <div className="order_card_address">
                            <span className="order_card_title">Endereço de entrega</span>
                            <h4>{o.address.street}, nº {o.address.number}</h4>
                            <h4>{o.address.neighborhood}, {o.address.city}</h4>
                            <h4>Complemento: {o.address.complement}</h4>
                            <h4>Cep: {o.address.cep}</h4>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Orders;