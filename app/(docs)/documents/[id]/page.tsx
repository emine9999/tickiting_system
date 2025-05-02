import CollaborativeRoom from '@/components/editor/CollaborativeRoom'
import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { getUsers } from '@/actions/getUsers';
import { getDocument } from '@/actions/room.actions';

const Docuemts = async (props: SearchParamProps) => {
  const { id } = await props.params;

  const session = await auth();
  if (!session) redirect("/auth");

  const room = await getDocument({ roomId: id, userId: session.user?.email });
  if (!room) redirect("/documents");
  // this return the email of the user who created the room
  const userIds = Object.keys(room.usersAccesses);
  const response = await getUsers({ userIds });
  const user = await response.json();
  console.log("userInfoo", user);
  const usersData = user.map((user) => ({
    ...user,
    userType: room.usersAccesses[user.email]?.includes('room:write') ? 'editor' : 'viewer',
  }));

  const currentUserType = room.usersAccesses[session.user?.email]?.includes('room:write') ? 'editor' : 'viewer';

  return (
    <main className='w-full flex flex-col items-center '>
      <CollaborativeRoom 
        roomId={id}
        roomMetadata={room.metadata}
        users={usersData}
        currentUserType={currentUserType}
      />
    </main> 
  );
};

export default Docuemts;
