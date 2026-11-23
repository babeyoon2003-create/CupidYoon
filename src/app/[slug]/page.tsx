import { Suspense } from "react";
import GiftClientView from "@/components/gift/GiftClientView";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ slug: string }>;
}

async function GiftContent({ params }: PageProps) {
  const { slug } = await params;
  return <GiftClientView slug={slug} />;
}

export default function GiftPage({ params }: PageProps) {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-[#120a1f] to-[#250d2c] text-white">
          <div className="w-14 h-14 rounded-full border-4 border-rose-500 border-t-transparent animate-spin mb-4" />
          <p className="text-sm font-serif italic text-rose-200">
            အမှတ်တရ လက်ဆောင်လေးကို ဖွင့်လှစ်နေပါသည်... ✨
          </p>
        </div>
      }
    >
      <GiftContent params={params} />
    </Suspense>
  );
}
