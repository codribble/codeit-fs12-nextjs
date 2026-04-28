async function getCats() {
  const res = await fetch(
    `https://api.thecatapi.com/v1/images/search?api_key=${process.env.CAT_API_KEY}&limit=8&has_breeds=1`,
  );

  if (!res.ok) {
    throw new Error("고양이 데이터를 가져오는데 실패했습니다");
  }

  return res.json();
}

export default async function Home() {
  const cats = await getCats();

  return (
    <div className="min-h-screen p-8">
      <h1 className="mb-4 font-bold text-2xl text-secondary text-center">
        The Cat API
      </h1>

      <main>
        <div className="grid grid-cols-4 gap-4">
          {cats.map((cat) => (
            <div key={cat.id} className="overflow-hidden border rounded-[10px]">
              <figure className="h-48">
                <img
                  src={cat.url}
                  alt={cat.breeds[0]?.name || "고양이"}
                  className="w-full h-full object-cover"
                />
              </figure>
              <div className="p-2">
                <h2>{cat.breeds[0]?.name || "고양이"}</h2>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
