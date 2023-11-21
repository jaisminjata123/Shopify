import {Table} from 'react-bootstrap';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { FaTimes } from "react-icons/fa";
import { useGetOrdersQuery } from "../../slices/ordersApiSlice"
const OrderListScreen = () => {
  const {data:orders,isLoading,error}= useGetOrdersQuery()

  return (
    <>
      <h1>Orders</h1>
      {
        isLoading? (<Loader/>):error?(
          <Message variant='danger'>{error}</Message>

        ):(
          <Table striped  hover responsive className ='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>USER</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVERED</th>

            </tr>
            </thead>
            <tbody>
              {orders.map((order)=>(
                <tr key ={order._id}>
                  <td>{order._id}</td>
                  <td>{order.user&&order.user.name}</td>
                  <td>{order.createdAt.substring(0,10)}</td>
                  <td>${order.totalPrice}</td>
                  <td>
                    {order.isPaid?(
                    order.paidAt.substring(0,10)):(
                    <FaTimes style={{color:'red'}}/>
                      )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )
      }
    </>
  )
}

export default OrderListScreen