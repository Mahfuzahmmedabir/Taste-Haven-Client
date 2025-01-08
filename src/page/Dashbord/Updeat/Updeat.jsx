import React from 'react';
import { useLoaderData } from 'react-router-dom';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import { FaUtensils } from 'react-icons/fa';
import useAxiosOpen from '../../../hooks/useAxiosOpen';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';

const image_key = import.meta.env.VITE_IMG_HOSTING;
console.log(image_key);
const image_Api = `https://api.imgbb.com/1/upload?key=${image_key}`;

const Updeat = () => {
  const { name, category, recipe, price, image, _id } = useLoaderData();
  const axiosSecure = useAxiosSecure();
  const axiosOpen = useAxiosOpen();
  const { register, handleSubmit } = useForm();
  const onSubmit = async data => {
    console.log(data);
    const image_file = { image: data.image[0] };
    const res = await axiosOpen.post(image_Api, image_file, {
      headers: {
        'content-type': 'multipart/form-data',
      },
    });
    console.log(res.data);
    if (res.data.success) {
      const addItems = {
        name: data.name,
        category: data.category,
        price: data.price,
        recipe: data.recipe,
        image: res.data.data.display_url,
      };
      const menuRes = await axiosSecure.patch(`/menu/${_id}`, addItems);
      console.log(menuRes.data);
      if (menuRes.data.insertedId) {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Your work has been saved',
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }
  };

  return (
    <div>
      <SectionTitle
        heading={'updeat Items'}
        subHeading={'updeat you items'}
      ></SectionTitle>
      <div className="p-10">
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <label className=" ">
              <div className="label">
                <span className="label-text">Recipe name?</span>
              </div>
              <input
                {...register('name')}
                type="text"
                defaultValue={name}
                placeholder="Recipe name"
                className="input input-bordered w-full "
              />
            </label>
            <div className=" flex gap-4   ">
              {/* category */}
              <div className="w-6/12">
                <div className="label">
                  <span className="label-text">Category</span>
                </div>
                <select
                  {...register('category')}
                  className="select select-bordered w-full  "
                >
                  <option disabled value={null}>
                    Select you category
                  </option>
                  <option value={'dessert'}>Dessert</option>
                  <option value={'pizza'}>Pizza</option>
                  <option value={'soup'}>Soup</option>
                  <option value={'salad'}>Salad</option>
                </select>
              </div>
              {/* price */}
              <div className="w-6/12">
                <label className="form-control ">
                  <div className="label">
                    <span className="label-text">Price</span>
                  </div>
                  <input
                    {...register('price')}
                    type="text"
                    defaultValue={price}
                    placeholder="Recipe name"
                    className="input input-bordered w-full "
                  />
                </label>
              </div>
            </div>
            <div>
              <div className="label">
                <span className="label-text">Bio</span>
              </div>

              <textarea
                {...register('recipe')}
                className="textarea w-full my-3 textarea-warning"
                placeholder="Bio"
              ></textarea>
            </div>

            <div>
              <label className="form-control w-full ">
                <input
                  {...register('image')}
                  type="file"
                  className="file-input file-input-bordered w-full max-w-xs"
                />
              </label>
            </div>
            <button className="btn my-5">
              <FaUtensils></FaUtensils> Add Items
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Updeat;
