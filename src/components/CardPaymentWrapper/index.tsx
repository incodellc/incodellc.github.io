import { Outlet } from "react-router-dom";

export default function CardPaymentWrapper() {
  return (
    <div className="bg-gray-800 2xl:min-w-[700px] 2xl:mx-auto py-12 p-6 rounded-md">
      <Outlet />
    </div>
  );
}
