"use client";

import Announcement from "@/components/Announcement";
import Logo from "@/components/Logo";
import config from "@/config/config.json";
import menu from "@/config/menu.json";
import { markdownify } from "@/lib/utils/textConverter";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

export interface ChildNavigationLink {
  name: string;
  url?: string;
  description?: string;
  children?: ChildNavigationLink[];
}

export interface NavigationLink {
  name: string;
  url: string;
  hasMegaMenu?: boolean;
  hasChildren?: boolean;
  children?: ChildNavigationLink[];
}

const Header = () => {
  const { main }: { main: NavigationLink[] } = menu;
  const { navigation_button } = config;
  const pathname = usePathname();
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);

  // Toggle dropdown menu on mobile
  const toggleDropdown = (index: number) => {
    setActiveDropdown(activeDropdown === index ? null : index);
  };

  useEffect(() => {
    window.scroll(0, 0);

    // Reset active dropdown when route changes
    setActiveDropdown(null);

    const headerHamburgerInit = () => {
      const allPages = document.getElementById("all-pages");
      allPages &&
        allPages.addEventListener("click", () => {
          const menu = document.getElementById("all-pages-dropdown");
          menu && menu.classList.toggle("active");
        });
    };
    headerHamburgerInit();
  }, [pathname]);

  return (
    <>
      <Announcement />
      <header className="header relative pt-4">
        <nav className="navbar container relative z-10">
          {/* logo */}
          <div className="order-0">
            <Logo />
          </div>
          {/* navbar toggler */}
          <input id="nav-toggle" type="checkbox" className="hidden" />
          <label
            htmlFor="nav-toggle"
            className="order-3 flex cursor-pointer items-center text-text-dark lg:order-1 lg:hidden">
            <svg id="show-button" className="block h-6 fill-current" viewBox="0 0 20 20">
              <title>Menu Open</title>
              <path d="M0 3h20v2H0V3z m0 6h20v2H0V9z m0 6h20v2H0V0z"></path>
            </svg>
            <svg id="hide-button" className="hidden h-6 fill-current" viewBox="0 0 20 20">
              <title>Menu Close</title>
              <polygon
                points="11 9 22 9 22 11 11 11 11 22 9 22 9 11 -2 11 -2 9 9 9 9 -2 11 -2"
                transform="rotate(45 10 10)">
              </polygon>
            </svg>
          </label>
          {/* /navbar toggler */}
          <ul
            id="nav-menu"
            className="navbar-nav order-3 hidden pb-6 lg:order-1 lg:flex lg:w-auto lg:space-x-2 lg:pb-0 xl:space-x-4">
            {
              main.map((menu, i: number) => (
                <React.Fragment key={i}>
                  {menu.hasMegaMenu ? (
                    <li id={menu.hasChildren ? "all-pages" : undefined} className="nav-item nav-dropdown group relative">
                      <span
                        onClick={() => toggleDropdown(i)}
                        className={`nav-link inline-flex items-center cursor-pointer ${menu.children?.map(({ url }) => url).includes(pathname) ||
                          menu.children
                            ?.map(({ url }) => `${url}/`)
                            .includes(pathname)
                          ? "active"
                          : ""
                          }`}>
                        {menu.name}
                        <span className="arrow-icon">
                          <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                          </svg>
                        </span>
                      </span>
                      <ul className={`nav-dropdown-list lg:invisible lg:absolute lg:translate-y-1 lg:opacity-0 lg:transition-all lg:duration-300 lg:group-hover:visible flex lg:group-hover:translate-y-0 md:flex-row flex-col lg:group-hover:opacity-100 max-lg:flex-wrap gap-2 sm:gap-5 mb-4 lg:mb-0 md:gap-10 ${activeDropdown === i ? 'max-lg:block' : 'max-lg:hidden'}`}>
                        {menu.children?.map((child, index: number) => (
                          <li key={index} className="nav-dropdown-item">
                            <ul>
                              {child.children?.map((grandChild, index: number) => (
                                <li key={index} className="nav-dropdown-item">
                                  <a
                                    href={grandChild.url}
                                    className={`nav-dropdown-link block group/link ${(pathname === `${grandChild.url}/` ||
                                      pathname === grandChild.url) &&
                                      "active"
                                      }`}>
                                    {grandChild.name && (
                                      <span
                                        className="group-hover/link:text-primary"
                                        dangerouslySetInnerHTML={markdownify(grandChild.name)}
                                      />
                                    )}
                                    {grandChild.description && (
                                      <span
                                        className="block whitespace-nowrap text-sm opacity-60"
                                        dangerouslySetInnerHTML={markdownify(grandChild.description)}
                                      />
                                    )}
                                  </a>
                                </li>
                              ))}
                            </ul>
                          </li>
                        ))}
                      </ul>
                    </li>
                  ) : menu.hasChildren ? (
                    <li className="nav-item nav-dropdown group relative">
                      <span
                        onClick={() => toggleDropdown(i)}
                        className={`nav-link inline-flex items-center cursor-pointer ${menu.children?.map(({ url }) => url).includes(pathname) ||
                          menu.children
                            ?.map(({ url }) => `${url}/`)
                            .includes(pathname)
                          ? "active"
                          : ""
                          }`}>
                        {menu.name}
                        <span className="arrow-icon">
                          <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                          </svg>
                        </span>
                      </span>
                      <ul className={`nav-dropdown-list lg:invisible lg:absolute lg:translate-y-1 lg:opacity-0 lg:transition-all lg:duration-300 lg:group-hover:visible lg:group-hover:block lg:group-hover:translate-y-0 lg:group-hover:opacity-100 ${activeDropdown === i ? 'max-lg:block' : 'max-lg:hidden'}`}>
                        {menu.children?.map((child, index: number) => (
                          <li key={index} className="nav-dropdown-item">
                            <Link
                              href={child.url ? child.url : "#"}
                              aria-label={child.name}
                              className={`nav-dropdown-link block ${(pathname === `${child.url}/` ||
                                pathname === child.url) &&
                                "active"
                                }`}>
                              {child.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </li>
                  ) : (
                    <li className="nav-item">
                      <a
                        href={menu.url}
                        className={`nav-link block ${(pathname === `${menu.url}/` || pathname === menu.url) &&
                          "active"
                          }`}>
                        {menu.name}
                      </a>
                    </li>
                  )}
                </React.Fragment>
              ))
            }
            {
              navigation_button.enable && (
                <a
                  className="btn btn-sm btn-outline-text-dark mt-2 lg:hidden"
                  href={navigation_button.link}>
                  {navigation_button.label}
                </a>
              )
            }
          </ul>
          <div className="order-1 ml-auto flex items-center md:order-2">
            {
              navigation_button.enable && (
                <a
                  className="btn btn-sm btn-outline-text-dark hidden lg:flex"
                  href={navigation_button.link}>
                  {navigation_button.label}
                </a>
              )
            }
          </div>
        </nav>
      </header>
    </>
  );
};

export default Header;
