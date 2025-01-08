import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { FaTrashAlt, FaUsers } from 'react-icons/fa';
import Swal from 'sweetalert2';

const AllUser = () => {
  const axiosSecure = useAxiosSecure();

  const { refetch, data: user = [] } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await axiosSecure.get('/users');
      return res.data;
    },
  });
  const handelDelete = user => {
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

        axiosSecure
          .delete(`/users/${user._id}`)

          .then(res => {
            console.log(res);
            refetch();
          });
      }
    });
  };
  const handelAdmin = user => {
    axiosSecure.patch(`/users/admin/${user._id}`).then(res => {
      console.log(res.data);
      refetch();
    });
  };
  return (
    <div className=" px-10">
      <div className="flex justify-evenly my-10">
        <h2 className="text-3xl">All User</h2>
        <h2 className="text-3xl">Total User {user.length}</h2>
        {/* table */}
      </div>

      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {user.map((user, index) => (
              <>
                <tr key={user._id} className="bg-base-200">
                  <th>{index + 1}</th>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    {user.role === 'admin' ? (
                      'Admin'
                    ) : (
                      <button
                        onClick={() => handelAdmin(user)}
                        className="btn btn-ghost btn-xl"
                      >
                        <FaUsers></FaUsers>
                      </button>
                    )}
                  </td>
                  <td>
                    <button
                      onClick={() => handelDelete(user)}
                      className="btn btn-ghost btn-xl"
                    >
                      <FaTrashAlt></FaTrashAlt>
                    </button>
                  </td>
                </tr>
              </>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUser;
