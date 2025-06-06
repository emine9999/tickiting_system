"use client";

import useUser from "@/hooks/useUser";
import { useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useRouter } from "next/navigation";
import { useGetCallById } from "@/hooks/useGetCallById";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const Table = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <div className="flex flex-col items-start gap-2 xl:flex-row">
      <h1 className="text-base font-medium text-slate-600 dark:text-slate-400 lg:text-xl xl:min-w-32">
        {title}:
      </h1>
      <h1 className="truncate text-sm font-bold max-sm:max-w-[320px] lg:text-xl text-gray-900 dark:text-white">
        {description}
      </h1>
    </div>
  );
};

const PersonalRoom = () => {
  const router = useRouter();
  const { user } = useUser();
  const client = useStreamVideoClient();

  const meetingId = user?.id;
  const { call } = useGetCallById(meetingId!);

  const startRoom = async () => {
    if (!client || !user) return;

    const newCall = client.call("default", meetingId!);

    if (!call) {
      await newCall.getOrCreate({
        data: {
          starts_at: new Date().toISOString(),
        },
      });
    }

    router.push(`/meeting/${meetingId}?personal=true`);
  };

  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${meetingId}?personal=true`;

  return (
    <section className="flex size-full flex-col gap-10 text-gray-900 dark:text-white">
      <h1 className="text-xl font-bold lg:text-3xl">Personal Meeting Room</h1>
      <div className="flex w-full flex-col gap-8 xl:max-w-[900px]">
        <Table title="Topic" description={`${user?.name}'s Meeting Room`} />
        <Table title="Meeting ID" description={meetingId!} />
        <Table title="Invite Link" description={meetingLink} />
      </div>
      <div className="flex gap-5">
        <Button className="bg-blue-600 hover:bg-blue-700 text-white" onClick={startRoom}>
          Start Meeting
        </Button>
        <Button
          className="bg-gray-200 dark:bg-dark-3 hover:bg-gray-300 dark:hover:bg-dark-4 text-gray-800 dark:text-white"
          onClick={() => {
            navigator.clipboard.writeText(meetingLink);
            toast("Link Copied");
          }}
        >
          Copy Invitation
        </Button>
      </div>
    </section>
  );
};

export default PersonalRoom;
