import { Link } from "@tanstack/react-router";
import { DialogTrigger, Dialog, DialogContent } from "./ui/dialog";
import { useEffect } from "react";

const Reviews = ({
  reviews,
}: {
  reviews: { author: string; content: string }[] | undefined;
}) => {
  useEffect(() => {
    console.log("reviews here: ", reviews);
  }, []);
  
  return (
    <Dialog>
      <div>
        <form>
          <DialogTrigger asChild>
            <div className="cursor-pointer hover:underline">
              {reviews && reviews.length !== undefined ? (
                <>
                  +<span>{reviews.length - 1}</span> more...
                </>
              ) : null}
            </div>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] [&>button]:hidden h-96 overflow-y-auto">
            {reviews?.map((review, index) => (
              <div className="border rounded-md p-2 bg-muted/20" key={index}>
                <Link
                  to="/user/$username"
                  params={{ username: review.author }}
                  className="text-sm font-medium hover:underline cursor-pointer"
                >
                  @{review.author}
                </Link>

                <p className="text-sm">{review.content}</p>
              </div>
            ))}
          </DialogContent>
        </form>
      </div>
    </Dialog>
  );
};

export default Reviews;
