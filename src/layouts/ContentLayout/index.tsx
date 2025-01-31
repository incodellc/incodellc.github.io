import React from "react";
import { Outlet, useParams } from "react-router-dom";
import Hero from "../../components/Hero";
import { useDevInfo } from "../../contexts/DevInfo/useDevInfo";
import { developersInfo } from "../../mock/developersInfo";
import { useIsPage } from "../../hooks/useIsPage";
import classNames from "classnames";
import { useIsMobile } from "../../hooks/useIsMobile";

export default function ContentLayout() {
  const { devInfo, setDevInfo } = useDevInfo();
  const sidebarRef = React.useRef<HTMLDivElement>(null);
  const [sidebarHeight, setSidebarHeight] = React.useState<number>(0);
  const { username } = useParams();
  const [isLoading, setIsLoading] = React.useState(true);
  const isPaymentPage = useIsPage(["/pay", "/checkout", "/complete"]);
  const isMobile = useIsMobile();

  React.useEffect(() => {
    const devInfo = developersInfo.find((developer) => developer.username === username);

    setDevInfo(devInfo);
    setIsLoading(false);
  }, [username, setDevInfo]);

  React.useEffect(() => {
    if (isMobile) return document.body.classList.remove("_lock");

    if (isPaymentPage) {
      document.body.classList.add("_lock");
    } else {
      document.body.classList.remove("_lock");
    }
  }, [isPaymentPage, isMobile]);

  React.useLayoutEffect(() => {
    const updateSidebarHeight = () => {
      if (sidebarRef.current) {
        setSidebarHeight(sidebarRef.current.clientHeight);
      }
    };

    updateSidebarHeight();
    window.addEventListener("resize", updateSidebarHeight);

    return () => {
      window.removeEventListener("resize", updateSidebarHeight);
    };
  }, [devInfo, isMobile]);

  console.log(sidebarHeight);

  if (isLoading) return <div>Loading...</div>;
  if (!devInfo) return <div>Not found</div>;

  const { name, position, avatar, socials, description } = devInfo;

  return (
    <div className="pt-0 md:pt-28 xl:pt-32 px-4 pb-10 flex container mx-auto flex-col lg:flex-row lg:px-8 lg:gap-20 xl:gap-32 2xl:gap-40">
      <div className="basis-auto shrink-0 lg:basis-80 xl:basis-[400px]">
        <div className="element-with-custom-scroll pt-24 md:pt-0 lg:pt-28 xl:pt-32 top-0 overflow-auto static w-full lg:h-screen lg:fixed lg:w-80 xl:w-[400px]">
          <Hero
            ref={sidebarRef}
            name={name}
            position={position}
            avatar={avatar}
            socials={socials}
            description={description}
          />
        </div>
      </div>
      <main
        style={{ height: sidebarHeight }}
        className={classNames("pt-12 lg:pt-0 basis-full flex flex-col", {
          " lg:justify-center": isPaymentPage,
        })}>
        <Outlet />
      </main>
    </div>
  );
}
