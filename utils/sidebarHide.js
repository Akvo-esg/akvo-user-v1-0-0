export default function sidebarHide() {

    if (window.innerWidth < 800){ 
        document.documentElement.style.setProperty('--aside-width', '0px')
        
    }

    return
}