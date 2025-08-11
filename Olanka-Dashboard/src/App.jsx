import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import './index.css'

import CommunicationTable from './Components/CommunicationTable/CommunicationTablePage'
import HorizontalBarChart from './Components/Graph/HorizontalBarChart'
import CommunicationTableFinance from './Components/CommunicationTableFinance/CommunicationTablePageFinance'
import { CombinedPage } from './Components/CombinedPage'

function App() {


  return (
    <>
     {/* <AnimationOne/> */}
     <div className='bg-[#F0DCE3]'>
     {/*  */}
     {/* <CommunicationTable /> */}
     {/* <HorizontalBarChart /> */}
     {/* <CommunicationTableFinance /> */}
     <CombinedPage/>
    
     </div>
    </>
  )
}

export default App
