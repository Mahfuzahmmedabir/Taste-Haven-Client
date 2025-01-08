import React from 'react';
import useAuth from '../../hooks/useAuth';
import Swal from 'sweetalert2';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useCart from '../../hooks/useCart';

const FoodCard = ({ items }) => {
  const { name, recipe, image, category, price, _id } = items;
  const { user } = useAuth();
  const navigate = useNavigate();
  const loaction = useLocation();
  const axiosSecure = useAxiosSecure();
  const [, refetch] = useCart();

  const handealAddToCart = () => {
    if (user && user.email) {
      const cartItems = {
        menuId: _id,
        email: user.email,
        name,
        image,
        price,
      };
      axiosSecure.post('/carts', cartItems).then(res => {
        console.log(res.data);
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: `${name} added to cart`,
          showConfirmButton: false,
          timer: 1500,
        });
        refetch();
      });
    } else {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, login now!',
      }).then(result => {
        if (result.isConfirmed) {
          navigate('/login', { state: { from: loaction } });
        }
      });
    }
  };
  return (
    <div>
      <div className="card card-compact bg-base-100 w-96 shadow-xl">
        <figure>
          <img src={image} alt="Shoes" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{name}</h2>
          <p>{recipe}</p>
          <div className="card-actions justify-center">
            <button
              onClick={handealAddToCart}
              className="btn  btn-active btn-neutral"
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
