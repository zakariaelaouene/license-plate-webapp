import { ReactComponent as NotFoundImage } from "../../assets/images/not-found.svg";
import Button from "../../components/button";
import { Link } from "react-router-dom";
import { IoMdArrowBack } from "react-icons/io";

function NotFoundPage() {
  return (
    <div className=" w-full h-full mx-auto flex-center">
      <div className="flex flex-col gap-4 items-center max-h-8/10 max-w-8/10">
        <NotFoundImage className="max-w-full max-h-full" />
        <div className="flex justify-evenly items-center w-full flex-wrap gap-4">
          <div className="text-4xl font-bold">Page not found!</div>
          <Link to="/">
            <Button className="py-4 w-[15rem] text-2xl flex justify-end items-center group capitalize">
              <IoMdArrowBack className="text-3xl mr-2 group-hover:mr-4 transition-[margin-right]" />
              <span className="mr-4">go back home</span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NotFoundPage;
