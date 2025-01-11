import React from 'react';
import useCart from '../../hooks/useCart';
import { FaTrashAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { Link } from 'react-router-dom';

const Cart = () => {
  const [cart, refetch] = useCart();
  console.log([cart.price]);
  const totalPrice = cart.reduce((acc, item) => acc + item.price, 0);
  const x = parseInt(totalPrice);
  const axiosSecure = useAxiosSecure();
  const handelDelete = id => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(result => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Deleted!',
          text: 'Your file has been deleted.',
          icon: 'success',
        });

        axiosSecure.delete(`/carts/${id}`).then(res => {
          console.log(res);
        });
      }
      refetch();
    });
  };
  return (
    <div>
      <div className="overflow-x-auto">
        <div className="flex justify-evenly my-10 ">
          <h2 className="text-3xl">Total {cart.length}</h2>
          <h2 className="text-3xl">Total Price {x}</h2>
          {cart.length ? (
            <button className="btn btn-neutral">
              <Link to={'/dashbord/payment'}>Pay</Link>
            </button>
          ) : (
            <button disabled className="btn btn-neutral">
              pay
            </button>
          )}
        </div>
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>{cart.length}</th>
              <th>Imges</th>
              <th></th>
              <th>Price</th>
              <th>Action</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}

            {cart.map((item, inx) => (
              <tr key={item._id}>
                <th>{inx + 1}</th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          src={item.image}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{item.name}</div>
                      <div className="text-sm opacity-50">United States</div>
                    </div>
                  </div>
                </td>
                <td></td>
                <td>${item.price}</td>
                <th>
                  <button
                    onClick={() => handelDelete(item._id)}
                    className="btn btn-ghost btn-xl"
                  >
                    <FaTrashAlt></FaTrashAlt>
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Cart;
