import Pagination from '@/app/ui/dashboard/pagination';
import Search from '@/app/ui/dashboard/search';
import Table from '@/app/ui/dashboard/table';
import { CreateRoom } from '@/app/ui/dashboard/button';
import { lusitana } from '@/app/ui/font';
//import { InvoicesTableSkeleton } from '@/app/ui/skeletons';
import { Suspense } from 'react';
import { Metadata } from 'next';
import { fetchRoomPage } from '../../service/action';
export const metadata : Metadata = {
  title : 'Rooms - Dashboard',
}
export default async function Page({searchParams}: {
  searchParams? :{
  query? : string;
  page? : string;
}
}) {
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await fetchRoomPage(query);
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Rooms</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search rooms..." />
        <CreateRoom />
      </div>
      
        <Table query={query} currentPage={currentPage} />
     
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} /> 
      </div>
    </div>
  );
}

