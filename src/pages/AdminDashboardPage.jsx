import React, { useEffect, useState } from 'react';

import { AuthContext } from 'Context/Auth';
import MkdSDK from 'Utils/MkdSDK';
import { useNavigate } from 'react-router';

const AdminDashboardPage = () => {
  const [videos, setVideos] = useState([]);
  const { dispatch } = React.useContext(AuthContext);
  const navigate = useNavigate();
  let sdk = new MkdSDK();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 10; 


  async function fetchData(page) {
    try {
      const videos = await sdk.getPaginateVideos(page,limit);
      // console.log(videos.list)
      console.log(videos.list.length) 
      setVideos(videos.list);
    } catch (error) {
      console.error('Error fetching videos:', error);
    }
  }

  fetchData();

    useEffect(() => {
    fetchData(currentPage); 
  }, [currentPage]);

  //Handler for logout
  const handleLogout = () => {
    dispatch({ type: 'LOGIN', payload: '' });
    navigate('/');
  };

  // Handlers for pagination buttons
  const handlePrevPage = () => {
    console.log("currentPage",currentPage)
    if (currentPage > 1) setCurrentPage(prev => prev - 1);
  };

  const handleNextPage = () => {
    console.log("currentPage",currentPage)
    setCurrentPage(prev => prev + 1);
  };

  return (
    <>
      <div className="w-full bg-black min-h-screen ">
        <div className="flex justify-between">
          <h1 className="text-white p-8 text-5xl font-bold">APP</h1>
          <div className="p-8">
            <button
              style={{
                backgroundColor: 'rgba(155, 255, 0, 1)',
                padding: '12px 24px 12px 24px',
                borderRadius: '40px',
                width: '128px',
              }}
              onClick={() => handleLogout()}
            >
              Logout
            </button>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <h1 class="text-5xl font-thin text-white p-8">Today's leaderboard</h1>
          <div
            class="m-8 p-4 text-center flex justify-between items-center "
            style={{
              backgroundColor: 'rgba(29, 29, 29, 1)',
              height: '56px',
              borderRadius: '12px',
            }}
          >
            <h1
              style={{ color: 'rgba(255, 255, 255, 1)' }}
              className="font-thin text-sm p-1"
            >
              30 May 2022
            </h1>
            <span class="text-4xl text-white items-center">&middot;</span>
            <h1
              style={{ color: 'rgba(255, 255, 255, 1)' }}
              className="font-thin text-sm p-1 uppercase"
            >
              submission open
            </h1>
            <span class="text-4xl text-white items-center">&middot;</span>
            <h1
              style={{ color: 'rgba(255, 255, 255, 1)' }}
              className="font-thin text-sm p-1"
            >
              11:34
            </h1>
          </div>
        </div>{' '}
        <div className="container mx-auto px-4 sm:px-8 py-8">
          <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
            <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
              <table className="min-w-full leading-normal">
                <thead>
                  <tr>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Title
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Author
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Most Liked
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {videos?.map(row => (
                    <tr key={row.id}>
                      <td className="flex justify-start items-center px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <img
                          style={{
                            width: '118px',
                            height: '64px',
                            borderRadius: '8px',
                          }}
                          src={row.photo}
                          alt=""
                        />
                        <p className="text-gray-900 whitespace-no-wrap ml-2">
                          {row.title}
                        </p>
                      </td>

                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {row.username}
                        </p>
                      </td>

                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {row.like}
                        </p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="flex justify-between items-center mt-4">
            <button
              onClick={handlePrevPage}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg disabled:opacity-50"
              disabled={currentPage === 1}
            >
              Prev
            </button>
            <span className='text-white'>
              Page {currentPage} 
            </span>
            <button
              onClick={handleNextPage}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg disabled:opacity-50"
              // disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboardPage;
