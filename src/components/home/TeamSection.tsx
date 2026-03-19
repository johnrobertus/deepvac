import { SectionHeader } from "@/components/SectionHeader";
import { Reveal } from "@/components/Reveal";
import { Linkedin } from "lucide-react";
import johnPhoto from "@/assets/john-robertus.jpg";
import antonPhoto from "@/assets/anton-opalikhin.jpg";

const team = [
  {
    name: "John Robertus",
    role: "CEO | Co-Founder",
    description: "Electrical engineer specialized in AI integration for mechatronic systems.",
    photo: johnPhoto,
    photoPosition: "50% 18%",
    photoScale: 1.23,
  },
  {
    name: "Anton Opalikhin",
    role: "CTO | Co-Founder",
    description: "Mechanical engineer specialized in refrigeration and test chamber development.",
    photo: antonPhoto,
    photoPosition: "50% 16%",
    photoScale: 1.05,
  },
];

export function TeamSection() {
  return (
    <section className="py-20 md:py-28 px-6 bg-surface/30">
      <div className="container max-w-6xl">
        <Reveal>
          <SectionHeader eyebrow="Leadership" title="Engineering-Led from Day One" className="mb-6" />
          <p className="text-sm text-gray leading-relaxed max-w-3xl mb-14">
            Deepvac is led by a founding team with more than 15 years of combined experience in the development and
            manufacturing of test chamber systems. Combining electrical engineering, mechatronics, refrigeration
            expertise, and chamber development know-how, the team brings complementary competencies required for
            advanced thermal vacuum system design.
          </p>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl">
          {team.map((member, i) => (
            <Reveal key={member.name} delay={i * 100}>
              <div className="bento-card rounded-lg overflow-hidden group h-full">
                <div className="aspect-[4/5] overflow-hidden bg-black">
                  <img
                    src={member.photo}
                    alt={`${member.name} | ${member.role}`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    style={{
                      objectPosition: member.photoPosition || "50% 16%",
                      transform: `scale(${member.photoScale || 1})`,
                      transformOrigin: "center top",
                    }}
                  />
                </div>
                <div className="p-5 space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-medium text-sand">{member.name}</h3>
                    <a
                      href="https://linkedin.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray/40 hover:text-blue transition-colors"
                      aria-label={`${member.name} LinkedIn profile`}
                    >
                      <Linkedin className="w-4 h-4" />
                    </a>
                  </div>
                  <span className="mono-label text-blue">{member.role}</span>
                  <p className="text-xs text-gray leading-relaxed">{member.description}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
