import { getCurrentSessions } from "@/actions/actions";
import EmptyState from "@/components/shared/EmptyState";

const Sessions = async () => {
  const sessions = await getCurrentSessions();
  return (
    <div className="w-full h-full">
      <h3 className="text-2xl mb-6 font-semibold">Upcoming sessions</h3>
      {sessions.length === 0 ? (
        <div className="w-full h-full">
          <EmptyState
            message="No sessions available"
            imageUrl="/not_found_2.svg"
          />
        </div>
      ) : (
        <div>
          <h3>Sessions</h3>
        </div>
      )}
    </div>
  );
};

export default Sessions;
