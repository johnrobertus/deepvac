import { useTranslation } from "react-i18next";
import { SectionHeader } from "@/components/SectionHeader";
import { Reveal } from "@/components/Reveal";
import { Linkedin } from "lucide-react";
import johnPhoto from "@/assets/john-robertus.jpg";
import antonPhoto from "@/assets/anton-opalikhin.jpg";

const teamPhotos = [johnPhoto, antonPhoto];
const photoPositions = ["50% 18%", "50% 16%"];
const photoScales = [1.23, 1.05];
const linkedinUrls = ["", ""];

export function TeamSection() {
  const { t } = useTranslation("home");
  const members = t("team.members", { returnObjects: true }) as { name: string; role: string; description: string }[];

  return (
    <section className="bg-surface/30 px-6 py-20 md:py-28">
      <div className="container max-w-6xl">
        <Reveal>
          <SectionHeader
            eyebrow={t("team.eyebrow")}
            title={t("team.title")}
            description={t("team.description")}
            className="mb-14 max-w-3xl"
          />
        </Reveal>

        <div className="grid max-w-4xl grid-cols-1 gap-8 md:grid-cols-2">
          {Array.isArray(members) && members.map((member, i) => (
            <Reveal key={member.name} delay={i * 100}>
              <div className="bento-card group h-full overflow-hidden rounded-lg">
                <div className="aspect-[4/5] overflow-hidden bg-black">
                  <img
                    src={teamPhotos[i]}
                    alt={member.name}
                    className="h-full w-full object-cover"
                    loading="lazy"
                    style={{
                      objectPosition: photoPositions[i] || "50% 16%",
                      transform: `scale(${photoScales[i] || 1})`,
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
                    {linkedinUrls[i] ? (
                      <a href={linkedinUrls[i]} target="_blank" rel="noopener noreferrer" className="mt-0.5 text-gray/40 transition-colors hover:text-blue" aria-label={`${member.name} LinkedIn profile`}>
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
