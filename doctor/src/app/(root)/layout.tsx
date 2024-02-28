import { redirect } from "next/navigation";

import { getCurrentUser } from "@/actions/actions";
import verifyTokenServerSize from "@/utils/func/verifytoken";

import Navbar from "@/components/Navbar";

type Props = {
  children: React.ReactNode;
  listings: React.ReactNode;
  sessions: React.ReactNode;
};

const HomeLayout = async ({ children, listings, sessions }: Props) => {
  const flag = verifyTokenServerSize();
  if (!flag) {
    return redirect("/login");
  }
  const doc = await getCurrentUser();
  return (
    <main>
      <Navbar balance={doc?.balance ?? 0} name={doc?.d_name ?? ""} />
      {children}
      {/* <div className="container mx-auto flex w-full justify-evenly flex-wrap gap-12 md:gap-0">
        <div className="w-full md:w-1/2">{listings}</div>
        <div className="w-full md:w-1/2">{sessions}</div>
      </div> */}
    </main>
  );
};

export default HomeLayout;
