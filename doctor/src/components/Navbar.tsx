"use client";

import { Plus } from "lucide-react";
import Link from "next/link";

import useModal from "@/hooks/useModal";

type Props = {
  name: string;
  balance: number;
};

const Navbar: React.FC<Props> = ({ balance, name }) => {
  const { openModal } = useModal();
  return (
    <nav className="navbar shadow-sm bg-gray-100">
      <div className="flex-1">
        <button className="btn btn-ghost normal-case text-xls">
          <Link href="/">DocTalks</Link>
        </button>
        <h1 className="text-lg ml-4 text-gray-600">
          hello,&nbsp;
          <span className=" font-bold text-green-600">
            {name} (total earnings {balance} ₹)
          </span>
        </h1>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li
            data-tip="Add New Listing"
            className="tooltip tooltip-left tooltip-success"
          >
            <button
              onClick={() => openModal("create-listing")}
              className="btn btn-ghost btn-circle btn-sm"
            >
              <Plus />
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
