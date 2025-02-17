import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { StorageKey } from "@/lib/storageKey";
import type {
  participantDataType,
  participantsDataType
} from "@/types/participantsData";
import { ChevronLeft } from "lucide-react";
import { useState } from "react";

import { useStorage } from "@plasmohq/storage/hook";

import "@/style.css";

function IndexPopup() {
  const [selectedParticipant, setSelectedParticipant] =
    useState<participantDataType | null>(null);
  const [participantsData] = useStorage<participantsDataType>(
    StorageKey.ParticipantsData
  );

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        padding: 16,
        width: 400
      }}>
      {selectedParticipant == null ? (
        <Table>
          <TableHeader>
            <TableRow key="participants-header">
              <TableHead className="items-center">
                Participating Websites
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {participantsData?.websites.map((participantData) => (
              <TableRow
                key={`participants-header-${participantData.name}`}
                style={{ cursor: "pointer" }}
                onClick={() => setSelectedParticipant(participantData)}>
                <TableCell className="font-medium">
                  {participantData.name}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <>
          <Table>
            <TableHeader>
              <TableRow key="messages-header">
                <TableHead className="items-center">Messages</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {selectedParticipant.messages.map((message, index) => (
                <TableRow key={`messages-header-${index}`}>
                  <TableCell className="font-medium">{message}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Button onClick={() => setSelectedParticipant(null)}>
            <ChevronLeft className="mr-2 h-4 w-4" />
            Go Back
          </Button>
        </>
      )}
    </div>
  );
}

export default IndexPopup;
