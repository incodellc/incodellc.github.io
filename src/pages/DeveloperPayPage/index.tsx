import PaymentDetailsForm from "../../components/PaymentDetailsForm";

export interface DeveloperInfoPageProps {
  setClientSecret: React.Dispatch<React.SetStateAction<string | null>>;
}

export default function DeveloperInfoPage(props: DeveloperInfoPageProps) {
  return (
    <div className="pt-12 lg:pt-20 basis-auto flex flex-col gap-16">
      <PaymentDetailsForm setClientSecret={props.setClientSecret} />
    </div>
  );
}
