"use client";

import clsx from "clsx";
import React, { useState } from "react";
import Link from "next/link";
import { MdMenu, MdClose } from "react-icons/md";
import { usePathname } from 'next/navigation'
import Button from '@/components/button'
import { TypeAnimation } from 'react-type-animation'

export default function NavBar({
  settings,
  currentLanguage
}: {
  settings: {
    data: {
      name: string;
      nav_item: { link: string; label: string }[];
      cta_label: string;
      cta_link: string;
    }
    languages: { code: string; label: string }[];
  }
  currentLanguage: string;
}) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav aria-label="Main navigation" className="max-width-on-mobile">
      <ul className="flex flex-col max-width-on-mobile justify-between rounded-b-lg bg-slate-50 px-4 py-2 md:m-4 md:flex-row md:items-center md:rounded-xl">
        <div className="flex items-center justify-between">
          <NameLogo name={settings.data.name} />
          <button
            aria-expanded={open}
            aria-label="Open menu"
            className="block p-2 text-2xl text-slate-800 md:hidden"
            onClick={() => setOpen(true)}
          >
            <MdMenu />
          </button>
        </div>
        <div
          className={clsx(
            "fixed max-width-on-mobile bottom-0 left-0 right-0 top-0 z-50 flex flex-col items-end gap-4 bg-slate-50 pr-4 pt-14 transition-transform duration-300 ease-in-out md:hidden",
            open ? "translate-x-0" : "translate-x-full ",
          )}
        >
          <button
            aria-label="Close menu"
            aria-expanded={open}
            className="fixed right-4 top-3 block p-2 text-2xl text-slate-800 md:hidden "
            onClick={() => setOpen(false)}
          >
            <MdClose />
          </button>
          {settings.data.nav_item.map(({ link, label }, index) => (
            <React.Fragment key={label}>
              <li className="first:mt-8">
                <Link
                  className={clsx(
                    "group relative block overflow-hidden rounded px-3 text-3xl font-bold text-slate-900 ",
                  )}
                  href={link}
                  onClick={() => setOpen(false)}
                  aria-current={
                    pathname.includes(link)
                      ? "page"
                      : undefined
                  }
                >
                  <span
                    className={clsx(
                      "absolute inset-0 z-0 h-full translate-y-12 rounded bg-yellow-500 transition-transform duration-300 ease-in-out group-hover:translate-y-0",
                      pathname.includes(link)
                        ? "translate-y-6"
                        : "translate-y-18",
                    )}
                  />
                  <span className="relative">{label}</span>
                </Link>
              </li>
              {index < settings.data.nav_item.length - 1 && (
                <span
                  className="hidden text-4xl font-thin leading-[0] text-slate-400 md:inline"
                  aria-hidden="true"
                >
                  /
                </span>
              )}
            </React.Fragment>
          ))}
          <li>
            <Button
              url={settings.data.cta_link}
              label={settings.data.cta_label}
              className="ml-3"
            />
          </li>
        </div>
        <DesktopMenu settings={settings} pathname={pathname} currentLanguage={currentLanguage} />
      </ul>
    </nav>
  );
}

function NameLogo({ name }: { name: string }) {
  return (
    <Link
      href="/"
      aria-label="Home page"
      className="text-2xl font-extrabold tracking-tighter text-slate-900"
    >
      <TypeAnimation
        sequence={[
          1000,
          name,
          9000,
          "Creative Developer",
          3000
        ]}
        speed={60}
        deletionSpeed={80}
        wrapper="h2"
        repeat={Infinity}
      />
    </Link>
  );
}

function DesktopMenu({
  settings,
  pathname,
}: {
  settings: {
    data: {
      nav_item: { link: string; label: string }[];
      cta_label: string;
      cta_link: string;
    }
    languages: { code: string; label: string }[];
  };
  pathname: string;
  currentLanguage: string;
}) {
  return (
    <div className="relative z-50 hidden flex-row items-center gap-1 bg-transparent py-0 md:flex">
      {settings.data.nav_item.map(({ link, label }, index) => (
        <React.Fragment key={label}>
          <li>
            <Link
              className={clsx(
                "group relative block overflow-hidden rounded px-3 py-1 text-base font-bold text-slate-900",
              )}
              href={link}
              aria-current={
                pathname.includes(link) ? "page" : undefined
              }
            >
              <span
                className={clsx(
                  "absolute inset-0 z-0 h-full rounded bg-yellow-500 transition-transform  duration-300 ease-in-out group-hover:translate-y-0",
                  pathname.includes(link)
                    ? "translate-y-6"
                    : "translate-y-8",
                )}
              />
              <span className="relative">{label}</span>
            </Link>
          </li>
          {index < settings.data.nav_item.length - 1 && (
            <span
              className="hidden text-4xl font-thin leading-[0] text-slate-400 md:inline"
              aria-hidden="true"
            >
              /
            </span>
          )}
        </React.Fragment>
      ))}
      <li>
        <Button
          url={settings.data.cta_link}
          label={settings.data.cta_label}
          className="ml-3"
        />
      </li>
    </div>
  );
}