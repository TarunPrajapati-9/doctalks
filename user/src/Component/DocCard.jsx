import { useNavigate } from "react-router-dom";

const DocCard = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/booking");
  };
  return (
    <div className="inline-flex w-96 max-w-xs bg-base-100 shadow-xl flex-col rounded-lg m-3">
      <div className="flex items-center gap-4 ml-4 mt-4 mr-4 mb-1">
        <img
          src="/images/github.png"
          alt="profile"
          className="h-12 w-12 rounded-full pointer-events-none"
        />
        <div className="flex w-full flex-col gap-0.5">
          <div className="flex items-center justify-between">
            <h5 className="block text-lg font-semibold">Steven Strange</h5>
            <div className="flex items-center">
              <div className="rating rating-sm">
                <input
                  type="radio"
                  name="rating-1"
                  className="mask mask-star"
                />
                <input
                  type="radio"
                  name="rating-1"
                  className="mask mask-star"
                  defaultChecked
                />
                <input
                  type="radio"
                  name="rating-1"
                  className="mask mask-star"
                />
                <input
                  type="radio"
                  name="rating-1"
                  className="mask mask-star"
                />
                <input
                  type="radio"
                  name="rating-1"
                  className="mask mask-star"
                />
              </div>
            </div>
          </div>
          <p className="block text-sm">Gynacologist</p>
        </div>
      </div>
      <div className="flex flex-row ml-20 mb-3 mr-4 gap-3 justify-between">
        <div className="flex flex-col">
          <p className="block text-sm mb-1">Exp: 5 yr</p>
          <p className="block text-sm">Fees: 45₹</p>
        </div>
        <button
          type="submit"
          className="btn btn-sm btn-outline btn-accent place-self-center"
          onClick={handleClick}
        >
          Book
        </button>
      </div>
    </div>
  );
};

export default DocCard;
