import Title from "../Title";
import Socials from "../Socials";
import { TSocials } from "../../types/TSocials";
import Button from "../Button";
import { useIsPage } from "../../hooks/useIsPage";

export interface HeroProps {
  name: string;
  position: string;
  avatar: string;
  socials: TSocials;
  description: string;
}

export default function Hero({ name, avatar, socials, position, description }: HeroProps) {
  const isPaymentPage = useIsPage(["/pay", "/checkout", "/complete"]);

  return (
    <div
      id="about"
      className="flex flex-col items-left text-left gap-5 relative pb-3 lg:text-center lg:items-center">
      <div>
        <Title variant="h1">{name}</Title>
        <p className="text-xl">{position}</p>
        <img
          className="mt-3 rounded-md size-56 mx-0 sm:size-64 md:size-80 object-cover lg:mx-auto"
          src={avatar}
          alt="developer avatar"
        />
        {!isPaymentPage && <p className="mt-4">{description}</p>}
      </div>
      <div className="w-full h-[2px] bg-green-400" />
      <Socials socials={socials} className="hidden lg:flex" />
      {!isPaymentPage && <Button href="pay">Pay services</Button>}
    </div>
  );
}
