import Navbar from "@/components/Navbar";


const RootLayout = ({children,}:{children: React.ReactNode}) => {
  return (
    <div>
        <div className="font-montserrat bg- bg-gradient-to-b  from-gray-900 to-gray-800 ">
            <Navbar/>
            {children}
        </div>
    </div>
  )
}

export default RootLayout;