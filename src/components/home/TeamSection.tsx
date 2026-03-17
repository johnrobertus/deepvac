import { SectionHeader } from "@/components/SectionHeader";
import { PlaceholderImage } from "@/components/PlaceholderImage";
import { Linkedin } from "lucide-react";

const team = [
  {
    name: "John Robertus",
    role: "CEO | Co-Founder",
    description: "Electrical engineer specialized in AI integration for mechatronic systems.",
  },
  {
    name: "Anton Opalikhin",
    role: "CTO | Co-Founder",
    description: "Mechanical engineer specialized in refrigeration and test chamber development.",
  },
];

export function TeamSection() {
  return (
    <section className="py-20 md:py-28 px-6 bg-surface/30">
      <div className="container max-w-6xl">
        <SectionHeader
          eyebrow="Leadership"
          title="Engineering-Led from Day One"
          className="mb-6"
        />
        <p className="text-sm text-gray leading-relaxed max-w-3xl mb-14">
          DEEPVAC is led by a founding team with more than 15 years of combined experience in the development and manufacturing of test chamber systems. Combining electrical engineering, mechatronics, refrigeration expertise, and chamber development know-how, the team brings complementary competencies required for advanced thermal vacuum system design.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl">
          {team.map((member) => (
            <div key={member.name} className="bento-card rounded-lg overflow-hidden group">
              <PlaceholderImage
                assetId={member.name.split(" ")[1]?.toUpperCase() || "TEAM"}
                type="PORTRAIT"
                aspectRatio="4/5"
                className="rounded-none"
              />
              <div className="p-5 space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-medium text-sand">{member.name}</h3>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray/40 hover:text-blue transition-colors"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                </div>
                <span className="mono-label text-blue">{member.role}</span>
                <p className="text-xs text-gray leading-relaxed">{member.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
