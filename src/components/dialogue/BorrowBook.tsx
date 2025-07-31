import {  useNavigate } from "react-router-dom";
import React, { useState } from "react";
import {
  useBorrowBookMutation,
  useGetBookQuery,
} from "@/redux/features/book/bookApi";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";


type BorrowBookProps = {
  bookId: any; // or `id: any` if unsure
};

const BorrowBook: React.FC<BorrowBookProps> = ({ bookId }) => {
//   const { bookId } = useParams();
  const navigate = useNavigate();
  const { data: book } = useGetBookQuery(bookId!);
    const [borrowBook] = useBorrowBookMutation();
    const [open, setOpen] = useState(false);

  const [quantity, setQuantity] = useState(1);
  const [dueDate, setDueDate] = useState("");

    const handleBorrow = async () => {
      console.log(bookId, quantity, dueDate);
      
    if (!bookId || !quantity || !dueDate) return;
    try {
      await borrowBook({ quantity, dueDate, book: bookId }).unwrap();
      navigate("/borrow-summary");
    } catch (err) {
      console.error("Borrow failed", err);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Borrow</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Borrow Book</DialogTitle>
          <DialogDescription>
            {book?.title ? `Borrow "${book.title}"` : "Loading book details..."}
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="quantity" className="text-right">
              Quantity
            </Label>
            <Input
              id="quantity"
              type="number"
              min={1}
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="dueDate" className="text-right">
              Due Date
            </Label>
            <Input
              id="dueDate"
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="col-span-3"
            />
          </div>
        </div>

        <DialogFooter>
          <Button onClick={handleBorrow}>Confirm Borrow</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}


export default BorrowBook;