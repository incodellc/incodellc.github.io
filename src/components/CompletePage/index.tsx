import React from "react";
import CheckedImage from "../../assets/checked.png";

export default function CompletePage() {
  return (
    <div className="flex flex-col gap-2 text-center">
      <img className="size-24 mx-auto" src={CheckedImage} alt="checked" />
      <h1 className="font-bold text-2xl mt-5">Payment successful!</h1>
      <p>It will appear in their bank statement</p>
    </div>
  );
}
