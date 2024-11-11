import React, { useEffect, useState } from 'react'
import AddResume from './components/AddResume'
import { useUser } from '@clerk/clerk-react'
import GlobalApi from './../../servicess/GlobalApi';
import ResumeCardItem from '../dashboard/components/ResumeCardItems';

function Dashboard() {
  const { user } = useUser();
  const [resumeList, setResumeList] = useState([]); // Ensure resumeList is an array
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) GetResumesList();
  }, [user]);

  /**
   * Used to Get User's Resume List
   */
  const GetResumesList = () => {
    setLoading(true);
    GlobalApi.GetUserResumes(user?.primaryEmailAddress?.emailAddress)
      .then(resp => {
        console.log(resp.data.data);
        setResumeList(resp.data.data || []); // Default to an empty array if data is undefined
      })
      .catch(error => console.error('Error fetching resumes:', error))
      .finally(() => setLoading(false));
  };

  return (
    <div className='p-10 md:px-20 lg:px-32'>
      <h2 className='font-bold text-3xl'>My Resume</h2>
      <p>Start Creating an AI-powered resume for your next job role</p>
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 mt-10'>
        <AddResume />
        {loading ? (
          [1, 2, 3, 4].map((item) => (
            <div key={item} className='h-[280px] rounded-lg bg-slate-200 animate-pulse'></div>
          ))
        ) : resumeList?.length > 0 ? ( // Ensure resumeList is defined before checking length
          resumeList.map((resume, index) => (
            <ResumeCardItem resume={resume} key={index} refreshData={GetResumesList} />
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500">No resumes found. Start by creating one!</div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
