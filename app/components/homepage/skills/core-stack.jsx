import { FiDatabase } from "react-icons/fi";
import { SiApachespark, SiMicrosoftexcel, SiPowerbi, SiPython, SiTableau } from "react-icons/si";
import { coreStack } from "@/utils/data/skills";

const icons = { python: SiPython, database: FiDatabase, powerbi: SiPowerbi, tableau: SiTableau, spark: SiApachespark, excel: SiMicrosoftexcel };

export default function CoreStack() {
  return <div className="core-stack-wrap" data-reveal="up">
    <p className="eyebrow code-eyebrow">{"// CORE STACK"}</p>
    <div className="core-stack">{coreStack.map(({ name, icon }, index) => {
      const Icon = icons[icon];
      return <div className="core-stack-card" data-reveal-child key={name} style={{ "--i": index }}><Icon aria-hidden="true" /><span>{name}</span></div>;
    })}</div>
  </div>;
}
