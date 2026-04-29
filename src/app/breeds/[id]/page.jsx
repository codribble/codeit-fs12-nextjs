"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

async function getCatByid(id) {
  const res = await fetch(
    `https://api.thecatapi.com/v1/images/search?api_key=${process.env.NEXT_PUBLIC_CAT_API_KEY}&breed_ids=${id}`,
  );

  if (!res.ok) {
    throw new Error("고양이 데이터를 가져오는데 실패했습니다");
  }

  return res.json();
}

const CatBreedPage = () => {
  //   console.log("SSR-CatBreedPage");
  const { id } = useParams();
  const [cat, setCat] = useState(null);

  useEffect(() => {
    const fetchCat = async () => {
      const data = await getCatByid(id);
      setCat(data[0]);
    };

    fetchCat();
  }, [id]);

  if (!cat) {
    return (
      <div className="flex items-center justify-center py-10">
        <div role="status">
          <svg
            aria-hidden="true"
            className="inline w-8 h-8 w-8 h-8 text-neutral-tertiary animate-spin fill-blue-500"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-rows-[auto_1fr_auto] items-center justify-items-center min-h-screen p-8 pb-20 gap-8 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1 className="text-3xl font-bold mb-4">{cat.breeds[0].name}</h1>

      <main className="w-full max-w-4xl">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="relative w-full md:w-1/2 h-[400px] bg-lime-400 rounded-lg overflow-hidden">
            <img
              src={cat.url}
              alt={cat.breeds[0].name}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="w-full md:w-1/2 space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-2">기원</h2>
              <p className="text-gray-700">{cat.breeds[0].origin}</p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2">설명</h2>
              <p className="text-gray-700">{cat.breeds[0].description}</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CatBreedPage;
