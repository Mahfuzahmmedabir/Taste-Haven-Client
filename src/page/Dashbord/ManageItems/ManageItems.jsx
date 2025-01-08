import React from 'react';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import useMenu from '../../../hooks/useMenu';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

const ManageItems = () => {
  const [menu, loading, refetch] = useMenu();
  console.log(loading);

  console.log(menu);
  const axiosSecure = useAxiosSecure();

  const handelDelete = id => {
    console.log(id);
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(async result => {
      if (result.isConfirmed) {
        const res = await axiosSecure.delete(`/menu/${id}`);
        console.log(res);
        if (res.data.deletedCount > 0) {
          refetch();
        }
        if (loading) {
          <>
            <h2>skdlfsdlkfsdfasf</h2>
          </>;
        }
        Swal.fire({
          title: 'Deleted!',
          text: 'Your file has been deleted.',
          icon: 'success',
        });
      }
    });
  };

  return (
    <div>
      <SectionTitle
        heading={'manage Items'}
        subHeading={'Hurry Up'}
      ></SectionTitle>

      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>{menu.length}</th>
              <th>Imges</th>
              <th></th>
              <th>Price</th>
              <th>Upeate</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}

            {menu.map((item, inx) => (
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
                <td>
                  <Link to={`/dashbord/updeat/${item._id}`}>
                    <button
                      className="btn btn-ghost btn-xl"
                    >
                      <FaEdit></FaEdit>
                    </button>
                  </Link>
                </td>
                <td>
                  <button
                    onClick={() => handelDelete(item._id)}
                    className="btn btn-ghost btn-xl"
                  >
                    <FaTrashAlt></FaTrashAlt>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageItems;
