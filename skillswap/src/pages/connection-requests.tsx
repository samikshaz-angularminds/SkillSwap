import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { connectionRequests } from "@/data/connection-requests";



const ConnectionRequests = () => {
  return (
    <div className="p-6 min-h-screen bg-background text-foreground">
      <Card className="max-w-3xl mx-auto shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl">Connection Requests</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {connectionRequests.map((request, index) => (
            <div key={request.id}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage src={request.avatar} />
                    <AvatarFallback>{request.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{request.name}</p>
                    <p className="text-sm text-muted-foreground">
                      Wants help with <strong>{request.skill}</strong>
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="default" className="bg-green-300">Accept</Button>
                  <Button variant="destructive" className="bg-red-500">Reject</Button>
                </div>
              </div>
              {index !== connectionRequests.length - 1 && <Separator className="my-4" />}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default ConnectionRequests;
