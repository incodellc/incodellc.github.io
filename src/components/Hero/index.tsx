import Title from "../Title";
import Socials from "../Socials";
import { TSocials } from "../../types/TSocials";
import Button from "../Button";
import { useIsPage } from "../../hooks/useIsPage";
import { useIsMobile } from "../../hooks/useIsMobile";
import React from "react";

export interface HeroProps {
  name: string;
  position: string;
  avatar: string;
  socials: TSocials;
  description: string;
}

const Hero = React.forwardRef<HTMLDivElement, HeroProps>(
  ({ name, avatar, socials, position, description }, ref) => {
    const isPaymentPage = useIsPage(["/pay", "/checkout", "/complete"]);
    const isMobile = useIsMobile();

    return (
      <div
        id="about"
        ref={ref}
        className="flex flex-col items-left text-left gap-5 relative pb-3 /*lg:text-center lg:items-center*/">
        <div>
          <Title variant="h1">{name}</Title>
          <p className="text-xl">{position}</p>
          <img
            className="mt-3 rounded-md size-56 mx-0 sm:size-64 md:size-80 object-cover /*lg:mx-auto*/"
            src={avatar}
            alt="developer avatar"
          />
          {!(isMobile && isPaymentPage) && <p className="mt-4">{description}</p>}
        </div>
        <div className="w-full h-[2px] bg-green-400" />
        <Socials socials={socials} className="hidden lg:flex" />
        {!isPaymentPage && <Button href="pay">Pay services</Button>}
      </div>
    );
  }
);

export default Hero;
