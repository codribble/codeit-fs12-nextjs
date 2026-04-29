// import CatCard from "@/components/ui/CatCard";
import PageContainer from "@/components/ui/PageContainer";
import { getCats } from "@/lib/services/catApi";
import CatCardList from "@/components/ui/CatCardList";
import Image from "next/image";
import { getPlaiceholder } from "plaiceholder";
// import staticCat from "/public/sampleCat.jpg";

export default async function Home() {
  const cats = await getCats();
  console.log("cats", cats);

  const imgUrl =
    "https://res.cloudinary.com/dv8ifoygg/image/upload/v1706786484/cat7_xdqpdr.jpg";

  const res = await fetch(imgUrl);
  const buffer = await res.arrayBuffer();

  const { base64 } = await getPlaiceholder(Buffer.from(buffer));

  return (
    <PageContainer title="The Cat API">
      {/* 
        TODO: 아래 주석 해제하고 placeholder=”blur” 처리해 보세요.
        src 에 할당될 이미지는 반드시 import 된 이미지여야 합니다.
        public/sampleCat.jpg 이미지를 사용해 보세요.
      */}
      <div className="relative mx-auto w-[300px] h-[300px] flex justify-center items-center mb-4">
        <Image
          src={imgUrl}
          alt="The Cat API"
          fill
          placeholder="blur"
          blurDataURL={base64}
          className="object-cover"
        />
      </div>
      <CatCardList items={cats} linkable={false} />
    </PageContainer>
  );
}
