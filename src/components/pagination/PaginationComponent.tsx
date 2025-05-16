import { useSearchParams } from "react-router-dom";
import { Button } from "../ui/button";
import { ArrowBigLeftDash, ArrowBigRightDash } from "lucide-react";
import { useState } from "react";

const PaginationComponent = ({ disableNext }: { disableNext?: boolean }) => {
  const [params, setParams] = useSearchParams();
  const [isPreviousTemporarilyDisabled, setIsPreviousTemporarilyDisabled] =
    useState(false);
  const [isNextTemporarilyDisabled, setIsNextTemporarilyDisabled] =
    useState(false);

  const page = params.get("page") ?? "1";
  const limit = params.get("limit") ?? "10";

  const handleNextClick = () => {
    setIsNextTemporarilyDisabled(true);
    const newParams = new URLSearchParams(params);
    newParams.set("page", (parseInt(page) + 1).toString());
    setParams(newParams, { replace: true });
    setTimeout(() => {
      setIsNextTemporarilyDisabled(false);
    }, 1000);
  };

  const handlePreviousClick = () => {
    setIsPreviousTemporarilyDisabled(true);
    const newParams = new URLSearchParams(params);
    newParams.set("page", (parseInt(page) - 1).toString());

    setParams(newParams, { replace: true });
    setTimeout(() => {
      setIsPreviousTemporarilyDisabled(false);
    }, 1000);
  };

  const handleLimitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newParams = new URLSearchParams(params);
    newParams.set("limit", e.target.value);
    setParams(newParams, { replace: true });
  };

  return (
    <div className="flex w-fit justify-between gap-3">
      <Button
        variant="ghost"
        disabled={page === "1" || isPreviousTemporarilyDisabled}
        onClick={handlePreviousClick}
      >
        <ArrowBigLeftDash />
      </Button>
      <span className="dark:bg-white bg-black w-8 aspect-square flex items-center justify-center rounded-md text-lg dark:text-black text-white">
        {page}
      </span>
      <Button
        variant="ghost"
        disabled={disableNext || isNextTemporarilyDisabled}
        onClick={handleNextClick}
      >
        <ArrowBigRightDash />
      </Button>

      <select
        className="border-1 p-1 rounded-md"
        onChange={handleLimitChange}
        value={limit}
      >
        <option value={"5"}>5</option>
        <option value={"10"}>10</option>
        <option value={"20"}>20</option>
      </select>
    </div>
  );
};

export default PaginationComponent;
