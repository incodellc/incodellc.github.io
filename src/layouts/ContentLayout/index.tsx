import React from "react";
import { Outlet, useParams } from "react-router-dom";
import Hero from "../../components/Hero";
import { useDevInfo } from "../../contexts/DevInfo/useDevInfo";
import { developersInfo } from "../../mock/developersInfo";

export default function ContentLayout() {
  const { devInfo, setDevInfo } = useDevInfo();

  const { username } = useParams();
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const devInfo = developersInfo.find((developer) => developer.username === username);

    setDevInfo(devInfo);
    setIsLoading(false);
  }, [username, setDevInfo]);

  if (isLoading) return <div>Loading...</div>;
  if (!devInfo) return <div>Not found</div>;

  const { name, position, avatar, socials, description } = devInfo;

  return (
    <div className="pt-0 lg:pt-24 px-4 pb-10 flex container mx-auto flex-col lg:flex-row lg:px-8 lg:gap-20 xl:gap-32 2xl:gap-40">
      <div className="basis-auto shrink-0 lg:basis-80 xl:basis-[400px]">
        <div className="element-with-custom-scroll pt-24 top-0 overflow-auto static w-full lg:h-screen lg:fixed lg:w-80 xl:w-[400px]">
          <Hero name={name} position={position} avatar={avatar} socials={socials} description={description} />
        </div>
      </div>
      <main className="pt-12 lg:pt-0 basis-full">
        <Outlet />
      </main>
    </div>
  );
}
