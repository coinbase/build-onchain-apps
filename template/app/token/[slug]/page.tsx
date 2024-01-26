"use client";

import Header from "../../../src/components/header/Header";

export default function Page({ params }: { params: { slug: string } }) {
  return <>
    <Header />
    <main className="container mx-auto flex flex-col px-8 py-6">
      <div className="text-2xl font-semibold text-white">Token: {params.slug}</div>
    </main>
  </>
}
