"use client";

import ServiceNowForm from "./components/ServiceNowForm";

export default function Home() {

  return (
    <div className="p-16">
      <h1 className="text-5xl font-bold">ServiceNow Link Generator</h1>
      <p className="mt-4 text-lg">Attention : Merci de ne pas inclure de données confidentielles dans les champs !</p>
      <ServiceNowForm />
    </div>
  );
}
