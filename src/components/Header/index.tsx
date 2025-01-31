import { useState, useEffect } from "react";
import classNames from "classnames";
import Socials from "../Socials";
import BurgerMenu from "./BurgerMenu";
import { scrollToContent } from "../../utils/scrollToContent";
import { navLinks } from "../../mock/navLinks";
import { useIsMobile } from "../../hooks/useIsMobile";
import { useDevInfo } from "../../contexts/DevInfo/useDevInfo";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../Button";
import { useIsPage } from "../../hooks/useIsPage";

export default function Header() {
  const { devInfo } = useDevInfo();
  const [activeLink, setActiveLink] = useState<number | null>(null);
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const { username } = useParams();
  const isPaymentPage = useIsPage(["/pay", "/checkout", "/complete"]);
  const isHomePage = useIsPage("/");

  const closeMenu = () => {
    setIsOpenMenu(false);
    document.body.classList.remove("_lock");
  };

  useEffect(() => {
    if (!isMobile) {
      closeMenu();
    }
  }, [isMobile]);

  const homePagePath = `/${username}`;
  const payPagePath = `/${username}/pay`;

  const onClickNavLink = (index: number, idSelector: string) => () => {
    setActiveLink(index);
    scrollToContent(idSelector);

    closeMenu();
  };

  const onGoHome = () => {
    setActiveLink(null);
    closeMenu();
    navigate(homePagePath);
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  const onGoPay = () => {
    setActiveLink(null);
    navigate(payPagePath);
    closeMenu();
  };

  return (
    <header
      className={classNames(
        "fixed w-full top-0 py-4 shadow-md shadow-gray-800 z-50 lg:backdrop-blur-md lg:bg-gray-900/70",
        { "backdrop-blur-md bg-gray-900/70": !isOpenMenu }
      )}>
      <nav className="flex items-center justify-between container px-4 mx-auto sm:px-8">
        <BurgerMenu isOpen={isOpenMenu} setIsOpen={setIsOpenMenu} />
        <div className=" flex items-center gap-4 sm:gap-8 lg:hidden">
          {devInfo?.socials && (
            <Socials socials={devInfo.socials} className="flex lg:hidden [_svg]:brightness-100" />
          )}
          <Button onClick={onGoPay} className="max-w-fit px-4 h-10">
            Pay
          </Button>
        </div>
        <ul
          className={classNames(
            "fixed transition-opacity backdrop-blur-md bg-gray-900/70 top-0 left-0 h-screen w-full flex flex-col items-center py-10 justify-center gap-8 lg:backdrop-blur-none lg:bg-transparent lg:gap-6 lg:h-auto lg:flex-row lg:py-0 lg:justify-between lg:static",
            { "opacity-0 pointer-events-none": !isOpenMenu && isMobile },
            "lg:!opacity-1 lg:!pointer-events-auto"
          )}>
          <li>
            <button
              onClick={onGoHome}
              className={classNames(
                "cursor-pointer transition-colors capitalize text-2xl sm:text-3xl lg:text-base hover:text-green-400",
                {
                  "text-green-400": isHomePage,
                }
              )}>
              Home
            </button>
          </li>
          {navLinks.map((navLink, i) => (
            <li key={`header-nav-link-${navLink.title}-${i}`}>
              <button
                disabled={isPaymentPage}
                onClick={onClickNavLink(i, navLink.href)}
                className={classNames(
                  " disabled:cursor-no-drop disabled:opacity-50 disabled:hover:text-white cursor-pointer transition-colors capitalize text-2xl sm:text-3xl lg:text-base hover:text-green-400",
                  {
                    "text-green-400": activeLink === i,
                  }
                )}>
                {navLink.title}
              </button>
            </li>
          ))}
          <Button onClick={onGoPay} className="max-w-fit px-8">
            Pay
          </Button>
        </ul>
      </nav>
    </header>
  );
}
