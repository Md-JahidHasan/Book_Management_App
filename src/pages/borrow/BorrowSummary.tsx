import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetBorrowSummaryQuery } from "@/redux/features/book/bookApi";
import { useEffect } from "react";
import { BookOpen, Calendar, CopyCheck } from "lucide-react";


const BorrowSummary = () => {
  const {
    data: borrowList,
    isLoading,
    isError,
  } = useGetBorrowSummaryQuery(undefined);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (isLoading) {
    return (
      <div className="p-6 grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 min-h-screen">
        {[...Array(6)].map((_, idx) => (
          <Skeleton key={idx} className="h-48 w-full rounded-xl" />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-center text-red-600 text-lg font-semibold">
          ❌ Failed to load borrow summary.
        </p>
      </div>
    );
  }

  if (!borrowList.data?.length) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 text-lg">📚 No borrowed books yet.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF2DF] via-[#FFE0B2] to-[#D3A376] px-6 py-28">
      <h2 className="text-3xl font-bold text-[#3E2522] mb-8 text-center drop-shadow">
        📖 Borrow Summary
      </h2>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {borrowList.data.map((borrow: any, index: any) => (
          <Card
            key={index}
            className="bg-white rounded-2xl border border-[#8C6E63] shadow-xl hover:scale-[1.02] transition-transform duration-300"
          >
            <CardContent className="p-6 space-y-3">
              <h3 className="text-xl font-bold text-[#3E2522] flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-[#D3A376]" />
                {borrow.book?.title}
              </h3>
              <p className="text-sm text-[#5A3A2A]">
                <strong>Author:</strong> {borrow.book?.author}
              </p>
              <p className="text-sm text-[#5A3A2A] flex items-center gap-1">
                <CopyCheck className="w-4 h-4 text-[#8C6E63]" />
                <strong>Quantity:</strong> {borrow.totalQuantity}
              </p>
              <p className="text-sm text-[#5A3A2A] flex items-center gap-1">
                <Calendar className="w-4 h-4 text-[#8C6E63]" />
                <strong>Due Date:</strong>{" "}
                {new Date(borrow.dueDate).toLocaleDateString()}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default BorrowSummary;
