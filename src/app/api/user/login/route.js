export const dynamic = "force-static";

export async function POST(request, response) {
  const res = await fetch(`${process.env.BASE_URL}/teacher/get`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name: "John123"
    })
  });
  const data = await res.json();
  console.log(`data fetched ${data}`);

  return res.status(200).json(data);
}
