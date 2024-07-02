import SpotList from './components/SpotList'

export default async function Home() {
  // const spots = await getAllSpots();

  const API_URL = process.env.VERCEL_URL ?? process.env.NEXT_PUBLIC_VERCEL_URL;

  const res = await fetch(`https://${API_URL}/api`, { cache: "no-store" })

  const spots = await res.json();
  
  return (
    <div>
      <SpotList spots={spots}/>
    </div>
  )
}
