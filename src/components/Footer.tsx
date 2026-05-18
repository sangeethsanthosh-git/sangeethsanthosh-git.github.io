import Image from "next/image";
import { socials } from "@/data/portfolio";

export default function Footer() {
  const year = new Date().getFullYear();
  const isEmailLink = socials.emailHref.startsWith("mailto:");

  return (
    <footer id="contact" className="bg-black py-20 text-white sm:py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-2xl text-center lg:text-left">
            <p className="text-xs uppercase tracking-[0.28em] text-[#faecd2]/80 sm:text-sm sm:tracking-[0.35em]">
              Contact
            </p>
            <h2 className="mt-4 text-[clamp(3rem,14vw,5rem)] font-semibold leading-none text-white">
              <span className="block">Get In</span>
              <span className="block">Touch</span>
            </h2>
            <p className="mt-5 max-w-lg text-sm leading-7 text-white/65 sm:mt-6 sm:text-base">
              {socials.description}
            </p>
          </div>

          <div className="text-center lg:text-left">
            <h3 className="text-lg font-medium text-[#f9f5ed]">{socials.heading}</h3>
            <a
              href={socials.emailHref}
              target={isEmailLink ? undefined : "_blank"}
              rel={isEmailLink ? undefined : "noopener noreferrer"}
              className="mt-4 inline-flex w-full justify-center rounded-full border border-white/15 bg-white/5 px-4 py-3 text-sm font-medium text-white transition-transform duration-200 hover:scale-[1.02] sm:w-auto"
            >
              Email Me
            </a>

            <ul className="mt-6 flex flex-wrap items-center justify-center gap-3 sm:gap-4 lg:justify-start">
              {socials.links.map((link) => {
                const isMailLink = link.href.startsWith("mailto:");

                return (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target={isMailLink ? undefined : "_blank"}
                      rel={isMailLink ? undefined : "noopener noreferrer"}
                      aria-label={link.label}
                      className="inline-flex rounded-full border border-white/10 bg-white/5 p-3 transition-transform duration-200 hover:scale-[1.02]"
                    >
                      <Image
                        src={link.icon}
                        alt={link.label}
                        width={28}
                        height={28}
                        loading="lazy"
                        sizes="28px"
                        className="h-7 w-7"
                      />
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div className="mt-14 border-t border-white/10 pt-6 text-center text-xs text-white/45 sm:mt-16 lg:text-left">
          <p>&copy; {year} {socials.copyrightName}</p>
        </div>
      </div>
    </footer>
  );
}
