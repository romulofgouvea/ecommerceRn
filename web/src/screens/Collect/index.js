import React, { useEffect, useState } from 'react';

import './collect.css'
import api from '../../services/api';

function Collect() {

    //Variables
    const [allProducts, setAllProducts] = useState([]);

    //Action Functions
    async function getOrders() {
        try {
            const { data } = await api.get('/orders');
            if (data) {

                let arrProd = data.map(d => d.products).flat();

                let arrTemp = [];
                await arrProd.map(a => {
                    let exists = arrTemp.findIndex(x => x.name === a.name) > -1;
                    if (!exists) {
                        arrTemp.push(a);
                    }
                    return a;
                })

                setAllProducts(arrTemp);
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

            <table id="myTable">
                <tr>
                    <th>Nome do produto</th>
                    <th>Quantidade</th>
                </tr>
                {
                    allProducts.map(o => (
                        <tr key={o._id}>
                            <td>{o.name}</td>
                            <td>2</td>
                        </tr>
                    ))
                }

            </table>
        </div>
    )
}

export default Collect;