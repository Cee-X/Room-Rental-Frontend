import { CreateRoom } from '@/components/dashboard/button';
import Pagination from '@/components/dashboard/pagination';
import Search from '@/components/dashboard/search';
import Table from '@/components/dashboard/table';
import { lusitana } from '@/components/ui/font';
import { Metadata } from 'next';
import { fetchRoomPage } from '@/app/service/action';
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

