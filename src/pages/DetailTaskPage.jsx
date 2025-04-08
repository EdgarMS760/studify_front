import React from 'react'
import DetailTaskTeacher from '@components/organisms/DetailTaskTeacher';
import DetailTaskStudent from '@components/organisms/DetailTaskStudent';
import { useAuth } from '../libs/store/AuthProvider';

const DetailTaskPage = () => {
    const { user } = useAuth();
    const isTeacher = user?.rol === "maestro";


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