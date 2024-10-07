import { DeleteReview } from '@/components/dashboard/button';
import { formatDateToLocal } from '@/lib/utils';
import { Star } from 'lucide-react';
import Image from 'next/image';
import { fetchFilteredReviews, ReviewTableProps } from '@/app/service/action';

export default async function ReviewTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const reviews = await fetchFilteredReviews(query, currentPage);
  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Room
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  User
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Rating
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Comment
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Date
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Delete</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {reviews?.map((review: ReviewTableProps) => (
                <tr
                  key={review._id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <Image
                        src={review.room.images[0]}
                        className="rounded-full"
                        width={28}
                        height={28}
                        alt={`${review.room.title}'s image`}
                      />
                      <p>{review.room.title}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {review.user.name}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <div className="flex items-center">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`h-5 w-5 ${star <= review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                        />
                      ))}
                    </div>
                  </td>
                  <td className="px-3 py-3">
                    {review.comment.length > 50 ? `${review.comment.substring(0, 50)}...` : review.comment}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {formatDateToLocal(review.createdAt)}
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end">
                      <DeleteReview id={review._id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}