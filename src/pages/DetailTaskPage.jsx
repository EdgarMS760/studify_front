import React from 'react'
import DetailTaskTeacher from '@components/organisms/DetailTaskTeacher';
import DetailTaskStudent from '@components/organisms/DetailTaskStudent';

const DetailTaskPage = () => {
    // const user = useUser();
    // const isTeacher = user.role === "teacher";
    const isTeacher = true;

    if (isTeacher) return <DetailTaskTeacher />;
    return <DetailTaskStudent />;
};
export default DetailTaskPage