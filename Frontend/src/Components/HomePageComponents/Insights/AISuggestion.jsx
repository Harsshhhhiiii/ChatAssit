import React from "react";
import { Card,CardContent } from "../../ui/card";

export const AISuggestion = ({ suggestion, index }) => {
  return (
    <Card className="relative w-[191px] h-[100px] rounded-[10px] border-[#979797] shadow-[0px_4px_18.4px_-5px_#edffc8]">
      <CardContent className="p-0">
        <img
          className={`absolute w-${
            index === 0 ? "4" : index === 1 ? "[15px]" : "[11px]"
          } h-4 top-${index === 0 ? "[15px]" : "3.5"} left-${
            index === 0 ? "[17px]" : index === 1 ? "5" : "[21px]"
          }`}
          alt={`Icon ${
            index === 0 ? "pencil" : index === 1 ? "person" : "question"
          }`}
          src={suggestion.icon}
        />

        <div
          className={`absolute top-8 left-[${
            index === 0 ? "18" : index === 1 ? "18" : "21"
          }px] [font-family:'Darker_Grotesque',Helvetica] font-medium text-black text-xl tracking-[-0.60px] leading-[normal]`}
        >
          {suggestion.text}
        </div>
      </CardContent>
    </Card>
  );
};