import Image from "next/image";

type Props = {
  imageUrl?: string;
  message?: string | JSX.Element;
};

const EmptyState = ({ imageUrl, message }: Props) => {
  return (
    <div className="h-full w-full flex flex-col items-center justify-center">
      <Image
        src={imageUrl ?? "/empty_state.svg"}
        alt="No data found"
        height={250}
        width={250}
        className="pointer-events-none"
      />
      <span className="text-gray-500 text-lg mt-10 select-none">
        {message ?? "No data found"}
      </span>
    </div>
  );
};

export default EmptyState;
