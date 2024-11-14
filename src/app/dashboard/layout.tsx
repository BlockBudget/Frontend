import Navbar from "@/components/Navbar";


const RootLayout = ({children,}:{children: React.ReactNode}) => {
  return (
    <div>
        <div className="font-montserrat w-11/12 m-auto ">
            <Navbar/>
            {children}
        </div>
    </div>
  )
}

export default RootLayout;