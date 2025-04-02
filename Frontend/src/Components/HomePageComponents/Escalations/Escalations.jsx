import React from "react";
import { EscalationItem } from "./EscalationItem";

const Escalations = ({ escalations }) => {
  return (
     <div className="relative p-6">
          <h2 className="mb-6 [font-family:'Darker_Grotesque',Helvetica] font-medium text-black text-4xl tracking-[-1.08px] leading-[normal]">
            Escalations
          </h2>
    
          <div className="space-y-2">
            {escalations.map((escalation, index) => (
              <EscalationItem
                key={index}
                escalation={escalation}
                index={index}
              />
            ))}
          </div>
        </div>
  );
};
export default Escalations;