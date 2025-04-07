import React from 'react'
import DetailTaskTeacher from '@components/organisms/DetailTaskTeacher';
import DetailTaskStudent from '@components/organisms/DetailTaskStudent';

const DetailTaskPage = () => {
    // const user = useUser();
    // const isTeacher = user.role === "teacher";
    const isTeacher = true;

    if (isTeacher) {
        return (
        <div className='flex flex-col h-full'>

            <DetailTaskTeacher />
        </div>
        );
    }
    return (
        <div className='flex flex-col h-full'>

            <DetailTaskStudent />
        </div>
        );
};
export default DetailTaskPage