import Hero from "@/components/Hero"
import  Navbar  from "@/components/Navbar"

 
function Home() {
  return (
    <div className="bg-neutral-900 w-full h-screen">
      <Navbar />
      <Hero />
    </div>
  )
}

export default Home
