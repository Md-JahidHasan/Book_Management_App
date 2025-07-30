
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetBorrowSummaryQuery } from "@/redux/features/book/bookApi";
import { useEffect } from "react";

const BorrowSummary = () => {
  const { data: borrowList, isLoading, isError } = useGetBorrowSummaryQuery(undefined);
console.log(borrowList);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (isLoading) {
    return (
      <div className="p-4 grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, idx) => (
          <Skeleton key={idx} className="h-40 w-full rounded-xl" />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <p className="text-center text-red-500">Failed to load borrow summary.</p>
    );
  }

  if (!borrowList.data?.length) {
    return <p className="text-center text-gray-500">No borrowed books yet.</p>;
  }

  return (
    <div className="p-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {borrowList.data.map((borrow, index) => (
        <Card
          key={index}
          className="bg-white shadow-md hover:shadow-lg transition duration-300"
        >
          <CardContent className="p-4">
            <h3 className="text-xl font-semibold mb-2">{borrow.book?.title}</h3>
            <p>
              <strong>Author:</strong> {borrow.book?.author}
            </p>
            <p>
              <strong>Quantity:</strong> {borrow.totalQuantity}
            </p>
            <p>
              <strong>Due Date:</strong>{" "}
              {new Date(borrow.dueDate).toLocaleDateString()}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default BorrowSummary;
