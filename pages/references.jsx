import Title from '../src/components/title/Title'
import { useEffect } from 'react'
import sidebarHide from "../utils/sidebarHide";



export default function References() {
    
    useEffect(() => {
        sidebarHide()
    })

    return (
        <div>
            <Title title={`Referências`} subtitle={''} backButton />
        </div>
    )
}