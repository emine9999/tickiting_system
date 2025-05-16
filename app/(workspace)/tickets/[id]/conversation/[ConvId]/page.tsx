import getConversationById from "@/actions/getConversationById";
import getMessages from "@/actions/getMessages";
import Header from "@/components/chats/Header";
import Body from "@/components/chats/Body";
import Form from "@/components/chats/Form";
interface IParams {
  ConvId: string;
  id: string;
}

const ConversationId = async ({ params }: { params: IParams }) => {
  const conversation = await getConversationById(params.ConvId);
  const messages = await getMessages(params.ConvId);

  if (!conversation || !("id" in conversation) || !("name" in conversation)) {
    return <div>No conversation found</div>;
  }

  return (
    <div className="flex h-full flex-col">
      <Header conversation={conversation as any} />
      <Body initialMessages={messages as any}/>
      <div className="mt-auto">
        <Form />
      </div>
    </div>
  );
};

export default ConversationId;
