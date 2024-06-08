import clsx from "clsx";
import React from "react";
import Link from "next/link";
import Boundary from "@/components/boundary";
import { FaGithub, FaTwitter, FaLinkedin } from "react-icons/fa6";

export default async function Footer({ settings }: {
  settings: {
    data: {
      name: string
      nav_item: {
        link: any
        label: string
      }[]
      github_link?: string
      twitter_link?: string
      linkedin_link?: string
    }
  }
}) {
  return (
    <Boundary as="footer" className="text-focus-in text-slate-600">
      <footer className="container mx-auto mt-20 flex flex-col items-center justify-between gap-6 py-8 sm:flex-row ">
        <div className="name flex flex-col items-center justify-center gap-x-4 gap-y-2 sm:flex-row sm:justify-self-start">
          <Link
            href="/"
            className="text-xl font-extrabold tracking-tighter text-slate-100 transition-colors duration-150 hover:text-yellow-500"
          >
            {settings.data.name}
          </Link>
          <span
            className="hidden text-5xl font-extralight leading-[0] text-slate-400 sm:inline"
            aria-hidden={true}
          >
            /
          </span>
          <p className="text-sm text-slate-300 pt-1">
            © {new Date().getFullYear()} {settings.data.name}
          </p>
        </div>
        <nav className="navigation" aria-label="Footer Navigation">
          <ul className="flex items-center gap-1">
            {settings.data.nav_item.map(({ link, label }, index) => (
              <React.Fragment key={label}>
                <li>
                  <Link
                    className={clsx(
                      "group relative block overflow-hidden  rounded px-3 py-1 text-base font-bold text-slate-100 transition-colors duration-150 hover:hover:text-yellow-500",
                    )}
                    href={link}
                  >
                    {label}
                  </Link>
                </li>
                {index < settings.data.nav_item.length - 1 && (
                  <span
                    className="text-4xl font-thin leading-[0] text-slate-400"
                    aria-hidden="true"
                  >
                    /
                  </span>
                )}
              </React.Fragment>
            ))}
          </ul>
        </nav>
        <div className="socials inline-flex justify-center sm:justify-end">
          {settings.data.github_link && (
            <Link
              href={settings.data.github_link}
              className="p-2 text-2xl text-slate-300 transition-all duration-150 hover:scale-125 hover:text-yellow-500"
              aria-label={settings.data.name + " on GitHub"}
              target="_blank"
            >
              <FaGithub />
            </Link>
          )}
          {settings.data.twitter_link && (
            <Link
              href={settings.data.twitter_link}
              className="p-2 text-2xl text-slate-300 transition-all duration-150 hover:scale-125 hover:text-yellow-500"
              aria-label={settings.data.name + " on Twitter"}
              target="_blank"
            >
              <FaTwitter />
            </Link>
          )}
          {settings.data.linkedin_link && (
            <Link
              href={settings.data.linkedin_link}
              className="p-2 text-2xl text-slate-300 transition-all duration-150 hover:scale-125 hover:text-yellow-500"
              aria-label={settings.data.name + " on LinkedIn"}
              target="_blank"
            >
              <FaLinkedin />
            </Link>
          )}
        </div>
      </footer>
    </Boundary>
  );
}
