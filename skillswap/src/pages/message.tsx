import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

const users = [
  { name: "Jane Doe", username: "janedoe", avatar: "https://i.pravatar.cc/150?img=1" },
  { name: "John Smith", username: "johnsmith", avatar: "https://i.pravatar.cc/150?img=2" },
  { name: "Aisha Khan", username: "aishathedev", avatar: "https://i.pravatar.cc/150?img=5" },
];

const Message = () => {
  return (
    <div className="flex h-screen bg-background text-foreground">
      {/* Left Sidebar - Chat List */}
      <div className="w-1/3 border-r p-4">
        <h2 className="text-xl font-semibold mb-4">Chats</h2>
        <ScrollArea className="space-y-2">
          {users.map((user) => (
            <div
              key={user.username}
              className="flex items-center gap-3 p-2 hover:bg-muted rounded-lg cursor-pointer transition"
            >
              <Avatar>
                <AvatarImage src={user.avatar} />
                <AvatarFallback>{user.name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{user.name}</p>
                <p className="text-xs text-muted-foreground">@{user.username}</p>
              </div>
            </div>
          ))}
        </ScrollArea>
      </div>

      {/* Right Side - Chat Box */}
      <div className="flex flex-col w-2/3">
        <Card className="flex-1 rounded-none border-l-0 border-r-0">
          <CardHeader>
            <CardTitle className="text-lg">Chat with Jane Doe</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[60vh] space-y-4 pr-4">
              {/* Example messages */}
              <div className="flex justify-start">
                <div className="bg-muted px-4 py-2 rounded-lg max-w-xs">
                  Hi! I need help with React.
                </div>
              </div>
              <div className="flex justify-end">
                <div className="bg-primary text-white px-4 py-2 rounded-lg max-w-xs">
                  Sure! What’s the issue?
                </div>
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Chat Input */}
        <div className="border-t p-4 flex gap-2">
          <Input placeholder="Type a message..." className="flex-1" />
          <Button type="submit">Send</Button>
        </div>
      </div>
    </div>
  );
};

export default Message;
