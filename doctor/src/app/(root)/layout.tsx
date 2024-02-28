import verifyTokenServerSize from "@/utils/func/verifytoken";
import { redirect } from "next/navigation";

type Props = {
  children: React.ReactNode;
};

const HomeLayout = ({ children }: Props) => {
  const flag = verifyTokenServerSize();
  if (!flag) {
    return redirect("/login");
  }
  return <>{children}</>;
};

export default HomeLayout;
