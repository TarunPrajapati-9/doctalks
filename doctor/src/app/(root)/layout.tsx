import { redirect } from "next/navigation";

import { getCurrentUser } from "@/actions/actions";
import verifyTokenServerSize from "@/utils/func/verifytoken";

import Navbar from "@/components/Navbar";
import UtilityHeader from "@/components/shared/UtilityHeader";

type Props = {
  children: React.ReactNode;
  upcoming: React.ReactNode;
  past: React.ReactNode;
};

const HomeLayout = async ({ children, upcoming, past }: Props) => {
  const flag = verifyTokenServerSize();
  if (!flag) {
    return redirect("/login");
  }
  const doc = await getCurrentUser();
  return (
    <main>
      <Navbar balance={doc?.balance ?? 0} name={doc?.d_name ?? ""} />
      {children}
      <div className="container mx-auto">
        <>{/* <UtilityHeader /> */}</>
        <div className="flex w-full justify-evenly flex-wrap gap-12 md:gap-0">
          <div className="w-full md:w-1/2">{upcoming}</div>
          <div className="w-full md:w-1/2">{past}</div>
        </div>
      </div>
    </main>
  );
};

export default HomeLayout;
