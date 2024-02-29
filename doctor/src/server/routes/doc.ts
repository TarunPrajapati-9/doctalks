import { getCurrentUser } from "@/actions/actions";
import { doctorProcedure, router } from "../trpc";

const doctorRouter = router({
  getCurrentDoctor: doctorProcedure.query(async () => {
    return await getCurrentUser();
  }),
});

export default doctorRouter;
