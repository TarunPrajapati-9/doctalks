import { getCurrentUser } from "@/actions/actions";
import Client from "./_components/Client";

type Props = {
  params: { id: string };
};

const RoomPage = async ({ params }: Props) => {
  const { id } = params;
  const currentDoctor = await getCurrentUser();

  return (
    <div>
      <Client
        doctor_id={currentDoctor?.id ?? ""}
        id={id}
        doctor_name={currentDoctor?.d_name ?? "Arshil"}
      />
    </div>
  );
};

export default RoomPage;
