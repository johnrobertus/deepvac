import { SectionHeader } from "@/components/SectionHeader";
import { Reveal } from "@/components/Reveal";
import { Linkedin } from "lucide-react";
import johnPhoto from "@/assets/john-robertus.jpg";
import antonPhoto from "@/assets/anton-opalikhin.jpg";

const team = [
  {
    name: "John Robertus",
    role: "CEO | Co-Founder",
    description:
      "Electrical engineer focused on intelligent system integration, control architecture, and data-driven automation for mechatronic systems.",
    photo: johnPhoto,
    photoPosition: "50% 18%",
    photoScale: 1.23,
    linkedin: "",
  },
  {
    name: "Anton Opalikhin",
    role: "CTO | Co-Founder",
    description:
      "Mechanical engineer focused on refrigeration systems, chamber development, and thermal vacuum infrastructure for demanding test applications.",
    photo: antonPhoto,
    photoPosition: "50% 16%",
    photoScale: 1.05,
    linkedin: "",
  },
];

export function TeamSection() {
  return (
    <section className="bg-surface/30 px-6 py-20 md:py-28">
      <div className="container max-w-6xl">
        <Reveal>
          <SectionHeader
            eyebrow="Leadership"
            title="Engineering-Led from Day One"
            description="Deepvac is led by a founding team with complementary expertise in electrical engineering, mechatronics, refrigeration systems, and chamber development. This combination supports the development of advanced thermal vacuum infrastructure with strong technical depth across system design and implementation."
            className="mb-14 max-w-3xl"
          />
        </Reveal>

        <div className="grid max-w-4xl grid-cols-1 gap-8 md:grid-cols-2">
          {team.map((member, i) => (
            <Reveal key={member.name} delay={i * 100}>
              <div className="bento-card group h-full overflow-hidden rounded-lg">
                <div className="aspect-[4/5] overflow-hidden bg-black">
                  <img
                    src={member.photo}
                    alt={member.name}
                    className="h-full w-full object-cover"
                    loading="lazy"
                    style={{
                      objectPosition: member.photoPosition || "50% 16%",
                      transform: `scale(${member.photoScale || 1})`,
                      transformOrigin: "center top",
                    }}
                  />
                </div>

                <div className="space-y-3 p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1">
                      <h3 className="text-base font-medium text-sand">{member.name}</h3>
                      <span className="mono-label text-blue">{member.role}</span>
                    </div>

                    {member.linkedin ? (
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-0.5 text-gray/40 transition-colors hover:text-blue"
                        aria-label={`${member.name} LinkedIn profile`}
                      >
                        <Linkedin className="h-4 w-4" />
                      </a>
                    ) : null}
                  </div>

                  <p className="text-xs leading-relaxed text-gray">{member.description}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
